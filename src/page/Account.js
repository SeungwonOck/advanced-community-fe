import React, { useEffect, useState } from 'react'
import "../style/account.style.css"
import { useNavigate} from 'react-router-dom'
import AccountDetails from '../component/AccountDetails';
import MyCampaign from '../component/MyCampaign';
import { useSelector } from 'react-redux';
import ManageCampaigns from '../component/ManageCampaigns';

const AccountPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("account");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/")
    } 
  }, [user]);

  return (
    <div className="account-page-container">
      <div className="sidebar">
        <h2>Settings</h2>
        <ul>
          <li onClick={() => setTab("account")}>My Account</li>
        </ul>
        <h2>Campaign Management</h2>
        <ul>
          <li onClick={() => setTab("myCampaigns")}>My Campaigns</li>
          {user && user.role === "admin" ? 
          <li onClick={() => setTab("manageCampaigns")}>Manage Campaigns</li> : ""}
        </ul>
      </div>
      <div className="account-form-container">
        {tab === "account" ? <AccountDetails /> : tab === "myCampaigns" ? <MyCampaign/> : <ManageCampaigns/>}
      </div>
    </div>
  )
}

export default AccountPage
