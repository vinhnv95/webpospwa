import React, {Component} from 'react';
import OwlCarousel from 'react-owl-carousel';
import './Category.css';
import '../../../../../resources/css/owl.carousel.css';
import '../../../../../resources/css/owl.transitions.css';
import axios from "axios/index";
import CategoryItem from "./CategoriItem/CategoryItem";
import cookie from 'react-cookies';
import db from '../../../../../model/db';


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: cookie.load('sessionID'),
            baseURL: localStorage.getItem('baseUrl'),
            corsUrl: localStorage.getItem('corsUrl'),
            // categoryList: localStorage.getItem('categoryList'),
            loading: false
        };
        this.getCategoryList = this.getCategoryList.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
    }

    componentWillMount() {
        this.getCategoryList();
    }

    getCategoryList(parentId = null) {
        // let qs = require('qs');
        // let url = this.state.corsUrl + this.state.baseURL + '/rest/default/V1/webpos/categories/';
        // let requestData = {
        //     searchCriteria: {
        //         current_page: 1,
        //         page_size: 300,
        //         sortOrders: {
        //             1: {
        //                 field: 'position',
        //                 direction: 'ASC'
        //             }
        //         }
        //     },
        //     session: this.state.sessionID
        // };
        //
        // if (parentId) {
        //     requestData.searchCriteria.filter_groups = {
        //         0: {
        //             filters: {
        //                 0: {
        //                     field: 'parent_id',
        //                     value: parentId,
        //                     condition_type: 'eq'
        //                 }
        //             }
        //         }
        //     }
        // } else {
        //     requestData.searchCriteria.filter_groups = {
        //         0: {
        //             filters: {
        //                 0: {
        //                     field: 'first_category',
        //                     value: 1,
        //                     condition_type: 'eq'
        //                 }
        //             }
        //         }
        //     }
        // }

        this.setState({
            loading: true
        });

        // if (!navigator.onLine) {
        //     this.setState({
        //         categoryList: JSON.parse(localStorage.getItem('categoryList'))
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
        //         localStorage.setItem('categoryList', JSON.stringify(response.data.items));
        //         console.log(response.data.items);
        //         this.setState({
        //             categoryList: response.data.items,
        //             loading: false
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({
        //             loading: false
        //         });
        //     });
        db.category.filter(function (item) {
            if (parentId) {
                return item.parent_id === parentId;
            } else {
                return item.first_category === 1;
            }
        })
            .sortBy('position')
            .then(results => {
                this.setState({
                    categoryList: results,
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

    handleSelectCategory(categoryId) {
        this.props.handleSelectCategory(categoryId);
    }

    render() {
        return (
            <div id="all-categories" className="collapse in" aria-expanded="true">
                {
                    this.state.loading ?
                        <div className="wrap-item-category">
                            <div className="indicator-category">
                                <div className="spinner"/>
                            </div>
                        </div>
                        :
                        <div id="list-cat-header"
                             style={{opacity: 1, display: 'block'}}>
                            {
                                this.state.categoryList ?
                                    <OwlCarousel nav
                                                 navText={['', '']}
                                                 responsive={{
                                                     0: {
                                                         items: 1
                                                     },
                                                     600: {
                                                         items: 4,
                                                         margin: 10
                                                     },
                                                     700: {
                                                         items: 5,
                                                         margin: 10
                                                     },
                                                     800: {
                                                         items: 6,
                                                         margin: 20
                                                     },
                                                     1000: {
                                                         items: 8,
                                                         margin: 40
                                                     }
                                                 }}>
                                        {
                                            this.state.categoryList.map(category =>
                                                <CategoryItem category={category}
                                                              key={category.id}
                                                              reloadCategoryList={this.getCategoryList}
                                                              handleSelectCategory={this.handleSelectCategory}/>)
                                        }
                                    </OwlCarousel>
                                    :
                                    ''
                            }
                        </div>
                }
            </div>
        );
    }
}

export default Category;