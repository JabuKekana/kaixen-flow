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
      <p>From WordPress websites and web apps to mobile applications, desktop software, and AI technology, Maidport delivers tailored solutions to meet your needs. Whether you're starting from scratch or enhancing an existing product, we specialize in transforming your challenges into opportunities with cutting-edge tech.</p>

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
