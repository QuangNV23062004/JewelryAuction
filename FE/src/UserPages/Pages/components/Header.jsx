import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../UserContext";

export default function Header() {
  const linkStyle = { textDecoration: "none", color: "grey" };
  const { user, setUser, menu, setMenu } = useContext(UserContext);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    setMenu("Home");
  };

  const navLinkStyle = (isSelected) => ({
    display: "block",
    position: "relative",
    top: isSelected ? "0px" : "10px",
    transition: "top 0.3s ease",
    margin: "0px 10px",
  });

  return (
    <>
      <div style={{ boxShadow: "0 1px 10px -2px black" }}>
        <div
          style={{
            backgroundColor: "#E8E8E8",
            textAlign: "center",
            padding: "10px 20px",
          }}
        >
          <span style={{ fontSize: "small" }}>
            FREE WORLDWIDE SHIPPING,{" "}
            <Link
              to="/auction"
              style={{
                textDecoration: "none",
                color: "red",
                cursor: "pointer",
              }}
            >
              SHOP NOW
            </Link>
          </span>
        </div>
      </div>
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Row className="w-100 align-items-center">
              <Col md={3}>
                <Navbar.Brand>
                  <Link to="/" style={linkStyle}>
                    <b
                      style={{ color: "grey", marginLeft: 50 }}
                      onClick={() => setMenu("Home")}
                    >
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
                  {["Home", "Auction", "Contact", "About", "Process"].map(
                    (item) => (
                      <Nav.Item key={item}>
                        <Link
                          className="nav-link"
                          to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                          style={navLinkStyle(menu === item)}
                          onClick={() => setMenu(item)}
                        >
                          {item}
                          {menu === item && (
                            <hr
                              style={{
                                border: "none",
                                width: "100%",
                                height: "3px",
                                borderRadius: "10px",
                                background: "red",
                              }}
                            />
                          )}
                        </Link>
                      </Nav.Item>
                    )
                  )}
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
                  {!user && (
                    <NavDropdown.Item as="div">
                      <Link
                        to="/login"
                        style={{ width: "100%", ...linkStyle }}
                        onClick={() => setMenu("Login")}
                      >
                        Login
                      </Link>
                    </NavDropdown.Item>
                  )}
                  {user && (
                    <>
                      <NavDropdown.Item as="div" onClick={handleLogout}>
                        <Link to={"/"} style={{ width: "100%", ...linkStyle }}>
                          Logout
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as="div">
                        <Link
                          to="/bidding-history"
                          style={{ width: "100%", ...linkStyle }}
                        >
                          Your Won Bids
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item as="div">
                        <Link
                          to="/auction-history"
                          style={{ width: "100%", ...linkStyle }}
                        >
                          Your Auctioned Jewelry
                        </Link>
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </Row>
    </>
  );
}
