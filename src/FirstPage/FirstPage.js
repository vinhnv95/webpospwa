import React, {Component} from 'react';
import './FirstPage.css';
import { Redirect } from 'react-router-dom';

class FirstPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			baseUrl: localStorage.getItem('baseUrl')
		};

        this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('baseUrl', event.target.baseUrl.value);
        this.setState({
			baseUrl: event.target.baseUrl.value
		});
    }

	render() {
		if (this.state.baseUrl) {
            return <Redirect to='/login' />;
        }
        return (
            <section id="first-page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-wrap">
                                <h1>Welcome To Webpos</h1>
                                <h2>Please Insert Your Website's Base Url</h2>
                                <form id="first-page-form" autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="baseUrl" className="sr-only">BaseUrl</label>
                                        <input type="text"
                                               name="baseUrl"
                                               id="baseUrl"
                                               className="form-control"
                                               placeholder="http://abc.com"/>
                                    </div>
                                    <input type="submit" id="btn-save-base-url" className="btn btn-custom btn-lg btn-block" value="Submit" />
                                </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
	}
}

export default FirstPage;