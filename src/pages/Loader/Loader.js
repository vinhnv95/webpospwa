import React, {Component} from 'react';
import './Loader.css';

export default class Loader extends Component
{
    render() {
        return (
            <div id="checkout-loader" className="loading-mask">
                <div className="loader"></div>
            </div>
        );
    }
}