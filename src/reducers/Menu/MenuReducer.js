import { 
    LOGOUT, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAIL, 
    GET_STAFF_NAME_SUCCESS, 
    GET_LOCATION_NAME_SUCCESS
} from "../../constants/menuActionTypes";
import * as cookieHelper from "../../helpers/cookieHelper";
import cookie from "react-cookies";

const initialState = {
    loading: false,
    staffName: '',
    locationName: '',
    redirectToLoginPage: false,
    menuList: [
        {
            id: 'order',
            title: 'Orders',
            elems: [
                {
                    id: 'checkout',
                    title: 'Checkout'
                },

            ]
        }
    ],
};

export default function MenuReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STAFF_NAME_SUCCESS:
            return Object.assign({}, state, {
                staffName: action.staffName
            });
        case GET_LOCATION_NAME_SUCCESS:
            return Object.assign({}, state, {
                locationName: action.locationName
            });
        case LOGOUT:
            return Object.assign({}, state, {
                loading: true
            });
        case LOGOUT_SUCCESS:
            cookieHelper.removeIsInstalled();
            cookieHelper.removeSessionId();
            return Object.assign({}, state, {
                redirectToLoginPage: true,
                loading: false
            });
        case LOGOUT_FAIL:
            console.log(action.error);
            alert('Logout Failed');
            return Object.assign({}, state, {
                loading: false
            });
        default:
            return state;
    }
}