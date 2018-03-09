import React, {Component} from "react";
import { Redirect, withRouter } from 'react-router-dom';
import cookie from "react-cookies";
import axios from "axios";
import db from "../../model/db";
// import {loadConfiguration} from "../../helpers/SynchronizationHelper";
import autoBind from 'react-autobind';
import * as ChoosePosLocationActions from '../../actions/ChoosePosLocation/ChoosePosLocationActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class ChoosePosLocation extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillMount() {
        this.props.actions.getEnableSessionConfig();
        this.props.actions.getCurrentPosId();
        this.props.actions.getStaffId();
        this.props.actions.getLocationList();
    }

    handleSelectLocation(event) {
        this.props.actions.selectLocation(event.target.value);
    }

    handleSelectPos(event) {
        this.props.actions.selectPos(event.target.value);
    }

    handleEnterToPos() {
        this.props.actions.enterToPos();
    }

    render() {
        if (!this.props.enableSession) {
            return '';
        }
        if (this.props.enableSession === '1' && !this.props.currentPosId) {
            return (
                <div className="ms-webpos">
                    <div className="login-screen">
                        {
                            this.props.loading ?
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
                                                this.props.locationList.map((item, key) => <option key={key}
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
                                                this.props.posList.map((item, key) => <option key={key}
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

function mapStateToProps(state) {
    return {
        enableSession: state.choosePosLocationReducer.enableSession,
        staffId: state.choosePosLocationReducer.staffId,
        locationList: state.choosePosLocationReducer.locationList,
        posList: state.choosePosLocationReducer.posList,
        locationId: state.choosePosLocationReducer.locationId,
        posId: state.choosePosLocationReducer.posId,
        currentPosId: state.choosePosLocationReducer.currentPosId,
        loading: state.choosePosLocationReducer.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ChoosePosLocationActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChoosePosLocation));