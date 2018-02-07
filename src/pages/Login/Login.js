import React, {Component} from 'react';
import "./Login.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import LoginForm from './Component/LoginForm';
import Loader from "../Loader/Loader";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			staff: {
				username: '',
				password: ''
			},
			sessionID: localStorage.getItem('sessionID'),
			baseUrl: localStorage.getItem('baseUrl'),
			corsUrl: localStorage.getItem('corsUrl'),
			loading: false

		}

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
				console.log(response.data);
				localStorage.setItem('sessionID', response.data);
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
			return <Redirect to='/checkout' />;
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