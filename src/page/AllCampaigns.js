import React, { useEffect, useState } from 'react'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
import CampaignCard from '../component/CampaignCard'
import { useDispatch, useSelector } from 'react-redux'
import { campaignActions } from '../action/campaignAction'
import "../style/allCampaign.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const AllCampaigns = () => {
  const dispatch = useDispatch();
  const [dropdownText, setDropdownText] = useState("All");
  const [filterText, setFilterText] = useState("Latest");
  const [selectedTab, setSelectedTab] = useState("all");
  const [filterTab, setFilterTab] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const { campaignList } = useSelector((state) => state.campaign);
  console.log("campaignList", campaignList);
  
  useEffect(() => {
    dispatch(campaignActions.getAllCampaigns());
  }, [])

  const handleSelect = (tab, text) => {
    setSelectedTab(tab);
    setDropdownText(text);
  }

  const handleFilter = (tab, text) => {
    setFilterTab(tab);
    setFilterText(text);
  }

  const handleSearch = (e) => {
    e.preventDefault();
  }

  const combineDateTime = (date, time) => {
    return new Date(`${date} ${time}`)
  }

  const filteredCampaigns = campaignList
    ?.filter((campaign) => {
      if (campaign.status !== "activated") return false;

      if (selectedTab === "normal" && campaign.author.role !== "normal") return false;
      if (selectedTab === "business" && campaign.author.role !== "business") return false;

      if (searchTerm && !campaign.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    })
    ?.sort((a, b) => {
      const dateA = combineDateTime(a.createAt.date, a.createAt.time);
      const dateB = combineDateTime(b.createAt.date, b.createAt.time);

      if (filterTab === "latest") {
        return dateB - dateA;
      } else {
        return dateA - dateB; 
      }
    });

  return (
    <Container className="mt-4">
      <div className="campaign-header">
        <div className="header-intro">
          <h2>All Campaigns</h2>
          <p>Change the society today!</p>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
              type="text"
              placeholder="Search campaigns..."
              className="search-input"
              value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}          
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon"/>
        </form>
        
          <div className="campaign-header-btns">
            <Dropdown>
                <Dropdown.Toggle className="white-btn">
                    {dropdownText}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSelect("all", "All")}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect("normal", "Normal")}>Normal</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect("business", "Business")}>Business</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          
            <Dropdown>
                <Dropdown.Toggle className="white-btn">
                    {filterText}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleFilter("latest", "Latest")}>Lastest</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter("oldest", "Oldest")}>Oldest</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      
        <Row className="mt-4">
          {filteredCampaigns?.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <Col key={index} xs={12} sm={6} md={6} lg={3}>
                <CampaignCard campaign={campaign} />
              </Col>
            ))
          ) : (
            <p>There is no campaign.</p>
          )}
        </Row>
      </Container>
  )
}

export default AllCampaigns
