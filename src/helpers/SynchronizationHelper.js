import db from '../model/db';
import cookie from 'react-cookies';
import axios from 'axios';
import {renewWebposSession} from './cookieHelper';

let qs = require('qs');

let corsUrl = localStorage.getItem('corsUrl');
let baseURL = localStorage.getItem('baseUrl');

export function syncData() {
    console.log('sync data');
    loadConfiguration();
    renewWebposSession();    
    loadProductList();
    loadCategory();
}

export function loadProductList() {
    let sessionID = cookie.load('sessionID');
    let url = corsUrl + baseURL + '/rest/default/V1/webpos/productlist/';
    let requestData = {
        show_out_stock: 1,
        searchCriteria: {
            sortOrders: {
                1: {
                    field: 'name',
                    direction: 'ASC'
                }
            }
        },
        session: sessionID
    };

    axios.get(url, {
        params: requestData,
        paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        },
    })
        .then(response => {
            localStorage.setItem('totalProduct', response.data.total_count);
            response.data.items.map(function (item) {
                db.product.put(item);
            });
            console.log('complete sync product');
        })
        .catch(error => {
            console.log(error);
        });

}

export function loadCategory() {
    let sessionID = cookie.load('sessionID');
    let url = corsUrl + baseURL + '/rest/default/V1/webpos/categories/';
    let requestData = {
        searchCriteria: {
            current_page: 1,
            sortOrders: {
                1: {
                    field: 'position',
                    direction: 'ASC'
                }
            }
        },
        session: sessionID
    };

    axios.get(url, {
        params: requestData,
        paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        },
    })
        .then(response => {
            response.data.items.map(function (item) {
                db.category.put(item);
            });
            console.log('complete sync category');
        })
        .catch(error => {
            console.log(error);
        });
}

export function loadConfiguration() {
    let sessionID = cookie.load('sessionID');
    let url = corsUrl + baseURL + '/rest/default/V1/webpos/configurations?session=' + sessionID;
    axios.get(url, {})
        .then(response => {
            response.data.items.map(function (item) {
                db.core_config_data.put(item);
            });
            console.log('complete sync config');

        })
        .catch(error => {
            console.log(error);
        });
}