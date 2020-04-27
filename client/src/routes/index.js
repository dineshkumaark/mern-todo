import React, { Component } from "react";
import { Route, Router, Redirect } from "react-router-dom";

import Routers from "./routes";

import * as Layout from "../layout";
import * as Pages from "../pages";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { history } from "../helpers";

const theme = createMuiTheme({
   overrides: {
      MuiListSubheader: {
         sticky: {
            backgroundColor: "#f5f5f5",
         },
      },
      MuiList: {
         root: {
            overflowY: "auto",
            maxHeight: "calc(95vh - 60px - 12.625rem)",
         },
         padding: {
            paddingTop: 0,
         },
      },
      MuiListItem: {
         root: {
            backgroundColor: "#fff",
            marginBottom: "0.9rem",
            borderRadius: "10px",
         },
      },
      MuiOutlinedInput: {
         notchedOutline: {
            borderColor: "1px solid #423BC8",
         },
      },
   },
   palette: {
      primary: {
         main: "#423BC8",
      },
   },
   typography: {
      button: {
         textTransform: "capitalize",
      },
      h4: {
         overflow: "hidden",
         textOverflow: "ellipsis",
         whiteSpace: "nowrap",
      },
   },
});

class RoutesClass extends Component {
   constructor(props) {
      super(props);
      this.state = {
         renderRoute: false,
         pathname: null,
         loading: true,
      };
   }

   componentWillMount() {}

   componentDidMount() {}

   componentWillReceiveProps({ userPermissionDetails }) {}

   render() {
      return (
         <MuiThemeProvider theme={theme}>
            <Router history={history}>
               {Routers.map(
                  ({
                     component,
                     redirect,
                     path,
                     exact = false,
                     auth = true,
                     childrens = [],
                  }) => {
                     if (childrens.length > 0) {
                        return (
                           <Route
                              path={path}
                              exact={exact}
                              key={path}
                              render={(props) => {
                                 if (redirect) {
                                    if (props.location.pathname == path) {
                                       props.history.push(redirect);
                                    }
                                 }

                                 const LayoutComponent = Layout[component];

                                 return (
                                    <LayoutComponent {...props}>
                                       {childrens.map(
                                          ({
                                             component: ChildrenComponent,
                                             path: childrenPath,
                                             exact = false,
                                             auth = true,
                                          }) => {
                                             return (
                                                <Route
                                                   path={path + childrenPath}
                                                   exact={exact}
                                                   key={path + childrenPath}
                                                   render={(props) => {
                                                      let PageComponent =
                                                         Pages[
                                                            ChildrenComponent
                                                         ];

                                                      return (
                                                         <PageComponent
                                                            {...props}
                                                         />
                                                      );
                                                   }}
                                                />
                                             );
                                          }
                                       )}
                                    </LayoutComponent>
                                 );
                              }}
                           />
                        );
                     }

                     return (
                        <Route
                           path={path}
                           exact={exact}
                           key={component || 2322}
                           render={(props) => {
                              if (component) {
                                 let PageComponent = Pages[component];
                                 return <PageComponent />;
                              }
                              if (redirect) {
                                 return <Redirect to={redirect} />;
                              }
                              return <div></div>;
                           }}
                        />
                     );
                  }
               )}
            </Router>
         </MuiThemeProvider>
      );
   }
}

export default RoutesClass;
