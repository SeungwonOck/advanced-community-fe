import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { campaignActions } from '../action/campaignAction';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';
import CampaignCard from './CampaignCard';

const ManageCampaigns = () => {
  const dispatch = useDispatch();
  const [dropdownText, setDropdownText] = useState("All");
  const [selectedTab, setSelectedTab] = useState("all");

  const { campaignList } = useSelector((state) => state.campaign);

  useEffect(() => {
    dispatch(campaignActions.getAllCampaigns());
  }, [])

  const handleSelect = (tab, text) => {
    setSelectedTab(tab);
    setDropdownText(text);
  }

  const filteredCampaigns = campaignList.filter((campaign) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "activated") return campaign.status === "activated";
    if (selectedTab === "deactivated") return campaign.status === "deactivated";
    if (selectedTab === "pending") return campaign.status === "pending";
    return false;
  })

  return (
    <div className="campaign-container">
      <div className="campaign-header">
        <h1>Manage Campaigns</h1>
        <div className="campaign-header-btns">
          <Dropdown>
              <Dropdown.Toggle className="white-btn">
                  {dropdownText}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSelect("all", "All")}>All</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("activated", "Activated")}>Activated</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("deactivated", "Deactivated")}>Deactivated</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("pending", "Pending")}>Pending</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="mt-4">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <Col key={index} xs={12} sm={12} md={6} lg={4}>
                <CampaignCard campaign={campaign} />
              </Col>
            ))
          ) : (
            <p>There is no campaign yet.</p>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default ManageCampaigns
