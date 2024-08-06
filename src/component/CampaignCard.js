import React from 'react'
import { Card, Badge } from 'react-bootstrap'
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
        <span className="mr-1">❤️ 123</span>
        <span>💬 123</span>
      </Card.Footer>
    </Card>
  )
}

export default CampaignCard
