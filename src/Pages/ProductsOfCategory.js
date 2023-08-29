import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import {Products} from '../organisms/Product/Products';
import LoadingBar from 'react-top-loading-bar';

export const ProductsOfCategory = () => {

    const {id}=useParams();

    const [products, setProducts] = useState([]);
    const [progress, setProgress] = useState(0);

  const fetchProducts = async () => {
    setProgress(35);
    const { data } = await Axios.get(
      `https://fakestoreapi.com/products/category/${id}`
    );
    setProgress(70);
    setProducts(data);
    setProgress(100);
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  return (
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
    <Products products={products}/>
    </>
  )
}