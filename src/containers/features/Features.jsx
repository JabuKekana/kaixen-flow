import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'Custom Software Solutions',
    text: 'We provide tailored software solutions designed to meet your unique business needs, from initial concept to final deployment. Our team excels in creating scalable, efficient, and innovative software that drives your business forward.',
  },
  {
    title: 'Web Development',
    text: 'Our web development services cover everything from simple websites to complex web applications. We build responsive, user-friendly, and SEO-optimized websites that enhance your online presence and engage your audience.',
  },
  {
    title: 'Mobile App Development',
    text: 'We develop high-quality mobile apps for iOS and Android platforms that offer seamless user experiences and help you reach your customers on the go. From concept to launch, our team ensures your app is both functional and engaging.',
  },
  {
    title: 'UI/UX Design',
    text: 'Our UI/UX design services focus on creating intuitive, visually appealing, and user-centric designs. We strive to provide an engaging experience that meets user needs and enhances the overall interaction with your digital product.',
  },
  {
    title: 'Maintenance and Support',
    text: 'We offer comprehensive maintenance and support services to ensure your software remains up-to-date, secure, and fully functional. Our team is here to assist you with any updates, troubleshooting, or enhancements you may need.',
  },
  {
    title: 'Quality Assurance and Testing',
    text: 'Our quality assurance and testing services ensure that your software is reliable, bug-free, and performs optimally. We conduct thorough testing to identify and resolve any issues before your product goes live, providing a seamless user experience.',
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">The Future is Now and You Just Need to Realize It. Step into Future Today. & Make it Happen.</h1>
      <p>Request Early Access to Get Started</p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
