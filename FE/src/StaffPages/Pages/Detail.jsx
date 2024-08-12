import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stepers from "./components/Stepers";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Detail() {
  const { id } = useParams();
  const [jew, setJew] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);

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

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/jewelry/${id}`);
      setJew(response.data);
    } catch (error) {
      console.log("Error fetching detail: " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!jew) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-4">
      <h1 style={{ margin: "50px 20px", textAlign: "center" }}>Detail</h1>
      <Stepers step={jew.status} />
      <Row className="mt-4">
        <Col md={6}>
          <Card style={{ height: "100%" }}>
            <Card.Header>Owner Details</Card.Header>
            <Card.Body>
              <Card.Text>
                <b>Full Name:</b> {jew.owner.fullName} <br />
                <b>Phone:</b> {jew.owner.phone} <br />
                <b>Email:</b> {jew.owner.email} <br />
                <b>Address:</b> {jew.owner.address}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ height: "100%" }}>
            <Card.Header>Jewelry Details</Card.Header>
            <Card.Body>
              <Card.Text>
                <b>Name:</b> {jew.name} <br />
                <b>Category:</b> {jew.category} <br />
                <b>Description:</b>{" "}
                <div style={{ display: "inline" }}>
                  {renderDescription(jew.description, jew._id)}
                  <Button
                    variant="link"
                    onClick={() => toggleExpandRow(jew._id)}
                    style={{ padding: 0, marginLeft: "5px" }}
                  >
                    {expandedRows.includes(jew._id) ? "Show Less" : "Show More"}
                  </Button>
                </div>
                <br />
                <b>Added at:</b> {formatDate(jew.createAt)} <br />
                <b>Last updated status:</b> {formatDate(jew.statusUpdateDate)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card style={{ height: "100%" }}>
            <Card.Header>Image</Card.Header>
            <Card.Body className="text-center">
              <img
                src={jew.image}
                alt="Jewelry"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card style={{ height: "100%" }}>
            <Card.Header>Status</Card.Header>
            <Card.Body className="text-center">
              <h5 style={{ marginTop: 75 }}>{jew.status}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
