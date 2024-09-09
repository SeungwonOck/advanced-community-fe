import React, { useState } from 'react'

const PasswordVerify = () => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    reset_code_input: 0,
    password_1: "",
    password_2: "",
  });

  return (
    <div className="forget-password-form">
      <div className="title">Reset Password</div>
      <div className='form-control' ><input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please Enter Email"/></div>                    
      <div className='send-btn'>Send Code</div>
    </div>
  )
}

export default PasswordVerify
