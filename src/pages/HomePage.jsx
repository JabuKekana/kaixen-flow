import React from "react";
import { FiArrowUpRight, FiArrowDown, FiPlus } from "react-icons/fi";
import { AppLink } from "../components/AppLink";
import {
  collaborations,
  featuredHomeEvent,
  galleryItems,
  homeFeatures,
  homeImages,
  socialLinks,
} from "../data/siteContent";

export function HomePage({ currentPath, navigate }) {
  const linkProps = { currentPath, navigate };
  const ways = [
    {
      title: "The club sessions",
      image: galleryItems[1].image,
      copy: "Music on. Mats down. Signature group movement with a community that feels like yours.",
      href: "/events",
      label: "Find your next flow",
    },
    {
      title: "A little more personal",
      image: galleryItems[2].image,
      copy: "One-on-one movement and intimate group experiences, shaped around your body and your rhythm.",
      href: socialLinks[2].href,
      label: "Enquire about private sessions",
    },
    {
      title: "Beyond the mat",
      image: galleryItems[8].image,
      copy: "Beautiful spaces, thoughtful collaborations and wellness gatherings worth making time for.",
      href: "/about",
      label: "Meet the world of KaixenFlow",
    },
  ];
  return (
    <>
      <section className="club-hero">
        <img
          className="club-hero__image"
          src={homeImages.hero}
          alt="The KaixenFlow community sharing a moment together after Pilates"
          fetchPriority="high"
        />
        <div className="club-hero__top">
          <span className="eyebrow">Johannesburg, South Africa</span>
          <span className="hero-coordinate">
            Movement. Ritual. Good company.
          </span>
        </div>
        <div className="club-hero__title">
          <p className="script">welcome to the club</p>
          <h1>KAIXENFLOW</h1>
        </div>
        <div className="club-hero__bottom">
          <p>
            A little movement.
            <br />A deeper connection.
            <br />A whole new kind of feeling.
          </p>
          <AppLink
            {...linkProps}
            href="/events"
            className="button button--butter"
          >
            Find your flow <FiArrowUpRight />
          </AppLink>
          <a
            className="hero-scroll"
            href="#the-club"
            aria-label="Discover the club"
          >
            <FiArrowDown />
          </a>
        </div>
      </section>
      <div
        className="flow-ticker"
        aria-label="Move well. Live softly. Stay connected."
      >
        <div aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>
              Move well <FiPlus /> Live softly <FiPlus /> Stay connected{" "}
              <FiPlus />
            </span>
          ))}
        </div>
      </div>
      <section className="club-intro section" id="the-club" data-reveal>
        <div className="section-index">
          <span className="eyebrow">01 / The KaixenFlow feeling</span>
          <span className="script">you belong here.</span>
        </div>
        <h2>
          A stronger body.
          <br />A softer life.
          <br />
          <em>Your kind of people.</em>
        </h2>
        <div className="club-intro__aside">
          <span className="mini-mark" aria-hidden="true">
            kf.
          </span>
          <p>
            We believe feeling good goes beyond the mat. We bring together
            Pilates-inspired movement, music and meaningful connection, in
            spaces that make you want to stay a little longer.
          </p>
          <AppLink {...linkProps} className="text-link" href="/about">
            Get to know the club <FiArrowUpRight />
          </AppLink>
        </div>
      </section>
      <section className="ways-section section">
        <div className="section-heading section-heading--split" data-reveal>
          <div>
            <p className="eyebrow">02 / Make it your ritual</p>
            <h2>
              Ways to <em>flow.</em>
            </h2>
          </div>
          <p>
            Different ways to show up for yourself.
            <br />
            The same feel-good energy.
          </p>
        </div>
        <div className="ways-grid">
          {ways.map((way, i) => (
            <article className="way-item" key={way.title} data-reveal>
              <AppLink
                {...linkProps}
                href={way.href}
                className="way-item__image"
              >
                <img src={way.image} alt={way.title} loading="lazy" />
                <span className="way-item__number">0{i + 1}</span>
                <span className="image-arrow">
                  <FiArrowUpRight />
                </span>
              </AppLink>
              <h3>{way.title}</h3>
              <p>{way.copy}</p>
              <AppLink {...linkProps} href={way.href} className="text-link">
                {way.label}
                <FiArrowUpRight />
              </AppLink>
            </article>
          ))}
        </div>
      </section>
      <section className="club-manifesto section" data-reveal>
        <div className="section-index">
          <p className="eyebrow">A practice. A ritual. A community.</p>
          <span className="script">flow. evolve. repeat.</span>
        </div>
        <h2>
          Come for the movement.
          <br />
          <em>Stay for the feeling.</em>
        </h2>
        <div className="manifesto-features">
          {homeFeatures.map((feature) => (
            <div key={feature.title}>
              <feature.icon aria-hidden="true" />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section home-programme">
        <div className="section-heading section-heading--split" data-reveal>
          <div>
            <p className="eyebrow">03 / Something to look forward to</p>
            <h2>
              Meet you <em>on the mat.</em>
            </h2>
          </div>
          <AppLink {...linkProps} href="/events" className="text-link">
            The full programme <FiArrowUpRight />
          </AppLink>
        </div>
        {featuredHomeEvent ? (
          <article className="programme-feature" data-reveal>
            <div className="programme-feature__image">
              <img
                src={featuredHomeEvent.image}
                alt={featuredHomeEvent.title}
                loading="lazy"
              />
            </div>
            <div className="programme-feature__body">
              <p className="eyebrow">Next in the diary</p>
              <h3>{featuredHomeEvent.title}</h3>
              <p>{featuredHomeEvent.description}</p>
              <dl>
                <div>
                  <dt>When</dt>
                  <dd>
                    {featuredHomeEvent.date} / {featuredHomeEvent.time}
                  </dd>
                </div>
                <div>
                  <dt>Where</dt>
                  <dd>{featuredHomeEvent.venue}</dd>
                </div>
                <div>
                  <dt>Your place</dt>
                  <dd>{featuredHomeEvent.price}</dd>
                </div>
              </dl>
              <AppLink
                {...linkProps}
                className="button button--primary"
                href={`/book?event=${encodeURIComponent(featuredHomeEvent.title)}`}
              >
                Save your spot <FiArrowUpRight />
              </AppLink>
            </div>
          </article>
        ) : (
          <div className="programme-empty" data-reveal>
            <p className="script">good things are on their way</p>
            <h3>A new chapter of flow.</h3>
            <p>
              Our next gatherings are taking shape. Keep close for new dates, or
              get in touch for a private experience.
            </p>
            <a
              className="button button--primary"
              href={socialLinks[2].href}
              target="_blank"
              rel="noreferrer"
            >
              Let’s make a plan <FiArrowUpRight />
            </a>
          </div>
        )}
      </section>
      <section className="scrapbook-section section">
        <div className="section-heading section-heading--split" data-reveal>
          <div>
            <p className="eyebrow">04 / Life at the club</p>
            <h2>
              The <em>scrapbook.</em>
            </h2>
          </div>
          <p>
            Real women. Shared rituals.
            <br />
            The moments in between.
          </p>
        </div>
        <div className="scrapbook-strip">
          {[
            galleryItems[3],
            galleryItems[0],
            galleryItems[6],
            galleryItems[10],
          ].map((item, i) => (
            <figure key={item.title} data-reveal>
              <img src={item.image} alt={item.title} loading="lazy" />
              <figcaption>
                <span>0{i + 1}</span>
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
        <AppLink {...linkProps} className="text-link" href="/gallery">
          A few more good memories <FiArrowUpRight />
        </AppLink>
      </section>
      <section className="partners-section section" data-reveal>
        <p className="eyebrow">In very good company / Past collaborations</p>
        <div className="logo-grid">
          {collaborations.map((item) => (
            <div className="logo-tile" key={item.name}>
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
      <section className="club-invitation section" data-reveal>
        <p className="eyebrow">Your next good thing starts here</p>
        <h2>
          Make space
          <br />
          for <em>yourself.</em>
        </h2>
        <AppLink {...linkProps} href="/book" className="button button--primary">
          Come flow with us <FiArrowUpRight />
        </AppLink>
        <p className="script">See you at the club.</p>
      </section>
    </>
  );
}
