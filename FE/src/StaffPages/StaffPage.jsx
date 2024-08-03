import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function StaffPage() {
  const [jewelry, setJewelry] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [show1, setShow1] = useState(false);
  const [id, setId] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [selected, setSelected] = useState(null);

  const SetIdAndOpenModal = (jew) => {
    setId(jew._id);
    setSelected(jew);
    handleShow1();
  };

  const setValueUpdateAndClose = async (id) => {
    const updatedJewelry = {
      ...selected,
      auctionDetails: {
        ...selected.auctionDetails,
        initialValuation: {
          value: selected.initialValuation.value,
          staffID: user._id,
        },
      },
      status: "Preliminary Valuation Requested",
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
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jewelry");
      setJewelry(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const user = JSON.parse(sessionStorage.getItem("user"));
  }, []);

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
                value={selected?.initialValuation?.value || 0}
                onChange={(e) =>
                  setSelected((prev) => ({
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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Owner details
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Jewelry detail
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Image
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Status
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {jewelry.map((jew) => (
            <tr key={jew._id}>
              <td style={{ width: "25%" }}>
                <b>Full name: </b>
                {jew.owner.fullName} <br />
                <b>Phone:</b>
                {jew.owner.phone} <br />
                <b>Email:</b>
                {jew.owner.email} <br />
                <b>Address:</b>
                {jew.owner.address}
              </td>
              <td style={{ width: "40%" }}>
                <b>Name:</b> {jew.name} <br />
                <b>Category:</b> {jew.category} <br />
                <b>Description: </b>
                <div style={{ display: "inline" }}>
                  {renderDescription(jew.description, jew._id)}
                  <button
                    onClick={() => toggleExpandRow(jew._id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "blue",
                      cursor: "pointer",
                      padding: 0,
                      marginLeft: "5px",
                    }}
                  >
                    {expandedRows.includes(jew._id) ? "Show Less" : "Show More"}
                  </button>
                </div>
              </td>
              <td style={{ width: "8%" }}>
                <img src={jew.image} alt="" style={{ maxWidth: "100px" }} />
              </td>
              <td style={{ width: "15%", textAlign: "center" }}>
                {" "}
                <span>{jew.status}</span>
              </td>
              <td>
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
                  <Button variant="outline-success" style={{ width: 200 }}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
