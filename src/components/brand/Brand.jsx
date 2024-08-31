import React from 'react';
import { linkedin, youtube, whatsapp, facebook, instagram } from './imports';
import './brand.css';

const Brand = () => (
  <div className="gpt3__brand section__padding">
    <div>
      <img src={linkedin} alt='linkedin'/>
    </div>
    <div>
      <img src={youtube} alt='youtube'/>
    </div>
    <div>
      <img src={whatsapp} alt='whatsapp'/>
    </div>
    <div>
      <img src={facebook} alt='facebook'/>
    </div>
    <div>
      <img src={instagram} alt='instagram'/>
    </div>
  </div>
);

export default Brand;
