import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [jew, setJew] = useState({});

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

  // CSS styles
  const listGroupStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  };

  return (
    <div style={{ margin: "50px 10px" }}>
      {jew && (
        <>
          <Row>
            <Col md={3}>
              <Card style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src={jew.image}
                  style={{ width: "100%", height: 300 }}
                />
              </Card>
            </Col>
            <Col md={9} style={{ paddingTop: 10 }}>
              <h5 style={{ color: "gold", fontWeight: 600, fontSize: 35 }}>
                Jewelry's detail
              </h5>
              <Card style={{ width: "100%", height: 240 }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Name: <b>{jew.name}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Category: <b>{jew.category}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: <b>{jew.description}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Added at: <b>{new Date(jew.createAt).toLocaleString()}</b>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md={3} style={{ paddingTop: 10 }}>
              <h5 style={{ color: "gold", fontWeight: 600, fontSize: 35 }}>
                Owner's detail
              </h5>
              <Card style={{ width: "100%", height: 240 }}>
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
            <Col md={6} style={{ paddingTop: 10 }}>
              <h5 style={{ color: "gold", fontWeight: 600, fontSize: 35 }}>
                Auction Details
              </h5>
              <Card style={{ width: "100%", height: 240 }}>
                <ListGroup variant="flush" style={listGroupStyle}>
                  <ListGroup.Item>
                    Initial Valuation:{" "}
                    <b>
                      {jew.auctionDetails?.initialValuation?.value || "N/A"}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Final Valuation:{" "}
                    <b>{jew.auctionDetails?.finalValuation?.value || "N/A"}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Final Price:{" "}
                    <b>{jew.auctionDetails?.finalizedPrice?.value || "N/A"}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Status: <b>{jew.status || "N/A"}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Updated at:{" "}
                    <b>
                      {new Date(jew.statusUpdateDate).toLocaleString() || "N/A"}
                    </b>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={3} style={{ paddingTop: 10 }}>
              <h5 style={{ color: "gold", fontWeight: 600, fontSize: 35 }}>
                Service fees
              </h5>
              <Card style={{ width: "100%", height: 240 }}>
                <ListGroup variant="flush" style={listGroupStyle}>
                  <ListGroup.Item
                    style={{
                      paddingLeft: "15px",
                      paddingTop: "90px",
                      display: "flex",
                      alignItems: "end",
                    }}
                  >
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
        </>
      )}
    </div>
  );
}
