// let db = require('../model/db');
import db from '../model/db';

let cookie = require('react-cookies');
let qs = require('qs');

let axios = require('axios');
let corsUrl = localStorage.getItem('corsUrl');
let baseURL = localStorage.getItem('baseUrl');
let sessionID = cookie.load('sessionID');

export function syncData() {
    console.log('sync data');
    console.log(sessionID);
    loadProductList();
    loadCategory();
    loadConfiguration();
}

export function loadProductList() {
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
                db.product.update(item.id, item).then(function (updated) {
                    if (!updated) {
                        db.product.add(item);
                    }
                });
            });
            console.log('complete sync product');
        })
        .catch(error => {
            console.log(error);
        });

}

export function loadCategory() {
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
                db.category.update(item.id, item).then(function (updated) {
                    if (!updated) {
                        // console.log('add category' + item.id);
                        db.category.add(item);
                    }
                });
            });
            console.log('complete sync category');
        })
        .catch(error => {
            console.log(error);
        });
}

export function loadConfiguration() {
    let url = corsUrl + baseURL + '/rest/default/V1/webpos/configurations?session=' + sessionID;
    axios.get(url, {})
        .then(response => {
            db.core_config_data.clear();
            response.data.items.map(function (item) {
                // db.core_config_data.update(item.path, item).then(function (updated) {
                //     if (!updated) {
                // //         db.core_config_data.add(item);
                // //         console.log(updated);
                //     }
                // });
                db.core_config_data.add(item);
            });
            console.log('complete sync config');

        })
        .catch(error => {
            console.log(error);
        });
}