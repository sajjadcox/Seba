import React from 'react';
import { SearchX, AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EmptyState: React.FC<{
  title?: string;
  description?: string;
  onReset?: () => void;
}> = ({ title, description, onReset }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-xl border border-dashed border-slate-300 my-6">
      <div className="p-4 rounded-full bg-slate-100 text-slate-500 mb-4">
        <SearchX size={36} />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
        {title || t.search.noResultsTitle}
      </h3>

      <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
        {description || t.search.noResultsDesc}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw size={16} />
          <span>{t.search.resetFilters}</span>
        </button>
      )}
    </div>
  );
};

export const LoadingState: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center" aria-live="polite">
      <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-slate-600">{t.common.loading}</p>
    </div>
  );
};

export const NotFoundState: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-16 text-center max-w-xl mx-auto my-12 bg-white rounded-2xl border border-slate-200 shadow-xs">
      <div className="p-4 rounded-2xl bg-amber-50 text-amber-700 mb-5 border border-amber-200">
        <AlertTriangle size={44} />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
        HTTP Error 404
      </span>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
        {t.common.notFoundTitle}
      </h1>

      <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
        {t.common.notFoundDesc}
      </p>

      <button
        type="button"
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>{t.common.backHome}</span>
      </button>
    </div>
  );
};
