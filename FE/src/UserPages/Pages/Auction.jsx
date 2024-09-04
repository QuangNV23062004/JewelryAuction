import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import CountdownTimer from "./components/CountdownTimer";
import { useNavigate } from "react-router-dom";

export default function Auction() {
  const [auctions, setAuctions] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      const auctionsResponse = await axios.get(
        "http://localhost:5000/jewelry/with-auction"
      );
      setAuctions(
        auctionsResponse.data.sort((a, b) => new Date(a) - new Date(b))
      );
      console.log(auctions);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseEnter = (id) => {
    setHoveredCardId(id);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
  };

  return (
    <>
      <Row style={{ marginTop: 20 }}>
        {auctions &&
          auctions.map((au) => (
            <Col md={3} style={{ marginBottom: 20 }} key={au._id}>
              <Card
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 5,
                  border: "1px solid black",
                }}
              >
                <Card.Img
                  src={au.image}
                  style={{
                    width: "100%",
                    height: "299px",
                    position: "relative",
                    borderRadius: 5,
                  }}
                ></Card.Img>
                <Card.Body
                  style={{ position: "absolute" }}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <>
                    {au._id === hoveredCardId ? (
                      <>
                        <div
                          style={{
                            backgroundColor:
                              hoveredCardId === au._id
                                ? "rgba(0,0,0,0.8)"
                                : "transparent",
                            position: "relative",
                            color: "#0dcaf0",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "265px",
                            width: "330px",
                            borderRadius: 5,
                            zIndex: 2,
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          <Card.Text>
                            <h5 style={{ fontWeight: 600, fontSize: 22 }}>
                              {au.name}
                            </h5>
                            Type: {au.category}
                            <br />
                            <CountdownTimer
                              startTime={au.auctionStatus.startTime}
                              endTime={au.auctionStatus.endTime}
                            />
                            <br />
                            {au.auctionStatus.status === "Scheduled" &&
                            new Date(au.auctionStatus.startTime) - new Date() <=
                              3600000 &&
                            new Date(au.auctionStatus.startTime) - new Date() >
                              0 ? (
                              <Button variant="outline-info">
                                Place initial bid
                              </Button>
                            ) : (
                              <></>
                            )}
                            {au.auctionStatus.status === "Ongoing" ? (
                              <>
                                {au.auctionStatus.currentBid ? (
                                  <span>
                                    Current bidding: $
                                    {au.auctionStatus.currentBid || 0}{" "}
                                  </span>
                                ) : (
                                  <span>This item has no bid</span>
                                )}
                                <br />
                                <Button
                                  variant="outline-info"
                                  onClick={() => {
                                    nav(`/auction/${au.auctionStatus._id}`);
                                  }}
                                >
                                  Join bid
                                </Button>
                              </>
                            ) : (
                              <></>
                            )}
                          </Card.Text>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            height: "180px",
                          }}
                          onMouseEnter={() => handleMouseEnter(au._id)}
                        ></div>
                        <div
                          style={{
                            backgroundColor:
                              hoveredCardId === au._id
                                ? "rgba(0,0,0,0.8)"
                                : "rgba(0,0,0,0.6)",
                            position: "relative",
                            color: "#0dcaf0",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",

                            height: "100px",
                            width: "330px",
                            zIndex: 2,
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          <Row>
                            <Col md={12}>
                              <h5 style={{ fontWeight: 600, fontSize: 22 }}>
                                {au.name}
                              </h5>
                            </Col>
                            <Col md={8}>
                              {" "}
                              <CountdownTimer
                                startTime={au.auctionStatus.startTime}
                                endTime={au.auctionStatus.endTime}
                              />
                            </Col>
                            <Col md={4}>
                              <Button variant="outline-info">Detail</Button>
                            </Col>
                          </Row>
                        </div>
                      </>
                    )}
                  </>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}
