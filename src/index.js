import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ProductsProvider from "./context/products"
import { CartContext, CartProvider } from "./context/cart"
import { UserContext, UserProvider } from "./context/user"
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"
ReactDOM.render(
    <BrowserRouter>
    <UserProvider>
        <ProductsProvider>
            <CartProvider>
                <App /></CartProvider>
        </ProductsProvider>
        </UserProvider>
    </BrowserRouter>
    , document.getElementById("root"));
