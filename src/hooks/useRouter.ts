import { useState, useEffect, useCallback, useMemo } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'categories' }
  | { name: 'category'; slug: string; subSlug?: string }
  | { name: 'services' }
  | { name: 'service'; slug: string }
  | { name: 'search'; query: string }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'privacy' }
  | { name: 'disclaimer' }
  | { name: 'not_found' };

export function parseRoute(pathname: string, search: string): Route {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
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
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentLocation({
        pathname: window.location.pathname,
        search: window.location.search,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    const [pathPart, queryPart] = to.split('?');
    setCurrentLocation({
      pathname: pathPart || '/',
      search: queryPart ? `?${queryPart}` : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const searchParams = useMemo(
    () => new URLSearchParams(currentLocation.search),
    [currentLocation.search]
  );

  const route = useMemo(
    () => parseRoute(currentLocation.pathname, currentLocation.search),
    [currentLocation.pathname, currentLocation.search]
  );

  return {
    pathname: currentLocation.pathname,
    search: currentLocation.search,
    searchParams,
    route,
    navigate,
  };
}
