import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CampaignCard from '../component/CampaignCard'
import "../style/home.style.css"
import largest from "../asset/img/banner-1400px.png";
import large from "../asset/img/banner-1200px.png";
import medium from "../asset/img/banner-992px.png";
import small from "../asset/img/banner-768px.png";
import smallest from "../asset/img/banner-576px.png";

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { homeActions } from '../action/homeAction'
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(largest);
  const { homeCampaign } = useSelector((state) => state.home);
  
  useEffect(() => {
    dispatch(homeActions.getHomeCampaignData());
  }, []);

  useEffect(() => {
    const updateImage = () => {
      const width = window.innerWidth;

      if (width <= 576) {
        setImageSrc(smallest);
      } else if (width > 576 && width <= 768) {
        setImageSrc(small);
      } else if (width > 768 && width <= 992) {
        setImageSrc(medium);
      } else if (width > 992 && width <= 1200) {
        setImageSrc(large);
      } else {
        setImageSrc(largest);
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      updateImage();
    })

    resizeObserver.observe(document.body)

    updateImage();
  }, [])


  return (
    <div>
      <div className="home-banner">
        <img src={imageSrc} alt="Banner"/>
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
