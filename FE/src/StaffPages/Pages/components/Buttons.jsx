import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { Row } from "react-bootstrap";
export default function Buttons() {
  const nav = useNavigate();
  const [selected, setSelected] = useState("All");
  const [buttons, setButtons] = useState([
    "All",
    "Valuation",
    "Auction",
    "Delivery",
  ]);
  const [pills, setPills] = useState([]);

  const buttonStyle = {
    borderRadius: "50px", // Makes the button pill-shaped
    padding: "5px 20px", // Adjust padding as needed
    fontSize: "16px", // Adjust font size as needed
    backgroundColor: "white", // Button background color
    color: "#007bff", // Button text color
    width: "150px",
    cursor: "pointer", // Show pointer cursor on hover
    transition: "background-color 0.3s ease", // Smooth transition effect
    border: "1px solid #007bff",
  };

  const hoverStyle = {
    backgroundColor: "#007bff", // Change background on hover
    color: "white",
  };

  // Handle mouse hover
  const [isHovered, setIsHovered] = React.useState("");

  useEffect(() => {
    switch (selected) {
      case "Valuation":
        setPills(["Preliminary", "Waiting", "Final", "Confirmation"]);
        break;
      case "Auction":
        setPills(["Schedule", "Ongoing", "Finished"]);
        break;
      case "Delivery":
        setPills(["Current", "Completed"]);
        break;
      default:
        setPills([]);
        break;
    }
  }, [selected]);
  const handleButton = (button) => {
    setSelected(button);
    nav(`/staff/${button}`);
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
              borderBottom: selected === button ? "5px solid #0d6efd" : "none",
              color: selected === button ? "#0d6efd" : "black",
              display: "inline-block",
              width: `${100 / buttons.length}%`,
              padding: "20px 0px",
            }}
            onClick={() => {
              handleButton(button);
            }}
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
                  ...(isHovered === pill ? hoverStyle : {}),
                }}
                onMouseEnter={() => setIsHovered(pill)}
                onMouseLeave={() => setIsHovered("")}
              >
                {pill}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
