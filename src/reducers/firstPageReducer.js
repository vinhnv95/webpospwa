import { ADD_BASE_URL } from "../constants/firstPageActionTypes";

const initialState = {
    corsUrl: localStorage.getItem('corsUrl'),
    baseUrl: localStorage.getItem('baseUrl'),
}

export default function fitstPageReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BASE_URL:
            localStorage.setItem('baseUrl', action.baseUrl);
            return Object.assign({}, state, {
                baseUrl: action.baseUrl
              });
        default:
            return state;
    }
}