// StaffPages/Pages/ProductList.jsx
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate, useLocation } from "react-router-dom";
import { useJewelry } from "../../../ManagerPages/Pages/components/JewelryProvider";

export default function ProductList() {
  const { jewelry, openModal, openModal2, confirmArrival, UnconfirmArrival } =
    useJewelry();
  const [expandedRows, setExpandedRows] = useState([]);
  const location = useLocation();
  const nav = useNavigate();

  const toggleExpandRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const renderDescription = (description, id) => {
    const words = description.split(" ");
    const isExpanded = expandedRows.includes(id);
    return isExpanded
      ? description
      : words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };

  const handleViewDetail = (id) => {
    nav(`/staff/detail/${id}`);
  };

  return (
    <>
      {jewelry.map((jew) => (
        <Card
          style={{
            width: "95%",
            height: 150,
            margin: "10px 30px",
            boxShadow: "0 1px 5px -2px black",
          }}
          key={jew._id}
        >
          <Row>
            <Col md={2}>
              <div>
                <Card.Img
                  variant="top"
                  src={jew.image}
                  style={{
                    height: 148,
                    width: 200,
                    borderRadius: 5,
                    position: "relative",
                  }}
                />
              </div>
            </Col>
            <Col
              md={10}
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Card.Body
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Card.Title>
                  <h2>{jew.name}</h2>
                </Card.Title>
              </Card.Body>
              <Card.Body
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {jew.status === "Pending" && (
                  <Button
                    variant="outline-primary"
                    style={{ width: 200 }}
                    onClick={() => openModal(jew)}
                  >
                    Preliminary valuation
                  </Button>
                )}
                {(jew.status === "Preliminary Valuation Requested" ||
                  jew.status === "Jewelry Sent") && (
                  <>
                    <Button
                      variant="outline-primary"
                      style={{ width: 200 }}
                      onClick={() => confirmArrival(jew)}
                    >
                      Confirm arrival
                    </Button>
                  </>
                )}
                {jew.status === "Jewelry Arrival Confirmed" && (
                  <>
                    <Button
                      variant="outline-primary"
                      style={{ width: 200 }}
                      onClick={() => UnconfirmArrival(jew)}
                    >
                      Unconfirm arrival
                    </Button>
                    <Button
                      variant="outline-primary"
                      style={{ width: 200 }}
                      onClick={() => {
                        openModal2(jew);
                      }}
                    >
                      Final Valuation
                    </Button>
                  </>
                )}
                {jew.status === "Final Valuation" && (
                  <Button variant="outline-warning" style={{ width: 300 }}>
                    Waiting for manager' confirmation
                  </Button>
                )}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
}
