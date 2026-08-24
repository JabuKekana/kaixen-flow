import React from 'react';
import { AppLink } from '../components/AppLink';
import { ImageCard } from '../components/ImageCard';
import {
  collaborations,
  featuredHomeEvent,
  homeFeatures,
  homeImages,
  homeOfferings,
} from '../data/siteContent';

export function HomePage({ currentPath, navigate }) {
  return (
    <>
      <section className="hero grid-two">
        <div className="hero__copy">
          <span className="eyebrow">Movement · Music · Wellness</span>
          <h1>
            A curated movement,
            <br />
            music and wellness
            <br />
            <em>community.</em>
          </h1>
          <p>
            KaixenFlow is a space where Pilates-inspired flow meets intention, connection and a
            premium wellness atmosphere.
          </p>
          <div className="button-row">
            <AppLink className="button button--primary" currentPath={currentPath} href="/book" navigate={navigate}>
              Book Your Flow
            </AppLink>
            <AppLink
              className="button button--secondary"
              currentPath={currentPath}
              href="/events"
              navigate={navigate}
            >
              View Events
            </AppLink>
          </div>
        </div>

        <div className="hero__media">
          <ImageCard
            alt="Women enjoying a KaixenFlow Pilates session"
            className="image-card--hero"
            image={homeImages.hero}
            title="KaixenFlow Session"
          />
          <div className="quote-card">
            <p>"flow. evolve. repeat."</p>
            <span>Physio-led · Community-driven</span>
          </div>
        </div>
      </section>

      <section className="card-section card-section--centered">
        <p className="eyebrow">The Name</p>
        <h2>
          Inspired by <em>Kaizen.</em>
        </h2>
        <p>
          KaixenFlow draws from the philosophy of steady improvement through small intentional
          steps, reflected in how the brand approaches movement, healing and daily rituals.
        </p>
      </section>

      <section className="section grid-two">
        <div>
          <p className="eyebrow">What We Offer</p>
          <h2>
            Thoughtfully designed <em>experiences.</em>
          </h2>
          <p className="section-copy">
            Every session blends movement, music and mindful structure with a physiotherapy-aware
            approach.
          </p>
        </div>
        <ul className="number-list">
          {homeOfferings.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section-heading section-heading--centered">
          <p className="eyebrow">Not a Studio — A Movement Experience</p>
          <h2>
            Where movement <em>becomes art.</em>
          </h2>
        </div>
        <div className="feature-grid">
          {homeFeatures.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-card__icon">
                <feature.icon aria-hidden="true" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Featured Event</p>
          <h2>
            Summer Reset, <em>on the mat.</em>
          </h2>
        </div>
        <article className="home-event-card">
          <div className="home-event-card__media">
            <img alt={featuredHomeEvent.title} src={featuredHomeEvent.image} />
            <div className="event-card__badge">{featuredHomeEvent.date}</div>
          </div>
          <div className="home-event-card__body">
            <p className="home-event-card__eyebrow">Next Up</p>
            <h3>{featuredHomeEvent.title}</h3>
            <p className="home-event-card__copy">{featuredHomeEvent.description}</p>
            <ul className="home-event-card__details">
              <li>
                <span>Price</span>
                <strong>{featuredHomeEvent.price}</strong>
                {featuredHomeEvent.hasDropIn && (
                  <span className="drop-in-note">Drop-in: R{featuredHomeEvent.dropInPrice}</span>
                )}
              </li>
              <li>
                <span>Time</span>
                <strong>{featuredHomeEvent.time}</strong>
              </li>
              <li>
                <span>Venue</span>
                <strong>{featuredHomeEvent.venue}</strong>
              </li>
            </ul>
            <div className="button-row">
              <AppLink
                className="button button--primary"
                currentPath={currentPath}
                href={`/book?event=${encodeURIComponent(featuredHomeEvent.title)}`}
                navigate={navigate}
              >
                Book Now
              </AppLink>
              <AppLink className="button button--secondary" currentPath={currentPath} href="/events" navigate={navigate}>
                See More
              </AppLink>
            </div>
          </div>
        </article>
      </section>

      <section className="section">
        <div className="section-heading section-heading--centered">
          <p className="eyebrow">In Good Company</p>
          <h2>
            Past brand <em>collaborations.</em>
          </h2>
        </div>
        <div className="logo-grid">
          {collaborations.map((item) => (
            <div key={item.name} className="logo-tile">
              <img alt={item.name} src={item.image} />
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <p className="eyebrow">By invitation · Johannesburg</p>
          <h2>
            Your seat at the flow <em>awaits.</em>
          </h2>
          <div className="button-row">
            <AppLink className="button button--primary" currentPath={currentPath} href="/book" navigate={navigate}>
              Reserve a Class
            </AppLink>
          </div>
        </div>
        <div className="cta-banner__media">
          <img alt="KaixenFlow community gathered together" src={homeImages.cta} />
        </div>
      </section>
    </>
  );
}