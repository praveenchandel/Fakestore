import React from 'react'
import {OrderItems} from '../organisms/OrderHistory/OrderItems'

export const Orders = () => {

    const user=JSON.parse(localStorage.getItem('user'));
    const userId=user.userId;

    let allOrders=JSON.parse(localStorage.getItem(`${userId}_orders`));
    if(!allOrders){
        allOrders=[];
    }else{
        for(let i=0;i<allOrders.length/2;i++){
            const temp=allOrders[i];
            allOrders[i]=allOrders[allOrders.length-1-i];
            allOrders[allOrders.length-1-i]=temp;
        }
    }

    const openItem=(index)=>{
        console.log(index);
    }


  return (
    <>
    {
        allOrders.map((order)=>{
            return <OrderItems key={order.time} order={order} openItem={openItem}/>
        })
    }
    </>
  )
}