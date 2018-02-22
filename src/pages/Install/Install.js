import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import './Install.css';
import '../../resources/css/style.css';
import '../../resources/css/bootstrap/bootstrap.css';
import '../../resources/css/bootstrap/bootstrap-theme.css';
import '../../resources/css/general.css';
import '../../resources/css/webpos.css';
import '../../resources/css/responsive.css';
import '../../resources/css/login.css';
import '../../resources/css/synchronization.css';
import db from "../../model/db";
import axios from "axios/index";
import cookie from 'react-cookies';

export default class Install extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: cookie.load('sessionID'),
            isInstalled: cookie.load('isInstalled'),
            baseURL: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl'),
            percent: 0,
            message: ''
        };
        this.syncData = this.syncData.bind(this);
        this.loadProductList = this.loadProductList.bind(this);
        this.loadCategory = this.loadCategory.bind(this);
    }

    componentDidMount() {
        this.syncData();
    }

    syncData() {
        this.loadProductList()
            .then(response => {
                localStorage.setItem('totalProduct', response.data.total_count);
                response.data.items.map(function (item) {
                    db.product.update(item.id, item).then(function (updated) {
                        if (!updated) {
                            db.product.add(item);
                        }
                    });
                });
                this.setState({
                    percent: 50
                });
                return this.loadCategory();
            })
            .then(response => {
                response.data.items.map(function (item) {
                    db.category.update(item.id, item).then(function (updated) {
                        if (!updated) {
                            db.category.add(item);
                        }
                    });
                });
                this.setState({
                    percent: 100
                });
            });
        cookie.save('isInstalled', '1', {path: '/'});
    }

    async loadProductList() {
        let qs = require('qs');
        let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/productlist/';
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
            session: this.state.sessionID
        };

        // if (!navigator.onLine) {
        //     this.setState({
        //         productList: JSON.parse(localStorage.getItem('productList'))
        //     });
        // }
        this.setState({
            message: 'Product'
        });
        let response = await axios.get(url, {
            params: requestData,
            paramsSerializer: function (params) {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            },
        });

        return response;
    }

    async loadCategory() {
        let qs = require('qs');
        let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/categories/';
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
            session: this.state.sessionID
        };

        this.setState({
            message: 'Category'
        });

        // if (!navigator.onLine) {
        //     this.setState({
        //         categoryList: JSON.parse(localStorage.getItem('categoryList'))
        //     });
        //     this.setState({
        //         percent: 100
        //     });
        // }
        let response = await axios.get(url, {
            params: requestData,
            paramsSerializer: function (params) {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            },
        });
        return response;
    }

    render() {
        if (this.state.sessionID) {
            if (this.state.isInstalled) {
                return <Redirect to='/checkout'/>;
            }
            return (
                <div className="ms-webpos">
                    <div className="first-screen">
                        <div className="process-box">
                            <div className="wrap-process">
                                <div className="myProgress first-rates-myProgress">
                                    <div className="label-percent first-rates-label-percent">{this.state.percent}%</div>
                                    <div className="myBar first-rates-myBar" style={{width: this.state.percent + '%'}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="process-box">
                            <div className="wrap-process-label-message">
                                <div className="myProgress">
                                    <div className="label-message">Syncing {this.state.message}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.percent === 100 ? <Redirect to='/checkout'/> : ''
                    }
                </div>
            );
        } else {
            return <Redirect to='/'/>;
        }
    }
}