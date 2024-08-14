import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Header from "./Pages/components/Header";
import Footer from "./Pages/components/Footer";
import Register from "./Pages/Register";
import Auction from "./Pages/Auction";
import Process from "./Pages/Process";
import Contact from "./Pages/Contact";
export default function UserPage() {
  return (
    <>
      <div style={{ position: "fixed", zIndex: 1000, width: "100%" }}>
        <Header></Header>
      </div>
      <div style={{ paddingTop: 130 }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/auction" element={<Auction />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/process" element={<Process />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </>
  );
}
