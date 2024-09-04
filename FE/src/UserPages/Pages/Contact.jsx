import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <Container style={{ padding: "50px 0px", fontFamily: "'Georgia', serif" }}>
      <Row>
        <Col md={6}>
          <img
            src="https://www.instyle.com/thmb/4WuXYK08SV0pZFjMJY0AmclASXg=/fit-in/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ana-luisa-5a0b1c9f1d854bd5bf5179da0609d11d.jpg"
            alt=""
            style={{ width: "100%", margin: "20px 0px" }}
          />
        </Col>
        <Col
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: 50,
              fontWeight: 640,
              textAlign: "center",
              color: "#FABA5F",
            }}
          >
            Contact Us
          </h1>
          <Row
            style={{
              border: "2px solid #FFF1D7",
              padding: "20px 20px 50px 20px",
            }}
          >
            <Col md={6}>
              <h3
                style={{
                  marginBottom: 30,
                  color: "orange",
                }}
              >
                <span>
                  Send us a message
                  <hr
                    style={{
                      marginTop: "-7px",
                      height: 5,
                      width: "80%",
                      border: "5px solid orange",
                      borderRadius: 20,
                    }}
                  />
                </span>
              </h3>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="" />
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant="outline-primary">Send</Button>
              </Form>
            </Col>
            <Col md={6}>
              <h3
                style={{
                  marginBottom: 30,
                  color: "orange",
                }}
              >
                <span>
                  Or contact us at
                  <hr
                    style={{
                      marginTop: "-7px",
                      height: 5,
                      width: "67%",
                      border: "5px solid orange",
                      borderRadius: 20,
                    }}
                  />
                </span>
              </h3>
              <div style={{ margin: "20px 10px" }}>
                <span style={{ fontWeight: 600, fontSize: 25 }}>Email</span>
                <br />
                {/* Inline-flex to keep icon and text on the same line */}
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ marginRight: "8px" }}
                  />
                  thejewelryhouse.auction@gmail.com
                </span>
              </div>
              <div style={{ margin: "20px 10px" }}>
                <span style={{ fontWeight: 600, fontSize: 25 }}>Phone</span>
                <br />
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ marginRight: "8px" }}
                  />
                  0123456789
                </span>
              </div>
              <div style={{ margin: "20px 10px" }}>
                <span style={{ fontWeight: 600, fontSize: 25 }}>Address</span>
                <br />
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ marginRight: "8px" }}
                  />
                  HCMC, District 15, Wards NotExist, 123 Jewelry ST
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 600, fontSize: 25 }}>
                  Social media
                </span>
                <span
                  style={{
                    marginTop: 0,
                    fontSize: 35,
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <a href="https://www.facebook.com/">
                    <FontAwesomeIcon icon={faSquareFacebook} />
                  </a>
                  <a href="https://www.instagram.com/">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      style={{
                        color: "pink",
                      }}
                    />
                  </a>
                  <a href="https://x.com/?lang=en">
                    <FontAwesomeIcon
                      icon={faSquareXTwitter}
                      style={{ color: "black" }}
                    />
                  </a>
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
