import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';
import facebook_icon from '../assets/facebook.png';
import twitter_icon from '../assets/twitter.png';
import instagram_icon from '../assets/instagram.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h2>SCARECROW FARMS</h2>
          <p>Helping farmers with smart, sustainable agriculture solutions.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
            <ul>
                    <li><Link to="/">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/support">Support</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@scarecrow.com</p>
          <p>Phone: +91 **********</p>
          <div className="social-icons">
            <a href="#"><img src={facebook_icon} alt="Facebook" /></a>
            <a href="#"><img src={twitter_icon} alt="Twitter" /></a>
            <a href="#"><img src={instagram_icon} alt="Instagram" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Farmers Aid. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
