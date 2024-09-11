import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CampaignCard from '../component/CampaignCard'
import "../style/home.style.css"
import { useNavigate } from 'react-router-dom'
import banner from "../asset/img/banner.jpeg"
import { useDispatch, useSelector } from 'react-redux'
import { homeActions } from '../action/homeAction'
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { homeCampaign } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(homeActions.getHomeCampaignData());
  }, []);


  return (
    <div>
      <div className="home-banner">
        <img src={banner} />
      </div>

      <Container className="mt-4">
        <h2>Our Campaigns</h2>
        <p>Change the society today!</p>
        <Row className="mt-4">
          {homeCampaign.length > 0 ? (
            homeCampaign.map((campaign, index) => (
              <Col key={index} xs={12} sm={6} md={6} lg={3}>
                <CampaignCard campaign={campaign} />
              </Col>
            ))
          ) : (
            <p>There is no campaign.</p>
          )}
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
