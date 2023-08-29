import React, { useState, useEffect } from "react";
import Axios from "axios";
import LoadingBar from 'react-top-loading-bar';
import { OrderedItem } from "../organisms/OrderHistory/OrderedItem";
import '../organisms/OrderHistory/OrderHistory.css';
import { useParams } from "react-router-dom";
import Typography from "../molecules/Typography";

export const OrderHistory = () => {

  const {id}=useParams();

  console.log(id);

    const [products, setProducts] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isFectched,setIsFetched]=useState(0);


    const user=JSON.parse(localStorage.getItem('user'));
    const userId=user.userId;
    let allProducts=[];

    const allOrdersByUser=JSON.parse(localStorage.getItem(`${userId}_orders`));


    // access all the products
    const fetchProducts = async () => {
        setProgress(35);
        const { data } = await Axios.get(
          "https://fakestoreapi.com/products"
        );
        setProgress(70);
        allProducts=data;
        //localStorage.setItem('allProducts',JSON.stringify(data));
        setOrderedProducts();
      };

      const setOrderedProducts=()=>{

        //let allProducts=[];
       // allProducts=JSON.parse(localStorage.getItem('allProducts'));

        //const userCart=JSON.parse(localStorage.getItem(userId));

       // let totalAmount=0;
        const requiredProducts=[];

        const allOrders=allOrdersByUser[id].products;

        if(allOrders){
            for(let i=allOrders.length-1;i>=0;i--){
                for(let j=0;j<allProducts.length;j++){
                    if(allOrders[i].productId===allProducts[j].id){
                        const newItem={
                            productId:allOrders[i].productId,
                            productOrderDate:allOrders[i].date,
                            productOrderTime:allOrders[i].time,
                            productQuantity:allOrders[i].quantity,
                            productName:allProducts[j].title,
                            productImage:allProducts[j].image,
                            productPrice:allProducts[j].price
                        }
                        requiredProducts.push(newItem);
                    }
                    
                }
            }
    }
    setIsFetched(1);
    setProducts(requiredProducts);
    console.log(requiredProducts);
    setProgress(100);
    }

      useEffect(() => {
        fetchProducts();
      }, []);


  return (
    <div><LoadingBar
    color='#f11946'
    progress={progress}
    height={3}
  />
  <div className="center price_margin">
      <Typography type="h4" text="Your Order History"/>
  </div>
  <div className="container_margin">
  {
      isFectched ?
      products.length==0 ? 
      <div className="nothing_container">
        <Typography type="h4" text="You didn't palace any order yet..."/>
      </div> :
      products.map((product)=>{
        return <OrderedItem key={product.productId} product={product}/>
      })
     : ""
  }
  </div>
  </div>
  )
}