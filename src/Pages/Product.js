import React from 'react'
import {Link } from "react-router-dom";
import Typography from '../molecules/Typography';
import '../organisms/Product/Product.css';
import { useDispatch } from 'react-redux';
import {actionCreators} from '../organisms/state/index'

export const Product = (props) => {

  const dispatch=useDispatch();

  const addToCart=()=>{

    const user=JSON.parse(localStorage.getItem('user'));

    let userCart=[];
    userCart=JSON.parse(localStorage.getItem(user.userId));

    const newItem={
      productID:props.productDetails.id,
      quantity:1
    }

    const newArray=[];

    let isHasToAdd=true;

    if(userCart){
      // checking where the item is already in the cart
      for(let i=0;i<userCart.length && isHasToAdd;i++){
        if(userCart[i].productID===newItem.productID){
          isHasToAdd=false;
        }
      }

      if(isHasToAdd){
      userCart.push(newItem);
      localStorage.setItem(user.userId,JSON.stringify(userCart));

      dispatch(actionCreators.addItemToCart());

      }
    }else{
      newArray.push(newItem);
      localStorage.setItem(user.userId,JSON.stringify(newArray));

      dispatch(actionCreators.addItemToCart());
    }

    if(isHasToAdd){
      alert("Item Successfully added to your cart...");
    }else{
      alert("This item is already present in your cart...");
    }
    
  }


  return ( 
    <div style={{width: '33.33%'}}>
    <div className='round_boarder center'>
      <div>
        <img alt='product_image' className='cart_image' src={props.productDetails.image}></img>
        <Typography type="h5" classes="price_margin" text={props.productDetails.title}/>
        <Typography type="h6" classes="price_margin" text={`$${props.productDetails.price}`}/>
        <Link to={`/products/${props.productDetails.id}`} className="btn details px-auto" > view details</Link>
        <button className="btn details px-auto" onClick={addToCart}>Add To Cart</button>
      </div>
    </div> 
    </div>
  )
}