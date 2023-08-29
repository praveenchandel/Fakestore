import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import LoadingBar from 'react-top-loading-bar';
import '../organisms/ProfileDetails.css';
import Typography from '../molecules/Typography';


export const ProfileDetails = (props) => {

    const [userDetails, setUserDetails] = useState([]);
    const [progress, setProgress] = useState(0);

    const user=JSON.parse(localStorage.getItem('user'));
    const userId=user.userId;

    const getUserDetails = async ()=>{

        setProgress(35);
        const { data } = await Axios.get(
          `https://fakestoreapi.com/users/${userId}`
        );
        setProgress(70);

        setUserDetails(data);
        setProgress(100);
      }

      useEffect(() => {
        getUserDetails();
      }, []);


    const Logout =()=>{
      localStorage.removeItem('user');
      props.setLogging();
    } 



  return (<div className='body_color'>
      {
      userDetails.length===0 ? <LoadingBar color='#f11946' progress={progress} height={3}/> : 
      <div className='container'>
        <Typography type="h3" text="Profile Details"/>
          <p className='profile_margin'> Name : {userDetails.name.firstname} {userDetails.name.lastname}</p>
          <p> Email : {userDetails.email}</p>
          <p> Phone No. : {userDetails.phone}</p>

          <p> Number : {userDetails.address.number}</p>
          <p> Street : {userDetails.address.street}</p>
          <p> City : {userDetails.address.city}</p>
          <p> Zipcode : {userDetails.address.zipcode}</p>

          <button className="btn btn-outline-success" onClick={Logout}>Logout</button>
      </div>

    }
    </div>
  )
}