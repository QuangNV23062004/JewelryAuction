// StaffPages/Pages/ProductModal.jsx
import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useJewelry } from "../../../ManagerPages/Pages/components/JewelryProvider";

export default function ProductModal() {
  const { showModal, closeModal, valuation, setValuation, submitValuation } =
    useJewelry();

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Preliminary valuation</Modal.Title>
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
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={submitValuation}>
          Send & Request for jewelry
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
