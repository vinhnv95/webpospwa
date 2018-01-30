import React, {Component} from 'react';
import './Checkout.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ProductItem from './ProductList/ProductItem/ProductItem';

class Checkout extends Component {
	constructor(props) {
		super(props);
        this.state = {
            sessionID: localStorage.getItem('sessionID'),
            loading: true,
            baseURL: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl')
        };
		this.logout = this.logout.bind(this);
	}

	componentWillMount() {
        let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/productlist/';
        let requestData = {
        	show_out_stock: 1,
	    	searchCriteria: {
	    		'current_page': 1,
	    		'page_size': 32,
	    		'sortOrders': {
	    			'1': {
	    				field: 'name',
	    				direction: 'ASC'
	    			}
	    		}
	    	},
	    	session: this.state.sessionID
        }
        var qs = require('qs');

        if (!navigator.onLine) {
            this.setState({
    			productList: JSON.parse(localStorage.getItem('productList'))
    		});
    		this.setState({
    			loading: false
    		});
        }
		axios.get(url, {
		    params: requestData,
		    paramsSerializer: function(params) {
		       return qs.stringify(params, {arrayFormat: 'repeat'})
		    },
		})
        	.then(response => {
        		console.log(response.data);
        		localStorage.setItem('productList', JSON.stringify(response.data.items) );
        		this.setState({
        			productList: response.data.items
        		});
        		this.setState({
        			loading: false
        		});
        	})
        	.catch(error => {
        		console.log(error);
        	})

    }

	logout() {
		let url= this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/staff/logout?session=' + localStorage.getItem('sessionID');
		axios.post(url, {})
			.then(response => {
				localStorage.removeItem('sessionID');
				this.setState({
					sessionID: localStorage.getItem('sessionID')
				});
			})
			.catch(error => {
				console.log(error.response);
			})
	}

	render() {
		if (this.state.sessionID) {
			if (this.state.loading) {
				return <div className="loader"></div>;
			} else {
				return (
					<div>
						<button className="btn btn-lg btn-block" id="btn-logout" onClick={this.logout}>Logout</button> 
						<h1>Checkout Page</h1>
						<main className="main-content">
					        <div id="block-product-list">
					            <div className="grid-data">
					                <div className="wrap-list-product scroll-grid">
					                    <div className="col-md-12">
					                            {
					                            	this.state.productList ? 
				                            		<div className="row">
				                           				{
															this.state.productList.map(product => <ProductItem product={product} />)
														}
				                            		</div>
					                            	:
						                            <div>
						                                <span>We couldn't find any records.</span>
						                            </div>
					                            }
					                    </div>
					                </div>
					            </div>
					        </div>
					    </main>
					</div>
				);
			}
		} else {
			return <Redirect to='/' />;
		}
	}
}

export default Checkout;