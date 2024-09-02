import React, { useState, useEffect, useRef } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/MP 1 light - top.png';
import './navbar.css';

const Navbar = ({ onOpenModal }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef(null);

  const closeMenu = () => setToggleMenu(false);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (toggleMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMenu]);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="gpt3__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#wgpt3">What is Maidport?</a></p>
          <p><a href="#footer">Get In Touch</a></p>
          <p><a href="#features">Services</a></p>
          <p><a href="#solutions">Solutions</a></p>
          <p><a href="#blog">Our Work</a></p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <button type="button" onClick={onOpenModal}>Get A Quote</button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={closeMenu} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center" ref={menuRef}>
            <div className="gpt3__navbar-menu_container-links">
              <p><a href="#home" onClick={closeMenu}>Home</a></p>
              <p><a href="#wgpt3" onClick={closeMenu}>What is Maidport?</a></p>
              <p><a href="#footer" onClick={closeMenu}>Get In Touch</a></p>
              <p><a href="#features" onClick={closeMenu}>Services</a></p>
              <p><a href="#solutions" onClick={closeMenu}>Solutions</a></p>
              <p><a href="#blog" onClick={closeMenu}>Our Work</a></p>
            </div>
            <div className="gpt3__navbar-menu_container-links-sign">
              <button type="button" onClick={() => { onOpenModal(); closeMenu(); }}>Get A Quote</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
