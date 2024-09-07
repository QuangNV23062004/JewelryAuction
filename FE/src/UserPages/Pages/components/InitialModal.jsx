import { useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { useJewelry } from "../../../ManagerPages/Pages/components/JewelryProvider"; // Adjust the import based on your file structure
import CountdownTimer from "./CountdownTimer";

export default function InitialModal() {
  const {
    SendInitialPrice,
    showModal4,
    closeModal4,
    selectedJewelry,
    auction,
  } = useJewelry();
  const [bidAmount, setBidAmount] = useState(""); // Local state to hold the bid amount

  const handleBidSubmit = () => {
    const newBid = {
      auctionID: auction._id,
      userID: JSON.parse(sessionStorage.getItem("user"))._id, // Replace with actual user ID
      bidAmount: parseFloat(bidAmount),
      bidTime: new Date(),
      status: bidAmount > auction.currentBid ? "Winning" : "Outbid", // Set initial status as winning
    };
    SendInitialPrice(newBid); // Call the function from the provider
    closeModal4(); // Close the modal after submitting
  };

  return (
    <>
      <Modal show={showModal4} onHide={closeModal4}>
        <Modal.Header closeButton>
          <Modal.Title>Place Initial Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            style={{ width: "100%", display: "flex", flexDirection: "row" }}
          >
            <Card.Img
              variant="top"
              src={selectedJewelry.image}
              style={{ width: 180, height: 150, objectFit: "fill" }}
            />
            <Card.Body>
              <Card.Title>{selectedJewelry.name}</Card.Title>
              <Card.Text>
                Category: {selectedJewelry.category}
                <br />
                <CountdownTimer
                  startTime={auction.startTime}
                  endTime={auction.endTime}
                ></CountdownTimer>{" "}
                <br />
                Current Initial Bid: ${auction.currentBid || 0}
              </Card.Text>
            </Card.Body>
          </Card>
          <Form>
            <Form.Group controlId="initialBidAmount">
              <Form.Label>Initial Bid Amount(unit in $)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your bid"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min="1"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal4}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBidSubmit}>
            Place Bid
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
