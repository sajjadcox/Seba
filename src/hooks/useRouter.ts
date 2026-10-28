import { useState, useEffect, useCallback, useMemo } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'categories' }
  | { name: 'category'; slug: string; subSlug?: string }
  | { name: 'services' }
  | { name: 'service'; slug: string }
  | { name: 'helplines' }
  | { name: 'search'; query: string }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'privacy' }
  | { name: 'disclaimer' }
  | { name: 'not_found' };

/**
 * Normalizes the path by removing trailing slashes, hash routing prefixes,
 * and any GitHub Pages subpath prefix (e.g. /repo-name/services -> /services).
 */
export function getNormalizedPath(pathname: string, hash: string): string {
  // If hash routing is used (e.g. #/services or #/categories)
  if (hash && hash.startsWith('#/')) {
    return hash.slice(1).replace(/\/+$/, '') || '/';
  }

  let clean = pathname.replace(/\/+$/, '') || '/';

  // If deployed under a GitHub Pages subdirectory (e.g. /<repo>/...)
  // We check if the path starts with a known route; if not, strip the first segment
  const knownPrefixes = [
    'categories',
    'services',
    'helplines',
    'search',
    'about',
    'contact',
    'privacy',
    'disclaimer',
  ];

  const segments = clean.split('/').filter(Boolean);
  if (segments.length > 0 && !knownPrefixes.includes(segments[0])) {
    // First segment is likely the repo name on GitHub Pages
    clean = '/' + segments.slice(1).join('/');
    if (clean === '') clean = '/';
  }

  return clean;
}

export function parseRoute(pathname: string, search: string, hash: string = ''): Route {
  const cleanPath = getNormalizedPath(pathname, hash);
  const searchParams = new URLSearchParams(search);

  if (cleanPath === '/' || cleanPath === '') {
    return { name: 'home' };
  }

  if (cleanPath === '/categories') {
    return { name: 'categories' };
  }

  const categoryMatch = cleanPath.match(/^\/categories\/([^/]+)(?:\/([^/]+))?$/);
  if (categoryMatch) {
    return {
      name: 'category',
      slug: categoryMatch[1],
      subSlug: categoryMatch[2],
    };
  }

  if (cleanPath === '/services') {
    return { name: 'services' };
  }

  const serviceMatch = cleanPath.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    return {
      name: 'service',
      slug: serviceMatch[1],
    };
  }

  if (cleanPath === '/helplines') {
    return { name: 'helplines' };
  }

  if (cleanPath === '/search') {
    return {
      name: 'search',
      query: searchParams.get('q') || '',
    };
  }

  if (cleanPath === '/about') {
    return { name: 'about' };
  }

  if (cleanPath === '/contact') {
    return { name: 'contact' };
  }

  if (cleanPath === '/privacy') {
    return { name: 'privacy' };
  }

  if (cleanPath === '/disclaimer') {
    return { name: 'disclaimer' };
  }

  return { name: 'not_found' };
}

export function useRouter() {
  const [currentLocation, setCurrentLocation] = useState({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentLocation({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    // Preserve any existing repo base if on GitHub Pages
    const segments = window.location.pathname.split('/').filter(Boolean);
    const knownPrefixes = [
      'categories',
      'services',
      'helplines',
      'search',
      'about',
      'contact',
      'privacy',
      'disclaimer',
    ];
    let basePath = '';
    if (segments.length > 0 && !knownPrefixes.includes(segments[0])) {
      basePath = `/${segments[0]}`;
    }

    const targetUrl = `${basePath}${to.startsWith('/') ? to : `/${to}`}`;

    if (options?.replace) {
      window.history.replaceState({}, '', targetUrl);
    } else {
      window.history.pushState({}, '', targetUrl);
    }

    const [pathPart, queryPart] = to.split('?');
    setCurrentLocation({
      pathname: pathPart || '/',
      search: queryPart ? `?${queryPart}` : '',
      hash: window.location.hash,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const searchParams = useMemo(
    () => new URLSearchParams(currentLocation.search),
    [currentLocation.search]
  );

  const route = useMemo(
    () => parseRoute(currentLocation.pathname, currentLocation.search, currentLocation.hash),
    [currentLocation.pathname, currentLocation.search, currentLocation.hash]
  );

  return {
    pathname: currentLocation.pathname,
    search: currentLocation.search,
    hash: currentLocation.hash,
    searchParams,
    route,
    navigate,
  };
}
