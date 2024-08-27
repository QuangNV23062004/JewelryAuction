import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CountdownTimer from "./components/CountdownTimer";
import { UserContext } from "../UserContext";

const AuctionRoom = () => {
  const { roomId } = useParams();
  const [bidAmount, setBidAmount] = useState(0);
  const [currentBid, setCurrentBid] = useState(null);
  const [currentAu, setCurrentAu] = useState({});
  const [allBid, setAllBid] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Join the auction room
    socket.emit("joinAuctionRoom", roomId);

    // Listen for new bids
    socket.on("newBid", (bid) => {
      setCurrentBid(bid);
      setAllBid((prevBids) => [...(prevBids || []), bid]); // Add new bid to allBid array
    });

    // Cleanup
    return () => {
      socket.emit("leaveAuctionRoom", roomId);
      socket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auctionsResponse = await axios.get(
          "http://localhost:5000/jewelry/with-auction"
        );
        const auction = auctionsResponse.data.find(
          (au) => au.auctionStatus._id === roomId
        );
        setCurrentAu(auction);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchData();
  }, [roomId]);

  const handlePlaceBid = () => {
    const socket = io("http://localhost:5000");
    console.log("handlePlaceBid");
    if (!currentAu || !user) {
      return;
    }
    if (user) console.log("User: " + user || null);
    if (currentAu) console.log("currentAu: " + currentAu || null);
    const bid = {
      auctionID: currentAu.auctionStatus?._id,
      userID: user._id,
      bidAmount: bidAmount,
      bidTime: new Date(),
    };

    socket.emit("placeBid", { roomId, bid });

    setBidAmount(0); // Reset the bid amount
  };

  return (
    <Container style={{ margin: "25px 0px" }}>
      {user && (
        <Row>
          {currentAu && (
            <>
              <Col md={8}>
                <Card style={{ width: "100%" }}>
                  <Row>
                    <Col md={3}>
                      <Card.Img
                        variant="top"
                        src={currentAu.image}
                        style={{ width: 220, height: 150 }}
                      />
                    </Col>
                    <Col md={9}>
                      <Card.Body>
                        <Card.Title
                          style={{
                            color: "gold",
                            fontSize: 25,
                            fontWeight: 700,
                          }}
                        >
                          {currentAu.name}
                        </Card.Title>
                        <Card.Text>
                          Type: {currentAu.category}
                          <br />
                          <CountdownTimer
                            startTime={currentAu.auctionStatus?.startTime}
                            endTime={currentAu.auctionStatus?.endTime}
                          />
                          <br />
                          Current Bid:{" "}
                          {currentBid?.amount ||
                            currentAu.auctionStatus?.currentBid ||
                            "No bids yet"}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
                <Row
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    marginTop: "20px",
                  }}
                >
                  {allBid.map((bid, index) => (
                    <Row key={index} style={{ marginBottom: "10px" }}>
                      <Col md={12}>
                        <div
                          style={{
                            padding: "10px",
                            backgroundColor: "#f1f1f1",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Bidder:</strong> {bid.user || "Anonymous"}{" "}
                          <br />
                          <strong>Amount:</strong> ${bid.amount || 0}
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <Col md={10}>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      style={{ width: "100%" }}
                      placeholder="Enter your bid"
                    />
                  </Col>
                  <Col md={2}>
                    <Button onClick={handlePlaceBid}>Place Bid</Button>
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      )}
    </Container>
  );
};

export default AuctionRoom;
