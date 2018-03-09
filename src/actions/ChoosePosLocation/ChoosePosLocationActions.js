import * as types from '../../constants/choosePosLocationActionTypes';

export function getEnableSessionConfig() {
    return {
        type: types.GET_ENABLE_SESSION_CONFIG
    };
}
export function getEnableSessionConfigSuccess(value) {
    return {
        type: types.GET_ENABLE_SESSION_CONFIG_SUCCESS,
        value
    };
}

export function getCurrentPosId() {
    return {
        type: types.GET_CURRENT_POS_ID
    };
}
export function getCurrentPosIdSuccess(value) {
    return {
        type: types.GET_CURRENT_POS_ID_SUCCESS,
        value
    };
}

export function getStaffId() {
    return {
        type: types.GET_STAFF_ID
    };
}
export function getStaffIdSuccess(value) {
    return {
        type: types.GET_STAFF_ID_SUCCESS,
        value
    };
}

export function getLocationList() {
    return {
        type: types.GET_LOCATION_LIST
    };
}
export function getLocationListSuccess(value) {
    return {
        type: types.GET_LOCATION_LIST_SUCCESS,
        value
    };
}

export function getPosList(locationId) {
    return {
        type: types.GET_POS_LIST,
        locationId
    };
}
export function getPosListSuccess(payload) {
    return {
        type: types.GET_POS_LIST_SUCCESS,
        payload
    };
}

export function selectLocation(locationId) {
    return {
        type: types.SELECT_LOCATION,
        locationId
    };
}

export function selectPos(posId) {
    return {
        type: types.SELECT_POS,
        posId
    };
}

export function enterToPos() {
    return {
        type: types.ENTER_TO_POS
    }
}

export function enterToPosSuccess() {
    return {
        type: types.ENTER_TO_POS_SUCCESS
    }
}

export function enterToPosFail(error) {
    return {
        type: types.ENTER_TO_POS_FAIL,
        error
    }
}