import React from "react";
import ProductList from "./ProductList";
import { ProductContext } from "../../context/products";
import Loading from "../Loading"
export default function FeaturedProducts() {
  const { loading, featured, products } = React.useContext(ProductContext)

  
  if (loading) {  
  return <Loading />
  }

  return <ProductList title="Featured  products" products={featured} />;
}
