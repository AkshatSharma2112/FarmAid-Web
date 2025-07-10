import React from 'react'
import "./Login.css";

const Login = () => {
  return (
    <section className="hero">
    <div className="login-container">
      <h2>Login</h2>
      <h5>Enter your credentials here </h5>
      <form className="login-form">
        
        <div className="input-group">
          <input type="email" required />
          <label>Email</label>
        </div>
        <div className="input-group">
          <input type="password" required />
          <label>Password</label>
        </div>
        <p className="forgot-password">
        Forgot password? <a href="#">Click Here</a>
      </p>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <p className="signup-text">
        Yet Not Registered? <a href="#">Sign Up</a>
      </p>
    </div>
    </section>
  )
}

export default Login
