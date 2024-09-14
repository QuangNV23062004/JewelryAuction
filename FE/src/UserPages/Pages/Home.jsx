import React, { useState, useEffect } from "react";
import Carouseler from "./components/Carousel";
import { Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CountdownTimer from "./components/CountdownTimer";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
function formatDate(dateString) {
  if (!dateString) {
    return "N/A";
  }
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad with leading zero
  const year = date.getFullYear(); // Get full year

  const hours = String(date.getHours()).padStart(2, "0"); // Get hours and pad with leading zero
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Get minutes and pad with leading zero
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Get seconds and pad with leading zero

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}s`; // Format and return the date string
}

export default function Home() {
  const [jewelry, setJewelry] = useState([]);
  const [newjew, setNewJew] = useState([]);
  const [expensive, setExpensive] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
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
      const jewelryResponse = await axios.get(
        `http://localhost:5000/jewelry/with-auction`
      );

      const fetchedJewelry = jewelryResponse.data;
      console.log(fetchedJewelry);
      // Set jewelry data
      setJewelry(fetchedJewelry);

      // Extract auctions from each jewelry's auctionStatus
      const fetchedAuctions = fetchedJewelry.map((jew) => jew.auctionStatus);
      setAuctions(fetchedAuctions);

      // Sort by date for new arrivals
      const sortedByDate = [...fetchedJewelry].sort(
        (a, b) => new Date(b.statusUpdateDate) - new Date(a.statusUpdateDate)
      );

      // New arrivals with auction data
      setNewJew(sortedByDate.slice(0, 4));
      const sortedByPrice = fetchedJewelry
        .filter(
          (jew) =>
            jew.auctionStatus?.winnerBid !== undefined &&
            jew.auctionStatus?.winnerBid !== null
        )
        .sort((a, b) => b.auctionStatus.winnerBid - a.auctionStatus.winnerBid);
      // Sort by price for expensive jewelry
      let expensiveItems;
      const auctionObject = {
        _id: null,
        name: null,
        description: null,
        image: null,
        category: null,
        status: null,
        owner: null,
        auctionDetails: null,
        statusUpdateDate: null,
        createAt: null,
        assignedTo: null,
        auctionStatus: {
          _id: null,
          jewelryID: null,
          startTime: null,
          endTime: null,
          status: null,
          winner: null,
          winnerBid: null,
          currentBid: null,
        },
      };

      if (sortedByPrice.length === 1) {
        // If only one item, create two nulls, put the item in the second position
        expensiveItems = [auctionObject, sortedByPrice[0], auctionObject];
      } else if (sortedByPrice.length === 2) {
        // If two items, create one null and place them in the first two positions
        expensiveItems = [sortedByPrice[1], sortedByPrice[0], auctionObject];
      } else {
        // If three or more, return the top 3 items
        expensiveItems = sortedByPrice.slice(0, 3);
      }

      // Set the result
      setExpensive(expensiveItems);
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
      <ToastContainer></ToastContainer>
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
                        height: "75%",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        nav(`/detail/${jew._id}`);
                      }}
                    />

                    <ListGroup
                      className="list-group-flush"
                      style={{
                        position: "absolute",
                        bottom: "0%",
                        width: "100%",
                        border: "1px solid black",
                        borderRadius: "0px 0px 5px 5px",
                      }}
                    >
                      <ListGroup.Item
                        style={{
                          background: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        <Row>
                          <Col md={9}>
                            <Card.Title
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                nav(`/detail/${jew._id}`);
                              }}
                            >
                              <b style={{ color: "#e6e600" }}>{jew.name}</b>
                            </Card.Title>
                          </Col>
                          <Col md={3}>
                            <Button
                              variant="outline-warning"
                              onClick={() => {
                                const user = sessionStorage.getItem("user");
                                if (user) {
                                  nav(`/auction/${au.auctionStatus._id}`);
                                } else {
                                  toast.warn(
                                    <>
                                      You need to login to bid,to login please
                                      click{" "}
                                      <Link
                                        to="/login"
                                        style={{
                                          color: "white",
                                          cursor: "pointer",
                                        }}
                                      >
                                        here
                                      </Link>
                                    </>,
                                    {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "colored",
                                      transition: Bounce,
                                    }
                                  );
                                }
                              }}
                            >
                              Bid
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Category:</b> {jew.category}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Countdown:</b>
                        <CountdownTimer
                          user={user?._id || null}
                          startTime={jew.auctionStatus.startTime}
                          endTime={jew.auctionStatus.endTime}
                          winner={jew.auctionStatus?.winner || null}
                        />
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
                        style={{
                          width: "100%",
                          border: "2px solid black",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          nav(`/auction/category/${cat}`);
                        }}
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
            <h3 style={{ textAlign: "center", color: "#e6c900" }}>
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
                  key={index}
                >
                  <Card
                    style={{
                      width: "24rem",
                      height: "30rem",
                      marginTop: index === 1 ? 0 : index === 0 ? 20 : 40, // Adjust the margin
                      border: "1px solid rgba(0, 0, 0, 0.5)",
                      boxShadow: `0 4px 8px 0 ${
                        index === 1
                          ? "rgba(255, 215, 0, 0.6)" // Gold
                          : index === 0
                          ? "rgba(192, 192, 192, 0.6)" // Silver
                          : "rgba(205, 127, 50, 0.6)" // Bronze
                      }, 0 6px 20px 0 ${
                        index === 1
                          ? "rgba(255, 215, 0, 0.6)" // Gold
                          : index === 0
                          ? "rgba(192, 192, 192, 0.6)" // Silver
                          : "rgba(205, 127, 50, 0.6)" // Bronze
                      }`,
                      background: `linear-gradient(to bottom, ${
                        index === 1
                          ? "gold"
                          : index === 0
                          ? "silver"
                          : "rgba(232, 198, 77, 0.5)"
                      }, white)`,
                      color: "white",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        ex.image ||
                        "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"
                      }
                      style={{ height: "50%", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title
                        style={{
                          height: 80,
                          background: "rgba(0, 0, 0, 0.7)",
                          padding: "10px",
                          borderRadius: "5px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <b>{ex.name || "N/A"}</b>
                      </Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item
                          style={{ backgroundColor: "transparent" }}
                        >
                          <b>Category:</b> {ex.category || "N/A"}
                        </ListGroup.Item>
                        <ListGroup.Item
                          style={{ backgroundColor: "transparent" }}
                        >
                          <b>Auctioned price: </b>$
                          {ex.auctionStatus?.winnerBid || 0}
                        </ListGroup.Item>
                        <ListGroup.Item
                          style={{ backgroundColor: "transparent" }}
                        >
                          <b>
                            Ended time: {formatDate(ex.auctionStatus?.endTime)}
                          </b>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
          <Row style={{ margin: "10px 0px" }}>
            <Col md={4} style={{ textAlign: "center" }}>
              <span style={{ color: "silver", fontSize: 20, fontWeight: 600 }}>
                2nd place
              </span>
            </Col>
            <Col md={4} style={{ textAlign: "center" }}>
              <span style={{ color: "gold", fontSize: 20, fontWeight: 600 }}>
                1st place
              </span>
            </Col>
            <Col md={4} style={{ textAlign: "center" }}>
              <span
                style={{
                  color: "rgba(232, 198, 77, 1)",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                3rd place
              </span>
            </Col>
          </Row>{" "}
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
                <Card.Body></Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
