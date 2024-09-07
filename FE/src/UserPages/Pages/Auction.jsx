import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import CountdownTimer from "./components/CountdownTimer";
import { useNavigate } from "react-router-dom";
import { useJewelry } from "../../ManagerPages/Pages/components/JewelryProvider";
import InitialModal from "./components/InitialModal";

export default function Auction() {
  const [auctions, setAuctions] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const {
    openModal4,
    auction,
    setAuction,
    closeModal4,
    showModal4,
    selectedJewelry,
  } = useJewelry();
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      const auctionsResponse = await axios.get(
        "http://localhost:5000/jewelry/with-auction"
      );
      setAuctions(
        auctionsResponse.data.sort((a, b) => new Date(a) - new Date(b))
      );
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
  const handleOpenModal = async (au) => {
    // console.log(au);
    // console.log("jewId: " + au._id + ",AuId: " + au.auctionStatus._id);
    try {
      const Jewresponse = await axios.get(
        `http://localhost:5000/jewelry/${au._id}`
      );
      const AuResponse = await axios.get(
        `http://localhost:5000/auction/${au.auctionStatus._id}`
      );
      const jewelry = Jewresponse.data;
      const auction = AuResponse.data;
      // console.log("jewelry: ");
      // console.log(jewelry);
      // console.log("auction: ");
      // console.log(auction);
      openModal4(auction, jewelry);
    } catch (error) {
      console.log("Error handle open Modal");
    }
  };

  return (
    <>
      {selectedJewelry && (
        <InitialModal show={showModal4} onHide={closeModal4} />
      )}
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
                onMouseEnter={() => {
                  setHoveredCardId(au._id);
                }} // Moved onMouseEnter to Card level
                onMouseLeave={() => {
                  setHoveredCardId(null);
                }} // Moved onMouseLeave to Card level
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
                <Card.Body style={{ position: "absolute" }}>
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
                            padding: "0px 20px",
                          }}
                        >
                          <div>
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
                              60 * 60000 * 24 &&
                            new Date(au.auctionStatus.startTime) - new Date() >
                              0 ? (
                              <Button
                                variant="outline-info"
                                onClick={() => {
                                  handleOpenModal(au);
                                  // console.log(au);
                                }}
                              >
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
                                  variant="outline-success"
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
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        {/* default overlay */}
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
                            padding: "5px 10px",
                            width: "361px", //why is px is in width but 100% make it a column
                            zIndex: 2,
                            transition: "all 0.3s ease-in-out",
                            bottom: -267,
                            borderRadius: 5,
                            marginLeft: -16,
                            position: "absolute",
                          }}
                          onMouseEnter={() => handleMouseEnter(null)}
                          onMouseLeave={() => {
                            setHoveredCardId(au._id);
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
