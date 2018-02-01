import React from 'react';
import './ProductItem.css';
 
const ProductItem = (props) => {
	let product = props.product;
	return (
		<div className="col-sm-3">
            <div className="item product-item">
                <div className="product-img">
                    {
                        product.is_in_stock === 0 ?<a className="warning"><span className="icon-iconPOS-out-of-stock"></span></a> : ''
                    }
                    <img width="119" height="auto" src={product.image}/>
                </div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div>
                        <span className="final-price price">${product.final_price.toFixed(2)}</span>
                        {
                            product.price && product.price !== product.final_price && product.price !== 0 ? <span className="regular-price price">${product.price.toFixed(2)}</span> : ''
                        }
                    </div>
                    <span>Availability: </span><label className="available_qty">{product.qty} item(s)</label>
                    <label className="available_qty">&nbsp;</label>
                </div>
                <a className="info" href="#">
                    <span className="icon-iconPOS-detail"><span className="path1"></span><span className="path2"></span></span>
                </a>
                    {/*<a href="#" className="number bg-cl-active"></a>*/}
            </div>

    </div>
	);
}
 
export default ProductItem;