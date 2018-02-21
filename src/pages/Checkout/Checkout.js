import React, {Component} from 'react';
import './Checkout.css';
import { Redirect } from 'react-router-dom';
import Layout from "../Layout/Layout";
import ProductList from "./ProductList/ProductList";

class Checkout extends Component {
	constructor(props) {
		super(props);
        this.state = {
            sessionID: sessionStorage.getItem('sessionID'),
        };
	}

	render() {
		if (this.state.sessionID) {
			return (
				<Layout>
                    <div id='checkout_container' className="showMenu">
						<ProductList/>
                    </div>
				</Layout>
			);
		} else {
			return <Redirect to='/' />;
		}
	}
}

export default Checkout;