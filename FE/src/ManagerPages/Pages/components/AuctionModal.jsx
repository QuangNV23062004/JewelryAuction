import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import { useJewelry } from "./JewelryProvider";

export default function AuctionModal() {
  const [auctionDetails, setAuctionDetails] = useState({
    startTime: "",
    endTime: "",
  });
  const { CreateAuction, showModal3, closeModal3, selectedJewelry } =
    useJewelry();

  const handleAuctionSave = () => {
    if (selectedJewelry && auctionDetails.startTime && auctionDetails.endTime) {
      CreateAuction(
        selectedJewelry,
        auctionDetails.startTime,
        auctionDetails.endTime
      );
    }
    closeModal3();
  };

  return (
    <Modal show={showModal3} onHide={closeModal3}>
      <Modal.Header closeButton>
        <Modal.Title>Create Auction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <Card.Img
            variant="top"
            src={selectedJewelry.image}
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{selectedJewelry.name}</Card.Title>
            <Card.Text>
              Category: {selectedJewelry.category}
              <br />
              Initial Valuation: $
              {selectedJewelry.auctionDetails.initialValuation.value}
              <br />
              Final Valuation: $
              {selectedJewelry.auctionDetails.finalValuation.value}
            </Card.Text>
          </Card.Body>
        </Card>
        <Form>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={auctionDetails.startTime}
              onChange={(e) =>
                setAuctionDetails({
                  ...auctionDetails,
                  startTime: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={auctionDetails.endTime}
              onChange={(e) =>
                setAuctionDetails({
                  ...auctionDetails,
                  endTime: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal3}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAuctionSave}>
          Save Auction
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
