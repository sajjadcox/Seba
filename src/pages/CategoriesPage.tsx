import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { categories, services } from '../data/directoryData';
import { CategoryCard } from '../components/CategoryCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Search, FolderTree } from 'lucide-react';

interface CategoriesPageProps {
  onNavigate: (href: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!filterQuery.trim()) return categories;
    const q = filterQuery.toLowerCase().trim();
    return categories.filter(
      (cat) =>
        cat.name.en.toLowerCase().includes(q) ||
        cat.name.bn.toLowerCase().includes(q) ||
        cat.description.en.toLowerCase().includes(q) ||
        cat.description.bn.toLowerCase().includes(q)
    );
  }, [filterQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        items={[{ label: t.nav.categories, active: true }]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-1.5">
            <FolderTree size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'সেবা বিভাজন' : 'Directory Sectors'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.nav.categories}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'নাগরিক সেবাগুলোকে ক্ষেত্রভিত্তিক সহজ ক্যাটাগরিতে ভাগ করা হয়েছে যাতে আপনি কাঙ্ক্ষিত তথ্য সহজে খুঁজে পান।'
              : 'Browse structured collections of citizen services, utility providers, transit bookings, and social welfare portals.'}
          </p>
        </div>

        {/* Quick Filter Input */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={language === 'bn' ? 'ক্যাটাগরি ফিল্টার করুন...' : 'Filter categories...'}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => onNavigate(`/categories/${category.slug}`)}
          />
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
          {language === 'bn' ? 'কোনো ক্যাটাগরি পাওয়া যায়নি।' : 'No categories found matching your query.'}
        </div>
      )}
    </div>
  );
};
