// Login.js
import React, { useState } from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FullContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("https://wallpaperaccess.com/full/2087981.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const LoginContainer = styled(Container)`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 5px;
  max-width: 500px;
`;

const FormRow = styled(Row)`
  margin: 20px 0;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const FormHeading = styled.h2`
  color: #343a40;
  font-family: "Arial", sans-serif;
  color: #007bff;
  text-align: center;
`;

const FormLabel = styled(Form.Label)`
  color: #495057;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  border-color: #007bff;
  font-weight: bold;
  width: 100%;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

export default function Login() {
  const [message, setMessage] = useState("");
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    const isEmail = loginInput.includes("@");
    const payload = isEmail
      ? { email: loginInput, password }
      : { username: loginInput, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        payload
      );
      setMessage(response.data.message);

      if (response.data.user.role === 3) {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        nav("/manager");
      } else setMessage("You can't login here");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <FullContainer>
      <LoginContainer>
        <FormRow>
          <Col md={12}>
            <FormWrapper>
              <FormHeading>LOGIN</FormHeading>
              <br />
              <Form>
                <Form.Group className="mb-3">
                  <FormLabel>Username/Email</FormLabel>
                  <Form.Control
                    type="text"
                    placeholder="youremail@gmail.com or username"
                    name="loginInput"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <FormLabel>Password</FormLabel>
                  <Form.Control
                    type="password"
                    placeholder="Your password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <StyledButton onClick={handleLogin}>Login</StyledButton>
                {message && (
                  <h5
                    style={{
                      color: "red",
                      margin: "10px 20px",
                      textAlign: "center",
                      fontSize: "15px",
                    }}
                  >
                    {message}
                  </h5>
                )}
              </Form>
            </FormWrapper>
          </Col>
        </FormRow>
      </LoginContainer>
    </FullContainer>
  );
}
