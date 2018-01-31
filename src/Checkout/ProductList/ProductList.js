import React, {Component} from 'react';
import './ProductList.css';
import axios from "axios/index";
import ProductItem from "./ProductItem/ProductItem";
import Loader from "../../Loader/Loader";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: localStorage.getItem('sessionID'),
            baseURL: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl'),
            loading: true
        };
    }

    componentWillMount() {
        let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/productlist/';
        let requestData = {
            show_out_stock: 1,
            searchCriteria: {
                'current_page': 1,
                'page_size': 16,
                'sortOrders': {
                    '1': {
                        field: 'name',
                        direction: 'ASC'
                    }
                }
            },
            session: this.state.sessionID
        };
        let qs = require('qs');

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
    render() {
        if (this.state.loading) {
            return <Loader/>;
        } else {
            return (
                <div>
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
                                                        this.state.productList.map(product => <ProductItem product={product} key={product.id}/>)
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
    }
}

export default ProductList;