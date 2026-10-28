import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { nationalHelplines, NationalHelpline } from '../data/nationalHelplines';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  PhoneCall,
  Search,
  Clock,
  ShieldCheck,
  Building2,
  Copy,
  Check,
  Filter,
  CheckCircle2,
} from 'lucide-react';

export const HelplinesPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: language === 'bn' ? 'সকল হেল্পলাইন' : 'All Helplines' },
    { id: 'emergency', label: language === 'bn' ? 'জরুরি সেবা' : 'Emergency' },
    { id: 'citizen', label: language === 'bn' ? 'নাগরিক সেবা' : 'Citizen Info' },
    { id: 'health', label: language === 'bn' ? 'স্বাস্থ্য' : 'Health' },
    { id: 'land', label: language === 'bn' ? 'ভূমি সেবা' : 'Land' },
    { id: 'legal', label: language === 'bn' ? 'আইনি সহায়তা' : 'Legal Aid' },
    { id: 'complaints', label: language === 'bn' ? 'অভিযোগ ও প্রতিকার' : 'Grievance' },
    { id: 'agriculture', label: language === 'bn' ? 'কৃষি' : 'Agriculture' },
    { id: 'utilities', label: language === 'bn' ? 'বিদ্যুৎ ও জ্বালানি' : 'Utilities' },
    { id: 'transport', label: language === 'bn' ? 'পরিবহন' : 'Transport' },
  ];

  const handleCopy = (num: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(num);
      setCopiedNumber(num);
      setTimeout(() => setCopiedNumber(null), 2000);
    }
  };

  const filteredHelplines = useMemo(() => {
    return nationalHelplines.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const corpus = `${item.number} ${item.title.en} ${item.title.bn} ${item.organization.en} ${item.organization.bn} ${item.description.en} ${item.description.bn}`.toLowerCase();
        return corpus.includes(q);
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        items={[{ label: language === 'bn' ? 'জাতীয় হেল্পলাইন' : 'National Helplines', active: true }]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl shadow-sm mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-700">
            <ShieldCheck size={14} />
            <span>
              {language === 'bn' ? 'বাংলাদেশ জাতীয় তথ্য বাতায়ন অনুমোদিত' : 'Bangladesh National Portal Verified'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
            {language === 'bn' ? 'জাতীয় হেল্পলাইন ও জরুরি নম্বরসমূহ' : 'National Helplines of Bangladesh'}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
            {language === 'bn'
              ? 'পুলিশ, ফায়ার সার্ভিস, অ্যাম্বুলেন্স, স্বাস্থ্য বাতায়ন, নারী ও শিশু সুরক্ষা, ভূমি এবং আইনি সহায়তার সকল অফিশিয়াল টোল-ফ্রি ও জরুরি নম্বর।'
              : 'Direct verified hotlines for national emergency response, citizen services, health counseling, land queries, legal aid, and anti-corruption.'}
          </p>
        </div>

        {/* Search bar inside header */}
        <div className="mt-6 max-w-lg relative">
          <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'নম্বর (যেমন ৯৯৯, ৩৩৩), সেবার নাম বা দপ্তর দিয়ে খুঁজুন...'
                : 'Search by number (999, 333, 16263), service, or authority...'
            }
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer border ${
              selectedCategory === cat.id
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4 px-1">
        <span>
          {language === 'bn'
            ? `প্রদর্শিত হচ্ছে ${filteredHelplines.length}টি হটলাইন`
            : `Showing ${filteredHelplines.length} official helplines`}
        </span>
      </div>

      {/* Helplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredHelplines.map((item) => (
          <div
            key={item.number}
            className="group flex flex-col justify-between p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all duration-200 text-left"
          >
            <div>
              {/* Top Row: Hotline Badge & Toll-free indicator */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono tracking-tight flex items-center gap-1.5">
                  <PhoneCall size={20} className="text-emerald-600 shrink-0" />
                  <span>{item.number}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  {item.tollFree ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {language === 'bn' ? 'টোল-ফ্রি' : 'Toll-Free'}
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {language === 'bn' ? 'নিয়মিত চার্জ' : 'Standard Rate'}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {item.title[language] || item.title.en}
              </h3>

              {/* Organization */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                <Building2 size={13} className="shrink-0 text-slate-400" />
                <span className="truncate">{item.organization[language] || item.organization.en}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {item.description[language] || item.description.en}
              </p>

              {/* Operational Hours */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Clock size={12} className="shrink-0" />
                <span>{item.hours[language] || item.hours.en}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleCopy(item.number)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copy phone number"
              >
                {copiedNumber === item.number ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-700 dark:text-emerald-400">
                      {language === 'bn' ? 'কপি হয়েছে' : 'Copied'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>{language === 'bn' ? 'নম্বর কপি' : 'Copy'}</span>
                  </>
                )}
              </button>

              <a
                href={`tel:${item.number}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                <PhoneCall size={12} />
                <span>{language === 'bn' ? 'কল করুন' : 'Call Now'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
