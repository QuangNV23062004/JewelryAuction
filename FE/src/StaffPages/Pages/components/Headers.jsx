import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";

const headerStyles = {
  backgroundColor: "#f8f9fa",
  padding: "20px",
  borderBottom: "1px solid #dee2e6",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const searchStyles = {
  flexGrow: 1,
  maxWidth: "400px",
  marginRight: "20px",
};

const iconStyles = {
  fontSize: "1.5rem",
};

const dropdownStyles = {
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
};

const menuStyles = {
  minWidth: "120px",
};

export default function Header() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    nav("/manager/login");
  };
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    setName(user.fullName);
  }, []);
  return (
    <Row style={headerStyles}>
      <Col md={4} style={{ display: "flex", alignItems: "center" }}>
        <Form.Control
          type="search"
          placeholder="Search..."
          style={searchStyles}
        />
        <FontAwesomeIcon icon={faSearch} style={{ fontSize: "1.5rem" }} />
      </Col>
      <Col
        md={4}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>
          WELCOME STAFF:{" "}
          <b style={{ color: "#17a2b8", fontWeight: "bold" }}>{name}</b>
        </span>
      </Col>
      <Col md={4} style={dropdownStyles}>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-basic"
            style={iconStyles}
          >
            <FontAwesomeIcon icon={faUser} />
          </Dropdown.Toggle>

          <Dropdown.Menu style={menuStyles}>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            <Dropdown.Item>Personal information</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}
