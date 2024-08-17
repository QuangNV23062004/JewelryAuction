import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import { useJewelry } from "../../ManagerPages/Pages/components/JewelryProvider";

export default function MyJew() {
  const nav = useNavigate();
  const { setJewelry, jewelry, UserApprove, UserReject } = useJewelry();
  const [id, setId] = useState("");
  const steps = [
    { status: "Pending", color: "rgba(108, 117, 125, 1)", display: "Pending" },
    {
      status: "Preliminary Valuation Requested",
      color: "rgba(0, 123, 255, 1)",
      display: "Preliminary",
    },
    { status: "Jewelry Sent", color: "rgba(255, 193, 7, 1)", display: "Sent" },
    {
      status: "Jewelry Arrival Confirmed",
      color: "rgba(40, 167, 69, 1)",
      display: "Arrived",
    },
    {
      status: "Final Valuation",
      color: "rgba(255, 193, 7, 1)",
      display: "Valuating",
    },
    {
      status: "Final Valuation Rejected",
      color: "rgba(255, 193, 7, 1)",
      display: "Valuating",
    },
    {
      status: "Final Valuation Confirmed",
      color: "rgba(40, 167, 69, 1)",
      display: "Confirmation",
    },
    { status: "Approved", color: "rgba(40, 167, 69, 1)", display: "Approved" },
    { status: "Rejected", color: "rgba(220, 53, 69, 1)", display: "Rejected" },
    {
      status: "Auctioned",
      color: "rgba(23, 162, 184, 1)",
      display: "Auctioned",
    },
    { status: "Sold", color: "rgba(40, 167, 69, 1)", display: "Sold" },
  ];

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
  }

  const DisplayStatus = (status) => {
    const current = steps.find((st) => st.status === status);
    return (
      <span
        style={{
          backgroundColor: current.color,
          borderRadius: 10,
          color: "white",
          padding: "5px 10px",
        }}
      >
        {current.display}
      </span>
    );
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jewelry");
      setJewelry(
        response.data
          .filter((j) => j.owner.ownerID === id)
          .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const navDetail = (jew) => {
    nav(`/detail/${jew._id}`);
  };
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setId(parsedUser._id);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const imageContainerStyle = {
    position: "relative",
    width: "250px",
    height: "250px",
    cursor: "pointer",
    overflow: "hidden",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  };

  const buttonStyle = {
    zIndex: 1,
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.querySelector(".overlay").style.opacity = 1;
    e.currentTarget.querySelector("img").style.transform = "scale(1.1)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.querySelector(".overlay").style.opacity = 0;
    e.currentTarget.querySelector("img").style.transform = "scale(1)";
  };

  return (
    <>
      <div style={{ padding: "0px 50px" }}>
        {id ? (
          jewelry.length > 0 ? (
            jewelry.map((jew) => (
              <div key={jew._id}>
                <Card
                  style={{
                    width: "100%",
                    margin: "20px 0px",
                    boxShadow: "0px 0px 5px 0px",
                  }}
                >
                  <Row>
                    <Col md={2}>
                      <div
                        style={imageContainerStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Card.Img
                          variant="top"
                          src={jew.image}
                          style={imageStyle}
                        />
                        <div className="overlay" style={overlayStyle}>
                          <Button
                            variant="info"
                            style={buttonStyle}
                            onClick={() => navDetail(jew)}
                          >
                            View Detail
                          </Button>
                        </div>
                      </div>
                    </Col>
                    <Col md={10} style={{ paddingLeft: 20 }}>
                      <Card.Body>
                        <Card.Title>
                          <b
                            style={{
                              fontWeight: 600,
                              fontSize: 30,
                              color: "orange",
                              cursor: "pointer",
                            }}
                          >
                            {jew.name}
                          </b>
                        </Card.Title>
                        <ListGroup variant="flush">
                          <Row>
                            <Col md={10}>
                              <ListGroup.Item>
                                Category: <b>{jew.category}</b>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Status: {DisplayStatus(jew.status)}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Created at:{" "}
                                <b>{formatDateTime(jew.createAt)}</b>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Updated at:{" "}
                                <b>{formatDateTime(jew.statusUpdateDate)}</b>
                              </ListGroup.Item>
                            </Col>
                            <Col
                              md={2}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              {jew.status === "Final Valuation Confirmed" ? (
                                <>
                                  <Button
                                    variant="outline-danger"
                                    style={{
                                      width: 150,
                                      margin: "-10px 0px",
                                    }}
                                    onClick={() => {
                                      UserReject(jew);
                                    }}
                                  >
                                    Reject auction
                                  </Button>
                                  <br />
                                  <Button
                                    variant="outline-success"
                                    style={{
                                      width: 150,
                                      margin: "-10px 0px",
                                    }}
                                    onClick={() => {
                                      UserApprove(jew);
                                    }}
                                  >
                                    Approve auction
                                  </Button>
                                </>
                              ) : (
                                <></>
                              )}
                              {jew.status ===
                              "Preliminary Valuation Requested" ? (
                                <Button variant="outline-primary">
                                  Send jewelry to us
                                </Button>
                              ) : (
                                <></>
                              )}
                              {jew.status !== "Final Valuation Confirmed" &&
                              jew.status !==
                                "Preliminary Valuation Requested" ? (
                                <span>No action required</span>
                              ) : (
                                <></>
                              )}
                            </Col>
                          </Row>
                        </ListGroup>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))
          ) : (
            <div>No jewelry found</div>
          )
        ) : (
          <div style={{ margin: "20px" }}>
            <h3>
              Please log in to view your jewelry.
              <Link to="/login">Login here</Link>
            </h3>
          </div>
        )}
      </div>
    </>
  );
}
