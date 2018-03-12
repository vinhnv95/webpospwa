import * as types from '../../constants/loginPageActionTypes';

export function getSessionId() {
    return {
        type: types.GET_SESSION_ID
    };
}

export function submitLogin(staff) {
    return {
        type: types.SUBMIT_LOGIN,
        staff
    };
}

export function loginSuccess(response) {
    console.log(response.data);
    return {
        type: types.LOGIN_SUCCESS,
        response
    };
}

export function loginFail(error) {
    return {
        type: types.LOGIN_FAIL,
        error
    };
}