import React, { useEffect, useState, useCallback } from "react";
import { Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useJewelry } from "./JewelryProvider";

export default function Buttons() {
  const { setJewelry, original, selected, setSelected } = useJewelry();
  const [buttons, setButtons] = useState([]);
  const loc = useLocation();
  const path = loc.pathname;

  // Update buttons based on the current path
  useEffect(() => {
    let newButtons = [];
    switch (path) {
      case "/manager/New":
        newButtons = ["All", "Assigned", "Unassigned"];
        break;
      case "/manager/Valuating":
        newButtons = ["All", "Preliminary", "Arriving", "Arrived", "Final"];
        break;
      case "/manager/Confirm":
        newButtons = ["All", "Waiting", "Approved", "Rejected"];
        break;
      case "/manager/Auctioning":
        newButtons = ["All", "Scheduled", "Ongoing", "Auctioned"];
        break;
      default:
        newButtons = [];
        break;
    }
    setButtons(newButtons);
  }, [path]);

  // Handle button selection and filter jewelry
  const handleSelection = useCallback(
    (button) => {
      setSelected(button);
      if (button === "Assigned") {
        setJewelry(original.filter((j) => j.assignedTo?.ValuationStaff));
      } else if (button === "Unassigned") {
        setJewelry(original.filter((j) => !j.assignedTo?.ValuationStaff));
      } else {
        setJewelry(original); // Reset to original jewelry when "All" is selected
      }
    },
    [original, setJewelry, setSelected]
  );

  return (
    <Row>
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
          onClick={() => handleSelection(button)}
        >
          <h6>{button}</h6>
        </button>
      ))}
    </Row>
  );
}
