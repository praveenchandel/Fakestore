import React from 'react'
import {CartItem} from './CartItem'
import './Cart.css';
import Typography from '../../molecules/Typography';


export const CartItems = (props) => {

  return (
    <div >
    {props.products.length==0 ? <div className="nothingHas">
    <Typography type="h4" text="Nothing found in your cart"/>
         </div> :
          props.products.map((product)=>{
        return <CartItem productDetails={product} decrease={props.decrease} increase={props.increase} deleteButton={props.deleteButton} key={product.product.id}/>
      })
    }
    </div>
  )
}