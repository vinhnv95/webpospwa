import React, {Component} from 'react';
import './ProductList.css';
import axios from "axios/index";
import ProductItem from "./ProductItem/ProductItem";
import CatalogHeader from "./CatalogHeader/CatalogHeader";
import CatalogFooter from "./CatalogFooter/CatalogFooter";
import db from '../../../model/db';
import cookie from 'react-cookies';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: cookie.load('sessionID'),
            baseURL: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl'),
            categoryId: null,
            searchText: '',
            currentPage: 1,
            pageSize: 16,
            loading: false
        };

        this.reloadProductList = this.reloadProductList.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
    }

    componentWillMount() {
        this.reloadProductList();
    }

    handleSearch(searchText) {
        if (this.state.searchText !== searchText) {
            this.setState({
                currentPage: 1
            });
        }
        this.refs.catalogHeader.state.showCategoryList = false;
        this.setState({
            categoryId: null,
            searchText: searchText
        }, function () {
            this.reloadProductList();
        });


    }

    handleSelectCategory(categoryId) {
        if (this.state.categoryId !== categoryId) {
            this.setState({
                currentPage: 1
            });
        }
        this.refs.catalogHeader.refs.searchHeaderProduct.value = '';
        this.setState({
            categoryId: categoryId,
            searchText: ''
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
        // let qs = require('qs');
        // let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/productlist/';
        // let requestData = {
        //     show_out_stock: 1,
        //     searchCriteria: {
        //         current_page: this.state.currentPage,
        //         page_size: 16,
        //         sortOrders: {
        //             1: {
        //                 field: 'name',
        //                 direction: 'ASC'
        //             }
        //         }
        //     },
        //     session: this.state.sessionID
        // };
        //
        // if (this.state.searchText) {
        //     requestData.searchCriteria.filter_groups = {
        //         0: {
        //             filters: {
        //                 0: {
        //                     field: 'name',
        //                     value: '%' + this.state.searchText + '%',
        //                     condition_type: 'like'
        //                 },
        //                 1: {
        //                     field: 'sku',
        //                     value: '%' + this.state.searchText + '%',
        //                     condition_type: 'like'
        //                 }
        //             }
        //         }
        //     }
        // }
        //
        // if (this.state.categoryId) {
        //     requestData.searchCriteria.filter_groups = {
        //         0: {
        //             filters: {
        //                 0: {
        //                     field: 'category_id',
        //                     value: this.state.categoryId,
        //                     condition_type: 'eq'
        //                 }
        //             }
        //         }
        //     };
        // }

        this.setState({
            loading: true
        });

        // if (!navigator.onLine) {
        //     this.setState({
        //         productList: JSON.parse(localStorage.getItem('productList'))
        //     });
        //     this.setState({
        //         loading: false
        //     });
        // }
        // axios.get(url, {
        //     params: requestData,
        //     paramsSerializer: function (params) {
        //         return qs.stringify(params, {arrayFormat: 'repeat'})
        //     },
        // })
        //     .then(response => {
        //         localStorage.setItem('productList', JSON.stringify(response.data));
        //         response.data.items.map(function (item) {
        //             if (db.table('product').get(item.id)) {
        //                 db.table('product').update(item.id, item);
        //             } else {
        //                 db.table('product').add(item);
        //             }
        //         });
        //         this.setState({
        //             productList: response.data,
        //             loading: false
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({
        //             loading: false
        //         });
        //     })
        let offset = (this.state.currentPage - 1)*this.state.pageSize;
        let searchText = this.state.searchText;
        let categoryId = this.state.categoryId;
        db.product.filter(function (item) {
            if (item.name.indexOf(searchText) > -1 || item.sku.indexOf(searchText) > -1) {
                if (categoryId) {
                    if (item.category_ids && item.category_ids.indexOf('\''+categoryId+'\'') > -1){
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            }
            return false;
        })
            .offset(offset)
            .limit(16)
            .toArray()
            .then(results => {
                this.setState({
                    productList: results,
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
            <div id="block-product-list" data-bind="scope:'product-list'">
                <div className="col-sm-8 col-left" id="product-list-wrapper">
                    <CatalogHeader onSearch={this.handleSearch}
                                   handleSelectCategory={this.handleSelectCategory}
                                   ref='catalogHeader'/>
                    {
                        this.state.loading ?
                            <div className="col-sm-8 col-left wrap-list-product" id='product-list-overlay' style={{
                                opacity: 1,
                                backgroundColor: '#fff',
                                position: 'fixed',
                                display: 'block',
                                zIndex: 99999
                            }}>
                                <span className="product-loader"></span>
                            </div>
                            :
                            <div>
                                <main className="main-content">
                                    <div id="block-product-list">
                                        <div className="grid-data">
                                            <div className="wrap-list-product scroll-grid"
                                                 style={this.refs.catalogHeader.state.showCategoryList ? {height: 'calc(100vh - 288px)'} : {}}>
                                                <div className="col-md-12">
                                                    {
                                                        this.state.productList ?
                                                            <div className="row">
                                                                {
                                                                    this.state.productList.map(product =>
                                                                        <ProductItem product={product}
                                                                                     key={product.id}/>)
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
                                               currentPage={this.state.currentPage}
                                               pageSize={this.state.pageSize}
                                               totalCount={localStorage.getItem('totalProduct')}
                                />
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default ProductList;