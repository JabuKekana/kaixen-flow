import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatIsMaidport.css';

const WhatIsMaidport = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is Maidport?" text="We are Maidport, short for Multiple Aid Port, committed to providing a wide range of custom software solutions designed to address the unique challenges of your business. Our team of experienced professionals leverages cutting-edge technologies and industry best practices to create reliable, scalable, and secure applications." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
      <p>Explore the Library</p>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Software Solutions" text="Elevate your business with tailor-made software solutions designed to fit your unique requirements." />
      <Feature title="DevOps" text="Our DevOps solutions focus on implementing continuous integration and continuous delivery (CI/CD) pipelines, automating workflows, and optimizing infrastructure management." />
      <Feature title="System Automations" text="We specialize in automating repetitive and manual tasks, allowing your team to focus on more strategic initiatives." />
    </div>
  </div>
);

export default WhatIsMaidport;
