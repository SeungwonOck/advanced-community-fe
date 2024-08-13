import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CampaignCard from '../component/CampaignCard'
import "../style/home.style.css"

const Home = () => {

  const campaigns = [1, 2, 3, 4];
  return (
    <div>
      <div className="home-banner text-center">
        <h1>Title</h1>
        <p>Subtitle</p>
      </div>

      <Container className="mt-4">
        <h2>Our Campaigns</h2>
        <p>Change the society today!</p>
        <Row className="mt-4">
          {campaigns.map((_, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <CampaignCard />
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4 mb-4">
            <Button variant="primary" size="lg">Load More</Button>
        </div>
      </Container>
    </div>
  )
}

export default Home
