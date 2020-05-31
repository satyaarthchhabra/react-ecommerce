import React from "react";
// react router dom import is here 
import {Route ,Switch} from "react-router-dom";
// pages to be imported 
import About from "./pages/About"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Error from "./pages/Error"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
// component importing 
import Header from"./components/Header"
import Alert from"./components/Alert";
import PrivateRoute from"./components/PrivateRoute";




export default function App() {
  return <section>
    <Header/>
    <Alert />
    <Switch>
<Route path="/" exact>
  <Home/>
</Route>
<Route path="/about">
  <About/>
</Route>
<Route path="/cart" exact>
  <Cart/>
</Route>
<PrivateRoute path="/checkout">
  <Checkout/>
</PrivateRoute>
<Route path="/login">
  <Login/>
</Route>
<Route path="/products" exact>
  <Products/>
</Route>
<Route path="/products/:id"children={<ProductDetails/>} >

</Route>
<Route >
  <Error/>
</Route>

</Switch>

    
  </section>;
}
