import React from 'react';
import { Category } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CategoryIcon } from './CategoryIcon';
import { getCategoryServiceCount } from '../data/directoryData';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const { language, t } = useLanguage();
  const serviceCount = getCategoryServiceCount(category.id);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative flex flex-col justify-between p-3 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all duration-200 cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3.5">
          <div className="p-2 sm:p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
            <CategoryIcon slug={category.slug} className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>

          <div className="flex items-center gap-1">
            <span className="px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
              {serviceCount} {language === 'bn' ? 'সেবা' : 'services'}
            </span>
          </div>
        </div>

        <h3 className="text-xs sm:text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-750 dark:group-hover:text-emerald-400 transition-colors mb-1 leading-snug line-clamp-1 sm:line-clamp-none">
          {category.name[language] || category.name.en}
        </h3>

        <p className="text-[11px] sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-1 sm:line-clamp-2 leading-relaxed">
          {category.description[language] || category.description.en}
        </p>
      </div>

      <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
        <span>{t.serviceCard.viewDetails}</span>
        <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
