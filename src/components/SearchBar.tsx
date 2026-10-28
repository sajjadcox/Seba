import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  showQuickTags?: boolean;
  size?: 'normal' | 'large';
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = '',
  onSearch,
  showQuickTags = false,
  size = 'normal',
  placeholder,
  autoFocus = false,
}) => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const quickTags = language === 'bn'
    ? [
        { label: 'জাতীয় পরিচয়পত্র', query: 'এনআইডি' },
        { label: 'ই-পাসপোর্ট', query: 'পাসপোর্ট' },
        { label: '৯৯৯ জরুরি সেবা', query: '৯৯৯' },
        { label: 'ট্রেন টিকিট', query: 'রেলওয়ে' },
        { label: 'আয়কর রিটার্ন', query: 'আয়কর' },
        { label: 'ই-পর্চা খতিয়ান', query: 'খতিয়ান' },
        { label: 'বিদ্যুৎ বিল', query: 'বিদ্যুৎ' },
        { label: 'রক্তদান', query: 'রক্ত' },
      ]
    : [
        { label: 'National ID (NID)', query: 'nid' },
        { label: 'e-Passport', query: 'passport' },
        { label: '999 Emergency', query: '999' },
        { label: 'Train Ticket', query: 'railway' },
        { label: 'Tax Return', query: 'tax return' },
        { label: 'Land Records', query: 'eporcha' },
        { label: 'Electricity Bill', query: 'desco' },
        { label: 'Blood Donors', query: 'blood' },
      ];

  const isLarge = size === 'large';

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center w-full transition-all duration-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-750 rounded-xl shadow-xs focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 hover:border-slate-400 dark:hover:border-slate-600 ${
          isLarge ? 'p-1.5' : 'p-1'
        }`}
      >
        <div className={`flex items-center justify-center text-slate-400 dark:text-slate-500 pl-3 shrink-0 ${isLarge ? 'text-emerald-700 dark:text-emerald-400' : ''}`}>
          <Search size={isLarge ? 22 : 18} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || t.search.placeholder}
          autoFocus={autoFocus}
          className={`w-full px-3 py-2 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden ${
            isLarge ? 'text-base sm:text-lg' : 'text-sm'
          }`}
          aria-label={t.search.placeholder}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={t.search.clearSearch}
            aria-label={t.search.clearSearch}
          >
            <X size={18} />
          </button>
        )}

        <button
          type="submit"
          className={`flex items-center justify-center gap-1.5 font-medium text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer ${
            isLarge ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm'
          }`}
        >
          <span>{t.search.button}</span>
          {isLarge && <ArrowRight size={18} />}
        </button>
      </form>

      {showQuickTags && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-1 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">{t.search.quickTagsLabel}</span>
          <div className="flex flex-wrap gap-1.5">
            {quickTags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => {
                  setQuery(tag.query);
                  onSearch(tag.query);
                }}
                className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-850 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-800 dark:hover:text-emerald-300 hover:border-emerald-300 dark:hover:border-emerald-700 border border-slate-200/80 dark:border-slate-800 rounded-full transition-colors cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
