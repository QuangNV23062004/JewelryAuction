import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import CountdownTimer from "./components/CountdownTimer";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Col, Row } from "react-bootstrap";
import Province from "../../Resources/Province";
import District from "../../Resources/District";
import Ward from "../../Resources/Wards";

export default function Checkout() {
  const { jewId } = useParams();
  const [jewelry, setJewelry] = useState({});
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [ShowPolicy, SetShowPolicy] = useState(false);
  const [deliveryEnabled, setDeliveryEnabled] = useState(true); // Track delivery switch state

  const handleCheckout = async (auctionId, amount) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/vnpay/create_payment_url",
        {
          auctionId: auctionId,
          amount: amount,
          bankCode: "",
        }
      );
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const [detail, setDetail] = useState({
    fullName: user.fullName || null,
    email: user.email || null,
    phone: user.phone || null,
    address: user.address || null,
  });

  const [address, setAddress] = useState({
    ProvinceID: null,
    Province: null,
    DistrictID: null,
    District: null,
    WardID: null,
    Ward: null,
  });

  const [filtered, setFiltered] = useState({
    filteredDistrict: [],
    filteredWard: [],
  });

  const fetchData = async () => {
    try {
      const auctionsResponse = await axios.get(
        "http://localhost:5000/jewelry/with-auction"
      );
      const list = auctionsResponse.data;
      list.map((au) => {
        if (au._id === jewId) {
          setJewelry(au);
        }
      });
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Province Change
  const handleProvinceChange = (e) => {
    const selectedProvinceID = parseInt(e.target.value);
    const selectedProvince = Province.find(
      (p) => p.province_id === selectedProvinceID
    );
    const filteredDistrict = District.filter(
      (d) => d.province_id === selectedProvinceID
    );

    setAddress({
      ...address,
      ProvinceID: selectedProvinceID,
      Province: selectedProvince ? selectedProvince.name : null,
      DistrictID: null, // Reset district and ward when province changes
      District: null,
      WardID: null,
      Ward: null,
    });

    setFiltered({
      filteredDistrict: filteredDistrict,
      filteredWard: [], // Reset ward list when province changes
    });
  };

  // Handle District Change
  const handleDistrictChange = (e) => {
    const selectedDistrictID = parseInt(e.target.value);
    const selectedDistrict = District.find(
      (d) => d.district_id === selectedDistrictID
    );
    const filteredWard = Ward.filter(
      (w) => w.district_id === selectedDistrictID
    );

    setAddress({
      ...address,
      DistrictID: selectedDistrictID,
      District: selectedDistrict ? selectedDistrict.name : null,
      WardID: null, // Reset ward when district changes
      Ward: null,
    });

    setFiltered({
      ...filtered,
      filteredWard: filteredWard,
    });
  };

  // Handle delivery switch
  const handleDeliverySwitch = () => {
    setDeliveryEnabled(!deliveryEnabled);
  };

  return (
    <div>
      <Row style={{ margin: "20px 0px" }}>
        <Col md={9}>
          <Form>
            <Row style={{ margin: "40px 0px" }}>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Full Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      value={detail.fullName}
                      name="fullName"
                      onChange={(e) =>
                        setDetail({ ...detail, fullName: e.target.value })
                      }
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Phone"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Phone"
                      value={detail.phone}
                      name="phone"
                      onChange={(e) =>
                        setDetail({ ...detail, phone: e.target.value })
                      }
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={detail.email}
                      name="email"
                      onChange={(e) =>
                        setDetail({ ...detail, email: e.target.value })
                      }
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Payment method"
                    className="mb-3"
                  >
                    <Form.Select aria-label="Select payment method">
                      <option value="VNPAY">VNPAY</option>
                      <option value="Balance">Balance</option>
                      <option value="Cash">Cash on delivery</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <Form.Label
                    onClick={() => SetShowPolicy(!ShowPolicy)}
                    style={{
                      fontWeight: 600,
                      color: "#89CFF0",
                      padding: "5px 100px",
                      backgroundColor: "rgba(0,0,0,0.9 )",
                      borderRadius: 5,
                    }}
                  >
                    Show return policy
                  </Form.Label>
                  {ShowPolicy && (
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        width: "90%",
                        margin: "0px 2.5%",
                      }}
                    >
                      You are advised to thoroughly inspect the jewelry{" "}
                      <b>before accepting</b> the delivery. Should you find any
                      discrepancies or issues, you have the option to{" "}
                      <b>decline the delivery</b>, provided a valid reason is
                      given. Please note, we <b>do not offer a return policy</b>
                      . However, you may choose to <b>reauction the jewelry</b>{" "}
                      you have acquired on our platform.
                    </p>
                  )}
                </Form.Group>

                <Form.Group>
                  <Row style={{ margin: 5 }}>
                    <Col md={3}>
                      <Form.Label>Delivery</Form.Label>
                    </Col>
                    <Col md={9}>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label=""
                        onChange={handleDeliverySwitch}
                        checked={deliveryEnabled} // Set checked state
                        style={{ display: "inline" }}
                      />
                    </Col>
                  </Row>
                  {!deliveryEnabled && (
                    <p style={{ display: "inline", color: "red" }}>
                      By not selecting this, you are expected to receive the
                      jewelry from the company
                    </p>
                  )}
                </Form.Group>

                <Button
                  variant="outline-success"
                  onClick={() =>
                    handleCheckout(
                      jewelry.auctionStatus._id,
                      jewelry.auctionStatus.winnerBid
                    )
                  }
                >
                  Proceed to checkout
                </Button>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Province"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Province"
                      onChange={handleProvinceChange}
                      disabled={!deliveryEnabled} // Disable if delivery is disabled
                    >
                      <option value="">Select Province</option>
                      {Province.map((p) => (
                        <option key={p.province_id} value={p.province_id}>
                          {p.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="District"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select District"
                      onChange={handleDistrictChange}
                      disabled={!deliveryEnabled || !address.ProvinceID} // Disable if delivery or province is disabled
                    >
                      <option value="">Select District</option>
                      {filtered.filteredDistrict.map((d) => (
                        <option key={d.district_id} value={d.district_id}>
                          {d.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Ward"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Ward"
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          WardID: parseInt(e.target.value),
                          Ward: Ward.find(
                            (w) => w.wards_id === parseInt(e.target.value)
                          ).name,
                        })
                      }
                      disabled={!deliveryEnabled || !address.DistrictID} // Disable if delivery or district is disabled
                    >
                      <option value="">Select Ward</option>
                      {filtered.filteredWard.map((w) => (
                        <option key={w.wards_id} value={w.wards_id}>
                          {w.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Address"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      rows={1}
                      value={detail.address}
                      disabled={!deliveryEnabled} // Disable if delivery is disabled
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Note"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      rows={1}
                      disabled={!deliveryEnabled} // Disable if delivery is disabled
                    />
                    <p>
                      *Note can includes delivery time, delivery instructions,
                      packaging...
                    </p>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={jewelry.image} />
            <Card.Body>
              <Card.Title>{jewelry.name}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Type: {jewelry.category}</ListGroup.Item>
                <ListGroup.Item>
                  Price won: ${jewelry.paymentDetails?.amount}
                </ListGroup.Item>
                <ListGroup.Item>
                  <CountdownTimer
                    user={user?._id || null}
                    startTime={jewelry.auctionStatus?.startTime}
                    endTime={jewelry.auctionStatus?.endTime}
                    winner={jewelry.auctionStatus?.winner || null}
                    status={jewelry.paymentDetails?.status}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
