import React, {Component} from "react";
import Menu from "../Menu/Menu";
import {Redirect} from 'react-router-dom';
import './Layout.css';
import '../../resources/css/style.css';
import '../../resources/css/bootstrap/bootstrap.css';
import '../../resources/css/bootstrap/bootstrap-theme.css';
import '../../resources/css/general.css';
import '../../resources/css/webpos.css';
import '../../resources/css/responsive.css';
import cookie from 'react-cookies';
import {syncData} from '../../helpers/SynchronizationHelper';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: cookie.load('sessionID'),
            menuIsActive: false
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentDidMount() {
        setInterval(syncData, 8 * 60 * 1000);
    }

    openMenu() {
        this.setState({
            menuIsActive: true
        });
    }

    closeMenu() {
        this.setState({
            menuIsActive: false
        });
    }

    render() {
        if (this.state.sessionID) {
            return (
                <div className="ms-webpos">
                    <div id="o-wrapper"
                         className={"o-wrapper wrap-checkout-page" + (this.state.menuIsActive ? ' has-push-left' : '')}>
                        <button id="c-button--push-left" className="c-button ui-btn ui-shadow ui-corner-all"
                                style={{display: 'inline-block'}}
                                onClick={this.openMenu}>
                            <span className="icon-iconPOS-menu"></span>
                        </button>
                        <div className="container-fluid">
                            <div className="row" id="containers_wrapper">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                    <Menu isActive={this.state.menuIsActive} closeMenu={this.closeMenu}/>
                </div>
            );
        } else {
            return <Redirect to='/'/>;
        }
    }
}