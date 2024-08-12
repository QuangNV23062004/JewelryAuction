import React, { useEffect, useState, useMemo } from "react";
import { Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Buttons({ jewelry, setJewelry }) {
  const [selected, setSelected] = useState("All");
  const [buttons, setButtons] = useState([]);
  const loc = useLocation();
  const path = loc.pathname;

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
    setButtons((prevButtons) => {
      if (JSON.stringify(prevButtons) !== JSON.stringify(newButtons)) {
        return newButtons;
      }
      return prevButtons;
    });
  }, [path]);

  useEffect(() => {
    if (selected == "Assigned") {
      setJewelry(jewelry.filter((j) => j.assignedTo?.ValuationStaff));
    } else if (selected === "Unassigned") {
      setJewelry(jewelry.filter((j) => !j.assignedTo?.ValuationStaff));
    }
  }, [selected]);

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
          onClick={() => setSelected(button)}
        >
          <h6>{button}</h6>
        </button>
      ))}
    </Row>
  );
}
