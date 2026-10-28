import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (href: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  const { t } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className="py-2.5 px-1 mb-4 text-xs sm:text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        <li className="inline-flex items-center">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
            title={t.nav.home}
          >
            <Home size={15} />
            <span>{t.nav.home}</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <ChevronRight size={13} className="text-slate-400 shrink-0" aria-hidden="true" />
              {item.href && !isLast ? (
                <button
                  onClick={() => onNavigate(item.href!)}
                  className="text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer font-medium"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
