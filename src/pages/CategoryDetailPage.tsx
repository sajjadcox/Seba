import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  categorySlugMap,
  subcategories,
  services,
  getSubcategoryServiceCount,
} from '../data/directoryData';
import { CategoryIcon } from '../components/CategoryIcon';
import { ServiceCard } from '../components/ServiceCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SectorBadge } from '../components/Badges';
import { SearchBar } from '../components/SearchBar';
import { EmptyState, NotFoundState } from '../components/States';
import { filterServices } from '../utils/search';
import { Layers } from 'lucide-react';

interface CategoryDetailPageProps {
  slug: string;
  subSlug?: string;
  onNavigate: (href: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  slug,
  subSlug,
  onNavigate,
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const category = categorySlugMap.get(slug);

  if (!category) {
    return <NotFoundState onNavigateHome={() => onNavigate('/')} />;
  }

  // Find subcategories belonging to this category
  const categorySubcategories = subcategories.filter(
    (sub) => sub.categoryId === category.id
  );

  // Active subcategory if subSlug is present
  const activeSubcategory = subSlug
    ? categorySubcategories.find((sub) => sub.slug === subSlug)
    : null;

  // Filter services within this category
  const categoryServices = useMemo(() => {
    return filterServices(
      services,
      {
        categoryId: category.id,
        subcategoryId: activeSubcategory?.id,
        query: searchQuery,
      },
      language
    );
  }, [category.id, activeSubcategory?.id, searchQuery, language]);

  const breadcrumbs = [
    { label: t.nav.categories, href: '/categories' },
    {
      label: category.name[language] || category.name.en,
      href: activeSubcategory ? `/categories/${category.slug}` : undefined,
      active: !activeSubcategory,
    },
    ...(activeSubcategory
      ? [{ label: activeSubcategory.name[language] || activeSubcategory.name.en, active: true }]
      : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Category Banner Card */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 shrink-0 self-start sm:self-center">
            <CategoryIcon slug={category.slug} size={36} />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <SectorBadge sector={category.sector} size="sm" />
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                {categoryServices.length} {language === 'bn' ? 'সেবা তালিকাভুক্ত' : 'services listed'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              {category.name[language] || category.name.en}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {category.description[language] || category.description.en}
            </p>
          </div>
        </div>

        {/* Subcategory Pills */}
        {categorySubcategories.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              <Layers size={14} />
              <span>{language === 'bn' ? 'উপ-বিভাগসমূহ (সাব-ক্যাটাগরি)' : 'Subcategories'}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigate(`/categories/${category.slug}`)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  !activeSubcategory
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {language === 'bn' ? 'সকল উপ-বিভাগ' : 'All Subcategories'}
              </button>

              {categorySubcategories.map((sub) => {
                const isSelected = activeSubcategory?.id === sub.id;
                const subCount = getSubcategoryServiceCount(sub.id);
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() =>
                      onNavigate(`/categories/${category.slug}/${sub.slug}`)
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                    }`}
                  >
                    <span>{sub.name[language] || sub.name.en}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {subCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* In-Category Search */}
      <div className="max-w-md mb-6">
        <SearchBar
          initialValue={searchQuery}
          onSearch={(q) => setSearchQuery(q)}
          placeholder={
            language === 'bn'
              ? `${category.name.bn || category.name.en}-এ খুঁজুন...`
              : `Search in ${category.name.en}...`
          }
        />
      </div>

      {/* Services Grid */}
      {categoryServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categoryServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewDetails={() => onNavigate(`/services/${service.slug}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={language === 'bn' ? 'কোনো সেবা পাওয়া যায়নি' : 'No services found in this category'}
          description={
            language === 'bn'
              ? 'আপনার অনুসন্ধান শব্দ পরিবর্তন করুন বা অন্য কোনো সাব-ক্যাটাগরি নির্বাচন করুন।'
              : 'Try clearing your search keyword or switching subcategories.'
          }
          onReset={() => setSearchQuery('')}
        />
      )}
    </div>
  );
};
