import React from 'react';
import { galleryItems } from '../data/siteContent';

export function GalleryPage() {
  return (
    <>
      <section className="page-hero page-hero--centered">
        <p className="eyebrow">The Gallery</p>
        <h1>
          A diary of <em>soft moments.</em>
        </h1>
        <p>Scenes from sessions, retreats, brunches and the women who shape the KaixenFlow story.</p>
      </section>

      <section className="gallery-grid">
        {galleryItems.map((item) => (
          <figure key={item.title} className="gallery-card">
            <img alt={item.title} className={`gallery-card__image gallery-card__image--${item.height}`} src={item.image} />
            <figcaption>
              <span>KaixenFlow</span>
              <p>{item.title}</p>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}
