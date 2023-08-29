import React from 'react'
import './Cart.css'
import Typography from '../../molecules/Typography';
 
export const CartItem = (props) => {

    const price=props.productDetails.product.price;
    const quantity=props.productDetails.quantity;
    const total=price*quantity;

  return (
    <div className='flex_container_cart_item round_boarder'>
        <div>
        <img className='cart_image' src={props.productDetails.product.image}></img>
        </div>
        <div className='margin_name'>
        <Typography type="h3" classes="price_margin" text={props.productDetails.product.title}/>
        <Typography type="h5" classes="price_margin" text={`$${props.productDetails.product.price}`}/>
        <p>x{props.productDetails.quantity}= ${total.toFixed(2)}</p>
        </div>
        <div className='button_container'>
        <div className='flex_container_cart_item'>
        <button className="btn btn-outline-success price_margin" onClick={()=>{props.decrease(props.productDetails.product.id)}}>-</button>
        <p className='quantityName'>{props.productDetails.quantity}</p>
        <button className="btn btn-outline-success price_margin" onClick={()=>{props.increase(props.productDetails.product.id)}}>+</button>
        </div>
        <button className="btn btn-outline-success price_margin" onClick={()=>props.deleteButton(props.productDetails.product.id)}>Delete</button>
        </div>
    </div>
  )
}