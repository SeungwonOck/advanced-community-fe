import React from 'react'
import "../style/navbar.style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userActions } from '../action/userAction'
import logo from "../asset/img/Advanced community logo.png"

const Navbar = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(userActions.logout());
        navigate("/")
    }
    return (
        <div className="nav-header">
            <div className="nav-logo cur-point" onClick={() => navigate("/")}>
                <img width={150} src={logo} alt="logo.png" />
            </div>

            <div className="nav-menu">
                <div onClick={() => navigate("/")} className="nav-icon cur-point">
                    Home
                </div>

                <div onClick={() => navigate("/campaign")} className="nav-icon cur-point">
                    All Campaigns
                </div>

                {user ? (
                    <>
                        <div className="nav-icon cur-point">
                            <FontAwesomeIcon icon={faUser} onClick={() => navigate("/account")}/>
                        </div>
                        <div onClick={logout} className="nav-icon cur-point">
                            Logout
                        </div>
                    </>
                ) : (
                    <div onClick={() => navigate("/login")} className="nav-icon white-btn cur-point">
                        Sign In    
                    </div>
        
                )}
            </div>
        </div>
    )
}

export default Navbar;
;