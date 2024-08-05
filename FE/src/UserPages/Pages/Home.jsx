import React, { useState, useEffect } from "react";
import Carouseler from "./components/Carousel";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function Home() {
  //axios get from this api: http://localhost:5000/jewelry
  const [jewelry, setJewelry] = useState([]);
  const [newjew, setNewJew] = useState([]);
  const [expensive, setExpensive] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const link = {
    Ring: "https://i5.walmartimages.com/asr/c7fab786-8103-4f9f-91b3-b9c37af9ae6f.bd6c1972b42a459b7794e8faf5236bf3.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
    Brooch:
      "https://tse4.mm.bing.net/th?id=OIP.laDlt6sJqzTt6J2fK-zkhwHaHa&pid=Api&P=0&h=180",
    Earring:
      "https://tse4.mm.bing.net/th?id=OIP.bFyJrk_V5ctRBae1r0XNDgHaHa&pid=Api&P=0&h=180",
    Bracelet:
      "https://a.1stdibscdn.com/diamond-gold-bracelet-for-sale/1121189/j_124883721623335043523/12488372_master.jpg",
    Anklet:
      "https://i.pinimg.com/originals/aa/1b/24/aa1b249a3124e3446bd00327307347fd.jpg",
    Cufflink:
      "https://a.1stdibscdn.com/archivesE/jewelry/upload/28/755/XXX_28_1367172761_1.jpg",
    Pendant:
      "https://i.etsystatic.com/6382786/r/il/366e41/2174784857/il_fullxfull.2174784857_dx2y.jpg",
    Necklace: "http://imgs.inkfrog.com/pix/yzl/W005N1655.jpg",
  };
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
    console.log(categories);
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
            <Carousel responsive={responsive}>
              {categories &&
                categories.map((cat, index) => (
                  <React.Fragment key={index}>
                    <Col md={1}></Col>
                    <Col
                      md={10}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 50,
                      }}
                    >
                      <Card
                        style={{ width: "100%", border: "2px solid black" }}
                      >
                        <Card.Img
                          variant="top"
                          src={link[cat]}
                          style={{
                            position: "relative",
                            borderBottom: "1px solid black",
                            width: "100%",
                            maxHeight: 202,
                            borderRadius: "5px",
                          }}
                        />

                        <Card.Body
                          style={{
                            position: "absolute",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            background: "rgba(0, 0, 0, 0.6)",
                            width: "100%",
                            borderRadius: "0px 0px 5px 5px",
                            top: "68%",
                          }}
                        >
                          <Card.Title>{cat}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={1}></Col>
                  </React.Fragment>
                ))}
            </Carousel>
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
            {expensive &&
              expensive.map((ex, index) => (
                <Col
                  md={4}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card style={{ width: "22 rem" }}>
                    <Card.Img variant="top" src={ex.image} />
                    <Card.Body>
                      <Card.Title>
                        {" "}
                        <b>{ex.name}</b>
                      </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        {" "}
                        <b>Category:</b> {ex.category}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {" "}
                        <b>Auctioned price: </b>
                        {ex.finalizedPrice}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {" "}
                        <b>Auctioned time: </b>
                      </ListGroup.Item>
                    </ListGroup>
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