import React from 'react';
import { FaCode, FaShoppingCart, FaUserLock, FaDatabase, FaRobot } from 'react-icons/fa';
import './solutions.css';

const solutionsData = [
  {
    icon: <FaCode />,
    title: 'Custom Software Solutions',
    description: 'Tailor-made software designed to meet unique business needs from concept to deployment. This encompasses various aspects such as development, integration, and maintenance.',
  },
  {
    icon: <FaRobot />,
    title: 'AI Technology Solutions',
    description: 'Leveraging artificial intelligence to create innovative and intelligent systems, potentially integrating with existing software or creating new capabilities.',
  },
  {
    icon: <FaShoppingCart />,
    title: 'E-Commerce Solutions',
    description: 'Full packages that include web development, payment integration, inventory management, and other components required for a complete online shopping experience.',
  },
  {
    icon: <FaDatabase />,
    title: 'Digital Transformation Solutions',
    description: 'Strategies and technologies aimed at modernizing and optimizing business processes and operations through digital means.',
  },
  {
    icon: <FaUserLock />,
    title: 'Cybersecurity Solutions',
    description: 'Comprehensive security measures including software, monitoring, and consulting to protect against digital threats.',
  },
];

const Solutions = () => (
  <div className="solutions section__padding" id="solutions">
    <div className="solutions-heading">
      <h1 className="gradient__text">Explore Our Cutting-Edge Solutions</h1>
      <p>Discover how we can help you achieve your goals</p>
    </div>
    <div className="solutions-container">
      {solutionsData.map((item, index) => (
        <div className="card" key={index}>
          <div className="content">
            <div className="front">
              <div className="icon">{item.icon}</div>
              <h2>{item.title}</h2>
              <button className="card-button">Learn More</button>
            </div>
            <div className="back">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Solutions;
