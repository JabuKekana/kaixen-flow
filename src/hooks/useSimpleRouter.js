import { useEffect, useState } from 'react';

export function useSimpleRouter() {
  const [route, setRoute] = useState({
    path: window.location.pathname || '/',
    search: window.location.search || '',
  });

  useEffect(() => {
    const onPopState = () =>
      setRoute({
        path: window.location.pathname || '/',
        search: window.location.search || '',
      });

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (href) => {
    const targetUrl = new URL(href, window.location.origin);
    const nextPath = targetUrl.pathname || '/';
    const nextSearch = targetUrl.search || '';

    if (nextPath === route.path && nextSearch === route.search) return;

    window.history.pushState({}, '', `${nextPath}${nextSearch}`);
    setRoute({ path: nextPath, search: nextSearch });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { path: route.path, search: route.search, navigate };
}
