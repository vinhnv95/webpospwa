import React, {Component} from 'react';
import './ProductList.css';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            baseURL: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl')
        };
    }
    render() {
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
    }
}

export default ProductList;