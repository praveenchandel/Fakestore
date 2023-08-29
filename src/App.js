import React from "react";
import Headers from './organisms/Headers';
import {ProductsOfCategory} from './Pages/ProductsOfCategory';
import {Home} from './Pages/Home';
import {Cart} from './Pages/Cart';
import {Login} from './Pages/Login';
import {ProductDetails} from './Pages/ProductDetails';
import { ProfileDetails } from "./Pages/ProfileDetails";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Orders } from "./Pages/Orders";
import { OrderHistory } from "./Pages/OrderHistory";
import {Footer} from './organisms/Footer'

function App() {

   const [user, setUser] = useState({});

   useEffect(() => {
      setUser(localStorage.getItem('user'));
    }, []);

   const setLogging = ()=>{
      setUser(localStorage.getItem('user'));
    }

  return (
    <div className="backgrond_color">
    <Headers/>
    <Login user={user} setLogging={setLogging}/>
    { !user ? "" :
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="category/:id" element={<ProductsOfCategory />} />
        <Route path="products/:id" element={<ProductDetails/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="profile" element={<ProfileDetails setLogging={setLogging}/>}/>
        <Route path="orders" element={<Orders/>}/>
        <Route path="orders/orderHistory/:id" element={<OrderHistory/>}/>
      </Routes>
}
      <Footer/>
      </div>
  );
}

export default App;