import * as types from "../constants/user.constants"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import "../style/login.style.css";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    useEffect(() => {
        return () => {
            dispatch(userActions.clearError())
        }
    }, [dispatch])

    const loginWithEmail = (event) => {
        event.preventDefault();
        dispatch(userActions.loginWithEmail({ email, password}))
    }
    return (
        <div>
            <div className="login-title">LOGIN</div>
            <div className="login-line"/>
            <Container className="login-container">
                {error && (
                    <div>
                        <Alert className="error-message" variant="danger">{error}</Alert>
                    </div>
                )}

                <Form className="login-form" onSubmit={loginWithEmail}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Row>
                        <Col md={4}>
                        <Form.Label className="login-form-label">Email</Form.Label>
                        </Col>
                        <Col md={8}>
                        <Form.Control
                            className="login-form-input"
                            type="email"
                            placeholder="Please enter your email"
                            required
                            onChange={(event) => setEmail(event.target.value)}
                            />
                        </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Row>
                        <Col md={4}>
                        <Form.Label className="login-form-label">Password</Form.Label>
                        </Col>
                        <Col md={8}>
                        <Form.Control
                            className="login-form-input"
                            type="password"
                            placeholder="Please enter your password"
                            required
                            onChange={(event) => setPassword(event.target.value)}
                            />
                        </Col>
                    </Row>
                    </Form.Group>

                    <div className="login-button-container">
                        <Button className='login-button' type="submit">
                            Sign in
                        </Button>
                    </div>

                    <div className="login-button-container">
                        <Button className="login-button red" onClick={() => navigate("/register")}>
                            Register
                        </Button>
                    </div>

                    <div className="login-button-container">
                        <Button className="signup-button">
                            <Link to="/password/verify">Forgot Password?</Link>
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Login
