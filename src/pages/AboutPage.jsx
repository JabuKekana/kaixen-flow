import React from 'react';
import { AppLink } from '../components/AppLink';
import { ImageCard } from '../components/ImageCard';
import { aboutPillars, homeImages } from '../data/siteContent';

export function AboutPage({ currentPath, navigate }) {
  return (
    <>
      <section className="page-hero grid-two">
        <div>
          <p className="eyebrow">About KaixenFlow</p>
          <h1>
            Movement is more
            <br />
            <em>than exercise.</em>
          </h1>
          <div className="stacked-copy">
            <p>
              KaixenFlow was founded by a physiotherapy-led creative with a deep interest in
              movement, music and community.
            </p>
            <p>
              The brand combines rehabilitation awareness, functional movement and event design so
              each experience feels both body-conscious and emotionally grounded.
            </p>
            <p>
              Based in Johannesburg, the concept treats movement as healing, connection and
              expression rather than only exercise.
            </p>
          </div>
          <AppLink className="button button--primary" currentPath={currentPath} href="/events" navigate={navigate}>
            Explore Experiences
          </AppLink>
        </div>
        <ImageCard
          alt="Founder of KaixenFlow"
          className="image-card--portrait"
          image={homeImages.about}
          title="Kaixen Flow Founder"
        />
      </section>

      <section className="section">
        <div className="section-heading section-heading--centered">
          <p className="eyebrow">The Intersection</p>
          <h2>
            Where KaixenFlow <em>lives.</em>
          </h2>
        </div>
        <div className="pillar-grid">
          {aboutPillars.map((pillar) => (
            <article key={pillar.number} className="pillar-card">
              <p className="pillar-card__number">{pillar.number}</p>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
