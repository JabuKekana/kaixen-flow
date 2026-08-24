import React from 'react';

export function ImageCard({ alt, badge, className = '', detail, image, title }) {
  return (
    <div className={`image-card ${className}`.trim()}>
      {badge ? <div className="image-card__badge">{badge}</div> : null}
      <img alt={alt} className="image-card__image" src={image} />
      {(title || detail) ? (
        <div className="image-card__content">
          {title ? <p>{title}</p> : null}
          {detail ? <span>{detail}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
