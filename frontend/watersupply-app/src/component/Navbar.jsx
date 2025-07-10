import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo_light from "/src/assets/logo-black.png";
import logo_light1 from "/src/assets/logo-black1.png";
import logo_dark from "/src/assets/logo-white.png";
import logo_dark1 from "/src/assets/logo-white1.png";
import search_icon_light from "/src/assets/search-w.png";
import search_icon_dark from "/src/assets/search-b.png";
import toggle_light from "/src/assets/night.png";
import toggle_dark from "/src/assets/day.png";

const Navbar = ({ theme, setTheme }) => {
  const [activeTab, setActiveTab] = useState("signup");

  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="navbar">
      <img
        src={theme === "light" ? logo_light1 : logo_dark1}
        alt="Logo"
        className="logo"
      />
      <img
        src={theme === "light" ? logo_light : logo_dark}
        alt="Logo"
        className="logo1"
      />

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('signup')}
        >
          <Link to="/signup">Sign Up</Link> 
        </button>
        <button
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          <Link to="/login">Log in</Link>
        </button>
      </div>

      <div className="searchbox">
        <input type="text" placeholder="Search..." />
        <img
          src={theme === "light" ? search_icon_light : search_icon_dark}
          alt="Search"
        />
      </div>

      <img
        onClick={toggle_mode}
        src={theme === "light" ? toggle_light : toggle_dark}
        alt="Toggle Theme"
        className="toggleicon"
      />
    </div>
  );
};

export default Navbar;
