import { axiosInstance, authToken } from "./utilities";

export var api = async function (
   { method = "get", api, body, status = false, token = false },
   config = {}
) {
   return await new Promise((resolve, reject) => {
      // setting token
      if (token)
         axiosInstance.defaults.headers.common[
            "x-access-token"
         ] = localStorage.getItem("w_auth");

      axiosInstance[method](api, body ? body : "", config)
         .then((data) => {
            resolve(statusHelper(status, data));
         })
         .catch((error) => {
            if (error) {
               if (error.response) {
                  reject(statusHelper(status, error.response));
               } else {
                  reject(error);
               }
            } else {
               reject(false);
            }
         });
   });
};

var statusHelper = (status, data) => {
   if (data.status == 401) {
      console.log("logout");
   }

   if (status) {
      return {
         status: data.status,
         response: data.data,
      };
   } else {
      return data.data;
   }
};
