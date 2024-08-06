import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Detail from "./Pages/Detail";
export default function StaffPage() {
  return (
    <Routes>
      <Route path="/" element={<Product />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/detail/:id" element={<Detail />}></Route>
    </Routes>
  );
}
