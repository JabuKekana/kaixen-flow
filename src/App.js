import React, { useState } from 'react';

import { Footer, Work, Approach, Features, WhatIsMaidport, Solutions, Header,  QuoteModal } from './containers';
import { CTA, Brand, Navbar, ScrollUp } from './components';

import './App.css';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar  onOpenModal={() => setModalOpen(true)}/>
        <Header />
      </div>
        <Approach />
        <WhatIsMaidport />
        <Features />
        <Solutions />
      <CTA   onOpenModal={() => setModalOpen(true)}/>
      <Work />
      <Footer onOpenModal={() => setModalOpen(true)} />
      <QuoteModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <ScrollUp />
    </div>
  );
};

export default App;
