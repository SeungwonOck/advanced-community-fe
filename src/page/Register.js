import React, { useState } from 'react'
import "../style/login.style.css"
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert } from 'react-bootstrap'


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
    policy: false,  
  })
  
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);

  const register = (event) => {
    event.preventDefault();
    const { userName, email, password, confirmPassword, gender, policy, nickName } = formData;

    if (password !== confirmPassword) {
      setPasswordError("Password is incorrect");
      return;
    }
    else {
      setPasswordError("");
    }

    if (!policy) {
      setPolicyError(true);
      return;
    }
    else {
      setPolicyError(false);
    }

    setPasswordError("");
    setPolicyError(false);
  };

  const handleChange = (event) => {
    const { id, value, checked } = event.target;

    if (id === "policy") {
      setFormData({ ...formData, [id]: checked });
    }
    else {
      setFormData({ ...formData, [id]: value });
    }
  };

  return (
    <div>
      <div className="login-title">REGISTER</div>
      <div className="login-line" />
      <Container className="register-container">
        <Form onSubmit={register}>
              <Form.Group className="mb-3">
                <Form.Label className="login-form-label">Email<a style={{ color: "#28A745" }}>*</a></Form.Label>
                <Form.Control
                  className="login-form-input"
                  type="email"
                  id="email"
                  placeholder="Please enter your email address"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="login-form-label">UserName<a style={{ color: "#28A745" }}>*</a></Form.Label>
                <Form.Control
                  className="login-form-input"
                  type="text"
                  id="userName"
                  placeholder="ex)Alex"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="login-form-label">Password<a style={{ color: "#28A745" }}>*</a></Form.Label>
                <Form.Control
                  className="login-form-input"
                  type="password"
                  id="password"
                  placeholder="Please enter your password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="login-form-label">Confirm Password<a style={{ color: "#28A745" }}>*</a></Form.Label>
                <Form.Control
                  className="login-form-input"
                  type="password"
                  id="confirmPassword"
                  placeholder="Please re-enter your password"
                  onChange={handleChange}
                  required
                  isInvalid={passwordError}
                />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender<a style={{ color: "#28A745" }}>*</a></Form.Label>
                <Form.Select
                  defaultValue=""
                  onChange={handleChange}
                  id="gender"
                  required
                >
                  <option value="" disabled hidden>
                    Choose gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="I accept the terms"
                  id="policy"
                  onChange={handleChange}
                  isInvalid={policyError}
                  checked={formData.policy}
                />
              </Form.Group>
              <div className="login-button-container">
                <Button className="login-button" type="submit">
                  Register
                </Button>
              </div>
            </Form>
      </Container>
    </div>
  )
}

export default Register
