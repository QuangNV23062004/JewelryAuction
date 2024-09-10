// src/ManagerPages/Pages/components/Product.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Buttons from "./Buttons";
import { useLocation } from "react-router-dom";
import { useJewelry } from "./JewelryProvider";
import AuctionModal from "./AuctionModal"; // Import the AuctionModal

export default function Product({ userID }) {
  const {
    jewelry,
    setJewelry,
    setOriginal,
    selected,
    ManagerApprove,
    ManagerReject,
    openModal3, // Function to open the auction modal
    showModal3, // State to control AuctionModal visibility
    closeModal3, // Function to close the auction modal
    selectedJewelry, // Jewelry item selected for auction
  } = useJewelry();

  const [staffs, setStaffs] = useState([]);
  const [staffID, setStaffID] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const loc = useLocation();
  const path = loc.pathname;

  const handleAssignModalClose = () => setShowAssignModal(false);
  const handleAssignModalShow = (item) => {
    setSelectedJewelry(item);
    setShowAssignModal(true);
  };

  const handleSave = async () => {
    if (!selectedJewelry || !staffID) return;

    try {
      await axios.put(`http://localhost:5000/jewelry/${selectedJewelry._id}`, {
        ...selectedJewelry,
        assignedTo: {
          ...selectedJewelry.assignedTo,
          ValuationStaff: staffID,
        },
      });
      handleAssignModalClose();
      fetchData(); // Refresh the list after updating
    } catch (error) {
      console.error("Error assigning staff: " + error);
    }
  };

  const getStatusesByPath = (path) => {
    switch (path) {
      case "/manager/New":
        return ["Pending"];
      case "/manager/Valuating":
        return [
          "Preliminary Valuation Requested",
          "Jewelry Sent",
          "Jewelry Arrival Confirmed",
          "Final Valuation",
          "Final Valuation Rejected",
        ];
      case "/manager/Confirm":
        return ["Final Valuation Confirmed", "Approved", "Rejected"];
      case "/manager/Auctioning":
        return ["Scheduled", "Auctioned", "Sold"];
      default:
        return [];
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jewelry");
      const statuses = getStatusesByPath(path);
      const filteredJewelry = response.data
        .filter((j) => statuses.includes(j.status))
        .sort((a, b) => new Date(b.createAt) - new Date(a.createAt));

      setOriginal(filteredJewelry);
      applyFilter(selected, filteredJewelry); // Apply the current selected filter
      const response2 = await axios.get("http://localhost:5000/user");
      setStaffs(response2.data.filter((st) => st.role === 2));
    } catch (error) {
      console.error("Error fetching data: " + error);
    }
  };

  const applyFilter = (selectedFilter, data = original) => {
    if (selectedFilter === "Assigned") {
      setJewelry(data.filter((j) => j.assignedTo?.ValuationStaff));
    } else if (selectedFilter === "Unassigned") {
      setJewelry(data.filter((j) => !j.assignedTo?.ValuationStaff));
    } else {
      setJewelry(data); // Reset to original jewelry when "All" is selected
    }
  };

  useEffect(() => {
    fetchData();
  }, [path]); // Re-fetch data whenever the path changes

  const getStaffName = (id) => {
    const staff = staffs.find((staff) => staff._id === id);
    return staff ? staff.fullName : "No staff found";
  };

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
      color: "rgba(255, 193, 7, 1)",
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
    <div>
      {/* Assign Valuation Staff Modal */}
      <Modal show={showAssignModal} onHide={handleAssignModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Valuation Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            value={staffID}
            onChange={(e) => setStaffID(e.target.value)}
          >
            <option>Select a staff</option>
            {staffs &&
              staffs.map((st) => (
                <option key={st._id} value={st._id}>
                  {st.fullName}
                </option>
              ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAssignModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Auction Modal */}
      {selectedJewelry && (
        <AuctionModal
          show={showModal3} // Control the visibility of AuctionModal
          onHide={closeModal3} // Close the modal on demand
        />
      )}

      <div style={{ position: "fixed", width: "65%", zIndex: 1000 }}>
        <Buttons />
      </div>
      <h1 style={{ margin: "40px 0px" }}>Product List</h1>
      <ul>
        {jewelry &&
          jewelry.map((item) => (
            <Card
              style={{
                width: "95%",
                margin: "20px 0px",
                border: "1px solid black",
                height: 220,
              }}
              key={item._id}
            >
              <Row>
                <Col md={2} sm={2} xs={2}>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{
                      width: 200,
                      borderRadius: 5,
                      border: "1px solid black",
                      height: 220,
                    }}
                  />
                </Col>
                <Col md={10} sm={10} xs={10}>
                  <Card.Body style={{ paddingLeft: 50 }}>
                    <Card.Title style={{ padding: "20px " }}>
                      <h3>{item.name}</h3>
                      <Row>
                        <Col md={12}>
                          <span>
                            Current status: <b>{DisplayStatus(item.status)}</b>
                          </span>
                        </Col>
                        {item.status === "Final Valuation" && (
                          <Col md={12}>
                            <span>
                              Value: ${item.auctionDetails.finalValuation.value}
                            </span>{" "}
                            <br />
                            <span>
                              By:{" "}
                              {getStaffName(
                                item.auctionDetails.finalValuation.staffID
                              )}
                            </span>
                          </Col>
                        )}
                        <Col md={12} style={{ padding: "20px 10px" }}>
                          {item.status === "Approved" && (
                            <Button
                              variant="outline-success"
                              onClick={() => {
                                openModal3(item);
                              }}
                            >
                              Create auction
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Card.Title>
                    <span style={{ padding: "20px " }}>
                      {item.status === "Pending" ? (
                        item.assignedTo?.ValuationStaff ? (
                          <Button variant="success">Assigned</Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => handleAssignModalShow(item)}
                          >
                            Assign Valuation Staff
                          </Button>
                        )
                      ) : null}
                      {item.status === "Final Valuation" && (
                        <>
                          <br />
                          <Button
                            variant="outline-danger"
                            style={{ width: 200 }}
                            onClick={() => {
                              ManagerReject(item, userID);
                            }}
                          >
                            Reject
                          </Button>
                          <Button
                            variant="outline-success"
                            style={{ width: 200 }}
                            onClick={() => ManagerApprove(item, userID)}
                          >
                            Approve
                          </Button>
                        </>
                      )}
                    </span>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
      </ul>
    </div>
  );
}
