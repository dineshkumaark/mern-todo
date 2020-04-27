import { HomeActionType } from "service/actionType"

const initialState = {
    data: ""
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case HomeActionType.updateHomePageData:
            return {
                ...state,
                data: payload
            }
        default:
            return state
    }

}