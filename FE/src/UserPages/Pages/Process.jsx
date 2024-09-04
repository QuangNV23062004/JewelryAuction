import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";

export default function Process() {
  const [selected, setSelected] = useState("");

  return (
    <>
      <Nav fill variant="tabs" style={{ boxShadow: "5px 1px 10px -2px black" }}>
        <Nav.Item
          style={{
            padding: 20,
            paddingTop: 30,
            borderBottom: selected === "Sell" ? "5px solid #007bff" : "none",
            cursor: "pointer",
          }}
        >
          <div
            onClick={() => {
              setSelected("Sell");
            }}
          >
            <h5 style={{ color: selected === "Sell" ? "#007bff" : "black" }}>
              Sell a Jewelry
            </h5>
          </div>
        </Nav.Item>

        <Nav.Item
          style={{
            padding: 20,
            paddingTop: 30,
            borderBottom: selected === "Auction" ? "5px solid #007bff" : "none",
            cursor: "pointer",
          }}
        >
          <div
            onClick={() => {
              setSelected("Auction");
            }}
          >
            <h5 style={{ color: selected === "Auction" ? "#007bff" : "black" }}>
              Auction a Jewelry
            </h5>
          </div>
        </Nav.Item>
      </Nav>

      {selected === "Sell" && (
        <div style={{ padding: 20 }}>
          <h5 style={{ marginBottom: "20px", color: "#007bff" }}>
            How to Sell a Jewelry
          </h5>
          <ul
            style={{
              paddingLeft: "20px",
              lineHeight: "1.6",
              listStyle: "none",
            }}
          >
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>
                Step 1: Submit Jewelry Auction Request
              </h6>
              <span>
                Begin by submitting a request and required information to the
                auction company to initiate the process of selling your jewelry.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>
                Step 2: Receive Preliminary Valuation
              </h6>
              <span>
                A staff member will provide an initial valuation of your jewelry
                based on the information provided. You will then be asked to
                send your jewelry to the company for a detailed assessment.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>
                Step 3: Send Jewelry to the Company
              </h6>
              <span>
                Package and send your jewelry to the auction company for a
                detailed evaluation.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>Step 4: Receive Final Valuation</h6>
              <span>
                After receiving your jewelry, the company will perform a final
                valuation and share the results with you.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>
                Step 5: Confirm Auction Participation
              </h6>
              <span>
                Review the final valuation and confirm whether you wish to
                proceed with the auction based on the given terms.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>
                Step 6: Receive Payment After Auction
              </h6>
              <span>
                After your jewelry is successfully auctioned, the payment will
                be processed and transferred to your account.
              </span>
            </li>
          </ul>
        </div>
      )}

      {selected === "Auction" && (
        <div style={{ padding: 20 }}>
          <h5 style={{ marginBottom: "20px", color: "#007bff" }}>
            How to Auction a Jewelry
          </h5>
          <ul
            style={{
              paddingLeft: "20px",
              lineHeight: "1.6",
              listStyle: "none",
            }}
          >
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>Step 1: Register for Auction</h6>
              <span>
                Sign up on the auction platform to participate in the upcoming
                auction sessions.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>
                Step 2: Place a Bid Before Auction Starts
              </h6>
              <span>
                Place your bid on the jewelry you’re interested in before the
                auction session begins to secure a spot as an initial bidder.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>
                Step 3: System Selects Highest Pre-Auction Bid
              </h6>
              <span>
                The auction system will automatically select the highest bid
                placed before the auction starts as the starting bid for the
                session.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>
                Step 4: Participate in Live Auction
              </h6>
              <span>
                Join the live auction session and place your bids in real time
                to compete for the jewelry.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>
                Step 5: Auction Outcome Notification
              </h6>
              <span>
                Receive a notification from the system indicating whether you
                have won or lost the auction.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>Step 6: Complete Payment</h6>
              <span>
                If you win, proceed with the payment process to finalize the
                purchase of the jewelry.
              </span>
            </li>
            <li style={listItemStyle}>
              <h6 style={stepHeaderStyle}>Step 7: Receive Jewelry Delivery</h6>
              <span>
                Once payment is complete, the jewelry will be delivered to your
                specified address.
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

const listItemStyle = {
  marginBottom: "15px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};

const stepHeaderStyle = {
  marginBottom: "5px",
  color: "#007bff",
};
