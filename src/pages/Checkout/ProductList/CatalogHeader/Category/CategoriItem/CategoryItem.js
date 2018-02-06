import React,{Component} from 'react';
import './CategoriItem.css';

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        let category = props.category;
        let baseUrl = localStorage.getItem('baseUrl');
        let image = category.image.replace(category.image.split('://')[0], baseUrl.split('://')[0]);
        this.state = {
            category: category,
            image: image
        };
        this.handleClickDropdown = this.handleClickDropdown.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
    }

    handleClickDropdown() {
        this.props.reloadCategoryList(this.state.category.id);
    }

    handleSelectCategory() {
        this.props.handleSelectCategory(this.state.category.id);
    }

    render() {
        return (
            <div className="owl-item" style={{width: '120px'}}>
                <div className="item" style={{width: '60%'}}>
                    <div className="category-item-view-product img-cat"
                         onClick={this.handleSelectCategory}>
                        <img src={this.state.image} alt={this.state.category.name} />
                    </div>
                    {
                        this.state.category.children.length == 0 ?
                            <h4 className="cat-name none-child">{this.state.category.name}</h4>
                            :
                            <div className="category-item-view-children collapsed"
                                 onClick={this.handleClickDropdown}>
                                <h4 className="cat-name">{this.state.category.name}</h4>
                                <span className="icon-iconPOS-dropdown"></span>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default CategoryItem;