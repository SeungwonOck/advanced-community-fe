import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import "../style/myCampaign.style.css"
import NewCampaignDialog  from './NewCampaignDialog';
import CampaignCard from './CampaignCard';
import { useDispatch, useSelector } from 'react-redux';
import { campaignActions } from '../action/campaignAction';

const MyCampaign = () => {
  const dispatch = useDispatch();
  const [dropdownText, setDropdownText] = useState("All");
  const [selectedTab, setSelectedTab] = useState("all");
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");

  const { user } = useSelector((state) => state.user);
  const { campaignList } = useSelector((state) => state.campaign);

  useEffect(() => {
    dispatch(campaignActions.getAllCampaigns());
  }, [dispatch])

  const openEditForm = () => {
    setMode("edit");
    setShowDialog(true);
  }

  const handleClickNewItem = () => {
    setMode("new");
    setShowDialog(true);
  }

  const handleSelect = (tab, text) => {
    setSelectedTab(tab);
    setDropdownText(text);
  }

  const filteredCampaigns = campaignList.filter((campaign) => {
    const isAuthor = user._id === campaign.author._id;

    if (selectedTab === "all" && isAuthor) return true;
    if (selectedTab === "activated" && campaign.status === "activated" && isAuthor) return true;
    if (selectedTab === "deactivated" && campaign.status === "deactivated" && isAuthor) return true;
    if (selectedTab === "pending" && campaign.status === "pending" && isAuthor) return true;
    return false;
  })

  return (
    <div className="campaign-container">
      <div className="campaign-header">
        <h1>My Campaigns</h1>
        <div className="campaign-header-btns">
          <Button className="white-btn mr-2" onClick={handleClickNewItem}>
            + Create New Campaign
          </Button>
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

        <NewCampaignDialog
          mode={mode}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
    </div>
  )
}

export default MyCampaign
