import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Products} from '../organisms/Product/Products';
import LoadingBar from 'react-top-loading-bar';


export const Home = () => {
   
    const [products, setProducts] = useState([]);
    const [categories,setCategorse]=useState([]);
    const [progress, setProgress] = useState(0);

  const fetchProducts = async () => {
    setProgress(35);
    const { data } = await Axios.get(
      "https://fakestoreapi.com/products"
    );
    setProgress(70);
    const products = data;
    setProducts(filterByCategory(data));
    setProgress(100);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const filterByCategory=(data)=>{

    let allCategories=[];

    for(let i=0;i<data.length;i++){
      allCategories.push(data[i].category);
    }
    allCategories=[...new Set(allCategories)];
    setCategorse(allCategories);

    const newData=[];

    for(let i=0;i<allCategories.length;i++){
      for(let j=0;j<data.length;j++){
        if(data[j].category===allCategories[i]){
          newData.push(data[j]);
        }
      }
    }
    return newData;
  }

  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
      <Products products={products}/>
    </div>
  )
}