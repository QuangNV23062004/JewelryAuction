import Badge from "react-bootstrap/Badge";
import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const sidebarStyles = {
  paddingTop: 10,
  backgroundColor: "rgba(13, 110, 253, 0.8)", // Light background for the sidebar
  minHeight: "100vh", // Full height
  color: "#343a40", // Dark text
};

const listItemStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px 20px",
  padding: "20px 10px",
  backgroundColor: "#e9ecef", // Slightly darker background for items
  border: "1px solid #ced4da", // Lighter border
  borderRadius: 5,
};

const linkStyles = {
  textDecoration: "none",
  color: "rgba(13, 110, 253, 0.8)", // Dark text for links
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
            bg="secondary"
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
            bg="secondary"
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
            bg="secondary"
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
            bg="secondary"
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
            bg="secondary"
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
