import axios from 'axios';
import { API_BASE_URL } from '../../constants/baseUrl';
import * as cookieHelper from '../../helpers/cookieHelper';

export function login (staff) {
    let url = API_BASE_URL + 'staff/login';
    return axios.post(url, {
        staff: staff
    })
}

export function logout() {
    let url = API_BASE_URL + 'staff/logout?session=' + cookieHelper.getSessionId();
    return axios.post(url, {});
}