import React from 'react';
import logo from '../assets/kaixen-flow-logo (1).png';

export function Brand() {
  return (
    <>
      <img alt="KaixenFlow" className="brand__image" src={logo} />
      <span className="sr-only">KaixenFlow</span>
    </>
  );
}
