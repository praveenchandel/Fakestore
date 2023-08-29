import React from 'react';
import {Link } from "react-router-dom";
import Typography from '../../molecules/Typography';
import './OrderHistory.css';

export const OrderItems = (props) => {

  const path=`/orderHistory/${props.order.index}`;
   
  return (
    <div className='round_boarder flex_items' >
        <div className='half_width'>
          <Typography type="h5" text={`Name : ${props.order.name}`}/>
          <Typography type="h5" text={`Date : ${props.order.date}`}/>
        </div>
        <div className='half_width'>
        <Typography type="h5" text={`Total : $${props.order.total}`}/>
        <Typography type="h5" text={`Time : {props.order.time}`}/>
        </div>
        <Link to={`orderHistory/${props.order.index}`} className="btn details px-auto" > view details</Link>
       {/* <button ><Link to={`orderHistory/${props.order.index}`}>Open</Link></button> */}
    </div>
  )
}