import React, {Component} from 'react';
import "./Login.css";
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import LoginForm from './Component/LoginForm';
import Loader from "../Loader/Loader";
import cookie from 'react-cookies';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: {
                username: '',
                password: ''
            },
            sessionID: cookie.load('sessionID'),
            baseUrl: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl'),
            loading: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const staff = this.state.staff;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        staff[name] = value;

        this.setState({
            staff: staff
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let url = this.state.corsUrl + this.state.baseUrl + '/rest/default/V1/webpos/staff/login';
        this.setState({
            loading: true
        });
        axios.post(url, {
            staff: this.state.staff
        })
            .then(response => {
                let expires = new Date();
                expires.setDate(expires.getDate() + 1);
                console.log(response.data);
                cookie.save('sessionID', response.data, {path: '/', expires});
                this.setState({
                    sessionID: response.data,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                alert('Your login information is wrong!');
            })

    }

    render() {
        // if (!this.state.corsUrl) {
        //     return <Redirect to='/' />;
        // }
        if (this.state.sessionID) {
            return <Redirect to='/install'/>;
        }
        return (
            <div>
                {
                    this.state.loading ? <Loader/> : ''
                }
                <LoginForm
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default Login;