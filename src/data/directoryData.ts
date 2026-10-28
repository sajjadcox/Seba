import rawCategories from '../../data/categories.json';
import rawSubcategories from '../../data/subcategories.json';
import rawServices from '../../data/services.json';
import rawOfficialSources from '../../data/official-sources.json';
import { Category, Subcategory, Service, OfficialSource } from '../types';

// Helper to safely extract prominent helpline if mentioned in title or keywords
function detectHelpline(service: any): string | null {
  const combined = `${service.name?.en || ''} ${service.slug || ''} ${(service.keywords || []).join(' ')}`;
  const matches = combined.match(/\b(999|333|16263|16122|16999|1098|109|105|16445|16430|16121|16123)\b/);
  return matches ? matches[1] : null;
}

// All parsed categories
export const categories: Category[] = (rawCategories as Category[]).sort(
  (a, b) => (a.sortOrder || 999) - (b.sortOrder || 999)
);

// All subcategories
export const subcategories: Subcategory[] = rawSubcategories as Subcategory[];

// All parsed official sources
export const officialSources: OfficialSource[] = rawOfficialSources as OfficialSource[];

// Published active services only (filtering out placeholders per dataset v3 README rules)
export const allRawServices: Service[] = (rawServices as any[]).map((s) => ({
  ...s,
  helpline: detectHelpline(s),
}));

export const services: Service[] = allRawServices.filter(
  (s) => s.isActive !== false && s.verification?.status !== 'not-researched'
);

// Lookup Maps
export const categoryMap = new Map<string, Category>(
  categories.map((c) => [c.id, c])
);

export const categorySlugMap = new Map<string, Category>(
  categories.map((c) => [c.slug, c])
);

export const subcategoryMap = new Map<string, Subcategory>(
  subcategories.map((s) => [s.id, s])
);

export const subcategorySlugMap = new Map<string, Subcategory>(
  subcategories.map((s) => [s.slug, s])
);

export const serviceSlugMap = new Map<string, Service>(
  allRawServices.map((s) => [s.slug, s])
);

export const officialSourceMap = new Map<string, OfficialSource>(
  officialSources.map((s) => [s.id, s])
);

/**
 * Returns active service count for a specific category id
 */
export function getCategoryServiceCount(categoryId: string): number {
  return services.filter((s) => s.categoryId === categoryId).length;
}

/**
 * Returns active service count for a specific subcategory id
 */
export function getSubcategoryServiceCount(subcategoryId: string): number {
  return services.filter((s) => s.subcategoryId === subcategoryId).length;
}

/**
 * Returns service count grouped by sector
 */
export function getSectorCounts(): {
  government: number;
  private: number;
  total: number;
} {
  const gov = services.filter((s) => {
    const cat = categoryMap.get(s.categoryId);
    return cat?.sector === 'government-or-public' || s.serviceType === 'government-service';
  }).length;

  return {
    government: gov,
    private: services.length - gov,
    total: services.length,
  };
}
