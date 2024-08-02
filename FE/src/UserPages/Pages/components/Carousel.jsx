import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
function Carouseler() {
  const nav = useNavigate();
  const { user, setUser, menu, setMenu } = useContext(UserContext);
  const carouselItems = [
    {
      src: "https://images.creativemarket.com/0.1.0/ps/11222366/1820/1124/m1/fpnw/wm1/fpuftjp6pyznzhanjwq44saln1r1ofin3zkpolucie1qwgoihdpzsawckysholut-.jpg?1635838366&s=285312c188752bcea2578bc2947375b2",
      alt: "First slide",
    },
    {
      src: "http://getwallpapers.com/wallpaper/full/c/c/b/417876.jpg",
      alt: "Second slide",
    },
    {
      src: "https://wallpapers.com/images/hd/jewelry-background-t5inm8ksiovejqso.jpg",
      alt: "Third slide",
    },
  ];

  return (
    <>
      <Carousel data-bs-theme="dark" style={{ position: "relative" }}>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.src}
              alt={item.alt}
              style={{
                width: "100vh",
                height: "90vh",
                padding: "0px 0px",
                margin: "50px 0px",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          fontWeight: "bold",
          border: "1px solid #f1f1f1",
          padding: "20px 50px",
          position: "absolute",
          top: "95%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          borderRadius: 10,
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
        <Row
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <Button
              variant="outline-info"
              style={{ width: "30%", marginBottom: 5 }}
              onClick={() => {
                const user = sessionStorage.getItem("user");
                if (!user) {
                  nav("/login");
                  setMenu("");
                } else {
                  nav("/auction");
                  setMenu("Auction");
                }
              }}
            >
              Explore and Bid Now
            </Button>{" "}
            <br />
            <Button
              variant="outline-success"
              style={{ width: "30%" }}
              onClick={() => {
                const user = sessionStorage.getItem("user");
                if (!user) {
                  nav("/login");
                  setMenu("");
                } else {
                  nav("/register");
                  setMenu("");
                }
              }}
            >
              Auction a jewelry
            </Button>
          </div>
        </Row>
      </div>
    </>
  );
}

export default Carouseler;
