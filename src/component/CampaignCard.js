import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import "../style/campaignCard.style.css"

const CampaignCard = () => {
  return (
    <Card className="mb-4 shadow-sm">
      <div className="image-container">
        <Card.Img className="campaign-image" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s" alt="Campaign Image" />
        <Badge className="badge-overlay" bg="warning">
          B
        </Badge>
      </div>
      <Card.Body>
        <Card.Title>Campaigns Title</Card.Title>
        <Card.Text>
          <small className="text-muted">
            Creator • Post by 02/02/2024
          </small>
        </Card.Text>
        <Card.Text>
          Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted d-flex">
        <div>
          <FontAwesomeIcon icon={faHeart} className="text-danger me-1" /> 
          <span className="me-4">123</span> 
        </div>
        <div>
          <FontAwesomeIcon icon={faComment} className="me-1"/> 
          <span className="me-4">123</span>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default CampaignCard
