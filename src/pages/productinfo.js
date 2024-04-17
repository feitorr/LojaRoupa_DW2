import React from 'react';
import ProductInfo from "../components/productinfo/productinfo";
import Header from "../components/Header/Header";
import NewArrival from "../components/NewArrival/NewArrival";
import Cart from "../components/Cart/cart";


const Product = () => {
  return (
    <div>
      <Header />
      <Cart />
      <ProductInfo />
      <NewArrival />
    </div>
  );
}

export default Product;
