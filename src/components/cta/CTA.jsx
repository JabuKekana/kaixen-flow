import React from 'react';
import './cta.css';

const CTA = ({ onOpenModal })  => (
  <div className="gpt3__cta">
    <div className="gpt3__cta-content">
      <p>Get in touch</p>
      <h3>Get in touch today & find out how we can help you.</h3>
    </div>
    <div className="gpt3__cta-btn">
      <button type="button"  onClick={onOpenModal}>Get Started</button>
    </div>
  </div>
);

export default CTA;
