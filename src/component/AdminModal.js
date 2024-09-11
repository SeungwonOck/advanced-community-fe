import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import "../style/adminModal.style.css";
import { campaignActions } from '../action/campaignAction';
import { useDispatch } from 'react-redux';

const AdminModal = ({ campaign, showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const activateCampaign = (campaignId) => {
    dispatch(campaignActions.activateCampaign(campaignId))
    setShowModal(false);
  }

  const deactivateCampaign = (campaignId) => {
    dispatch(campaignActions.deactivateCampaign(campaignId));
    setShowModal(false);
  }
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered className="admin-modal">
      <Modal.Header closeButton>
        <Modal.Title>{campaign.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Creator:</strong> {campaign.author.userName}</p>
        <p>{campaign.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="success" 
          onClick={() => activateCampaign(campaign._id)} 
          className="admin-btn">
          Approve
        </Button>
        <Button 
          variant="danger" 
          onClick={() => deactivateCampaign(campaign._id)} 
          className="admin-btn">
          Deny
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdminModal
