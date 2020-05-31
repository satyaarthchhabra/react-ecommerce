import React,{useState,useEffect} from 'react';
import axios from 'axios';
import url from "../utils/URL";
import {featuredProducts,flattenProducts}  from '../utils/helpers'
// products context
// context 
export  const ProductContext=React.createContext();
// provider

export default function ProductsProvider({ children}) {
    const [loading,setLoading] = useState(false);
    const [featured,setFeatured] = useState([]);
    const [products,setProducts] = useState([]);
    
useEffect(()=>{
    setLoading(true);
    const dataImporter=async()=>{
        let response= await axios.get(`${url}/products`);
        setFeatured(featuredProducts(flattenProducts(response.data)))
        const products=flattenProducts(response.data)
        setProducts(products);
        setLoading(false);

        
    }
    dataImporter();

return ()=>{

}
},[])







    return (
        <ProductContext.Provider value={{loading,featured,products}}>
            {children}
        </ProductContext.Provider>
    )
}

