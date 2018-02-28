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
            count: 0,
            total: 3,
            message: ''
        };
        this.syncData = this.syncData.bind(this);
        this.loadProductList = this.loadProductList.bind(this);
        this.loadCategory = this.loadCategory.bind(this);
        this.loadConfiguration = this.loadConfiguration.bind(this);
    }

    componentDidMount() {
        this.syncData();
    }

    syncData() {
        if (!navigator.onLine) {
            console.log('offline');
            return;
        }
        if (this.state.isInstalled) {
            return;
        }
        this.loadProductList();
        this.loadCategory();
        this.loadConfiguration();
        // let expires = new Date();
        // expires.setDate(expires.getDate() + 1);
        // cookie.save('isInstalled', '1', {path: '/', expires});
        cookie.save('isInstalled', '1', {path: '/'});
    }

    loadProductList() {
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
                this.setState({
                    count: this.state.count+1,
                    message: 'Complete Sync Product'
                });
            });
    }

    loadCategory() {
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
                this.setState({
                    count: this.state.count+1,
                    message: 'Complete Sync Category'
                });
            });
    }

    loadConfiguration() {
        let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/configurations?session=' + this.state.sessionID;
        axios.get(url, {})
            .then(response => {
                response.data.items.map(function (item) {
                    db.core_config_data.put(item);
                });
                this.setState({
                    count: this.state.count+1,
                    message: 'Complete Sync Configuration'
                });
            });
    }

    render() {
        if (this.state.sessionID) {
            if (this.state.isInstalled) {
                return <Redirect to='/choosePos'/>;
            }
            let percent = (this.state.count/this.state.total)*100;
            percent = Math.round(percent);
            return (
                <div className="ms-webpos">
                    <div className="first-screen">
                        <div className="process-box">
                            <div className="wrap-process">
                                <div className="myProgress first-rates-myProgress">
                                    <div className="label-percent first-rates-label-percent">{percent}%</div>
                                    <div className="myBar first-rates-myBar" style={{width: percent + '%'}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="process-box">
                            <div className="wrap-process-label-message">
                                <div className="myProgress">
                                    <div className="label-message">{this.state.message}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.count === this.state.total ? <Redirect to='/choosePos'/> : ''
                    }
                </div>
            );
        } else {
            return <Redirect to='/'/>;
        }
    }
}