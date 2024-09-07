import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-solid-svg-icons";

export default function About() {
  const styles = {
    container: {
      padding: "40px 20px",
      maxWidth: "100%",
      margin: "0 auto",
      fontFamily: "'Georgia', serif",
      lineHeight: "1.8",
      backgroundColor: "#f7f7f7",
    },
    heading: {
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: "50px 100px",
      color: "white",
      fontSize: "28px",
      marginBottom: "20px",
      fontWeight: 700,
      textAlign: "center",
      textTransform: "uppercase",
      position: "absolute", // Absolute positioning for the heading
      top: "50%", // Center it vertically
      left: "50%", // Center it horizontally
      transform: "translate(-50%, -50%)", // To account for the heading’s size and fully center it
      zIndex: 1, // Ensure it's on top of the image
      font: "'Georgia', serif",
    },
    subheading: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#555",
      marginBottom: "15px",
    },
    paragraph: {
      fontSize: "16px",
      color: "#444",
    },
    section: {
      marginBottom: "30px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      height: "230px",
    },
    list: {
      listStyleType: "none",
      paddingLeft: 0,
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    icon: {
      marginRight: "10px",
      color: "#007bff",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
    linkHover: {
      textDecoration: "underline",
    },
    imageContainer: {
      position: "relative", // Ensure this is the positioned ancestor
      marginBottom: 20,
    },
    image: {
      height: "350px",
      width: "100%",
      margin: "0px 0%",
      borderRadius: 5,
    },
  };

  return (
    <>
      <div style={styles.imageContainer}>
        <img
          src="https://zeevector.com/wp-content/uploads/Jewellery-Banner-Design-HD.png"
          alt=""
          style={styles.image}
        />
        <h1 style={styles.heading}>The Jewelry House</h1>
      </div>
      <div style={styles.container}>
        <Row>
          <Col md={3}>
            <img
              src="https://orowacorporation.com/wp-content/uploads/2020/08/mission-scaled.jpg"
              alt=""
              style={{ height: "230px", borderRadius: 5 }}
            />
          </Col>
          <Col md={9}>
            <section style={styles.section}>
              <h2 style={styles.subheading}>Our Mission</h2>
              <p style={styles.paragraph}>
                At{" "}
                <span style={{ fontSize: 18, fontWeight: 600, color: "blue" }}>
                  The Jewelry House
                </span>
                , we are committed to revolutionizing online jewelry auctions.
                Our mission is to create a seamless, transparent, and
                user-friendly platform for both buyers and sellers, ensuring
                fair bidding while showcasing exquisite jewelry. We aim to
                provide an experience where users can confidently participate,
                knowing their bids are secure and processed accurately. Whether
                you're purchasing a beautiful piece or selling a cherished item,{" "}
                <span style={{ fontSize: 18, fontWeight: 600, color: "blue" }}>
                  The Jewelry House
                </span>{" "}
                handles every auction with professionalism and care.
              </p>
            </section>
          </Col>

          <Col md={9}>
            <section style={styles.section}>
              <h2 style={styles.subheading}>Our Vision</h2>
              <p style={styles.paragraph}>
                We envision a marketplace where everyone can take part in the
                excitement of jewelry auctions, whether as a seasoned bidder or
                a first-time seller. Our platform aims to connect individuals
                and collectors from around the world, creating opportunities for
                both buyers and sellers to engage in a vibrant, global
                community. We believe in making luxurious and unique pieces of
                jewelry accessible to all, while fostering trust and fairness in
                every transaction. At{" "}
                <span style={{ fontSize: 18, fontWeight: 600, color: "blue" }}>
                  The Jewelry House
                </span>
                , we are committed to providing a platform that celebrates the
                beauty and value of jewelry, while offering a seamless
                experience for everyone involved.
              </p>
            </section>
          </Col>
          <Col md={3}>
            <img
              src="http://metalus.qc.ca/wp-content/uploads/2019/10/Vision.jpg"
              alt=""
              style={{ height: "230px", borderRadius: 5 }}
            />
          </Col>
          <Col md={6}>
            <section style={styles.section}>
              <h2 style={styles.subheading}>Our Values</h2>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <FontAwesomeIcon icon={faGem} style={styles.icon} />
                  <span>
                    Integrity: We maintain the highest standards of integrity in
                    our auction processes.
                  </span>
                </li>
                <li style={styles.listItem}>
                  <FontAwesomeIcon icon={faGem} style={styles.icon} />
                  <span>
                    Customer Focus: Our customers are at the heart of everything
                    we do.
                  </span>
                </li>
                <li style={styles.listItem}>
                  <FontAwesomeIcon icon={faGem} style={styles.icon} />
                  <span>
                    Innovation: We embrace technology to enhance our auction
                    platform.
                  </span>
                </li>
                <li style={styles.listItem}>
                  <FontAwesomeIcon icon={faGem} style={styles.icon} />
                  <span>
                    Community: We are committed to building a vibrant community
                    of jewelry enthusiasts.
                  </span>
                </li>
              </ul>
            </section>
          </Col>
          <Col md={6}>
            <section style={styles.section}>
              <h2 style={styles.subheading}>Our Services</h2>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <FontAwesomeIcon icon={faGem} style={styles.icon} />
                  <span>
                    Auction Management: We manage the entire auction process
                    from start to finish.
                  </span>
                </li>
                <li style={styles.listItem}>
                  <FontAwesomeIcon icon={faGem} style={styles.icon} />
                  <span>
                    Valuation Services: Our experienced staff provides
                    professional valuations for jewelry.
                  </span>
                </li>
                <li style={styles.listItem}>
                  <FontAwesomeIcon icon={faGem} style={styles.icon} />
                  <span>
                    User-Friendly Platform: Our website is designed to be easy
                    to navigate.
                  </span>
                </li>
                <li style={styles.listItem}>
                  <FontAwesomeIcon icon={faGem} style={styles.icon} />
                  <span>
                    Customer Support: Our dedicated support team is available to
                    assist users.
                  </span>
                </li>
              </ul>
            </section>
          </Col>
        </Row>
      </div>
    </>
  );
}
