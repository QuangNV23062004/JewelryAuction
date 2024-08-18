import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { Row } from "react-bootstrap";
import { useJewelry } from "../../../ManagerPages/Pages/components/JewelryProvider";

export default function Buttons() {
  const { setSelected } = useJewelry();
  const nav = useNavigate();
  const [buttons, setButtons] = useState([
    "All",
    "Valuation",
    "Auction",
    "Delivery",
  ]);
  const [pills, setPills] = useState([]);
  const [selectedButton, setSelectedButton] = useState("All");
  const [selectedPill, setSelectedPill] = useState(null);

  const buttonStyle = {
    borderRadius: "50px",
    padding: "5px 20px",
    fontSize: "16px",
    backgroundColor: "white",
    color: "#007bff",
    width: "150px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    border: "1px solid #007bff",
  };

  const hoverStyle = {
    backgroundColor: "#007bff",
    color: "white",
  };

  const [isHovered, setIsHovered] = useState("");

  useEffect(() => {
    switch (selectedButton) {
      case "Valuation":
        setPills(["Preliminary", "Waiting", "Final", "Confirmation"]);
        break;
      case "Auction":
        setPills(["Schedule", "Ongoing"]);
        break;
      case "Delivery":
        setPills(["Current", "Completed"]);
        break;
      default:
        setPills([]);
        break;
    }
  }, [selectedButton]);

  const handleButton = (button) => {
    setSelectedButton(button);
    setSelectedPill(null); // Reset pill selection
    setSelected(button);
    nav(`/staff/${button}`);
  };

  const handlePill = (pill) => {
    setSelectedPill(pill);
    setSelected(pill);
  };

  return (
    <>
      <div style={{ backgroundColor: "whitesmoke" }}>
        {buttons.map((button, index) => (
          <button
            key={index}
            style={{
              backgroundColor: "white",
              border: "none",
              borderBottom:
                selectedButton === button ? "5px solid #0d6efd" : "none",
              color: selectedButton === button ? "#0d6efd" : "black",
              display: "inline-block",
              width: `${100 / buttons.length}%`,
              padding: "20px 0px",
            }}
            onClick={() => handleButton(button)}
          >
            {button}
          </button>
        ))}

        <div
          style={{
            margin: "5px 10px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          {pills &&
            pills.map((pill, index) => (
              <button
                key={index}
                style={{
                  ...buttonStyle,
                  ...(isHovered === pill || selectedPill === pill
                    ? hoverStyle
                    : {}),
                }}
                onMouseEnter={() => setIsHovered(pill)}
                onMouseLeave={() => setIsHovered("")}
                onClick={() => handlePill(pill)}
              >
                {pill}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
