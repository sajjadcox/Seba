export type Language = 'en' | 'bn';

export type Sector = 'government-or-public' | 'private-or-community';

export type VerificationStatus =
  | 'official-source-confirmed'
  | 'needs-review'
  | 'not-researched'
  | 'verified';

export interface LocalizedString {
  en: string;
  bn: string;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  countryCode?: string;
  subcategoryIds?: string[];
  serviceIds?: string[];
  status?: string;
  sortOrder?: number;
  sector: Sector;
  featured?: boolean;
}

export interface Subcategory {
  id: string;
  slug: string;
  categoryId: string;
  name: LocalizedString;
  status?: string;
  description?: LocalizedString;
}

export interface OfficialSource {
  id: string;
  organization: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: string;
  trustLevel?: string;
  evidenceNote?: string;
  reference?: string;
}

export interface ServiceVerification {
  officialSourceConfirmed?: boolean;
  httpStatus?: number | null;
  contentChecked?: boolean;
  lastVerifiedAt?: string | null;
  verifiedBy?: string | null;
  status: string;
  note?: string;
}

export interface Service {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  shortDescription?: LocalizedString;
  organization: LocalizedString;
  countryCode?: string;
  categoryId: string;
  subcategoryId?: string | null;
  officialUrl?: string | null;
  sourceIds?: string[];
  keywords: string[];
  serviceType: string;
  verification: ServiceVerification;
  embed?: {
    policy?: string;
    fallbackEnabled?: boolean;
  };
  isFeatured?: boolean;
  isActive?: boolean;
  helpline?: string | null;
  requirements?: {
    en: string[];
    bn: string[];
  } | null;
  availability?: LocalizedString | null;
}

export interface ServiceFilterOptions {
  query?: string;
  categoryId?: string;
  subcategoryId?: string;
  sector?: 'all' | Sector;
  verificationStatus?: 'all' | 'official-source-confirmed' | 'needs-review';
  featuredOnly?: boolean;
  sortBy?: 'popular' | 'name-asc' | 'name-desc' | 'category';
}
