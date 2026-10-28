import React from 'react';
import { ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VerificationBadge: React.FC<{
  status: string;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}> = ({ status, showIcon = true, size = 'sm' }) => {
  const { language } = useLanguage();

  const isSmall = size === 'sm';
  const paddingClass = isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';
  const iconSize = isSmall ? 13 : 15;

  if (status === 'official-source-confirmed' || status === 'verified') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 ${paddingClass}`}
        title={language === 'bn' ? 'অফিসিয়াল উৎস নিশ্চিতকৃত' : 'Official Source Confirmed'}
      >
        {showIcon && <ShieldCheck size={iconSize} className="text-emerald-600 dark:text-emerald-400 shrink-0" />}
        <span>{language === 'bn' ? 'অফিসিয়াল উৎস নিশ্চিতকৃত' : 'Official Source Confirmed'}</span>
      </span>
    );
  }

  if (status === 'needs-review') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 ${paddingClass}`}
        title={language === 'bn' ? 'পর্যালোচনা প্রয়োজন' : 'Review Needed'}
      >
        {showIcon && <AlertCircle size={iconSize} className="text-amber-600 dark:text-amber-400 shrink-0" />}
        <span>{language === 'bn' ? 'পর্যালোচনা প্রয়োজন' : 'Review Needed'}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 ${paddingClass}`}
      title={language === 'bn' ? 'অযাচাইকৃত' : 'Unverified'}
    >
      {showIcon && <HelpCircle size={iconSize} className="text-slate-500 dark:text-slate-400 shrink-0" />}
      <span>{language === 'bn' ? 'অযাচাইকৃত' : 'Unverified'}</span>
    </span>
  );
};

export const SectorBadge: React.FC<{
  sector: string;
  size?: 'sm' | 'md';
}> = ({ sector, size = 'sm' }) => {
  const { language } = useLanguage();

  const isSmall = size === 'sm';
  const paddingClass = isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  if (sector === 'government-or-public' || sector === 'government') {
    return (
      <span
        className={`inline-flex items-center font-medium rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800 ${paddingClass}`}
      >
        {language === 'bn' ? 'সরকারি ও জনসেবা' : 'Government / Public'}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800 ${paddingClass}`}
    >
      {language === 'bn' ? 'বেসরকারি ও নাগরিক সেবা' : 'Private / Community'}
    </span>
  );
};
