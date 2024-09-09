import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { campaignActions } from '../action/campaignAction'
import { Modal, Form, Col, Row, Button } from 'react-bootstrap'
import CloudinaryUploadWidget from '../utils/CloudinaryUploadWidget'

const InitialFormData = {
  title: "",
  description: "",
  image: "",
}

const NewCampaignDialog = ({ mode, showDialog, setShowDialog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCampaign = {
    title: "123",
    description: "123",
    image: "123",
  }
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedCampaign
  );
  
  const handleClose = () => {
    setFormData({ ...InitialFormData })
    setShowDialog(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "new") {
      dispatch(campaignActions.createCampaign({ ...formData }));
      setShowDialog(false);
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const uploadImage = (url) => {
    setFormData({...formData, image: url });
  }


  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>Create New Campaign</Modal.Title>
        ) : (
          <Modal.Title>Edit Campaign</Modal.Title>
        )}
      </Modal.Header>

      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter Title"
              required
              value={formData.title}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            placeholder="Description"
            as="textarea"
            onChange={handleChange}
            rows={3}
            value={formData.description}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Image" required>
          <Form.Label className="mr-1">Image</Form.Label>
          <CloudinaryUploadWidget uploadImage={uploadImage} />

          <img
            id="uploadedimage"
            src={formData.image}
            className="upload-image mt-2"
            alt="uploadedimage"
          />
        </Form.Group>

        {mode === "new" ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        )}
      </Form>
    </Modal>
  )
}

export default NewCampaignDialog;
