import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate, useLocation } from "react-router-dom";
import { useJewelry } from "../../../ManagerPages/Pages/components/JewelryProvider";

export default function ProductList() {
  const {
    jewelry,
    openModal,
    openModal2,
    confirmArrival,
    UnconfirmArrival,
    selected, // The selected pill state
  } = useJewelry();
  const loc = useLocation();
  const url = loc.pathname;
  const [filteredJewelry, setFilteredJewelry] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
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

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && jewelry.length) {
      const filtered = jewelry.filter((j) => {
        const valuationStaffId = j.assignedTo?.ValuationStaff?.toString();
        const auctionStaffId = j.assignedTo?.AuctionStaff?.toString();
        const deliveryStaffId = j.assignedTo?.DeliveryStaff?.toString();

        // Filtering based on the URL and selected pill
        if (url === "/staff/Valuation") {
          if (valuationStaffId === user._id) {
            if (selected === "Preliminary") return j.status === "Pending";
            if (selected === "Waiting")
              return (
                j.status === "Jewelry Sent" ||
                j.status === "Preliminary Valuation Requested"
              );
            if (selected === "Final")
              return (
                j.status === "Jewelry Arrival Confirmed" ||
                j.status === "Final Valuation Rejected"
              );
            if (selected === "Confirmation")
              return (
                j.status === "Final Valuation" ||
                j.status === "Final Valuation Confirmed" ||
                j.status === "Approved" ||
                j.status === "Rejected"
              );
          }
        }

        if (url === "/staff/Auction") {
          if (auctionStaffId === user._id) {
            if (selected === "Schedule") return j.status === "Scheduled";
            if (selected === "Ongoing") return j.status === "Scheduled";
          }
        }

        if (url === "/staff/Delivery") {
          if (deliveryStaffId === user._id) {
            if (selected === "Current") return j.status === "Auctioned";
            if (selected === "Completed") return j.status === "Sold";
          }
        }

        // Default case when no specific pill is selected
        return (
          valuationStaffId === user._id ||
          auctionStaffId === user._id ||
          deliveryStaffId === user._id
        );
      });

      setFilteredJewelry(filtered);
    }
  }, [jewelry, url, selected]); // Listen to `jewelry`, `url`, and `selected` for changes

  // This useEffect listens specifically for URL changes
  useEffect(() => {
    // Any specific logic you want to execute on URL change
    // In this case, the jewelry filtering logic will re-run due to the above useEffect
  }, [url]); // Triggers whenever the URL changes
  const steps = [
    { status: "Pending", color: "rgba(108, 117, 125, 1)", display: "Pending" },
    {
      status: "Preliminary Valuation Requested",
      color: "rgba(0, 123, 255, 1)",
      display: "Preliminary",
    },
    { status: "Jewelry Sent", color: "rgba(255, 193, 7, 1)", display: "Sent" },
    {
      status: "Jewelry Arrival Confirmed",
      color: "rgba(40, 167, 69, 1)",
      display: "Arrived",
    },
    {
      status: "Final Valuation",
      color: "rgba(255, 193, 7, 1)",
      display: "Valuating",
    },
    {
      status: "Final Valuation Rejected",
      color: "rgba(255, 193, 7, 1)",
      display: "Revaluate",
    },
    {
      status: "Final Valuation Confirmed",
      color: "rgba(40, 167, 69, 1)",
      display: "Confirmed by manager",
    },
    {
      status: "Approved",
      color: "rgba(40, 167, 69, 1)",
      display: "Approved by user",
    },
    {
      status: "Rejected",
      color: "rgba(220, 53, 69, 1)",
      display: "Rejected by user",
    },
    {
      status: "Auctioned",
      color: "rgba(23, 162, 184, 1)",
      display: "Auctioned",
    },
    { status: "Sold", color: "rgba(40, 167, 69, 1)", display: "Sold" },
  ];
  const DisplayStatus = (status) => {
    const current = steps.find((st) => st.status === status);
    return (
      <span
        style={{
          backgroundColor: current.color,
          borderRadius: 10,
          color: "white",
          padding: "5px 10px",
        }}
      >
        {current.display}
      </span>
    );
  };
  return (
    <>
      {filteredJewelry.map((jew) => (
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
                  <br />
                  <span>Status: {DisplayStatus(jew.status)}</span>
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
                      onClick={() => openModal2(jew)}
                    >
                      Final Valuation
                    </Button>
                  </>
                )}
                {jew.status === "Final Valuation" && (
                  <Button variant="outline-warning" style={{ width: 300 }}>
                    Waiting for manager's confirmation
                  </Button>
                )}
                {jew.status === "Final Valuation Rejected" && (
                  <div>
                    <span>
                      Last valuation:{" "}
                      <b style={{ fontWeight: 700, color: "red" }}>
                        ${jew.auctionDetails.finalValuation.value}
                      </b>
                      <br />
                      Status:{" "}
                      <b style={{ fontWeight: 700, color: "red" }}>
                        {jew.status}
                      </b>
                    </span>

                    <Button
                      variant="outline-warning"
                      style={{ width: 200 }}
                      onClick={() => openModal2(jew)}
                    >
                      Revaluate
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
}
