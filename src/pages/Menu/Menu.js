import React, {Component} from 'react';
import './Menu.css';
import axios from "axios/index";
import {Redirect} from 'react-router-dom';
import Loader from "../Loader/Loader";
import Group from "./Group/Group";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: sessionStorage.getItem('sessionID'),
            baseURL: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl'),
            loading: false,
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
        this.logout = this.logout.bind(this);
    }

    logout() {
        let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/staff/logout?session=' + this.state.sessionID;
        if (window.confirm('Are you sure you want to logout?')){
            this.setState({
                loading: true
            });
            axios.post(url, {})
                .then(response => {
                    sessionStorage.removeItem('sessionID');
                    sessionStorage.removeItem('isInstalled');
                    this.setState({
                        sessionID: sessionStorage.getItem('sessionID'),
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
                        this.state.loading? <Loader/> : ''
                    }
                    <nav id="c-menu--push-left"
                         className={"c-menu c-menu--push-left" + (this.props.isActive ? " is-active" : '')}>
                        <button className="c-menu__close">&larr;Close Menu</button>
                        <div className="admin-account">
                            <h2 className="admin-name">Admin Admin</h2>
                            <h3 className="admin-add">Store Address</h3>
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