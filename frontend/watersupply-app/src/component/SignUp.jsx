import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {

  const [action, setAction] = useState("Sign Up")

  return (
    <section className="hero">
    <div className="signup-container">
      <h2>Sign up</h2>
      <form className="signup-form">
        <div className="input-group">
          <input type="text" required />
          <label>Name</label>
        </div>
        <div className="input-group">
          <input type="email" required />
          <label>Email</label>
        </div>
        <div className="input-group">
          <input type="password" required />
          <label>Password</label>
        </div>
        <div className="input-group">
          <input required />
          <label>Confirm Password</label>
        </div>
        <button type="submit" className="signup-btn" onClick={()=>{setAction("Sign Up")}}>
          Sign Up
        </button>
      </form>
      <p className="login-text">
        Already have an account? <a href="#">Log In</a>
      </p>
      <div className="divider">
        <span>or</span>
      </div>
      <button className="google-btn">
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
        />
        Sign up with Google
      </button>
    </div>
    </section>
  );
};

export default SignUp;
