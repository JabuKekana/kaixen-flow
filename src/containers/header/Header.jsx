import React from 'react';
import {
  DiWordpress,
  DiPhp,
  DiPostgresql,
  DiReact,
  DiHtml5,
  DiJavascript1,
  DiJava,
  DiPython,
  DiMysql,
  DiDatabase,
  DiNodejsSmall,
  DiCode,
} from "react-icons/di";
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Let Us Transform Your Challenges Into Solutions.</h1>
      <p>At Maidport, we leverage technology to address your unique challenges and turn them into opportunities. Whether you're starting fresh or enhancing an existing product, our tailored solutions—spanning WordPress websites, web apps, mobile applications, desktop software, and AI technology—are designed to meet your specific needs with cutting-edge tech.</p>

      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      <div className="gpt3__header-content__icons">
        <DiWordpress />
        <DiCode />
        <DiHtml5 />
        <DiJavascript1 />
        <DiPython />
        <DiJava /> 
        <DiPhp />
        <DiReact />
        <DiNodejsSmall />      
        <DiMysql />
        <DiPostgresql />
        <DiDatabase />
        
      </div>
      <p>We have worked with various technologies</p>
    </div>

    <div className="gpt3__header-image">
      <img src={ai} alt="AI Technology"/>
    </div>
  </div>
);

export default Header;
