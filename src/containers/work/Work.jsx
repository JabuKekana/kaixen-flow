import React from 'react';
import Project from '../../components/project/Project';
import { project01, project02, project03, project04, project05 } from './imports';
import './work.css';

const Work = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">A lot is happening, <br /> We are blogging about it.</h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Project imgUrl={project01} date="Sep 26, 2024" text="The GPS Logging and Tracking System is an advanced application designed to provide real-time tracking and comprehensive logging of GPS data. The system includes a live tracking feature and supports two-way communication for remote configuration of tracking devices. This project has undergone multiple iterations and updates, continuously evolving to enhance its functionality and user experience." />
      </div>
      <div className="gpt3__blog-container_groupB">
        <Project imgUrl={project02} date="Sep 26, 2024" text="Creatives SA migrates to Python Server Managed by Maidport to strengthen security." />
        <Project imgUrl={project03} date="Sep 26, 2024" text="We developed a user-friendly app that helps you easily store, organize, and redeem coupons." />
        <Project imgUrl={project04} date="Sep 26, 2024" text="Blah Blah need to figure out what to put here" />
        <Project imgUrl={project05} date="Sep 26, 2024" text="Blah Blah need to figure out what to put here" />
      </div>
    </div>
  </div>
);

export default Work;
