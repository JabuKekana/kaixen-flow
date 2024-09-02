import React from 'react';
import gpt3Logo from '../../assets/MP 1.png';
import './footer.css';

const Footer = ({ onOpenModal }) => (
  <div className="gpt3__footer section__padding" id="footer">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Start Your Project with Us – Request a Quote Now</h1>
    </div>

    <div className="gpt3__footer-btn" onClick={onOpenModal}>
      <p>Get A Quote</p>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={gpt3Logo} alt="gpt3_logo" />
        <p>Johannesburg, South Africa <br /> All Rights Reserved</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Linkedin</p>
        <p>Facebook</p>
        <p>Instagram</p>
        <p></p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>Johannesburg, South Africa</p>
        <p>support@maidport.co.za</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2024 Maidport. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
