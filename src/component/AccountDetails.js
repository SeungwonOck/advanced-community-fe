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
    profileImage: "",
  })

  const uploadImage = (url) => {
    setFormData({...formData, profileImage: url });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userActions.updateUser({ ...formData }));
    setFormData({ ...formData, profileImage: "" });
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
            value={user.userName}
            placeholder="Enter your username"
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={user.email}
            placeholder="Enter your email"
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="roleId" className="mb-2">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            value={user.role}
            placeholder="Enter your email"
            readOnly
          />
        </Form.Group>

        <Form.Group className="avatar-upload mb-2">
          <Row>
            <Col xs={3}>
              <Image
                src={user.profileImage}
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
