import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "../page/Home"
import Campaign from "../page/CampaignDetail"
import Login from "../page/Login"
import Register from "../page/Register"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaign/:id" element={<Campaign />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRouter;