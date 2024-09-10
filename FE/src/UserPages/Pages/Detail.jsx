import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Detail() {
  const { id } = useParams();
  const [jew, setJew] = useState({});
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [des, setDes] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/jewelry/${id}`);
      setJew(response.data);
    } catch (error) {
      console.error("Error fetching jewelry data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {}, [des]);
  // CSS styles
  const listGroupStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const headingStyle = {
    color: "#444",
    fontWeight: 600,
    fontSize: 30,
    marginBottom: "20px",
    marginTop: 5,
  };
  const renderDescription = (description, des) => {
    if (des === true) {
      const wordArray = description.split(" ");
      if (wordArray.length > 30) {
        const First30 = wordArray.slice(0, 30);
        return First30.join(" ");
      }
    }
    return description;
  };

  return (
    <div style={{ margin: "40px 20px" }}>
      <ToastContainer />
      {jew && (
        <>
          <Row style={{ height: 340 }}>
            <Col md={3} style={{ height: 340 }}>
              <Card
                style={{
                  width: "100%",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Card.Img
                  variant="top"
                  src={jew.image}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: 340,
                    borderRadius: 5,
                  }}
                />
              </Card>
            </Col>
            <Col md={9} style={{ height: 340 }}>
              <h5 style={headingStyle}>Jewelry's detail</h5>
              <Card style={{ width: "100%", padding: "15px" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Name: <b>{jew.name || "N/A"}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Category: <b>{jew.category || "N/A"}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description:{" "}
                    <b>{renderDescription(jew.description, des) || "N/A"}</b>
                    <span
                      onClick={() => {
                        setDes(!des);
                      }}
                    >
                      ...show {des === true ? <>more</> : <>less</>}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Added at:{" "}
                    <b>
                      {jew.createAt
                        ? new Date(jew.createAt).toLocaleString()
                        : "N/A"}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={() => {
                        if (user) {
                          nav(`/auction/${jew._id}`);
                        } else {
                          toast.warn(
                            <>
                              You need to login to bid,to login please click{" "}
                              <Link
                                to="/login"
                                style={{ color: "white", cursor: "pointer" }}
                              >
                                here
                              </Link>
                            </>,
                            {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                              transition: Bounce,
                            }
                          );
                        }
                      }}
                      variant="warning"
                      style={{ padding: "10px 20px", fontWeight: "bold" }} // Improved button visibility
                      disabled={user && user._id === jew.owner?.ownerID}
                    >
                      Bid
                    </Button>
                    {user && user._id === jew.owner?.ownerID && (
                      <span style={{ marginLeft: 10 }}>
                        You are the owner of this jewelry
                      </span>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {user && user._id === jew.owner?.ownerID && (
            <Row style={{ marginTop: 20 }}>
              <Col md={5}>
                <h5 style={headingStyle}>Owner's detail</h5>
                <Card style={{ width: "100%", padding: "15px" }}>
                  <ListGroup variant="flush" style={listGroupStyle}>
                    <ListGroup.Item>
                      Fullname: <b>{jew.owner?.fullName || "N/A"}</b>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Phone: <b>{jew.owner?.phone || "N/A"}</b>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Email: <b>{jew.owner?.email || "N/A"}</b>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Address: <b>{jew.owner?.address || "N/A"}</b>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col md={5}>
                <h5 style={headingStyle}>Auction Details</h5>
                <Card style={{ width: "100%", padding: "15px" }}>
                  <ListGroup variant="flush" style={listGroupStyle}>
                    <ListGroup.Item>
                      Initial Valuation:{" "}
                      <b>
                        {jew.auctionDetails?.initialValuation?.value || "N/A"}
                      </b>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Final Valuation:{" "}
                      <b>
                        {jew.auctionDetails?.finalValuation?.value || "N/A"}
                      </b>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Status: <b>{jew.status || "N/A"}</b>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Updated at:{" "}
                      <b>
                        {jew.statusUpdateDate
                          ? new Date(jew.statusUpdateDate).toLocaleString()
                          : "N/A"}
                      </b>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col md={2}>
                <h5 style={headingStyle}>Service fees</h5>
                <Card style={{ width: "100%", padding: "15px" }}>
                  <ListGroup variant="flush" style={listGroupStyle}>
                    <ListGroup.Item>
                      Intermediate fee:{" "}
                      <b>{jew.auctionDetails?.intermediateFee || "N/A"}</b>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Intermediate fee rate:{" "}
                      <b>{jew.auctionDetails?.intermediateFeeRate || "N/A"}</b>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </div>
  );
}
