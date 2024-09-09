import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CampaignCard from '../component/CampaignCard'
import { useDispatch } from 'react-redux'
import { campaignActions } from '../action/campaignAction'

const AllCampaigns = () => {
  const dispatch = useDispatch();
  const campaigns = [1, 2, 3, 4];

  useEffect(() => {
    dispatch(campaignActions.getAllCampaigns());
  }, [])

  return (
    <Container className="mt-4">
        <h2>All Campaigns</h2>
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

export default AllCampaigns
