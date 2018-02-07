import React, {Component} from 'react';
import './Group.css';
import MenuItem from "./MenuItem/MenuItem";

class Group extends Component {
    render() {
        return (
            <ul className="c-menu__items">
                <li className="title" id={'group_' + this.props.group.id}>{this.props.group.title}</li>
                {
                    this.props.group.elems.map(item => <MenuItem item={item}/>)
                }
            </ul>
        );
    }
}

export default Group;