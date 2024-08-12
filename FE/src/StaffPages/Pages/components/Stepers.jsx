import React from "react";
import pending from "../../../../icon/pending.png";
import preliminary from "../../../../icon/preliminary.png";
import arrived from "../../../../icon/arrival.png";
import final from "../../../../icon/final.png";
import approve from "../../../../icon/approve.png";
import auction from "../../../../icon/auction.png";
import confirmed from "../../../../icon/confirmed.png";
import reject from "../../../../icon/reject.png";
import sold from "../../../../icon/sold.png";
import sent from "../../../../icon/sent.png";
export default function Stepers({ step }) {
  const steps = [
    { status: "Pending", image: pending, display: "Pending" },
    {
      status: "Preliminary Valuation Requested",
      image: preliminary,
      display: "Preliminary",
    },
    { status: "Jewelry Sent", image: sent, display: "Sent" },
    { status: "Jewelry Arrival Confirmed", image: arrived, display: "Arrived" },
    { status: "Final Valuation", image: final, display: "Final" },
    {
      status: "Final Valuation Confirmed",
      image: confirmed,
      display: "Confirmed",
    },
    { status: "Approved", image: approve, display: "Approved" },
    { status: "Rejected", image: reject, display: "Rejected" },
    { status: "Auctioned", image: auction, display: "Auctioned" },
    { status: "Sold", image: sold, display: "Sold" },
  ];

  const currentIndex = steps.findIndex((st) => st.status === step) + 1;

  const getBackgroundColor = (index) => {
    if (index < currentIndex) return "#28a745"; // Bootstrap 'success' color
    if (index === currentIndex) return "#ffc107"; // Bootstrap 'warning' color
    return "#6c757d"; // Bootstrap 'secondary' color
  };

  return (
    <div className="d-flex justify-content-around align-items-center w-100 position-relative">
      {steps.map((step, index) => (
        <div
          key={index}
          className="text-center position-relative"
          style={{ width: "11%" }}
        >
          <div
            style={{
              height: 100,
              width: 100,
              border: "2px solid black",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: getBackgroundColor(index),
              color: index === currentIndex ? "black" : "white",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src={step.image}
              alt={step.display}
              style={{ width: 70, height: 70 }}
            />
          </div>
          <div className="mt-3" style={{ width: 100, textAlign: "center" }}>
            <h6>{step.display}</h6>
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                position: "absolute",
                top: "35%",
                left: "50%",
                width: "calc(100% + 20px)",
                height: "5px",
                backgroundColor: "black",
                zIndex: 0,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
