import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  serviceSlugMap,
  categoryMap,
  subcategoryMap,
  officialSourceMap,
  services,
} from '../data/directoryData';
import { VerificationBadge, SectorBadge } from '../components/Badges';
import { ServiceCard } from '../components/ServiceCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NotFoundState } from '../components/States';
import { InAppPortalViewer } from '../components/InAppPortalViewer';
import {
  ExternalLink,
  PhoneCall,
  Clock,
  Building2,
  FileCheck2,
  ShieldCheck,
  Share2,
  Check,
  Tag,
  AlertTriangle,
  Info,
  Maximize,
  Globe,
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (href: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showInAppViewer, setShowInAppViewer] = useState(false);

  const service = serviceSlugMap.get(slug);

  if (!service) {
    return <NotFoundState onNavigateHome={() => onNavigate('/')} />;
  }

  const category = categoryMap.get(service.categoryId);
  const subcategory = service.subcategoryId ? subcategoryMap.get(service.subcategoryId) : null;
  const officialSourcesList = (service.sourceIds || [])
    .map((srcId) => officialSourceMap.get(srcId))
    .filter(Boolean);

  const sector =
    category?.sector ||
    (service.serviceType === 'government-service'
      ? 'government-or-public'
      : 'private-or-community');

  // Related services in same category (excluding current)
  const relatedServices = services
    .filter((s) => s.categoryId === service.categoryId && s.id !== service.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const breadcrumbs = [
    { label: t.nav.services, href: '/services' },
    ...(category
      ? [
          {
            label: category.name[language] || category.name.en,
            href: `/categories/${category.slug}`,
          },
        ]
      : []),
    { label: service.name[language] || service.name.en, active: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Main Service Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs p-6 sm:p-8 lg:p-10 mb-10 transition-colors">
        {/* Top Badges & Share */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <SectorBadge sector={sector} size="md" />
            <VerificationBadge status={service.verification?.status || 'official-source-confirmed'} size="md" />
            {category && (
              <button
                type="button"
                onClick={() => onNavigate(`/categories/${category.slug}`)}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                {category.name[language] || category.name.en}
              </button>
            )}
            {subcategory && (
              <span className="text-xs px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                {subcategory.name[language] || subcategory.name.en}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title={t.serviceDetails.copyLink}
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400">{t.serviceDetails.linkCopied}</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>{t.serviceDetails.copyLink}</span>
              </>
            )}
          </button>
        </div>

        {/* Primary Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
          {service.name[language] || service.name.en}
        </h1>

        {/* Secondary Language Title if different */}
        {language === 'bn' ? (
          <p className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400 mb-6">
            {service.name.en}
          </p>
        ) : (
          <p className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400 mb-6 font-bangla">
            {service.name.bn}
          </p>
        )}

        {/* Provider Entity & Helpline Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 mb-8">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
              <Building2 size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {t.serviceDetails.officialProvider}
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                {service.organization
                  ? service.organization[language] || service.organization.en
                  : 'Bangladesh Government Authority'}
              </p>
              {service.countryCode && (
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
                  Region: Bangladesh ({service.countryCode})
                </span>
              )}
            </div>
          </div>

          {service.helpline && (
            <div className="flex items-start justify-between sm:justify-start gap-3 md:border-l md:border-slate-200 dark:md:border-slate-700 md:pl-4">
              <div className="p-2.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 shrink-0">
                <PhoneCall size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {t.serviceDetails.hotlineHelpline}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <a
                    href={`tel:${service.helpline}`}
                    className="text-base sm:text-lg font-extrabold text-emerald-800 dark:text-emerald-300 hover:text-emerald-900 transition-colors"
                  >
                    {service.helpline}
                  </a>
                  <a
                    href={`tel:${service.helpline}`}
                    className="px-2.5 py-0.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors"
                  >
                    {t.emergencyBanner.callNow}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Description */}
        <div className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Info size={18} className="text-emerald-700 dark:text-emerald-400" />
            <span>{t.serviceDetails.overview}</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {service.description[language] || service.description.en}
          </p>
        </div>

        {/* Verification Audit Note */}
        {service.verification && (
          <div className="mb-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-2 font-bold mb-1 text-slate-900 dark:text-white">
              <ShieldCheck size={18} className="text-emerald-700 dark:text-emerald-400" />
              <span>{t.serviceDetails.verificationAudit}</span>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300 mb-2">
              {service.verification.note ||
                (language === 'bn'
                  ? 'উৎস ও তথ্য নিয়মিত নিরীক্ষা করা হয়।'
                  : 'Source and metadata are periodically reviewed against official citations.')}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-700">
              {service.verification.lastVerifiedAt && (
                <span>
                  <strong>Last verified:</strong> {service.verification.lastVerifiedAt}
                </span>
              )}
              {service.verification.verifiedBy && (
                <span>
                  <strong>Verified by:</strong> {service.verification.verifiedBy}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Official Sources Cited */}
        {officialSourcesList.length > 0 && (
          <div className="mb-8 p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs sm:text-sm">
            <span className="font-bold text-blue-950 dark:text-blue-200 block mb-2">
              {language === 'bn' ? 'সংশ্লিষ্ট অফিসিয়াল উৎস ও প্রমাণাদি' : 'Official Citation & Sources'}:
            </span>
            <ul className="space-y-1.5 text-xs text-blue-900 dark:text-blue-300">
              {officialSourcesList.map((src, i) => (
                <li key={i} className="flex items-start justify-between gap-2">
                  <span>
                    • <strong>{src?.sourceName}</strong> ({src?.organization})
                  </span>
                  {src?.sourceUrl && (
                    <a
                      href={src.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 dark:text-blue-400 underline font-mono shrink-0 hover:text-blue-900"
                    >
                      source link
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Primary Action Buttons: In-App View & Direct External Link */}
        {service.officialUrl && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  {language === 'bn' ? 'অফিসিয়াল পোর্টালে সরাসরি সেবা গ্রহণ' : 'Access Service Online'}
                </h3>
                <p className="text-xs text-emerald-100 mt-1 max-w-xl">
                  {language === 'bn'
                    ? 'আপনি সেবা নেক্সার ভেতরেই ওয়েবসাইটটি চালাতে পারেন, অথবা সরাসরি মূল সরকারি ট্যাবে প্রবেশ করতে পারেন।'
                    : 'You can run the official website directly inside Seba Nexa BD workspace or open in an external window.'}
                </p>
                <span className="text-xs font-mono text-emerald-200 mt-1.5 inline-block truncate max-w-md">
                  {service.officialUrl}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {/* IN-APP PORTAL VIEWER BUTTON */}
                <button
                  type="button"
                  onClick={() => setShowInAppViewer(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 font-bold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-xl shadow-xs transition-colors text-xs sm:text-sm cursor-pointer"
                >
                  <Globe size={16} />
                  <span>{language === 'bn' ? 'সাইটের ভেতরে চালান' : 'Open Inside Portal'}</span>
                </button>

                {/* DIRECT EXTERNAL LINK */}
                <a
                  href={service.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 font-bold text-white bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl shadow-xs transition-colors text-xs sm:text-sm cursor-pointer"
                >
                  <span>{language === 'bn' ? 'সরাসরি ব্রাউজারে খুলুন' : 'Open in New Tab'}</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* External Link Notice Disclaimer */}
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
          <AlertTriangle size={16} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t.serviceDetails.externalDisclaimer}</p>
        </div>

        {/* Keywords */}
        {service.keywords && service.keywords.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
              <Tag size={13} />
              <span>{t.serviceDetails.keywords}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {service.keywords.map((kw, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onNavigate(`/search?q=${encodeURIComponent(kw)}`)}
                  className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-800 dark:hover:text-emerald-300 rounded-md transition-colors cursor-pointer"
                >
                  #{kw}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* In-App Portal Viewer Modal */}
      {showInAppViewer && service.officialUrl && (
        <InAppPortalViewer
          url={service.officialUrl}
          title={service.name[language] || service.name.en}
          provider={service.organization ? (service.organization[language] || service.organization.en) : undefined}
          onClose={() => setShowInAppViewer(false)}
        />
      )}

      {/* Related Services in Same Category */}
      {relatedServices.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
            {t.serviceDetails.relatedServices}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {relatedServices.map((rel) => (
              <ServiceCard
                key={rel.id}
                service={rel}
                onViewDetails={() => onNavigate(`/services/${rel.slug}`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
