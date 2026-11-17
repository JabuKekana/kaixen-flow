import React, { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import { galleryItems } from "../data/siteContent";

export function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const closeButton = useRef(null);
  const opener = useRef(null);
  const isOpen = activeIndex !== null;
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight")
        setActiveIndex((index) => (index + 1) % galleryItems.length);
      if (event.key === "ArrowLeft")
        setActiveIndex(
          (index) => (index - 1 + galleryItems.length) % galleryItems.length,
        );
      if (event.key === "Tab") {
        const buttons = document.querySelectorAll(".lightbox button");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      opener.current?.focus();
    };
  }, [isOpen]);
  return (
    <>
      <section className="page-hero page-hero--centered">
        <p className="eyebrow">The scrapbook / Life at the club</p>
        <h1>
          A feeling worth
          <br />
          <em>coming back to.</em>
        </h1>
        <p>
          Scenes from sessions, retreats, brunches and the women who shape the
          KaixenFlow story.
        </p>
      </section>

      <section className="gallery-grid">
        {galleryItems.map((item, index) => (
          <figure key={item.title} className="gallery-card">
            <button
              className="gallery-image-button"
              aria-label={`View ${item.title}`}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setActiveIndex(index);
              }}
            >
              <img
                alt={item.title}
                className={`gallery-card__image gallery-card__image--${item.height}`}
                src={item.image}
                loading="lazy"
              />
            </button>
            <figcaption>
              <span>KaixenFlow</span>
              <p>{item.title}</p>
            </figcaption>
          </figure>
        ))}
      </section>
      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={galleryItems[activeIndex].title}
        >
          <div className="lightbox__bar">
            <span className="eyebrow">
              The scrapbook / {activeIndex + 1} of {galleryItems.length}
            </span>
            <button
              ref={closeButton}
              aria-label="Close photo"
              title="Close photo"
              onClick={() => setActiveIndex(null)}
            >
              <FiX />
            </button>
          </div>
          <img
            className="lightbox__image"
            src={galleryItems[activeIndex].image}
            alt={galleryItems[activeIndex].title}
          />
          <div className="lightbox__bar">
            <button
              aria-label="Previous photo"
              title="Previous photo"
              onClick={() =>
                setActiveIndex(
                  (index) =>
                    (index - 1 + galleryItems.length) % galleryItems.length,
                )
              }
            >
              <FiArrowLeft />
            </button>
            <p className="script" aria-live="polite">
              {galleryItems[activeIndex].title}
            </p>
            <button
              aria-label="Next photo"
              title="Next photo"
              onClick={() =>
                setActiveIndex((index) => (index + 1) % galleryItems.length)
              }
            >
              <FiArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
