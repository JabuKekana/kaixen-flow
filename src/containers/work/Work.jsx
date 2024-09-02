import React from 'react';
import Project from '../../components/project/Project';
import { project01, project02, project03, project04, project05 } from './imports';
import './work.css';

const Work = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">Innovations in Action: <br /> Our Recent Projects</h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Project imgUrl={project01} date="Aug 02, 2024" text="The GPS Logging and Tracking System is an advanced application designed to provide real-time tracking and comprehensive logging of GPS data. The system includes a live tracking feature and supports two-way communication for remote configuration of tracking devices. This project has undergone multiple iterations and updates, continuously evolving to enhance its functionality and user experience." link="https://crow.maidport.co.za/" />
      </div>
      <div className="gpt3__blog-container_groupB">
        <Project imgUrl={project02} date="July 18, 2024" text="Creatives SA migrates to Python Server Managed by Maidport to strengthen security." link="https://www.creativessa.com/" />
        <Project imgUrl={project03} date="May 26, 2024" text="We developed a user-friendly app that helps you easily store, organize, and redeem coupons." link="https://couponkeep.co.za/" />
        <Project imgUrl={project04} date="Oct 10, 2023" text="We revamped Qhagamshela’s website by moving it from a drag-and-drop platform to a custom-coded solution. This upgrade preserved their design while enhancing performance and scalability" link="https://qhagamshela.co.za/" />
        <Project imgUrl={project05} date="Aug 29, 2024" text="Meerath Publishers transitioned their site to WordPress to overcome limitations of their previous platform. We facilitated this migration, enabling greater customization and functionality." link="https://meerathpublishers.co.za/" />
      </div>
    </div>
  </div>
);

export default Work;
