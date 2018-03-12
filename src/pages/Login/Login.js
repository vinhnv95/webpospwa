import React, {Component} from 'react';
import "./Login.css";
// import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom';
import LoginForm from './Component/LoginForm';
import Loader from "../Loader/Loader";
// import cookie from 'react-cookies';
import * as LoginPageActions from '../../actions/Login/LoginPageActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import * as cookieHelper from '../../helpers/cookieHelper';

class Login extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        cookieHelper.removeIsInstalled();
    }

    componentDidMount() {
        this.props.actions.getSessionId();
    }

    handleSubmit(event) {
        event.preventDefault();
        let staff = {
            username: event.target.username.value,
            password: event.target.password.value
        };
        this.props.actions.submitLogin(staff);

    }

    render() {
        // if (!this.state.corsUrl) {
        //     return <Redirect to='/' />;
        // }
        if (this.props.sessionID) {
            return <Redirect to='/install'/>;
        }
        return (
            <div>
                {
                    this.props.loading ? <Loader/> : ''
                }
                <LoginForm
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sessionID: state.loginReducer.sessionID,
        loading: state.loginReducer.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(LoginPageActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));