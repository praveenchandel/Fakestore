import React from 'react'
import {Link } from "react-router-dom";
import Typography from '../molecules/Typography';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {actionCreators} from './state/index';

export default function Headers() {

  const dispatch=useDispatch();

  const mens="men's clothing";
  const womens="women's clothing";
  const jewelery="jewellery";
  const electronics="electronics";

  let items=0;
  const user=JSON.parse(localStorage.getItem('user'));
  if(user){
    //console.log(user);
  const userId=user.userId;
  const userCart=JSON.parse(localStorage.getItem(userId));
  if(userCart){
    items=userCart.length;
  }
}
dispatch(actionCreators.setState(items));

const count=useSelector(state=>state.items);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Typography type="h5" classes="navbar-brand" text="FakeStore App"/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={`category/${mens}`}>Men's Clothing</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={`category/${womens}`}>Women's Clothing</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={`category/${jewelery}`}>Jewelery</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={`category/${electronics}`}>Electronics</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={"cart"}>Cart({count})</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={"profile"}>Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={"orders"}>Orders</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
