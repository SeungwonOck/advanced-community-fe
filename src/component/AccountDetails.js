import React, { useState } from 'react'
import { Form, Button, Container, Col, Row, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import noImg from "../asset/img/no-image.png"
import CloudinaryUploadWidget from '../utils/CloudinaryUploadWidget'
import { userActions } from '../action/userAction'

const AccountDetails = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    profileImage: "",
  })
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const uploadImage = (url) => {
    setFormData({...formData, profileImage: url });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserNameError("");
    setEmailError("");

    const { userName, email } = formData;

    let hasError = false;

    if (userName.trim().length < 3) {
      setUserNameError("Username must be at least 3 characters long");
      hasError = true;
    }

    const userNameRegex = /^[A-Za-z0-9_]+$/;
    if (!userNameRegex.test(userName)) {
      setUserNameError("Username can only contain letters, numbers, and underscores");
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError("Email field cannot be empty");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    dispatch(userActions.updateUser({ ...formData }));
    setFormData({ ...formData, profileImage: "" });
  }

  const handleChange = (event) => {
    const { id, value} = event.target;
    setFormData({ ...formData, [id]: value });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <Container className="account-detail-container">
      <h2 className="text-center mb-4">Settings: My Account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="userName"
            onChange={handleChange}
            placeholder={user.userName}
            isInvalid={userNameError}
          />
          <Form.Control.Feedback type="invalid">
            {userNameError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email" className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            onChange={handleChange}
            placeholder={user.email}
            isInvalid={emailError}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="roleId" className="mb-2">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            value={user.role}
            readOnly
          />
        </Form.Group>

        <Form.Group className="avatar-upload mb-2">
          <Row>
            <Col xs={3}>
              <Image
                src={user.profileImage || noImg}
                roundedCircle
                className="avatar-preview"
              />
            </Col>
            <Col>
              <CloudinaryUploadWidget uploadImage={uploadImage} />

              <img
                id="uploadedimage"
                src={formData.profileImage}
                className="upload-image mt-2"
                alt="uploadedimage"
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 blue-btn">
          Save
        </Button>
      </Form>
    </Container>
  )
}

export default AccountDetails
