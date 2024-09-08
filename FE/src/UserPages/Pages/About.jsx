import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-bootstrap/Carousel";

export default function About() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item
          style={{
            width: "100%",
            height: "550px",

            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/013/347/032/large_2x/beautiful-precious-shiny-jewelery-trendy-glamorous-jewelry-set-necklace-earrings-rings-chains-brooches-with-pearls-and-diamonds-on-a-blue-background-flat-lay-top-view-copy-place-photo.jpg')",
            backgroundSize: "cover", // Optional: ensures the image covers the entire background
            backgroundPosition: "center", // Optional: centers the background image
          }}
        >
          <div>
            <img
              src="https://png.pngtree.com/background/20230426/original/pngtree-the-sapphire-necklace-is-shown-on-a-black-background-picture-image_2488980.jpg"
              alt="first"
              style={{
                width: "100%",
                height: "550px",
                position: "relative",
              }}
            />
            <h1
              style={{
                position: "absolute",

                color: "white",
                backgroundColor: "rgba(0,0,0,0.8)",
                padding: "50px 0px",
                top: "40%",
                left: "40%",
              }}
            >
              The Jewelry House
            </h1>
          </div>
        </Carousel.Item>

        <Carousel.Item
          style={{
            width: "100%",
            height: "550px",

            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/013/347/032/large_2x/beautiful-precious-shiny-jewelery-trendy-glamorous-jewelry-set-necklace-earrings-rings-chains-brooches-with-pearls-and-diamonds-on-a-blue-background-flat-lay-top-view-copy-place-photo.jpg')",
            backgroundSize: "cover", // Optional: ensures the image covers the entire background
            backgroundPosition: "center", // Optional: centers the background image
          }}
        >
          <Row style={{ margin: "100px 0px" }}>
            <Col md={5}>
              <section
                style={{
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
                  height: 350,
                  padding: "40px 20px",
                  width: "103%",
                  backgroundColor: "white",
                }}
              >
                <h2>Our Mission</h2>
                <p>
                  At{" "}
                  <span
                    style={{ fontSize: 18, fontWeight: 600, color: "blue" }}
                  >
                    The Jewelry House
                  </span>
                  , we are committed to revolutionizing online jewelry auctions.
                  Our mission is to create a seamless, transparent, and
                  user-friendly platform for both buyers and sellers, ensuring
                  fair bidding while showcasing exquisite jewelry. We aim to
                  provide an experience where users can confidently participate,
                  knowing their bids are secure and processed accurately.
                  Whether you're purchasing a beautiful piece or selling a
                  cherished item, <span>The Jewelry House</span> handles every
                  auction with professionalism and care.
                </p>
              </section>
            </Col>
            <Col md={7}>
              <img
                src="https://orowacorporation.com/wp-content/uploads/2020/08/mission-scaled.jpg"
                alt=""
                style={{
                  width: "100%",
                  height: "350px",
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
                }}
              />
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item
          style={{
            width: "100%",
            height: "550px",
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/013/347/032/large_2x/beautiful-precious-shiny-jewelery-trendy-glamorous-jewelry-set-necklace-earrings-rings-chains-brooches-with-pearls-and-diamonds-on-a-blue-background-flat-lay-top-view-copy-place-photo.jpg')",
            backgroundSize: "cover", // Optional: ensures the image covers the entire background
            backgroundPosition: "center", // Optional: centers the background image
          }}
        >
          <Row
            style={{
              margin: "100px 0px",
            }}
          >
            <Col md={5}>
              <section
                style={{
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
                  height: 350,
                  padding: "40px 20px",
                  width: "103%",
                  backgroundColor: "white",
                }}
              >
                <h2>Our Vision</h2>
                <p>
                  We envision a marketplace where everyone can take part in the
                  excitement of jewelry auctions, whether as a seasoned bidder
                  or a first-time seller. Our platform aims to connect
                  individuals and collectors from around the world, creating
                  opportunities for both buyers and sellers to engage in a
                  vibrant, global community. We believe in making luxurious and
                  unique pieces of jewelry accessible to all, while fostering
                  trust and fairness in every transaction. At{" "}
                  <span>The Jewelry House</span>, we are committed to providing
                  a platform that celebrates the beauty and value of jewelry,
                  while offering a seamless experience for everyone involved.
                </p>
              </section>
            </Col>
            <Col md={7}>
              <img
                src="http://metalus.qc.ca/wp-content/uploads/2019/10/Vision.jpg"
                alt=""
                style={{
                  width: "100%",
                  height: "350px",
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
                }}
              />
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item
          style={{
            width: "100%",
            height: "550px",

            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/013/347/032/large_2x/beautiful-precious-shiny-jewelery-trendy-glamorous-jewelry-set-necklace-earrings-rings-chains-brooches-with-pearls-and-diamonds-on-a-blue-background-flat-lay-top-view-copy-place-photo.jpg')",
            backgroundSize: "cover", // Optional: ensures the image covers the entire background
            backgroundPosition: "center", // Optional: centers the background image
          }}
        >
          <Row style={{ margin: "100px 0px" }}>
            <Col md={5}>
              <section
                style={{
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
                  height: 350,
                  padding: "40px 20px",
                  width: "103%",
                  backgroundColor: "white",
                }}
              >
                <h2>Our Values</h2>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faGem} />
                    <span>
                      Integrity: We maintain the highest standards of integrity
                      in our auction processes.
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faGem} />
                    <span>
                      Customer Focus: Our customers are at the heart of
                      everything we do.
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faGem} />
                    <span>
                      Innovation: We embrace technology to enhance our auction
                      platform.
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faGem} />
                    <span>
                      Community: We are committed to building a vibrant
                      community of jewelry enthusiasts.
                    </span>
                  </li>
                </ul>
              </section>
            </Col>
            <Col md={7}>
              <img
                src="https://fitsmallbusiness.com/wp-content/uploads/2023/04/FeatureImage_what_are_core_values.jpeg"
                alt=""
                style={{
                  width: "100%",
                  height: "350px",
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
                }}
              />
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item
          style={{
            width: "100%",
            height: "550px",

            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/013/347/032/large_2x/beautiful-precious-shiny-jewelery-trendy-glamorous-jewelry-set-necklace-earrings-rings-chains-brooches-with-pearls-and-diamonds-on-a-blue-background-flat-lay-top-view-copy-place-photo.jpg')",
            backgroundSize: "cover", // Optional: ensures the image covers the entire background
            backgroundPosition: "center", // Optional: centers the background image
          }}
        >
          <Row style={{ margin: "100px 0px" }}>
            <Col md={6}>
              <section
                style={{
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
                  height: 350,
                  padding: "80px 20px",
                  width: "103%",
                  backgroundColor: "white",
                }}
              >
                <h2>Our Services</h2>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <FontAwesomeIcon icon={faGem} />
                    <span>
                      Auction Management: We manage the entire auction process
                      from start to finish.
                    </span>
                  </li>

                  <li>
                    <FontAwesomeIcon icon={faGem} />
                    <span>
                      Valuation Services: Our experienced staff provides
                      professional valuations for jewelry.
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faGem} />
                    <span>
                      User-Friendly Platform: Our website is designed to be easy
                      to navigate.
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faGem} />
                    <span>
                      Customer Support: Our dedicated support team is available
                      to assist users.
                    </span>
                  </li>
                </ul>
              </section>
            </Col>
            <Col md={6}>
              <img
                src="https://searchengineland.com/wp-content/seloads/2023/04/How-to-create-service-pages-that-rank-and-convert.png"
                alt=""
                style={{
                  width: "100%",
                  height: "350px",
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
                }}
              />
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
