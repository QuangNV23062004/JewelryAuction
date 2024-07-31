import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";

function Carouseler() {
  return (
    <>
      <Carousel data-bs-theme="dark" style={{ position: "relative" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.creativemarket.com/0.1.0/ps/11222366/1820/1124/m1/fpnw/wm1/fpuftjp6pyznzhanjwq44saln1r1ofin3zkpolucie1qwgoihdpzsawckysholut-.jpg?1635838366&s=285312c188752bcea2578bc2947375b2"
            alt="First slide"
            style={{
              width: "70vh",
              height: "70vh",
              padding: "0px 200px",
              margin: "50px 0px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://getwallpapers.com/wallpaper/full/c/c/b/417876.jpg"
            alt="Second slide"
            style={{
              width: "70vh",
              height: "70vh",
              padding: "0px 200px",
              margin: "50px 0px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpapers.com/images/hd/jewelry-background-t5inm8ksiovejqso.jpg"
            alt="Third slide"
            style={{
              width: "70vh",
              height: "70vh",
              padding: "0px 200px",
              margin: "50px 0px",
            }}
          />
        </Carousel.Item>
      </Carousel>

      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          fontWeight: "bold",
          border: "1px solid #f1f1f1",
          padding: "20px 50px",
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "1.5rem",
            display: "block",
            marginBottom: "20px",
            maxWidth: "80%",
            margin: "0px 10%",
          }}
        >
          HAVE DELIGHTFUL BIDDING EXPERIENCE EXPLORING OUR EXQUISITE JEWELRY
          HERE
        </span>
        <br />
        <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="outline-info" style={{ maxWidth: "30%" }}>
            Explore and Bid Now
          </Button>
          <Button variant="outline-success" style={{ maxWidth: "30%" }}>
            Auction a jewelry
          </Button>
        </Row>
      </div>
    </>
  );
}

export default Carouseler;
