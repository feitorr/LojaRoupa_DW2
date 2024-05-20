import React from 'react';
import ProductInfo from "../components/productinfo/productinfo";
import Header from "../components/Header/Header";
import NewArrival from "../components/NewArrival/NewArrival";
import Cart from "../components/Cart/cart";
import Footer from "../components/Footer/Footer";

const Product = () => {
  return (
    <div>
      <Header />
      <Cart />
      <ProductInfo />
      <NewArrival />
      <Footer />
    </div>
  );
}

export default Product;
