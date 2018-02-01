import React, {Component} from 'react';
import './ProductList.css';
import axios from "axios/index";
import ProductItem from "./ProductItem/ProductItem";
import Loader from "../../Loader/Loader";
import CatalogHeader from "../CatalogHeader/CatalogHeader";
import CatalogFooter from "../CatalogFooter/CatalogFooter";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: localStorage.getItem('sessionID'),
            baseURL: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl'),
            loading: false
        };

        this.reloadProductList = this.reloadProductList.bind(this);
    }

    componentWillMount() {
        this.reloadProductList(1);
    }

    reloadProductList(currentPage) {
        let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/productlist/';
        let requestData = {
            show_out_stock: 1,
            searchCriteria: {
                'current_page': currentPage,
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

        this.setState({
            loading: true
        });

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
                localStorage.setItem('productList', JSON.stringify(response.data) );
                this.setState({
                    productList: response.data,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                });
            })

    }

    render() {
        return (
            <div>
                <CatalogHeader/>
                {
                    this.state.loading ?
                        <div class="col-sm-8 col-left wrap-list-product" id='product-list-overlay' style={{opacity: 1, backgroundColor: '#fff', position: 'fixed', display: 'block', zIndex: 99999}}>
                            <span class="product-loader"></span>
                        </div>
                    :
                        <div>
                            <main className="main-content">
                                <div id="block-product-list">
                                    <div className="grid-data">
                                        <div className="wrap-list-product scroll-grid">
                                            <div className="col-md-12">
                                                {
                                                    this.state.productList ?
                                                        <div className="row">
                                                            {
                                                                this.state.productList.items.map(product => <ProductItem product={product} key={product.id}/>)
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
                            <CatalogFooter onChangePage={this.reloadProductList}
                                           currentPage={this.state.productList.search_criteria.current_page}
                                           pageSize={this.state.productList.search_criteria.page_size}
                                           totalCount={this.state.productList.total_count}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default ProductList;