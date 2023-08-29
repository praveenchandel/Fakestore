import React from 'react';
import Typography from '../../molecules/Typography';
import './OrderHistory.css';


export const OrderedItem = (props) => {

    const price=props.product.productPrice;
    const quantity=props.product.productQuantity;
    const total=price*quantity;

  return (
    <div className='order_flex-container-cart order_round_boarder'>
        <div>
        <img className='cart_image' src={props.product.productImage}></img>
        </div>
        <div className='margin_name'>
        <Typography type="h3" classes='price_margin' text={props.product.productName}/>
        <Typography type="h5" classes='price_margin' text={`$${props.product.productPrice}`}/>
        <p>x{props.product.productQuantity}= ${total.toFixed(2)}</p>
        <Typography type="h5" classes='price_margin' text={`Time : ${props.product.productOrderDate} ${props.product.productOrderTime}`}/>
        </div>
    </div>
  )
}