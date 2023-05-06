import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    setErrorMessage("");
    event.preventDefault();
    navigate("/");
    axios
      .post("http://localhost:8000/api/v1/auth/token/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        localStorage.setItem("user_data", JSON.stringify(data));
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMessage(error.response.data.detail);
        }
      });
  };
  return (
    <>
      <Container>
        <LeftContainer>
          <Paragraph>
            <strong style={{ fontWeight: "600" }}>
              “I kept always two books in my pocket, one to read, one to write
              in.”
            </strong>
          </Paragraph>
          <MainHeading>Robert Louis Stevenson</MainHeading>
        </LeftContainer>
        <RightContainer>
          <LoginContainer>
            <LoginHeading>Login to your Account</LoginHeading>
            <LoginInfo>Enter email and password to login</LoginInfo>
            <Form onSubmit={handleSubmit}>
              <InputContainer>
                <TextInput
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </InputContainer>
              <InputContainer>
                <TextInput
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </InputContainer>
              <div className="error-message">
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
              <LoginButton to="/auth/signup/">Signup Now</LoginButton>
              <ButtonContainer>
                <SubmitButton>Login</SubmitButton>
              </ButtonContainer>
            </Form>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 15px;
  background: #fff;
`;
const LeftContainer = styled.div`
  width: 55%;
  padding: 40px 70px 70px;
  margin-top: 99px;
`;
const MainHeading = styled.h1`
  color: #090e5e;
  margin-top: 16px;
  margin-left: 186px;
  font-size: 27px;
  line-height: 1em;
  letter-spacing: -0.052em;
  font-weight: 600;
  font-style: oblique;
`;
const Paragraph = styled.h4`
  font-size: 20px;
  color: #090e5e;
  margin-top: 30px;
  line-height: 1.4em;
  font-weight: 600;
  font-style: italic;
  letter-spacing: -0.006em;
  font-size: 21px;
`;
const RightContainer = styled.div`
  background: #efefef;
  width: 45%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 20px;
  padding: 0 70px 70px;
`;
const LoginContainer = styled.div`
  padding-bottom: 70px;
  border-bottom: 1px solid #fff;
  width: 100%;
`;
const LoginHeading = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const LoginInfo = styled.p`
  font-size: 18px;
  margin-bottom: 35px;
`;
const Form = styled.form`
  width: 100%;
  display: block;
`;
const InputContainer = styled.div`
  margin-bottom: 15px;
  position: relative;
  &:before {
  }
`;
const TextInput = styled.input`
  padding: 20px 25px 20px 30px;
  width: 100%;
  display: block;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  outline: none;
`;
const LoginButton = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
  color: #046bf6;
  font-size: 20px;
`;
const SubmitButton = styled.button`
  background: #046bf6;
  border: 0;
  outline: 0;
  color: #fff;
  padding: 25px 40px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
