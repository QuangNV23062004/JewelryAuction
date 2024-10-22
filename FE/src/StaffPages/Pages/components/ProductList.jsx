import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate, useLocation } from "react-router-dom";
import { useJewelry } from "../../../ManagerPages/Pages/components/JewelryProvider";
import axios from "axios";

export default function ProductList() {
  const {
    jewelry,
    openModal,
    openModal2,
    confirmArrival,
    UnconfirmArrival,
    selected,
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
      let statuses = "all";
      let type = "all";

      if (url === "/staff/Valuation") {
        type = "valuation";
        switch (selected) {
          case "Preliminary":
            statuses = "Pending";
            break;
          case "Waiting":
            statuses = "Jewelry Sent,Preliminary Valuation Requested";
            break;
          case "Final":
            statuses = "Jewelry Arrival Confirmed,Final Valuation Rejected";
            break;
          case "Confirmation":
            statuses =
              "Final Valuation, Final Valuation Confirmed, Approved, Rejected";
            break;
          default:
            statuses = "all"; // Default fallback status
            break;
        }
      }

      if (url === "/staff/Auction") {
        type = "auction";
        switch (selected) {
          case "Schedule":
            statuses = "Scheduled";
            break;
          case "Ongoing":
            statuses = "Ongoing";
            break;
          default:
            statuses = "all"; // Default fallback status
            break;
        }
      }

      if (url === "/staff/Delivery") {
        type = "delivery";
        switch (selected) {
          case "Current":
            statuses = "Delivery";
            break;
          case "Completed":
            statuses = "Delivered";
            break;
          default:
            statuses = "all"; // Default fallback status
            break;
        }
      }

      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/jewelry/staff/by-status",
            {
              params: {
                userId: user._id,
                statuses: statuses,
                type: type,
              },
            }
          );
          console.log(response.data);
          setFilteredJewelry(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
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
      status: "Scheduled",
      color: "rgba(40, 167, 69, 1)",
      display: "Scheduled",
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
      {filteredJewelry.length > 0 &&
        filteredJewelry.map((jew) => (
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
