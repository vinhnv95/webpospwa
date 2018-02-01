import React, {Component} from 'react';
import './CatalogHeader.css';

class CatalogHeader extends Component {
    constructor(props) {
        super(props);
        this.state
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    handleChangeSearch(event) {
        this.props.onSearch(event.target.value);
    }

    render() {
        return (
            <header className="o-header">
                <nav className="o-header-nav">
                    <div className="form-inline" role="form">
                        <div className="form-group">
                            <span className="icon-iconPOS-search"></span>
                            <input type="search"
                                   placeholder="Enter terms to search"
                                   className="form-control search-header"
                                   id="search-header-product"
                                   onKeyPress={event => {
                                       if (event.key === 'Enter') {
                                           this.handleChangeSearch(event)
                                       }
                                   }}/>
                            <a className="remove-text" id="remove-text-search-product">
                                <span className="icon-iconPOS-delete"></span>
                            </a>
                        </div>
                        <button type="submit" className="btn btn-default">Search</button>
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