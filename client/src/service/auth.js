import { Component } from "react";
import { Router } from "../routes";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import { axiosInstance } from "./utilities";
import { userDetails, createProject } from "./apiVariables";

export const login = async ({ token, redirectUrl = "/" }) => {
   cookie.set("token", token, { expires: 1 });

   if (token) {
      axiosInstance.defaults.headers.common["x-access-token"] = token;
   }

   if (redirectUrl === "/") {
      // window.location.href = '/';
      Router.pushRoute("/");
   } else {
      Router.pushRoute(redirectUrl);
      // window.location.href = redirectUrl;
   }
};

export const logout = (redirect = true) => {
   cookie.remove("token");
   cookie.remove("skipLinking");

   axiosInstance.defaults.headers.common["x-access-token"] = null;

   // to support logging out from all windows
   window.localStorage.setItem("logout", Date.now());

   if (redirect) {
      window.location.href = "/login";
      // Router.pushRoute("/login");

      // location.reload()
   }
};
export const getToken = () => {
   return cookie.get("token") ? cookie.get("token") : cookie.get("tempToken");
};

const fetchUserDetails = token => {
   const { api, method } = userDetails;

   return new Promise((resolve, reject) => {
      axiosInstance.defaults.headers.common["x-access-token"] = token;

      axiosInstance[method](api)
         .then(data => {
            resolve(data);
         })
         .catch(err => {
            resolve(err);
         });
   });
};

const createNewProject = () => {
   const { api, method } = createProject;

   return new Promise((resolve, reject) => {
      axiosInstance[method](api)
         .then(data => {
            resolve(data);
         })
         .catch(err => {
            resolve(err);
         });
   });
};

const redirectToLogin = ({ asPath, res }) => {
   cookie.remove("token");

   axiosInstance.defaults.headers.common["x-access-token"] = null;

   let Location = "/login";

   if (asPath !== "/") {
      Location += "?redirectUrl=" + asPath;
   }

   if (res) {
      res.writeHead(302, {
         Location
      });
      res.end();
   }
};

const verifyProjectStatus = async (response, { asPath, res, pathname }) => {
   return new Promise(async (resolve, reject) => {
      let {
         count: { project = {}, focusgroup = {} } = {},
         inCompleteProject = null
      } = response;

      let condition = !project.created && !focusgroup.collaborated;

      var Location = "/project/";

      if (condition) {
         let {
            data: { data }
         } = await createNewProject();

         Location += data._id;

         resolve({ redirectTo: Location });
      } else if (
         pathname === "/project" &&
         asPath.substring(1, asPath.length).split("/").length < 2
      ) {
         let {
            data: { data }
         } = await createNewProject();

         Location += data._id;

         resolve({ redirectTo: Location });
      } else if (
         pathname !== "/project" &&
         project.created === 1 &&
         !focusgroup.collaborated &&
         inCompleteProject
      ) {
         Location += inCompleteProject;

         resolve({ redirectTo: Location });
      } else {
         resolve({ redirectTo: false });
      }
   });
};

const getDisplayName = Component =>
   Component.displayName || Component.name || "Component";

const UserAuth = WrappedComponent =>
   class extends Component {
      static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

      static async getInitialProps(ctx) {
         const cookie = nextCookie(ctx);

         var initialProps = {};

         const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx));

         let loginRedirect = true; // Redirect to login by default

         if (componentProps && componentProps.openAuth) {
            loginRedirect = false; // if openAuth === true in page getInitialProps, do nothing
         }

         const { reduxStore } = ctx;

         if (!cookie.token) {
            if (loginRedirect) redirectToLogin(ctx);
         } else {
            initialProps["token"] = cookie.token;

            let response = await fetchUserDetails(cookie.token);

            if (response.status !== 200) {
               if (loginRedirect) redirectToLogin(ctx);
            } else {
               reduxStore.dispatch(updateUserDetails(response.data));

               let status = await verifyProjectStatus(response.data.data, ctx);

               if (ctx.res && status.redirectTo) {
                  ctx.res.writeHead(302, {
                     Location: status.redirectTo
                  });
                  ctx.res.end();
               }
            }
         }

         return { ...componentProps, ...initialProps };
      }

      render() {
         return <WrappedComponent {...this.props} />;
      }
   };

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
   getUserDetails,
   setLoader,
   updateUserDetails
} from "../redux/actions/common";

const mapStateToProps = state => ({
   userDetails: state.common.userDetails
});

const mapDispatchToProps = dispatch => {
   return bindActionCreators(
      {
         getUserDetails,
         setLoader
      },
      dispatch
   );
};

const withAuthSync = compose(
   connect(mapStateToProps, mapDispatchToProps),
   UserAuth
);

export { withAuthSync };
