import Badge from "react-bootstrap/Badge";
import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
export default function SideBar() {
  return (
    <>
      <ListGroup>
        <ListGroup.Item
          variant="primary"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <>
            <Link
              to="/manager/New"
              style={{
                position: "relative",
                textDecoration: "none",
                fontSize: "20px",
                color: "white",
              }}
            >
              New
            </Link>
            <Badge bg="secondary">9</Badge>
          </>
        </ListGroup.Item>
        <ListGroup.Item
          variant="primary"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <>
            <Link
              to="/manager/Valuating"
              style={{
                position: "relative",
                textDecoration: "none",
                fontSize: "20px",
                color: "white",
              }}
            >
              Valuating
            </Link>
            <Badge bg="secondary">9</Badge>
          </>
        </ListGroup.Item>
        <ListGroup.Item
          variant="primary"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <>
            <Link
              to="/manager/Confirm"
              style={{
                position: "relative",
                textDecoration: "none",
                fontSize: "20px",
                color: "white",
              }}
            >
              Confirm
            </Link>
            <Badge bg="secondary">9</Badge>
          </>
        </ListGroup.Item>
        <ListGroup.Item
          variant="primary"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <>
            <Link
              to="/manager/Auctioning"
              style={{
                position: "relative",
                textDecoration: "none",
                fontSize: "20px",
                color: "white",
              }}
            >
              Auctioning
            </Link>
            <Badge bg="secondary">9</Badge>
          </>
        </ListGroup.Item>
        <ListGroup.Item
          variant="primary"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          {" "}
          <>
            <Link
              to="/manager"
              style={{
                position: "relative",
                textDecoration: "none",
                fontSize: "20px",
                color: "white",
              }}
            >
              Dashboard
            </Link>{" "}
            <Badge bg="secondary">9</Badge>
          </>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
