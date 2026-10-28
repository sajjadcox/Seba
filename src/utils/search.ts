import { Service, ServiceFilterOptions, Language } from '../types';
import { categoryMap, subcategoryMap } from '../data/directoryData';

/**
 * Normalizes text for search: handles lowercasing, whitespace, and Bengali keyboard nukta variants.
 */
export function normalizeSearchText(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/\u09af\u09bc/g, '\u09df') // য + ় -> য়
    .replace(/\u09a1\u09bc/g, '\u09dc') // ড + ় -> ড়
    .replace(/\u09a2\u09bc/g, '\u09dd') // ঢ + ় -> ঢ়
    .replace(/\s+/g, ' ');
}

/**
 * Checks if a service matches a search query across English and Bangla fields.
 */
export function matchesQuery(service: Service, query: string): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const tokens = normalizedQuery.split(' ').filter(Boolean);

  const category = categoryMap.get(service.categoryId);
  const subcategory = service.subcategoryId ? subcategoryMap.get(service.subcategoryId) : null;

  const rawCorpus = [
    service.name?.en || '',
    service.name?.bn || '',
    service.description?.en || '',
    service.description?.bn || '',
    service.organization?.en || '',
    service.organization?.bn || '',
    service.helpline || '',
    ...(service.keywords || []),
    category?.name?.en || '',
    category?.name?.bn || '',
    subcategory?.name?.en || '',
    subcategory?.name?.bn || '',
  ].join(' ');

  const searchableCorpus = normalizeSearchText(rawCorpus);

  return tokens.every((token) => searchableCorpus.includes(token));
}

/**
 * Filters and sorts services based on criteria.
 */
export function filterServices(
  servicesList: Service[],
  options: ServiceFilterOptions,
  lang: Language = 'en'
): Service[] {
  const {
    query = '',
    categoryId,
    subcategoryId,
    sector = 'all',
    verificationStatus = 'all',
    featuredOnly = false,
    sortBy = 'popular',
  } = options;

  let results = servicesList.filter((service) => {
    // Query search
    if (query && !matchesQuery(service, query)) {
      return false;
    }

    // Category filter
    if (categoryId && service.categoryId !== categoryId) {
      return false;
    }

    // Subcategory filter
    if (subcategoryId && service.subcategoryId !== subcategoryId) {
      return false;
    }

    // Sector filter
    if (sector !== 'all') {
      const cat = categoryMap.get(service.categoryId);
      const isGov =
        cat?.sector === 'government-or-public' || service.serviceType === 'government-service';
      if (sector === 'government-or-public' && !isGov) return false;
      if (sector === 'private-or-community' && isGov) return false;
    }

    // Verification filter
    if (verificationStatus !== 'all') {
      if (service.verification?.status !== verificationStatus) {
        return false;
      }
    }

    // Featured only
    if (featuredOnly && !service.isFeatured) {
      return false;
    }

    return true;
  });

  // Sorting
  results = [...results].sort((a, b) => {
    if (sortBy === 'popular') {
      if (a.isFeatured !== b.isFeatured) {
        return a.isFeatured ? -1 : 1;
      }
      return (a.name[lang] || a.name.en).localeCompare(b.name[lang] || b.name.en);
    }

    if (sortBy === 'name-asc') {
      return (a.name[lang] || a.name.en).localeCompare(b.name[lang] || b.name.en);
    }

    if (sortBy === 'name-desc') {
      return (b.name[lang] || b.name.en).localeCompare(a.name[lang] || a.name.en);
    }

    if (sortBy === 'category') {
      const catA = categoryMap.get(a.categoryId)?.name[lang] || '';
      const catB = categoryMap.get(b.categoryId)?.name[lang] || '';
      const catComp = catA.localeCompare(catB);
      if (catComp !== 0) return catComp;
      return (a.name[lang] || a.name.en).localeCompare(b.name[lang] || b.name.en);
    }

    return 0;
  });

  return results;
}
