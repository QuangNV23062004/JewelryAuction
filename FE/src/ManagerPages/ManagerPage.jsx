import React, { useEffect, useState } from "react";
import Product from "./Pages/components/Product";
import { Col, Row } from "react-bootstrap";
import Header from "./Pages/components/Header";
import SideBar from "./Pages/components/SideBar";
import Buttons from "./Pages/components/Buttons";

export default function ManagerPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setName(user.fullName); // Simplified role setting
    }
  }, []);
  return (
    <>
      <Row>
        <Header name={name}></Header>
      </Row>
      <Row>
        <Col md={3}>
          <SideBar></SideBar>
        </Col>
        <Col md={9}>
          <Product></Product>
        </Col>
      </Row>
    </>
  );
}
