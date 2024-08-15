import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useJewelry } from "../../../ManagerPages/Pages/components/JewelryProvider";

export default function ProductModal() {
  const { showModal2, closeModal2, valuation, setValuation, submitValuation2 } =
    useJewelry();

  return (
    <Modal show={showModal2} onHide={closeModal2}>
      <Modal.Header closeButton>
        <Modal.Title>Final valuation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="1000"
              value={valuation}
              onChange={(e) => setValuation(e.target.value)}
            />
            <span>(unit is in $)</span>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal2}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            console.log("Submit button clicked"); // Debugging: Log when the button is clicked
            submitValuation2();
          }}
        >
          Send & Request for jewelry
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
