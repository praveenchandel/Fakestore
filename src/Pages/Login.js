import React from 'react';
import { useState } from "react";
import Axios from "axios";
import LoadingBar from 'react-top-loading-bar';
import '../organisms/Login.css'
import Typography from '../molecules/Typography';

export const Login = (props) => {

    const [userName, setName] = useState('');
    const [password, setPassword] = useState('');
    const [progress, setProgress] = useState(0);

    const submit = async ()=>{

      setProgress(35);
      const { data } = await Axios.get(
        "https://fakestoreapi.com/users"
      );
      console.log('props login data',data);
      setProgress(70);

      let userId="";

      for(let i=0;i<data.length;i++){
        if(data[i].username===userName && data[i].password===password){
          userId=data[i].id;
        }
      }

      setProgress(100);

      if(userId!==""){

        const isLoggedIn={userId:userId}

        localStorage.setItem('user',JSON.stringify(isLoggedIn));
        props.setLogging();
        
      }else{
        alert("invalid creadentials");
      }
    }

  return (
    <div className='body_color'>
    <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
    { props.user ? "" :
      <div className='container'>
        <Typography type="h3" text="Welcome to Fakestore"/>
        <p>Please Login first</p>
        <p>User Name :</p>
    <input
            placeholder="User Name"
            value={userName}
            onChange={(e) => setName(e.target.value)}
         />
         <p className='login_margin'>Password :</p>
         <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <p></p>
         <button className="btn btn-outline-success login_margin" onClick={submit}>Log in</button>
       </div>
    }
    </div>
  )
}