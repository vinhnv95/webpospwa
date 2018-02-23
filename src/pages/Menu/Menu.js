import React, {Component} from 'react';
import './Menu.css';
import axios from "axios/index";
import {Redirect} from 'react-router-dom';
import Loader from "../Loader/Loader";
import Group from "./Group/Group";
import cookie from 'react-cookies';
import db from "../../model/db";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: cookie.load('sessionID'),
            baseURL: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl'),
            loading: false,
            staffName: '',
            locationName: '',
            menuList: [
                {
                    id: 'order',
                    title: 'Orders',
                    elems: [
                        {
                            id: 'checkout',
                            title: 'Checkout'
                        },

                    ]
                }
            ],
        };
        db.core_config_data.get('staffName').then(res => {
            this.state.staffName = res.value;
        });
        db.core_config_data.get('location_name').then(res => {
            this.state.locationName = res.value;
        });
        this.logout = this.logout.bind(this);
    }

    logout() {
        let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/staff/logout?session=' + this.state.sessionID;
        if (window.confirm('Are you sure you want to logout?')) {
            this.setState({
                loading: true
            });
            axios.post(url, {})
                .then(response => {
                    cookie.remove('sessionID', {path: '/'});
                    cookie.remove('isInstalled', {path: '/'});
                    this.setState({
                        sessionID: cookie.load('sessionID'),
                        loading: false
                    });
                })
                .catch(error => {
                    this.setState({
                        loading: false
                    });
                    alert('Logout Failed');
                })
        }
    }

    render() {
        if (this.state.sessionID) {
            return (
                <div>
                    {
                        this.state.loading ? <Loader/> : ''
                    }
                    <nav id="c-menu--push-left"
                         className={"c-menu c-menu--push-left" + (this.props.isActive ? " is-active" : '')}>
                        <button className="c-menu__close">&larr;Close Menu</button>
                        <div className="admin-account">
                            <h2 className="admin-name">{this.state.staffName}</h2>
                            <h3 className="admin-add">{this.state.locationName}</h3>
                            <div className="logout-box">
                                <a className="logout-link" onClick={this.logout}>
                                    <span className="icon-iconPOS-logout"/>Logout
                                </a>
                            </div>
                        </div>
                        {
                            this.state.menuList.map(group => <Group group={group} key={group.id}/>)
                        }
                    </nav>
                    <div id="c-mask"
                         className={"c-mask" + (this.props.isActive ? " is-active" : '')}
                         onClick={this.props.closeMenu}
                    />
                </div>

            );
        }
        return <Redirect to='/'/>
    }
}

export default Menu;