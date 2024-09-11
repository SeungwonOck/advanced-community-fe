import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import { commonUiActions } from '../action/commonUiAction';
import "../style/passwordVerify.style.css";

const PasswordVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { findUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const findPassword = () => {
    if (email === "") {
      dispatch(commonUiActions.showToastMessage("Please write an email", "error"))
    } else {
      dispatch(userActions.forgetPassword(email))
    }
  }

  const setNewPassword = () => {
        if(password === "") {
            dispatch(commonUiActions.showToastMessage("Please enter new password", "error"))
            return;
        } 
        if(confirmPassword === "") {
            dispatch(commonUiActions.showToastMessage("Please re-enter password", "error"))
            return;
        } 
        if(password !== confirmPassword) {
            dispatch(commonUiActions.showToastMessage("Incorrect Password", "error"))
            return;
        }
        dispatch(userActions.setNewPassword(findUser._id, password, navigate))
    }

  return (
    <div className="forget-password-form">
      <div className="title">Find Password</div>
            {findUser ? 
            <>
                <div className='form-control mb-1'>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Please enter new password"/>
                </div>
                <div className='form-control mb-1'>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Please Re-enter Password"/>
                </div>
                <div className="send-btn" onClick={() => setNewPassword()}>Reset Password</div>
            </>
            :
            <>
                <div className='form-control' ><input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please type an email"/></div>
                <div className='send-btn' onClick={() => findPassword()}>Find</div>
            </>
            }
    </div>
  )
}

export default PasswordVerify
