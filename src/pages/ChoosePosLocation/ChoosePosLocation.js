import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import cookie from "react-cookies";
import axios from "axios";
import db from "../../model/db";
import {loadConfiguration} from "../../helpers/SynchronizationHelper";

class ChoosePosLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: cookie.load('sessionID'),
            baseUrl: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl'),
            staffId: '',
            locationList: [],
            posList: [],
            locationId: '',
            posId: '',
            currentPosId: null,
            loading: false
        };
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
        this.handleSelectPos = this.handleSelectPos.bind(this);
        this.handleEnterToPos = this.handleEnterToPos.bind(this);
        console.log(this.state.sessionID);
    }

    componentWillMount() {
        this.getEnableSessionConfig();
        this.getCurrentPosId();
        this.getStaffId();
        this.getLocationList();
    }

    getEnableSessionConfig() {
        db.core_config_data.get('webpos/general/enable_session').then(result => {
            this.setState({
                enableSession: result.value
            });
        });
    }

    getCurrentPosId() {
        db.core_config_data.get('posId').then(result => {
            this.setState({
                currentPosId: result.value
            });
        });
    }

    getStaffId() {
        db.core_config_data.get('staffId')
            .then(result => {
                this.setState({
                    staffId: result.value
                });
            })
    }

    getLocationList() {
        db.core_config_data.get('allLocationIds')
            .then(result => {
                this.setState({locationList: result.value});
            })
            .catch(error => {
                console.log(error);
            });
    }

    getPosList() {
        let url = this.state.corsUrl + this.state.baseUrl + '/rest/default/V1/webpos/poslist';
        let qs = require('qs');

        let requestData = {
            searchCriteria: {
                filter_groups: {
                    0: {
                        filters: {
                            0: {
                                field: 'location_id',
                                value: this.state.locationId,
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
            session: this.state.sessionID
        };
        axios.get(url, {
            params: requestData,
            paramsSerializer: function (params) {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            },
        })
            .then(response => {
                this.setState({
                    posList: response.data.items,
                    loading: false
                });
                console.log(response.data.items);
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleSelectLocation(event) {
        this.setState({
            locationId: event.target.value,
            loading: true
        }, function () {
            this.getPosList();
        });
    }

    handleSelectPos(event) {
        this.setState({
            posId: event.target.value
        });
    }

    handleEnterToPos(event) {
        event.preventDefault();
        let url = this.state.corsUrl + this.state.baseUrl + '/rest/default/V1/webpos/posassign?session=' + this.state.sessionID;
        this.setState({
            loading: true
        });
        axios.post(url, {
            location_id: this.state.locationId,
            current_session_id: this.state.sessionID,
            pos_id: this.state.posId
        })
            .then(response => {
                this.setState({
                    currentPosId: this.state.posId,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                alert('Assign POS Failed');
            })

    }

    render() {
        if (this.state.enableSession === undefined) {
            return '';
        }
        if (this.state.enableSession === '1' && !this.state.currentPosId) {
            return (
                <div className="ms-webpos">
                    <div className="login-screen">
                        {
                            this.state.loading ?
                                <div id="checkout-loader" className="loading-mask" style={{display: 'block'}}>
                                    <div className="loader">
                                    </div>
                                </div>
                                :
                                ''
                        }
                        <div className="wrap-login-form">
                            <form className="form-change_location" role="form" id="webpos-location" method="post">
                                <h1 className="title-page"><img src="" width="200px" height="200px"
                                                                alt="logo"/></h1>
                                <div className="form-group">
                                    <div className="input-box">
                                        <label htmlFor="location"></label>
                                        <select className="form-control required-entry required"
                                                id="location"
                                                name="location"
                                                onChange={this.handleSelectLocation}
                                        >
                                            <option value="">--- Choose a Location ---</option>
                                            {
                                                this.state.locationList.map((item, key) => <option key={key}
                                                                                                   value={item.value}>{item.text}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="pos"></label>
                                        <select className="form-control required-entry required"
                                                id="pos"
                                                name="pos"
                                                onChange={this.handleSelectPos}
                                        >
                                            <option value="">--- Choose a POS ---</option>
                                            {
                                                this.state.posList.map((item, key) => <option key={key}
                                                                                              value={item.pos_id}
                                                                                              disabled={item.staff_id}>{item.pos_name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-default"
                                            onClick={this.handleEnterToPos}>Enter To POS
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return <Redirect to='/checkout'/>
        }
    }
}

export default ChoosePosLocation;