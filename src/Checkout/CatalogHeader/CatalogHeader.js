import React, {Component} from 'react';
import './CatalogHeader.css';

class CatalogHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="o-header">
                <nav className="o-header-nav">
                    <div className="form-inline" role="form">
                        <div className="form-group">
                            <span className="icon-iconPOS-search"></span>
                            <input type="search"
                                   placeholder="Enter terms or scan barcodes to search"
                                   className="form-control search-header" id="search-header-product"/>
                            <a className="remove-text" id="remove-text-search-product">
                                <span className="icon-iconPOS-delete"></span>
                            </a>
                        </div>
                        <button type="submit" className="btn btn-default" >Search</button>
                    </div>
                    <div className="catalog-header">
                        <span className="icon-iconPOS-categories"></span>
                        <span className="title title-header-page">All Categories</span>
                        <span className="icon-iconPOS-dropdown"></span>
                    </div>

                </nav>
            </header>
        );
    }
}

export default CatalogHeader;