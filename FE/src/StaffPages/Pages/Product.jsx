// StaffPages/Pages/Product.jsx
import React from "react";
import ProductList from "./components/ProductList";
import InitinalModal from "./components/InitialModal";
import FinalModal from "./components/FinalModal";
export default function Product() {
  return (
    <>
      <InitinalModal />
      <FinalModal />
      <ProductList />
    </>
  );
}
