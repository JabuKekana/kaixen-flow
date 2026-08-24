import React, { useState } from 'react';
import { AppLink } from '../AppLink';
import { Brand } from '../Brand';
import { footerLinks, socialLinks } from '../../data/siteContent';

export function Footer({ currentPath, navigate }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    navigate(`/book?email=${encodeURIComponent(trimmedEmail)}`);
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <AppLink className="brand brand--footer" currentPath={currentPath} href="/" navigate={navigate}>
            <Brand />
          </AppLink>
          <p className="site-footer__text">
            A curated movement, music and wellness community in Johannesburg. Physio-led and
            community-driven.
          </p>
        </div>

        <div>
          <h3 className="site-footer__heading">Quick Links</h3>
          <div className="site-footer__links">
            {footerLinks.map((link) => (
              <AppLink
                key={link.href}
                className="site-footer__link"
                currentPath={currentPath}
                href={link.href}
                navigate={navigate}
              >
                {link.label}
              </AppLink>
            ))}
          </div>
        </div>

        <div>
          <h3 className="site-footer__heading">Stay Connected</h3>
          <p className="site-footer__text">Soft mornings, new events and invitations straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              aria-label="Email address"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              type="email"
              value={email}
            />
            <button type="submit">Join</button>
          </form>
          <div className="social-row">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer__meta">
        <p>© KaixenFlow 2026</p>
        <div>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
