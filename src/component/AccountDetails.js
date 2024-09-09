import React from 'react'
import { Form, Button, Container, Col, Row, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import noImg from "../asset/img/no-image.png"

const AccountDetails = () => {
  const { user, loading } = useSelector((state) => state.user);
  console.log("asdfsadf", user);

  const role = user.RoleId === 1 ? "Normal" : user.RoleId === 2 ? "Business" : "Admin";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <Container className="account-detail-container">
      <h2 className="text-center mb-4">Settings: My Account</h2>
      <Form>
        <Form.Group controlId="username" className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={user.Username}
            placeholder="Enter your username"
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={user.Email}
            placeholder="Enter your email"
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="roleId" className="mb-2">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            value={role}
            placeholder="Enter your email"
            readOnly
          />
        </Form.Group>

        <Form.Group className="avatar-upload mb-2">
          <Row>
            <Col xs={3}>
              <Image
                src={user.Avatar}
                roundedCircle
                className="avatar-preview"
              />
            </Col>
            <Col>
              <Button variant="dark" className="w-100">
                Select Image
              </Button>
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
