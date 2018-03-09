import React, {Component} from 'react';
import './Menu.css';
import axios from "axios/index";
import { Redirect } from 'react-router-dom';
import Loader from "../Loader/Loader";
import Group from "./Group/Group";
import cookie from 'react-cookies';
import db from "../../model/db";
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as MenuActions from '../../actions/Menu/MenuActions';

class Menu extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillMount() {
        this.props.actions.getStaffName();
        this.props.actions.getLocationName();
    }

    logout() {
        if (window.confirm('Are you sure you want to logout?')) {
            this.props.actions.logout();
        }
    }

    render() {
        if (this.props.redirectToLoginPage) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                {
                    this.props.loading ? <Loader/> : ''
                }
                <nav id="c-menu--push-left"
                        className={"c-menu c-menu--push-left" + (this.props.isActive ? " is-active" : '')}>
                    <button className="c-menu__close">&larr;Close Menu</button>
                    <div className="admin-account">
                        <h2 className="admin-name">{this.props.staffName}</h2>
                        <h3 className="admin-add">{this.props.locationName}</h3>
                        <div className="logout-box">
                            <a className="logout-link" onClick={this.logout}>
                                <span className="icon-iconPOS-logout"/>Logout
                            </a>
                        </div>
                    </div>
                    {
                        this.props.menuList.map(group => <Group group={group} key={group.id}/>)
                    }
                </nav>
                <div id="c-mask"
                        className={"c-mask" + (this.props.isActive ? " is-active" : '')}
                        onClick={this.props.closeMenu}
                />
            </div>

        );
        
    }
}

function mapStateToProps(state) {
    return {
        redirectToLoginPage: state.MenuReducer.redirectToLoginPage, 
        loading: state.MenuReducer.loading,
        staffName: state.MenuReducer.staffName,
        locationName: state.MenuReducer.locationName,
        menuList: state.MenuReducer.menuList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(MenuActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);