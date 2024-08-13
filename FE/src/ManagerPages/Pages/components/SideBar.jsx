import Badge from "react-bootstrap/Badge";
import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const sidebarStyles = {
  backgroundColor: "#343a40", // Dark background for the sidebar
  minHeight: "100vh", // Full height
  color: "#ffffff", // White text
};

const listItemStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px 0px",
  padding: "20px 10px",
  backgroundColor: "#495057", // Slightly lighter background for items
  border: "1px solid #343a40", // Darker border
};

const linkStyles = {
  textDecoration: "none",
  color: "#ffffff",
  fontSize: "18px",
  flexGrow: 1,
};

export default function SideBar() {
  return (
    <div style={sidebarStyles}>
      <ListGroup>
        <ListGroup.Item style={listItemStyles}>
          <Link to="/manager/New" style={linkStyles}>
            New
          </Link>
          <Badge
            bg="danger"
            style={{
              width: 35,
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            9
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item style={listItemStyles}>
          <Link to="/manager/Valuating" style={linkStyles}>
            Valuating
          </Link>
          <Badge
            bg="danger"
            style={{
              width: 35,
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            9
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item style={listItemStyles}>
          <Link to="/manager/Confirm" style={linkStyles}>
            Confirm
          </Link>
          <Badge
            bg="danger"
            style={{
              width: 35,
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            9
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item style={listItemStyles}>
          <Link to="/manager/Auctioning" style={linkStyles}>
            Auctioning
          </Link>
          <Badge
            bg="danger"
            style={{
              width: 35,
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            9
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item style={listItemStyles}>
          <Link to="/manager" style={linkStyles}>
            Dashboard
          </Link>
          <Badge
            bg="danger"
            style={{
              width: 35,
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            9
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
