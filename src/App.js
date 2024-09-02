import React, { useState } from 'react';

import { Footer, Work, Approach, Features, WhatIsMaidport, Solutions, Header,  QuoteModal } from './containers';
import { CTA, Brand, Navbar } from './components';

import './App.css';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <Brand />
      <WhatIsMaidport />
      <Features />
      <Solutions />
      <Approach />
      <CTA />
      <Work />
      <Footer onOpenModal={() => setModalOpen(true)} />
      <QuoteModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default App;
