import React, {Component} from 'react';
import './CatalogFooter.css';

class CatalogFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.currentPage,
            pageSize: props.pageSize,
            totalCount: props.totalCount
        }
        this.nextPage = this.nextPage.bind(this);
        this.previosPage = this.previosPage.bind(this);
    }

    nextPage() {
        this.props.onChangePage(this.state.currentPage + 1);
    }

    previosPage() {
        this.props.onChangePage(this.state.currentPage - 1);
    }

    render() {
        return (
            <footer className="list-product-footer">
                <div className="wrap-footer">
                    <div className="product-total-loading">
                        <label className="number-product">{this.state.totalCount} product(s)</label>
                    </div>
                    <div id="productPager">

                        <ul className="pagination-pos" style={{marginTop: '0px'}}>
                            {
                                this.state.currentPage > 1 ?
                                    <li style={{float: 'left'}} onClick={this.previosPage}>
                                        <span className="icon-iconPOS-previous" aria-hidden="true"></span>
                                    </li>
                                :
                                    ''
                            }
                            <li className="pager-list"><span className="pager" >Page: {this.state.currentPage}</span></li>
                            {
                                this.state.totalCount > (this.state.currentPage * this.state.pageSize) ?
                                    <li style={{float: 'left'}} onClick={this.nextPage}>
                                        <span className="icon-iconPOS-next" aria-hidden="true"></span>
                                    </li>
                                :
                                    ''
                            }
                        </ul>
                    </div>
                    <label className="custom-sale pos_modal_link">
                        <span className="icon-iconPOS-customer-sale "/>
                        <span className="pos_modal_link">Custom sale</span>
                    </label>
                </div>
            </footer>
        );
    }
}

export default CatalogFooter;