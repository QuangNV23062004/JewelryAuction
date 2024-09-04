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
      color: "#333",
      fontSize: "28px",
      marginBottom: "20px",
      fontWeight: 700,
      textAlign: "center",
      textTransform: "uppercase",
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
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>

      <Row>
        <Col md={6}>
          <section style={styles.section}>
            <h2 style={styles.subheading}>Our Mission</h2>
            <p style={styles.paragraph}>
              At{" "}
              <span style={{ fontSize: 18, fontWeight: 600, color: "blue" }}>
                The Jewelry House
              </span>
              , we are dedicated to revolutionizing the way jewelry auctions are
              conducted online. Our mission is to provide a seamless,
              transparent, and user-friendly platform for buyers and sellers,
              ensuring a fair bidding process while showcasing exquisite pieces
              of jewelry.
            </p>
          </section>
        </Col>
        <Col md={6}>
          <section style={styles.section}>
            <h2 style={styles.subheading}>Our Vision</h2>
            <p style={styles.paragraph}>
              We envision a marketplace where everyone can participate in the
              beauty of jewelry auctions, whether as a seasoned bidder or a
              first-time seller. We strive to connect individuals and collectors
              around the world, making luxurious jewelry accessible to all.
            </p>
          </section>
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
                  Community: We are committed to building a vibrant community of
                  jewelry enthusiasts.
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
                  Auction Management: We manage the entire auction process from
                  start to finish.
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
                  User-Friendly Platform: Our website is designed to be easy to
                  navigate.
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
  );
}
