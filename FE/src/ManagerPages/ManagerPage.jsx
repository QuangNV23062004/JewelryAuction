import React, { useEffect, useState } from "react";
import Product from "./Pages/components/Product";
import { Col, Row } from "react-bootstrap";
import Header from "./Pages/components/Header";
import SideBar from "./Pages/components/SideBar";
import Buttons from "./Pages/components/Buttons";
import { JewelryProvider } from "./Pages/components/JewelryProvider";

export default function ManagerPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setName(user.fullName); // Simplified role setting
      setId(user._id);
    }
  }, []);
  return (
    <>
      <Row>
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
          <Header name={name}></Header>
        </div>
      </Row>
      <Row>
        <Col md={4}>
          <div
            style={{
              position: "fixed",
              width: "30%",
              top: 90,
              left: 0,
              zIndex: 1000,
            }}
          >
            <SideBar></SideBar>
          </div>
        </Col>
        <Col md={8}>
          <div style={{ marginTop: 100 }}>
            <Product userID={id}></Product>
          </div>
        </Col>
      </Row>
    </>
  );
}
