import React, { useState } from 'react'
import { Card, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import "../style/campaignCard.style.css"
import AdminModal from './AdminModal'
import { useSelector } from 'react-redux'

const CampaignCard = ({ campaign }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const campaignDefaultImage = "https://info.mssmedia.com/hubfs/Misc%20Images/60255e7341de62c988dd08aa_DigitalAdvertising.jpg"

  const handleBadgeClick = (e) => {
    e.stopPropagation();
    if (user.role === "admin" && campaign.status === "pending") {
      setShowModal(true);
    }
  };
  return (
    <div>
      <Card className="mb-4 shadow-sm cur-point" onClick={() => navigate(`/campaign/${campaign._id}`)}>
        <div className="image-container">
          <Card.Img className="campaign-image" variant="top" src={campaign.image || campaignDefaultImage} alt="Campaign Image" />
          <Badge className="badge-overlay" bg="warning">
            {campaign.author.role === "normal" ? "N" : campaign.author.role === "business" ? "B" : "A"}
          </Badge>
        </div>
        <Card.Body>
          <Card.Title>{campaign.title}</Card.Title>
          <Card.Text>
            <p className="text-muted">
              Creator: {campaign.author.userName}
            </p>
            <small className="text-muted">
              Posted By: {campaign.createAt.date} {campaign.createAt.time}
            </small>
          </Card.Text>
          <Card.Text>
            {campaign.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted d-flex">
          <div>
            <FontAwesomeIcon icon={faHeart} className="text-danger me-1" /> 
            <span className="me-4">{campaign.likes}</span> 
          </div>
          <div>
            <FontAwesomeIcon icon={faComment} className="me-1"/> 
            <span className="me-4">{campaign.comments.length}</span>
          </div>
          {location.pathname.includes("/account") && (
            <Badge
              bg={
              campaign.status === "activated" ? "success" :
              campaign.status === "pending" ? "warning" :
              "danger"
            }
              onClick={handleBadgeClick}
              style={{ cursor: (user.role === "admin" && campaign.status === "pending") ? "pointer" : "default" }}
            >
              {campaign.status === "activated" ? "Activated" : 
              campaign.status === "pending" ? "Pending" : 
              "Deactivated"}
            </Badge>
          )}
        </Card.Footer>
      </Card>

      <AdminModal
        showModal={showModal}
        setShowModal={setShowModal}
        campaign={campaign}
      />
    </div>
  )
}

export default CampaignCard
