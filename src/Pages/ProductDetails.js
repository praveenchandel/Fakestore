import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import '../organisms/ProductDetails.css'
import Typography from '../molecules/Typography';

export const ProductDetails = () => {
  
  const {id}=useParams();


  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    const { data } = await Axios.get(
      `https://fakestoreapi.com/products/${id}`
    );
    const products = data;
    setProduct(products);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const imageStyle={

  }


  return ( <>
    { product.length==0 ? ("Loading") :
    (<div className='product-flex-container'>
        <img className='product-image-design' src={product.image}></img>
      <div className='product-div-design'>
        <Typography type="h3" classes="productInfoTitle" text={product.title}/>
        <Typography type="h4" classes="productInfoCategory" text={product.category}/>
        <Typography type="h4" text={`$${product.price}`}/>
        <Typography type="h5" text={`Description : ${product.description}`}/>
      </div>
    </div>)
  }
  </>
  )
}