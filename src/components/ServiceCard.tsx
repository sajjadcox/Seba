import React from 'react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { VerificationBadge, SectorBadge } from './Badges';
import { categoryMap } from '../data/directoryData';
import { PhoneCall, ExternalLink, ArrowRight, Star } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onViewDetails: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  const { language, t } = useLanguage();
  const category = categoryMap.get(service.categoryId);
  const sector =
    category?.sector ||
    (service.serviceType === 'government-service'
      ? 'government-or-public'
      : 'private-or-community');

  return (
    <div className="group relative flex flex-col justify-between p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all duration-200 text-left">
      <div>
        {/* Top meta tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <SectorBadge sector={sector} size="sm" />
            <VerificationBadge status={service.verification?.status || 'needs-review'} size="sm" />
          </div>

          {service.isFeatured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 rounded-md">
              <Star size={11} className="fill-amber-500 text-amber-500" />
              <span>{t.badges.featured}</span>
            </span>
          )}
        </div>

        {/* Category Label */}
        {category && (
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            {category.name[language] || category.name.en}
          </p>
        )}

        {/* Title */}
        <h3
          onClick={onViewDetails}
          className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors cursor-pointer leading-snug mb-2"
        >
          {service.name[language] || service.name.en}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
          {service.description[language] || service.description.en}
        </p>

        {/* Organization / Provider */}
        {service.organization && (
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-3">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{t.serviceCard.provider}:</span>
            <span className="truncate">{service.organization[language] || service.organization.en}</span>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-auto">
        {service.helpline ? (
          <a
            href={`tel:${service.helpline}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200/80 dark:border-emerald-800 transition-colors"
            title={`${t.serviceCard.helpline}: ${service.helpline}`}
          >
            <PhoneCall size={12} className="text-emerald-700 dark:text-emerald-400" />
            <span>{service.helpline}</span>
          </a>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          {service.officialUrl && (
            <a
              href={service.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 p-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
              title={t.serviceCard.visitPortal}
              aria-label={`${t.serviceCard.visitPortal} ${service.name[language] || service.name.en}`}
            >
              <ExternalLink size={14} />
            </a>
          )}

          <button
            type="button"
            onClick={onViewDetails}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer"
          >
            <span>{t.serviceCard.viewDetails}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
