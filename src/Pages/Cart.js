import React, { useState, useEffect } from "react";
import {CartItems} from '../organisms/Cart/CartItems';
import Axios from "axios";
import LoadingBar from 'react-top-loading-bar';
import '../organisms/Cart/Cart.css'
import Typography from "../molecules/Typography";

export const Cart = () => {

    const [products, setProducts] = useState([]);
    const [progress, setProgress] = useState(0);
    const [total,setTotal]=useState(0);
    const [isProductsFectched,setIsProductsFectched]=useState(0);
    const [isUserInfoFetched,setIsUserInfoFetched]=useState(0);

    const [name,setName]=useState("");
    const [number,setNumber]=useState("");
    const [addressL1,setAddressL1]=useState("");
    const [addressL2,setAddressL2]=useState("");
    const [pinCode,setPinCode]=useState("");


    const user=JSON.parse(localStorage.getItem('user'));
    const userId=user.userId;
    const userCart=JSON.parse(localStorage.getItem(userId));
    //let userInfo;

    // access all the products
    const fetchProducts = async () => {
        setProgress(35);
        const { data } = await Axios.get(
          "https://fakestoreapi.com/products"
        );
        setProgress(70);
        localStorage.setItem('allProducts',JSON.stringify(data));
        setRequiredProducts();
      };

      const fetchUserInfo = async () => {

        const { data } = await Axios.get(
           `https://fakestoreapi.com/users/${userId}`
        );
        setName(data.name.firstname + " " + data.name.lastname);
        setNumber(data.phone);
        setAddressL1(data.address.street);
        setAddressL2(data.address.city);
        setPinCode(data.address.zipcode);
        setIsUserInfoFetched(1);
      };


      const setRequiredProducts=()=>{

        let allProducts=[];
        allProducts=JSON.parse(localStorage.getItem('allProducts'));

        const userCart=JSON.parse(localStorage.getItem(userId));

        let totalAmount=0;
        const requiredProducts=[];

        if(userCart){
        for(let i=0;i<userCart.length;i++){
            for(let j=0;j<allProducts.length;j++){
                if(userCart[i].productID===allProducts[j].id){
                    const newItem={
                        product:allProducts[j],
                        quantity:userCart[i].quantity
                    }
                    requiredProducts.push(newItem);
                    totalAmount=totalAmount+(newItem.quantity*newItem.product.price);
                }
            }
        }
    }
    setIsProductsFectched(1);
    totalAmount.toFixed(2); 
    setTotal(totalAmount); 
    setProducts(requiredProducts);
       
    setProgress(100);
    }
    
      useEffect(() => {
        fetchUserInfo();
        fetchProducts();
      }, []);


    const decrease=(id)=>{

        for(let i=0;i<userCart.length;i++){
            if(userCart[i].productID===id){
                if(userCart[i].quantity>1){
                userCart[i].quantity=userCart[i].quantity-1;
                }
            }
        }

        localStorage.setItem(userId,JSON.stringify(userCart));
        setRequiredProducts(); 
    }

    const increase=(id)=>{

        for(let i=0;i<userCart.length;i++){
            if(userCart[i].productID===id){
                userCart[i].quantity=userCart[i].quantity+1;
            }
        }

        localStorage.setItem(userId,JSON.stringify(userCart));
        setRequiredProducts();
    }

    const buyProducts=()=>{

      if(name===""){
        alert("Please fill name")
        return;
      }
      if(number===""){
        alert("Please fill contact number")
        return;
      }
      if(addressL1===""){
        alert("Please fill address line 1")
        return;
      }
      if(addressL2===""){
        alert("Please fill address line 2")
        return;
      }
      if(pinCode===""){
        alert("Please fill pin code")
        return;
      }

      let allProducts=[];
        allProducts=JSON.parse(localStorage.getItem('allProducts'));

        const requiredProducts=[];

        if(userCart){
        for(let i=0;i<userCart.length;i++){
            for(let j=0;j<allProducts.length;j++){
                if(userCart[i].productID===allProducts[j].id){
                    const newItem={
                        product:allProducts[j],
                        quantity:userCart[i].quantity
                    }
                    requiredProducts.push(newItem);
                }
            }
        }
    }
    
    // storing all cart items to order history

    let allOrders=[];
    const previouseOrders=JSON.parse(localStorage.getItem(`${userId}_orders`));

    if(previouseOrders){
      allOrders=previouseOrders;
    }

    const newOrderItems=[];

    for(let i=0;i<requiredProducts.length;i++){
      const newOrder={
        productId:requiredProducts[i].product.id,
        quantity:requiredProducts[i].quantity,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      }
      newOrderItems.push(newOrder);
    }

    const newOrder={
      products:newOrderItems,
      total:total,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      name:name,
      index:allOrders.length
    }

    allOrders.push(newOrder);

    // for(let i=0;i<requiredProducts.length;i++){
    //   const newOrder={
    //     productId:requiredProducts[i].product.id,
    //     quantity:requiredProducts[i].quantity,
    //     date: new Date().toLocaleDateString(),
    //     time: new Date().toLocaleTimeString()
    //   }
    //   allOrders.push(newOrder);
    // }
    localStorage.setItem(`${userId}_orders`,JSON.stringify(allOrders));
    localStorage.removeItem(userId);
    setRequiredProducts(); 
    setIsUserInfoFetched(0);
  }


  const deleteButton=(id)=>{

    const newUserCart=[];

    for(let i=0;i<userCart.length;i++){
      if(userCart[i].productID!==id){
        newUserCart.push(userCart[i]);
      }
  }

  localStorage.setItem(userId,JSON.stringify(newUserCart));
  setRequiredProducts(); 
  }

  return (
    <>
     <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
      <div className="flex-container-cart_details">
      {
      isProductsFectched ? <CartItems className="cart_items_width" products={products} decrease={decrease} increase={increase} deleteButton={deleteButton}/> 
      : ""
    }
    {/* {
      userInfo ? <div>{userInfo.email}</div> : "not"
    } */}
    {
      isUserInfoFetched && total!==0 ?
    <div className="cart_shipment_width">

      <Typography type="h4" classes="center price_margin" text="Shipment Details"/>

      <div className="flex-container-cart_details price_margin">
        <div className="cart_shipment_width details_margin">
         <div className="cart_shipment_height">Name :</div>
         <div className="cart_shipment_height">Contact No. :</div>
         <div className="cart_shipment_height">Address Line 1 :</div>
         <div className="cart_shipment_height">Address Line 2 :</div>
         <div className="cart_shipment_height">Pin code :</div>
        </div>
        <div className="cart_items_width">
         <div className="cart_shipment_height"><input placeholder="User Name" value={name} onChange={(e)=>{setName(e.target.value)}}></input></div>
         <div className="cart_shipment_height"><input placeholder="Contact No." value={number} onChange={(e)=>{setNumber(e.target.value)}}></input></div>
         <div className="cart_shipment_height"><input placeholder="Address Line 1" value={addressL1} onChange={(e)=>{setAddressL1(e.target.value)}}></input></div>
         <div className="cart_shipment_height"><input placeholder="Address Line 2" value={addressL2} onChange={(e)=>{setAddressL2(e.target.value)}}></input></div>
         <div className="cart_shipment_height"><input placeholder="Pin Code" value={pinCode} onChange={(e)=>{setPinCode(e.target.value)}}></input></div>
        </div>
      </div>
      { total===0 ? "" :
    <div className="center price_margin margin_bottom">
    <Typography type="h3" classes="price_margin" text={`Total : $${total}`}/>
    <button className="btn btn-outline-success price_margin" onClick={buyProducts}>Buy</button>
    </div>
    }
    </div>
    : ""
  }

    </div>
    
      
    </>
  )
}