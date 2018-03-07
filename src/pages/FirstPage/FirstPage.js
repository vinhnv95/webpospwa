import React, {Component} from 'react';
import './FirstPage.css';
import { Redirect, withRouter } from 'react-router-dom';
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';
import * as FirstPageActions from '../../actions/FirstPage/FirstPageActions';
import {connect} from 'react-redux';

class FirstPage extends Component {
	constructor(props) {
		super(props);

        autoBind(this);
	}

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.addBaseUrl(event.target.baseUrl.value);
    }

	render() {
		if (this.props.baseUrl) {
            return <Redirect to='/login' />;
        }
        return (
            <section id="first-page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-wrap">
                                <h1>Welcome To Webpos</h1>
                                <p>Please Insert Your Website's Base Url</p>
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

function mapStateToProps(state) {
    return {
        baseUrl: state.firstPageReducer.baseUrl
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(FirstPageActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FirstPage));