import { HomeActionType } from "service/actionType";

export const getHomePageDetails = (data) => (dispatch, getState, { api }) => {
   return new Promise((resolve, reject) => {
      dispatch({ type: HomeActionType.updateHomePageData, payload: data });
      resolve();
   });
};
