import React, { useState, useEffect } from "react";
import Carouseler from "./components/Carousel";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
export default function Home() {
  //axios get from this api: http://localhost:5000/jewelry
  const [jewelry, setJewelry] = useState([]);
  const [newjew, setNewJew] = useState([]);
  const [expensive, setExpensive] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/jewelry`);
      const fetchedJewelry = response.data;

      // Update state with fetched data
      setJewelry(fetchedJewelry);

      // Sort by statusUpdateDate and get the latest 4 items
      const sortedByDate = [...fetchedJewelry].sort(
        (a, b) => new Date(b.statusUpdateDate) - new Date(a.statusUpdateDate)
      );
      setNewJew(sortedByDate.slice(0, 4));

      // Sort by finalizedPrice and get the top 3 expensive items
      const sortedByPrice = [...fetchedJewelry].sort(
        (a, b) => b.finalizedPrice?.value - a.finalizedPrice?.value
      );
      setExpensive(sortedByPrice.slice(0, 3));

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(fetchedJewelry.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Carouseler></Carouseler>

      <Row style={{ margin: "40px 0px" }}>
        <Col md={12}>
          <div style={{ marginBottom: 40 }}>
            <h3
              style={{
                textAlign: "center",
                color: "#e6c900",
              }}
            >
              <span style={{ borderBottom: "5px solid #e6c900" }}>
                <b>DISCOVER OUR NEW ARRIVALS</b>
              </span>
            </h3>
          </div>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            {newjew &&
              newjew.map((jew) => (
                <Col
                  md={3}
                  style={{ display: "flex", justifyContent: "center" }}
                  key={jew._id}
                >
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={jew.image}
                      style={{
                        position: "relative",
                        border: "1px solid black",
                      }}
                    />

                    <ListGroup
                      className="list-group-flush"
                      style={{
                        position: "absolute",
                        top: "54%",
                        width: "100%",
                        border: "1px solid black",
                        borderRadius: "0px 0px 5px 5px",
                      }}
                    >
                      <ListGroup.Item
                        style={{
                          height: 100,
                          background: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        <Card.Title>
                          {" "}
                          <b style={{ color: "#e6e600" }}>{jew.name}</b>
                        </Card.Title>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {" "}
                        <b>Category:</b> {jew.category}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {" "}
                        <b>Countdown:</b>{" "}
                      </ListGroup.Item>
                    </ListGroup>

                    <Card.Body>
                      <Card.Link href="#">Card Link</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
      <Row style={{ margin: "40px 0px" }}>
        <Col md={12}>
          <div style={{ marginBottom: 40 }}>
            <h3
              style={{
                textAlign: "center",
                color: "#e6c900",
              }}
            >
              <span style={{ borderBottom: "5px solid #e6c900" }}>
                <b>EXPLORE OUR CATEGORIES</b>
              </span>
            </h3>
          </div>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            {categories &&
              categories.map((cat, index) => (
                <Col
                  md={3}
                  style={{ display: "flex", justifyContent: "center" }}
                  key={index}
                >
                  <Card style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>{cat}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
      <Row style={{ margin: "40px 0px" }}>
        <Col md={12}>
          <div style={{ marginBottom: 40 }}>
            <h3
              style={{
                textAlign: "center",
                color: "#e6c900",
              }}
            >
              <span style={{ borderBottom: "5px solid #e6c900" }}>
                <b>PAST PREMIUM AUCTION JEWELRY</b>
              </span>
            </h3>
          </div>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Col md={4} style={{ display: "flex", justifyContent: "center" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="holder.js/100px180?text=Image cap"
                />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Card.Link href="#">Card Link</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ margin: "40px 0px" }}>
        <Col md={12}>
          <div style={{ marginBottom: 40 }}>
            <h3
              style={{
                textAlign: "center",
                color: "#e6c900",
              }}
            >
              <span style={{ borderBottom: "5px solid #e6c900" }}>
                <b>CUSTOMERS' REVIEW & FEEDBACKS</b>
              </span>
            </h3>
          </div>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Col md={4} style={{ display: "flex", justifyContent: "center" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="holder.js/100px180?text=Image cap"
                />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Card.Link href="#">Card Link</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
