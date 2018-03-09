import axios from 'axios';
import { API_BASE_URL } from '../../constants/baseUrl';
import { getSessionId } from '../../helpers/cookieHelper';

let qs = require('qs');

export function getPosList(locationId) {
    let url = API_BASE_URL + 'poslist';

    let requestData = {
        searchCriteria: {
            filter_groups: {
                0: {
                    filters: {
                        0: {
                            field: 'location_id',
                            value: locationId,
                            condition_type: 'eq'
                        }
                    },
                },
            },
            sortOrders: {
                1: {
                    field: 'pos_name',
                    direction: 'ASC'
                }
            }
        },
        session: getSessionId()
    };
    return axios.get(url, {
        params: requestData,
        paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        },
    });
}

export function posAssign(locationId, posId) {
    let sessionID = getSessionId();
    let url = API_BASE_URL + 'posassign?session=' + sessionID;
    return axios.post(url, {
        location_id: locationId,
        current_session_id: sessionID,
        pos_id: posId
    });
}