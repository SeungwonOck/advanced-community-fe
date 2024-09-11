import React, { useEffect, useState } from 'react'
import "../style/login.style.css"
import { useNavigate, Link } from 'react-router-dom'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../action/userAction'


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    role: "normal",
    policy: false,  
  })
  
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      dispatch(userActions.clearError());
    }
  }, [dispatch])

  const register = (event) => {
    event.preventDefault();
    const { email, userName, password, confirmPassword, role, policy} = formData;

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
    dispatch(userActions.register({ email, userName, password, role}, navigate))
  };

  const handleChange = (event) => {
    const { id, value, checked } = event.target;

    if (id === "policy") {
      setFormData({ ...formData, [id]: checked });
    } else if (id === "role") {
      setFormData({...formData, [id]: checked ? "business" : "normal" });
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
              <Form.Check
                  type="checkbox"
                  label="Business - Application as a business"
                  id="role"
                  onChange={handleChange}
                  checked={formData.role === "business"}
                />
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
          
          <div className="login-footer">
            <span>Already have an account? </span>
            <Link to="/login">Log in</Link>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default Register
