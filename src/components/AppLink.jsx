import React from 'react';

export function AppLink({ children, className, currentPath, href, navigate, onClick }) {
  const isActive = currentPath === href;

  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (new URL(href, window.location.origin).origin !== window.location.origin) return;

    event.preventDefault();
    if (onClick) onClick();
    navigate(href);
  };

  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={[className, isActive ? 'is-active' : ''].filter(Boolean).join(' ')}
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
