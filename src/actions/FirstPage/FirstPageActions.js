import * as types from '../../constants/firstPageActionTypes';

export function addBaseUrl(baseUrl) {
    return {
        type: types.ADD_BASE_URL,
        baseUrl: baseUrl
    }
}