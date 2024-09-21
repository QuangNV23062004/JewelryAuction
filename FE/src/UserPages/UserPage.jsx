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
import MyJew from "./Pages/MyJew";
import Detail from "./Pages/Detail";
import AuctionRoom from "./Pages/AuctionRoom";
import InitialModal from "./Pages/components/InitialModal";
import Success from "./Pages/Success";
import Fail from "./Pages/Fail";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Checkout";
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
          <Route path="/auction-history" element={<MyJew />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/auction/:roomId" element={<AuctionRoom />}></Route>
          <Route path="/procedure" element={<Process />}></Route>
          <Route path="/auction/category/:cat" element={<Auction />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/fail" element={<Fail />}></Route>
          <Route path="/failProcess" element={<Fail />}></Route>
          <Route path="/404" element={<NotFound />}></Route>
          <Route path="/checkout/:jewId" element={<Checkout />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </>
  );
}
