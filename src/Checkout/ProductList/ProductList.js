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
            searchText: '',
            currentPage: 1,
            loading: false
        };

        this.reloadProductList = this.reloadProductList.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentWillMount() {
        this.reloadProductList(1);
    }

    handleSearch(searchText) {
        if (this.state.searchText !== searchText) {
            this.setState({
                currentPage: 1
            });
        }
        this.setState({
            searchText: searchText
        }, function () {
            this.reloadProductList();
        });


    }

    handleChangePage(page) {
        this.setState({
            currentPage: page
        }, function () {
            this.reloadProductList();
        });
    }

    reloadProductList() {
        let qs = require('qs');
        let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/productlist/';
        let requestData = {
            show_out_stock: 1,
            searchCriteria: {
                current_page: this.state.currentPage,
                page_size: 16,
                sortOrders: {
                    1: {
                        field: 'name',
                        direction: 'ASC'
                    }
                }
            },
            session: this.state.sessionID
        };
        let filterGroups = {
            0: {
                filters: {
                    0: {
                        field: 'name',
                        value: '%'+this.state.searchText+'%',
                        condition_type: 'like'
                    },
                    1: {
                        field: 'sku',
                        value: '%'+this.state.searchText+'%',
                        condition_type: 'like'
                    }
                }
            }
        };

        if (this.state.searchText) {
            requestData.searchCriteria.filter_groups = filterGroups;
        }

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
                <CatalogHeader onSearch={this.handleSearch}/>
                {
                    this.state.loading ?
                        <div className="col-sm-8 col-left wrap-list-product" id='product-list-overlay' style={{opacity: 1, backgroundColor: '#fff', position: 'fixed', display: 'block', zIndex: 99999}}>
                            <span className="product-loader"></span>
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
                            <CatalogFooter onChangePage={this.handleChangePage}
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