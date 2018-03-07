import * as types from '../../constants/loginPageActionTypes';

export function submitLogin(staff) {
    return {
        type: types.SUBMIT_LOGIN,
        staff
    };
}

export function loginSuccess(response) {
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