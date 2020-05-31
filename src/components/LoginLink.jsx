import React from "react";
import {UserContext} from "../context/user"
import {CartContext} from "../context/cart";
import {Link} from "react-router-dom" 


export default function LoginLink() {
  const {user,userLogout} =React.useContext(UserContext)
  const {ClearCart} =React.useContext(CartContext)
  if (user.token) {
return    (<button className="login-btn" onClick={()=>{
      userLogout();
      ClearCart();
    }} >logout</button>)
  }
  return <Link to="/login">login</Link>;
}