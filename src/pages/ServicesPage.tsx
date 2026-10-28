import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { services } from '../data/directoryData';
import { filterServices } from '../utils/search';
import { ServiceCard } from '../components/ServiceCard';
import { FilterPanel } from '../components/FilterPanel';
import { SearchBar } from '../components/SearchBar';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EmptyState } from '../components/States';
import { ServiceFilterOptions, Sector } from '../types';
import { LayoutGrid } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (href: string) => void;
  searchParams: URLSearchParams;
  initialQuery?: string;
  isSearchRoute?: boolean;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  searchParams,
  initialQuery = '',
  isSearchRoute = false,
}) => {
  const { language, t } = useLanguage();

  const sectorParam = (searchParams.get('sector') as Sector) || 'all';
  const categoryParam = searchParams.get('category') || undefined;
  const queryParam = initialQuery || searchParams.get('q') || '';
  const verificationParam = searchParams.get('verification') as any || 'all';

  const [filters, setFilters] = useState<ServiceFilterOptions>({
    query: queryParam,
    sector: sectorParam,
    categoryId: categoryParam,
    verificationStatus: verificationParam,
    sortBy: 'popular',
  });

  // Keep filters in sync when URL parameters change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      query: initialQuery || searchParams.get('q') || '',
      sector: (searchParams.get('sector') as Sector) || 'all',
      categoryId: searchParams.get('category') || undefined,
      verificationStatus: (searchParams.get('verification') as any) || 'all',
    }));
  }, [searchParams, initialQuery]);

  const handleFilterChange = (updated: Partial<ServiceFilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      query: '',
      sector: 'all',
      categoryId: undefined,
      verificationStatus: 'all',
      sortBy: 'popular',
    });
  };

  const handleSearchSubmit = (q: string) => {
    setFilters((prev) => ({ ...prev, query: q }));
    if (q.trim()) {
      onNavigate(`/search?q=${encodeURIComponent(q.trim())}`);
    } else {
      onNavigate('/services');
    }
  };

  const filteredServices = useMemo(() => {
    return filterServices(services, filters, language);
  }, [filters, language]);

  // Page title and subtitle based on route / filter
  let pageTitle = t.nav.services;
  let pageSubtitle =
    language === 'bn'
      ? 'বাংলাদেশের সকল প্রয়োজনীয় সরকারি ও বেসরকারি সেবার তালিকা।'
      : 'Comprehensive directory of citizen services, utility payments, and digital portals.';

  if (filters.sector === 'government-or-public') {
    pageTitle = t.nav.govServices;
    pageSubtitle =
      language === 'bn'
        ? 'মন্ত্রণালয়, অধিদপ্তর ও সরকারি প্রতিষ্ঠানের নাগরিক সেবাসমূহ।'
        : 'Official citizen services and digital portals provided by government agencies.';
  } else if (filters.sector === 'private-or-community') {
    pageTitle = t.nav.privateServices;
    pageSubtitle =
      language === 'bn'
        ? 'অনুমোদিত বেসরকারি আর্থিক, ইউটিলিটি ও ট্রানজিট সেবাসমূহ।'
        : 'Licensed private financial, utility, and everyday citizen services.';
  } else if (isSearchRoute) {
    pageTitle = `${t.search.resultsFor} "${filters.query}"`;
    pageSubtitle = `${filteredServices.length} ${t.search.foundServices}`;
  }

  const breadcrumbs = [
    { label: t.nav.services, href: isSearchRoute ? '/services' : undefined, active: !isSearchRoute },
    ...(isSearchRoute ? [{ label: `${t.search.resultsFor} "${filters.query}"`, active: true }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-1">
            <LayoutGrid size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">
              {filters.sector !== 'all' ? filters.sector : (language === 'bn' ? 'সকল সেবা' : 'All Services')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {pageSubtitle}
          </p>
        </div>

        {/* Search input in header */}
        <div className="w-full lg:w-80">
          <SearchBar
            initialValue={filters.query}
            onSearch={handleSearchSubmit}
            placeholder={t.search.placeholder}
          />
        </div>
      </div>

      {/* Filter and Sorting Panel */}
      <FilterPanel
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResults={filteredServices.length}
      />

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewDetails={() => onNavigate(`/services/${service.slug}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t.search.noResultsTitle}
          description={t.search.noResultsDesc}
          onReset={handleResetFilters}
        />
      )}
    </div>
  );
};
