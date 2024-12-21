import React from 'react';
import possibilityImage from '../../assets/possibility.png';
import './approach.css';

const Approach = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
        <h1 className="gradient__text">Our Approach to Innovation and Excellence</h1>
        <p>
            At Maidport, we believe in a structured and collaborative approach to turning your ideas into impactful solutions.
            Our process is built on understanding your unique needs, leveraging cutting-edge technology, and maintaining a
            commitment to quality. From the initial consultation to the final delivery, we ensure transparency, adaptability,
            and excellence every step of the way. Discover how our thoughtful approach transforms your vision into reality and
            drives your success.
        </p>
    </div>
  </div>
);

export default Approach;
