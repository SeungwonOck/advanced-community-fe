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
  console.log("user", user.UserId);
  useEffect(() => {
    dispatch(campaignActions.getCampaignsByOwner(user.UserId))
  }, [user])

  const campaigns = [1, 2, 3, 4];

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
          {campaigns.map((_, index) => (
            <Col key={index} xs={12} sm={6} md={6} lg={4}>
              <CampaignCard />
            </Col>
          ))}
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
