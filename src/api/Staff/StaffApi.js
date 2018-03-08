import axios from 'axios';
import { API_BASE_URL } from '../../constants/baseUrl';

export function login (staff) {
    let url = API_BASE_URL + 'staff/login';
    return axios.post(url, {
        staff: staff
    })
}