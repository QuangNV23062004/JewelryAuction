import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function Header({ name }) {
  const nav = useNavigate();

  return (
    <Row style={{ padding: 20 }}>
      <Col md={11}>
        <span style={{ paddingLeft: "45%" }}>
          WELCOME MANAGER: <b style={{ color: "aqua" }}>{name}</b>
        </span>
      </Col>
      <Col md={1}>
        <FontAwesomeIcon icon={faUser} />
      </Col>
    </Row>
  );
}
