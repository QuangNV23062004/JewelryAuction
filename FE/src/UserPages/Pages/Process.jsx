import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Process() {
  const [selected, setSelected] = useState("Sell");

  const sellSteps = [
    {
      title: "Submit Jewelry Auction Request",
      description:
        "Begin by submitting a request and required information to the auction company to initiate the process of selling your jewelry.",
      image:
        "https://cdn.windowsreport.com/wp-content/uploads/2020/04/Form-FIlling.jpg",
    },
    {
      title: "Receive Preliminary Valuation",
      description:
        "A staff member will provide an initial valuation of your jewelry based on the information provided. You will then be asked to send your jewelry to the company for a detailed assessment.",
      image:
        "https://www.myzillion.com/wp-content/uploads/2022/04/JewelryAppraisals-1.jpg",
    },
    {
      title: "Send Jewelry to the Company",
      description:
        "Package and send your jewelry to the auction company for a detailed evaluation.",
      image:
        "https://dfreight.org/wp-content/uploads/2022/09/Cargo-Packaging-DFreight-e1663069940358.jpg",
    },
    {
      title: "Receive Final Valuation",
      description:
        "After receiving your jewelry, the company will perform a final valuation and share the results with you.",
      image:
        "https://wjv.co.nz/wp-content/uploads/2022/03/WJV-e1646760815172.png",
    },
    {
      title: "Confirm Auction Participation",
      description:
        "Review the final valuation and confirm whether you wish to proceed with the auction based on the given terms.",
      image:
        "https://bebconsultancy.co.uk/wp-content/uploads/2018/10/Contracts-Agreements.jpg",
    },
    {
      title: "Receive Payment After Auction",
      description:
        "After your jewelry is successfully auctioned, the payment will be processed and transferred to your account.",
      image:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_508441367_93968.jpg",
    },
  ];

  const auctionSteps = [
    {
      title: "Register for Auction",
      description:
        "Sign up on the auction platform to participate in the upcoming auction sessions.",
      image: "https://static3.bigstockphoto.com/1/9/9/large1500/99141758.jpg",
    },
    {
      title: "Place a Bid Before Auction Starts",
      description:
        "Place your bid on the jewelry you’re interested in before the auction session begins to secure a spot as an initial bidder.",
      image:
        "https://images.ctfassets.net/hqqw1qsaw5d8/fb3c1abda7f942cfb8311d3546544dad/f2c3c3b9cbee8db201edcc93f870fabe/image.png",
    },
    {
      title: "System Selects Highest Pre-Auction Bid",
      description:
        "The auction system will automatically select the highest bid placed before the auction starts as the starting bid for the session.",
      image:
        "https://argonaut.au.reastatic.net/resi-property/prod/sales-events-web/national-85cb5ed2ddc717d22281.jpg",
    },
    {
      title: "Participate in Live Auction",
      description:
        "Join the live auction session and place your bids in real time to compete for the jewelry.",
      image:
        "https://64.media.tumblr.com/a6ec020c36a3908a4cc9cb641c170c2a/tumblr_inline_ob1377gt4B1ttano4_1280.jpg",
    },
    {
      title: "Auction Outcome Notification",
      description:
        "Receive a notification from the system indicating whether you have won or lost the auction.",
      image:
        "https://c8.alamy.com/comp/2DAP2J9/sold-hammer-auction-sale-concept-hand-drawn-isolated-vector-2DAP2J9.jpg",
    },
    {
      title: "Complete Payment",
      description:
        "If you win, proceed with the payment process to finalize the purchase of the jewelry.",
      image:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_508441367_93968.jpg",
    },
    {
      title: "Receive Jewelry Delivery",
      description:
        "Once payment is complete, the jewelry will be delivered to your specified address.",
      image:
        "https://www.tarinika.in/cdn/shop/files/Mobile_Shipping_1000x_d5b16f0c-1b77-47ac-bba5-8581a2b108b9_1600x.webp?v=1662306599",
    },
  ];

  const getSteps = () => (selected === "Sell" ? sellSteps : auctionSteps);

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
          onClick={() => setSelected("Sell")}
        >
          <h5 style={{ color: selected === "Sell" ? "#007bff" : "black" }}>
            Sell a Jewelry
          </h5>
        </Nav.Item>

        <Nav.Item
          style={{
            padding: 20,
            paddingTop: 30,
            borderBottom: selected === "Auction" ? "5px solid #007bff" : "none",
            cursor: "pointer",
          }}
          onClick={() => setSelected("Auction")}
        >
          <h5 style={{ color: selected === "Auction" ? "#007bff" : "black" }}>
            Auction a Jewelry
          </h5>
        </Nav.Item>
      </Nav>

      <Carousel style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.8)" }}>
        {getSteps().map((step, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block "
              src={step.image}
              alt={`Slide ${index + 1}`}
              style={{
                height: "550px",
                width: "80%",
                margin: "10px 10%",
              }}
            />
            <Carousel.Caption
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>{`Step ${index + 1}: ${step.title}`}</h3>
              <p>{step.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
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
