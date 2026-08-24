import React from 'react';
import { AppLink } from '../AppLink';
import { Brand } from '../Brand';
import { navLinks } from '../../data/siteContent';

export function Header({ currentPath, menuOpen, navigate, setMenuOpen }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <AppLink className="brand" currentPath={currentPath} href="/" navigate={navigate}>
          <Brand />
        </AppLink>

        <nav aria-label="Primary" className="desktop-nav">
          {navLinks.map((link) => (
            <AppLink
              key={link.href}
              className="nav-link"
              currentPath={currentPath}
              href={link.href}
              navigate={navigate}
            >
              {link.label}
            </AppLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <AppLink
            className="button button--primary button--small header-cta"
            currentPath={currentPath}
            href="/book"
            navigate={navigate}
          >
            Book Now
          </AppLink>
          <button
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-nav">
          {navLinks.map((link) => (
            <AppLink
              key={link.href}
              className="mobile-nav__link"
              currentPath={currentPath}
              href={link.href}
              navigate={navigate}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </AppLink>
          ))}
          <AppLink
            className="button button--primary mobile-nav__cta"
            currentPath={currentPath}
            href="/book"
            navigate={navigate}
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </AppLink>
        </div>
      ) : null}
    </header>
  );
}
