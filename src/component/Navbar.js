import React from 'react'
import "../style/navbar.style.css"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="nav-header">
            <div className="nav-logo cur-point" onClick={() => navigate("/")}>
                <img width={150} src="/img/Advanced community logo.png" alt="logo.png" />
            </div>

            <div className="nav-menu">
                <div onClick={() => navigate("/")} className="nav-icon cur-point">
                    Home
                </div>

                <div onClick={() => navigate("/login")} className="nav-icon blue-btn cur-point">
                    Sign In
                </div>
            </div>
        </div>
    )
}

export default Navbar;
;