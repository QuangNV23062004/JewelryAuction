import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export default function Header() {
  const linkStyle = { textDecoration: "none", color: "grey" };
  const [menu, setMenu] = useState("Home");
  return (
    <>
      <Row>
        <div
          style={{
            backgroundColor: "#E8E8E8",
            textAlign: "center",
            padding: "10px 20px",
          }}
        >
          <h8>
            FREE WORLDWIDE SHIPPING,{" "}
            <Link
              to={"/auction"}
              style={{
                textDecoration: "none",
                color: "red",
                cursor: "pointer",
              }}
            >
              SHOP NOW
            </Link>
          </h8>
        </div>
      </Row>
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Row className="w-100 align-items-center">
              <Col md={3}>
                <Navbar.Brand href="#">
                  <Link to={"/"} style={linkStyle}>
                    <b style={{ color: "grey", marginLeft: 50 }}>
                      THE JEWELRY HOUSE
                    </b>
                  </Link>
                </Navbar.Brand>
              </Col>
              <Col md={6}>
                <Nav
                  className="justify-content-center"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link>
                    <Link
                      to={"/"}
                      style={linkStyle}
                      onClick={() => {
                        setMenu("Home");
                      }}
                    >
                      Home
                      {menu === "Home" ? (
                        <hr
                          style={{
                            border: "none",
                            width: "100%",
                            height: "3px",
                            borderRadius: "10px",
                            background: "red",
                          }}
                        ></hr>
                      ) : (
                        <></>
                      )}
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      to={"/auction"}
                      style={linkStyle}
                      onClick={() => {
                        setMenu("Auction");
                      }}
                    >
                      Auction
                      {menu === "Auction" ? (
                        <hr
                          style={{
                            border: "none",
                            width: "100%",
                            height: "3px",
                            borderRadius: "10px",
                            background: "red",
                          }}
                        ></hr>
                      ) : (
                        <></>
                      )}
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      to={"/contact"}
                      style={linkStyle}
                      onClick={() => {
                        setMenu("Contact");
                      }}
                    >
                      Contact
                      {menu === "Contact" ? (
                        <hr
                          style={{
                            border: "none",
                            width: "100%",
                            height: "3px",
                            borderRadius: "10px",
                            background: "red",
                          }}
                        ></hr>
                      ) : (
                        <></>
                      )}
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      to={"/about"}
                      style={linkStyle}
                      onClick={() => {
                        setMenu("About");
                      }}
                    >
                      About us
                      {menu === "About" ? (
                        <hr
                          style={{
                            border: "none",
                            width: "100%",
                            height: "3px",
                            borderRadius: "10px",
                            background: "red",
                          }}
                        ></hr>
                      ) : (
                        <></>
                      )}
                    </Link>
                  </Nav.Link>
                </Nav>
              </Col>
              <Col
                md={3}
                className="d-flex justify-content-end align-items-center"
              >
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-primary">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </Form>
                <NavDropdown
                  title={<FontAwesomeIcon icon={faUser} />}
                  id="navbarScrollingDropdown"
                  align="end"
                  style={{ marginLeft: 10 }}
                >
                  <NavDropdown.Item>
                    <Link to={"/login"} style={{ width: "100%", ...linkStyle }}>
                      Login
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>Logout</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link
                      to={"/bidding-history"}
                      style={{ width: "100%", ...linkStyle }}
                    >
                      Your Won Bids
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to={"/auction-history"}
                      style={{ width: "100%", ...linkStyle }}
                    >
                      Your Auctioned Jewelry
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </Row>
    </>
  );
}
