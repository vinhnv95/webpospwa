import React, {Component} from 'react';
import './CatalogHeader.css';
import Category from "./Category/Category";

class CatalogHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCategoryList: false
        };
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.showCategories = this.showCategories.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
    }

    handleChangeSearch(event) {
        this.props.onSearch(event.target.value);
    }

    handleSelectCategory(categoryId) {
        this.props.handleSelectCategory(categoryId);
    }

    showCategories() {
        this.setState({
            showCategoryList: !this.state.showCategoryList
        });
        this.props.handleSelectCategory(null);
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
                    <div className={ "catalog-header" + (this.state.showCategoryList ? "":" collapsed") }
                         data-toggle="collapse"
                         data-target="#all-categories"
                         aria-expanded={this.state.showCategoryList ? "true":"false"}
                         onClick={this.showCategories}>
                        <span className="icon-iconPOS-categories"></span>
                        <span className="title title-header-page">All Categories</span>
                        <span className="icon-iconPOS-dropdown"></span>
                    </div>
                </nav>
                {
                    this.state.showCategoryList ? <Category handleSelectCategory={this.handleSelectCategory}/> : ''
                }
            </header>
        );
    }
}

export default CatalogHeader;