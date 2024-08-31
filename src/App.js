import React from 'react';

import { Footer, Work, Possibility, Features, WhatIsMaidport, Header } from './containers';
import { CTA, Brand, Navbar } from './components';

import './App.css';

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <Brand />
    <WhatIsMaidport />
    <Features />
    <Possibility />
    <CTA />
    <Work />
    <Footer />
  </div>
);

export default App;
