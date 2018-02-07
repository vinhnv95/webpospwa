import React, {Component} from 'react';
import './MenuItem.css';
import {Link} from 'react-router-dom';

class MenuItem extends Component {
    render() {
        return (
            <li className="c-menu__item" id={'item_' + this.props.item.id}>
                <span aria-hidden="true" className={'icon-iconPOS-' + this.props.item.id.replace('_', '-')}/>
                <Link className="c-menu__link" to={'/'+this.props.item.id}>{this.props.item.title}</Link>
            </li>
        );
    }
}

export default MenuItem;