import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import mongoose from "mongoose";

const RegisterContainer = styled(Container)`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 1200px;
`;

const Title = styled.h1`
  text-align: center;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  color: #007bff;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  gap: 5px;
  padding: 0px 10px;
`;

const FormRow = styled(Row)`
  margin: 20px 0;
`;

const FormHeading = styled.h2`
  color: #343a40;
  font-family: "Arial", sans-serif;
`;

const FormLabel = styled(Form.Label)`
  color: #495057;
  font-weight: bold;
`;

const ImagePreview = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ImageThumbnail = styled.img`
  max-width: 200px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  border-color: #007bff;
  font-weight: bold;
  width: 30%;
  margin: 20px 35%;
  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

export default function Register() {
  const [user, setUser] = useState({
    _id: "",
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [image, setImage] = useState("");

  const [jewelry, setJewelry] = useState({
    owner: {
      ownerID: "",
      fullName: "",
      phone: "",
      email: "",
      address: "",
    },
    name: "",
    description: "",
    auctionDetails: {
      initialValuation: {
        value: 0,
        staffID: "",
      },
      finalValuation: {
        value: 0,
        staffID: "",
        managerID: "",
      },
      finalizedPrice: {
        value: 0,
        buyerID: "",
      },
      intermediateFee: 0,
      intermediateFeeRate: 0,
    },
    status: "Pending",
    image: "",
    category: "",
    feedback: [],
    statusUpdateDate: new Date(),
  });

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setJewelry((prevJewelry) => ({
        ...prevJewelry,
        owner: {
          ownerID: storedUser._id,
          fullName: storedUser.fullName,
          phone: storedUser.phone,
          email: storedUser.email,
          address: storedUser.address,
        },
      }));
    }
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setJewelry((prevJewelry) => ({
      ...prevJewelry,
      owner: {
        ...prevJewelry.owner,
        [name]: value,
      },
    }));
  };

  const handleJewelryChange = (e) => {
    const { name, value } = e.target;
    setJewelry((prevJewelry) => ({ ...prevJewelry, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
    setJewelry((prevJewelry) => ({ ...prevJewelry, image: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!jewelry.owner.ownerID || !jewelry.owner.address) {
      alert("Owner ID and address are required.");
      return;
    }

    const validateObjectId = (id) =>
      mongoose.Types.ObjectId.isValid(id) ? id : undefined;

    const updatedJewelry = {
      ...jewelry,
      auctionDetails: {
        ...jewelry.auctionDetails,
        initialValuation: {
          ...jewelry.auctionDetails.initialValuation,
          staffID: validateObjectId(
            jewelry.auctionDetails.initialValuation.staffID
          ),
        },
        finalValuation: {
          ...jewelry.auctionDetails.finalValuation,
          staffID: validateObjectId(
            jewelry.auctionDetails.finalValuation.staffID
          ),
          managerID: validateObjectId(
            jewelry.auctionDetails.finalValuation.managerID
          ),
        },
        finalizedPrice: {
          ...jewelry.auctionDetails.finalizedPrice,
          buyerID: validateObjectId(
            jewelry.auctionDetails.finalizedPrice.buyerID
          ),
        },
      },
      statusUpdateDate: new Date(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/jewelry",
        updatedJewelry
      );
      console.log("Data created successfully:", response.data);
    } catch (error) {
      console.error("Error creating data:", error);
    }
    console.log(updatedJewelry);
  };

  return (
    <RegisterContainer>
      <Title>Put jewelry up for auction</Title>
      <FormRow>
        <FormWrapper>
          <Col md={6}>
            <FormHeading>User Information</FormHeading>
            <Form>
              <Form.Group className="mb-3">
                <FormLabel>Full Name</FormLabel>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleUserChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel>Phone</FormLabel>
                <Form.Control
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleUserChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel>Email</FormLabel>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleUserChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel>Address</FormLabel>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={user.address}
                  onChange={handleUserChange}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <FormHeading>Jewelry Information</FormHeading>
            <Form>
              <Form.Group className="mb-3">
                <FormLabel>Jewelry Name</FormLabel>
                <Form.Control
                  type="text"
                  placeholder="The Hutton-Mdivani Necklace"
                  name="name"
                  value={jewelry.name}
                  onChange={handleJewelryChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <FormLabel>Jewelry Category</FormLabel>
                <Form.Control
                  as="select"
                  name="category"
                  value={jewelry.category}
                  onChange={handleJewelryChange}
                >
                  <option value="">Select a category</option>
                  <option value="Necklace">Necklace</option>
                  <option value="Ring">Ring</option>
                  <option value="Earring">Earring</option>
                  <option value="Bracelet">Bracelet</option>
                  <option value="Brooch">Brooch</option>
                  <option value="Pendant">Pendant</option>
                  <option value="Anklet">Anklet</option>
                  <option value="Cufflink">Cufflink</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel>Jewelry Description and Additional Notes</FormLabel>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={jewelry.description}
                  onChange={handleJewelryChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel>Jewelry Image URL</FormLabel>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={image}
                  onChange={handleImageChange}
                />
                <br />
                <ImagePreview>
                  Preview <br />
                  <ImageThumbnail src={image} alt="Jewelry image" />
                </ImagePreview>
              </Form.Group>
            </Form>
          </Col>
        </FormWrapper>
        <div style={{ background: "white" }}>
          <StyledButton variant="primary" onClick={handleSubmit}>
            Send
          </StyledButton>
        </div>
      </FormRow>
    </RegisterContainer>
  );
}
