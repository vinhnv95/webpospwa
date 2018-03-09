import * as types from '../../constants/menuActionTypes';

export function getStaffName() {
    return {
        type: types.GET_STAFF_NAME
    };
}

export function getStaffNameSuccess(staffName) {
    return {
        type: types.GET_STAFF_NAME_SUCCESS,
        staffName
    };
}

export function getLocationName() {
    return {
        type: types.GET_LOCATION_NAME
    };
}

export function getLocationNameSuccess(locationName) {
    return {
        type: types.GET_LOCATION_NAME_SUCCESS,
        locationName
    };
}

export function logout() {
    return {
        type: types.LOGOUT
    };
}

export function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS
    };
}

export function logoutFail(error) {
    return {
        type: types.LOGOUT_FAIL,
        error
    };
}