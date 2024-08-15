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

export default function Product() {
  const { jewelry, setJewelry, setOriginal, original, selected, setSelected } =
    useJewelry();
  const [staffs, setStaffs] = useState([]);
  const [staffID, setStaffID] = useState("");
  const [selectedJewelry, setSelectedJewelry] = useState(null);
  const [show, setShow] = useState(false);
  const loc = useLocation();
  const path = loc.pathname;

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setSelectedJewelry(item);
    setShow(true);
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
      handleClose();
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
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{ position: "fixed", width: "100%", zIndex: 1000 }}>
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
                      height: "100%",
                    }}
                  />
                </Col>
                <Col md={10} sm={10} xs={10}>
                  <Card.Body style={{ paddingLeft: 50 }}>
                    <Card.Title style={{ padding: "20px " }}>
                      <h3>{item.name}</h3>
                      <Row>
                        <Col md={6}>
                          <span>
                            Current status:{" "}
                            <b style={{ color: "red" }}>{item.status}</b>
                          </span>
                        </Col>
                        {item.status === "Final Valuation" ? (
                          <Col md={6}>
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
                        ) : (
                          <></>
                        )}
                      </Row>
                    </Card.Title>
                    <span style={{ padding: "20px " }}>
                      {item.status === "Pending" ? (
                        item.assignedTo?.ValuationStaff ? (
                          <Button variant="success">Assigned</Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => handleShow(item)}
                          >
                            Assign Valuation Staff
                          </Button>
                        )
                      ) : null}
                      {item.status === "Final Valuation" ? (
                        <>
                          <br />
                          <Button
                            variant="outline-danger"
                            style={{ width: 200 }}
                            onClick={() => {
                              console.log(item);
                            }}
                          >
                            Reject
                          </Button>
                          <Button
                            variant="outline-success"
                            style={{ width: 200 }}
                          >
                            Approve
                          </Button>
                        </>
                      ) : null}
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
