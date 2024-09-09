import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CampaignCard from '../component/CampaignCard'
import "../style/home.style.css"
import { useNavigate } from 'react-router-dom'
import banner from "../asset/img/banner.jpeg"
const Home = () => {
  const navigate = useNavigate();

  const campaigns = [1, 2, 3, 4];
  return (
    <div>
      <div className="home-banner">
        <img src={banner} />
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
          <Button
            className="white-btn"
            variant="primary"
            size="lg"
            onClick={() => navigate("/campaign")}>Load More</Button>
        </div>
      </Container>
    </div>
  )
}

export default Home
