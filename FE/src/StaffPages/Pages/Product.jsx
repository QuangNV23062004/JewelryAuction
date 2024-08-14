import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useJewelry } from "../../ManagerPages/Pages/components/JewelryProvider";

export default function Product() {
  const { jewelry, setJewelry, setOriginal, original, selected, setSelected } =
    useJewelry();
  const [expandedRows, setExpandedRows] = useState([]);
  const [show1, setShow1] = useState(false);
  const [id, setId] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const location = useLocation();
  const [SelectedJew, setSelectedJew] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleHover = (id) => {
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const SetIdAndOpenModal = (jew) => {
    setId(jew._id);
    setSelectedJew(jew);
    handleShow1();
  };

  const confirmArrival = async (jew) => {
    const NewUpdatedJewelry = {
      ...jew,
      status: "Jewelry Arrival Confirmed",
      statusUpdateDate: new Date(),
    };
    try {
      await axios.put(
        `http://localhost:5000/jewelry/${jew._id}`,
        NewUpdatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((jew) =>
          jew._id === id ? { ...jew, ...NewUpdatedJewelry } : jew
        )
      );
    } catch (error) {
      console.error("Error confirm arrival: " + error);
    }
  };

  const setValueUpdateAndClose = async (id) => {
    const updatedJewelry = {
      ...SelectedJew,
      auctionDetails: {
        ...SelectedJew.auctionDetails,
        initialValuation: {
          value: SelectedJew.initialValuation.value,
          staffID: user._id,
        },
      },
      status: "Preliminary Valuation Requested",
      statusUpdateDate: new Date(),
    };

    try {
      await axios.put(`http://localhost:5000/jewelry/${id}`, updatedJewelry);
      setJewelry((prevJewelry) =>
        prevJewelry.map((jew) =>
          jew._id === id ? { ...jew, ...updatedJewelry } : jew
        )
      );
      handleClose1();
    } catch (error) {
      console.error("Error send initial valuation: " + error);
    }
  };
  const currentURL = location.pathname;
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jewelry");
      const jew = response.data.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );

      let filteredJewelry = jew;

      switch (currentURL) {
        case "/staff/Valuation":
          filteredJewelry = jew.filter(
            (j) =>
              [
                "Pending",
                "Preliminary Valuation Requested",
                "Jewelry Sent",
                "Jewelry Arrival Confirmed",
              ].includes(j.status) && j.assignedTo?.ValuationStaff === user._id
          );
          break;
        case "/staff/Auction":
          filteredJewelry = jew.filter(
            (j) =>
              ["Scheduled", "Auctioned"].includes(j.status) &&
              j.assignedTo?.AuctionStaff === user._id
          );
          break;
        case "/staff/Delivery":
          filteredJewelry = jew.filter(
            (j) =>
              j.status === "Sold" && j.assignedTo?.DeliveryStaff === user._id
          );
          break;
        default:
          filteredJewelry = jew.filter(
            (j) =>
              j.assignedTo?.ValuationStaff === user._id ||
              j.assignedTo?.AuctionStaff === user._id ||
              j.assignedTo?.DeliveryStaff === user._id
          );
          break;
      }

      setJewelry(filteredJewelry);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const user = JSON.parse(sessionStorage.getItem("user"));
  }, [jewelry]);

  const toggleExpandRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const renderDescription = (description, id) => {
    const words = description.split(" ");
    const isExpanded = expandedRows.includes(id);

    if (isExpanded) {
      return description;
    }

    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };
  const nav = useNavigate();
  const handleViewDetail = (id) => {
    nav(`/staff/detail/${id}`);
  };
  return (
    <>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Preliminary valuation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="1000"
                value={SelectedJew?.initialValuation?.value || 0}
                onChange={(e) =>
                  setSelectedJew((prev) => ({
                    ...prev,
                    initialValuation: {
                      ...prev.initialValuation,
                      value: e.target.value,
                    },
                  }))
                }
              />
              <span>(unit is in $)</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setValueUpdateAndClose(id)}>
            Send & Request for jewelry
          </Button>
        </Modal.Footer>
      </Modal>

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
              <div
                onMouseEnter={() => handleHover(jew._id)}
                onMouseLeave={handleMouseLeave}
                style={{ opacity: 1 }}
              >
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
                {hovered === jew._id && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 200,
                      height: 148,
                      borderRadius: 5,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 1,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    {" "}
                    <Button
                      variant="outline-info"
                      onClick={() => handleViewDetail(jew._id)}
                    >
                      View Detail
                    </Button>
                  </div>
                )}
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
                  {" "}
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
                {jew.status === "Pending" ? (
                  <Button
                    variant="outline-primary"
                    style={{ width: 200 }}
                    onClick={() => SetIdAndOpenModal(jew)}
                  >
                    Preliminary valuation
                  </Button>
                ) : (
                  <></>
                )}
                <br />
                {jew.status === "Preliminary Valuation Requested" ? (
                  <Button
                    variant="outline-success"
                    style={{ width: 200 }}
                    onClick={() => confirmArrival(jew)}
                  >
                    Confirm arrival
                  </Button>
                ) : (
                  <></>
                )}
                <br />
                {jew.status === "Jewelry Arrival Confirmed" ? (
                  <Button variant="outline-warning" style={{ width: 200 }}>
                    Final valuation
                  </Button>
                ) : (
                  <></>
                )}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
}
