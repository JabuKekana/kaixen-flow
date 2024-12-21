import React from 'react';
import './project.css';

const Article = ({ imgUrl, date, text, link }) => (
  <div className="gpt3__blog-container_article">
    <div className="gpt3__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="gpt3__blog-container_article-content">
      <div>
        <p className={'date'}>{date}</p>
        <div className={'body'} dangerouslySetInnerHTML={{__html: text}}/>
      </div>
        {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="visit-site-button">
            Visit Site
        </a>
        )}
    </div>
  </div>
);

export default Article;
