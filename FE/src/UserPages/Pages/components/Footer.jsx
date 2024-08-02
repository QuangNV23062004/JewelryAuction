import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
export default function Footer() {
  const { user, setUser, menu, setMenu } = useContext(UserContext);
  return (
    <footer
      style={{ backgroundColor: "#343a40", color: "white", padding: "40px 0" }}
    >
      <Container>
        <Row>
          <Col md={3}>
            <h5>About Us</h5>
            <p>
              We are a premier online jewelry auction house, offering exquisite
              jewelry from around the world. Join us to explore, bid, and own
              your dream pieces.
            </p>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link
                  to="/"
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={() => setMenu("Home")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/auction"
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={() => setMenu("Auction")}
                >
                  Auctions
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={() => setMenu("Contact")}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={() => setMenu("About")}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Jewelry St, City,
                Country
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} /> +123 456 7890
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} /> info@jewelryhouse.com
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Follow Us</h5>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <li>
                <a
                  href="https://www.facebook.com"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center" style={{ paddingTop: "20px" }}>
            <p>&copy; 2024 The Jewelry House. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
