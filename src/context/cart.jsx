// cart context
import React, { useState } from 'react';
import localCart from '../utils/localCart'
const CartContext = React.createContext();




const getCartFromLocalStorage = () => {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : [];
}



function CartProvider({ children }) {
    const [cart, setCart] = useState(getCartFromLocalStorage());
    const [cartItems, setCartItems] = useState(0);
    const [total, setTotal] = useState(0);
    // remove item 
    const removeItem = (id) => {
        setCart([...cart].filter(item => item.id !== id))
    }
    // increase item 
    const increaseAmount = (id) => {
        const newCart = [...cart].map(item => {
            return item.id === id ? { ...item, amount: item.amount + 1 } : { ...item };
        })
        setCart(newCart);
    }
    // decrease item 
    const decreaseAmount = (id, amount) => {

        if (amount === 1) {
            removeItem(id);
            return;
        }
        else {
            const newCart = [...cart].map(item => {
                return item.id === id ? { ...item, amount: item.amount - 1 } : { ...item };
            })
            setCart(newCart);
        }
    }
    // add to cart 
    const addToCart = (product) => {
        const { id, image, title, price } = product;
        const item = [...cart].find(item => item.id = id)
        if (item) {
            increaseAmount(id);
            return;
        } else {
            const newItem = { id, image, title, price, amount: 1 }
            const newCart = [...cart, newItem];
            setCart(newCart)
        }
    }
    // remove item 
    const ClearCart = () => {
        setCart([]);
    }
    React.useEffect(() => {
        // local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // cart items 
        let newCartItems = cart.reduce((total, cartItem) => {
            return total += cartItem.amount
        }, 0)
        setCartItems(newCartItems)
        //   car total
        let newTotal = cart.reduce((total, cartItem) => {

            return total += (cartItem.amount * cartItem.price)
        }, 0)

        newTotal = parseFloat(newTotal.toFixed(2))

        setTotal(newTotal)


    }, [cart])




    return (
        <CartContext.Provider value={{ cart, cartItems, total, removeItem, increaseAmount, decreaseAmount, addToCart, ClearCart }}>
            {children}
        </CartContext.Provider>
    )
}
export { CartContext, CartProvider }
