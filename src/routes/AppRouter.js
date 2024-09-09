import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "../page/Home"
import Campaign from "../page/CampaignDetail"
import AllCampaigns from '../page/AllCampaigns';
import Login from "../page/Login"
import Register from "../page/Register"
import PasswordVerify from '../page/PasswordVerify';
import Account from '../page/Account';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/campaign" element={<AllCampaigns/> } />
            <Route path="/password/verify" element={<PasswordVerify />} />
            <Route path="/campaign/:id" element={<Campaign />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    )
}

export default AppRouter;