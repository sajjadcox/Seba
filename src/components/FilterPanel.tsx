import React from 'react';
import { categories } from '../data/directoryData';
import { useLanguage } from '../context/LanguageContext';
import { ServiceFilterOptions, Sector } from '../types';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterPanelProps {
  filters: ServiceFilterOptions;
  onChange: (updated: Partial<ServiceFilterOptions>) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const { language, t } = useLanguage();

  const isFiltered =
    (filters.sector && filters.sector !== 'all') ||
    Boolean(filters.categoryId) ||
    (filters.verificationStatus && filters.verificationStatus !== 'all') ||
    Boolean(filters.query);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-emerald-700" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900">{t.filters.filterBy}</h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
            {totalResults} {language === 'bn' ? 'সেবা' : 'results'}
          </span>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>{t.search.resetFilters}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Sector Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {t.filters.sector}
          </label>
          <select
            value={filters.sector || 'all'}
            onChange={(e) => onChange({ sector: e.target.value as 'all' | Sector })}
            className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all cursor-pointer"
          >
            <option value="all">{t.filters.allSectors}</option>
            <option value="government-or-public">
              {language === 'bn' ? 'সরকারি ও জনসেবা' : 'Government / Public'}
            </option>
            <option value="private-or-community">
              {language === 'bn' ? 'বেসরকারি ও নাগরিক সেবা' : 'Private / Community'}
            </option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {t.filters.category}
          </label>
          <select
            value={filters.categoryId || ''}
            onChange={(e) => onChange({ categoryId: e.target.value || undefined })}
            className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all cursor-pointer"
          >
            <option value="">{t.filters.allCategories}</option>
            {categories.slice(0, 50).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name[language] || cat.name.en}
              </option>
            ))}
          </select>
        </div>

        {/* Verification Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {t.filters.verificationStatus}
          </label>
          <select
            value={filters.verificationStatus || 'all'}
            onChange={(e) =>
              onChange({
                verificationStatus: e.target.value as
                  | 'all'
                  | 'official-source-confirmed'
                  | 'needs-review',
              })
            }
            className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all cursor-pointer"
          >
            <option value="all">{t.filters.allVerification}</option>
            <option value="official-source-confirmed">
              {language === 'bn' ? 'অফিসিয়াল উৎস নিশ্চিতকৃত' : 'Official Source Confirmed'}
            </option>
            <option value="needs-review">
              {language === 'bn' ? 'পর্যালোচনা প্রয়োজন' : 'Needs Review'}
            </option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {t.filters.sortBy}
          </label>
          <select
            value={filters.sortBy || 'popular'}
            onChange={(e) =>
              onChange({
                sortBy: e.target.value as 'popular' | 'name-asc' | 'name-desc' | 'category',
              })
            }
            className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all cursor-pointer"
          >
            <option value="popular">{t.filters.sortPopular}</option>
            <option value="name-asc">{t.filters.sortNameAsc}</option>
            <option value="name-desc">{t.filters.sortNameDesc}</option>
            <option value="category">{t.filters.sortCategory}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
