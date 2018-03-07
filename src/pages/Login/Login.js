import React, {Component} from 'react';
import "./Login.css";
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom';
import LoginForm from './Component/LoginForm';
import Loader from "../Loader/Loader";
import cookie from 'react-cookies';
import * as LoginPageActions from '../../actions/Login/LoginPageActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        autoBind(this);

    }

    // handleInputChange(event) {
    //     const staff = this.state.staff;
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     staff[name] = value;

    //     this.setState({
    //         staff: staff
    //     });
    // }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(event.target.username.value);
        // console.log(event.target.password.value);        
        // let url = this.state.corsUrl + this.state.baseUrl + '/rest/default/V1/webpos/staff/login';
        // this.setState({
        //     loading: true
        // });
        // axios.post(url, {
        //     staff: this.state.staff
        // })
        //     .then(response => {
        //         let expires = new Date();
        //         expires.setDate(expires.getDate() + 1);
        //         cookie.remove('isInstalled');
        //         cookie.save('sessionID', response.data, {path: '/'});
        //         this.setState({
        //             sessionID: response.data,
        //             loading: false
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false
        //         });
        //         alert('Your login information is wrong!');
        //     })
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
        // if (this.state.sessionID) {
        //     return <Redirect to='/install'/>;
        // }
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
    console.log(state);
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