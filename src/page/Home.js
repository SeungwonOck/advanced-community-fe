import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CampaignCard from '../component/CampaignCard'

const Home = () => {

  const campaigns = [1, 2, 3, 4];
  return (
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
    </Container>
  )
}

export default Home
