import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SearchBar } from '../components/SearchBar';
import { CategoryCard } from '../components/CategoryCard';
import { ServiceCard } from '../components/ServiceCard';
import { categories, services, getSectorCounts } from '../data/directoryData';
import {
  PhoneCall,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (href: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const sectorCounts = getSectorCounts();

  // Top featured categories that have active services
  const featuredCategories = categories
    .filter((c) => (c.serviceIds && c.serviceIds.length > 0) || c.featured)
    .slice(0, 9);

  // Real featured services directly from master dataset
  const featuredServices = services.filter((s) => s.isFeatured).slice(0, 6);

  const urgentHelplines = [
    {
      number: '999',
      title: language === 'bn' ? 'জাতীয় জরুরি সেবা' : 'National Emergency 999',
      desc: language === 'bn' ? 'পুলিশ • ফায়ার সার্ভিস • অ্যাম্বুলেন্স' : 'Police • Fire • Ambulance',
      color: 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-900/80 hover:bg-rose-100 dark:hover:bg-rose-900/50',
    },
    {
      number: '333',
      title: language === 'bn' ? 'জাতীয় নাগরিক তথ্য' : 'Citizen Helpline 333',
      desc: language === 'bn' ? 'সরকারি সেবা ও সমাজকল্যাণ তথ্য' : 'Government & Welfare Inquiries',
      color: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-900/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50',
    },
    {
      number: '16263',
      title: language === 'bn' ? 'স্বাস্থ্য বাতায়ন' : 'Shastho Batayon 16263',
      desc: language === 'bn' ? '২৪ ঘণ্টা এমবিবিএস ডাক্তার পরামর্শ' : '24/7 Registered Medical Advice',
      color: 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-900/80 hover:bg-blue-100 dark:hover:bg-blue-900/50',
    },
    {
      number: '16122',
      title: language === 'bn' ? 'ভূমি সেবা হটলাইন' : 'Land Helpline 16122',
      desc: language === 'bn' ? 'খতিয়ান, নামজারি ও ভূমি উন্নয়ন কর' : 'Porcha, Mutation & Land Tax',
      color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-900/80 hover:bg-amber-100 dark:hover:bg-amber-900/50',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Subtle National Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            <span>{t.home.heroTitlePrefix}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight mb-4 sm:mb-6">
            <span>{language === 'bn' ? 'সকল প্রয়োজনীয় সেবা,' : 'All Essential Services,'}</span>{' '}
            <span className="text-emerald-700 dark:text-emerald-400 underline decoration-emerald-300 dark:decoration-emerald-600 decoration-wavy decoration-2 underline-offset-8">
              {language === 'bn' ? 'এক ঠিকানায়।' : 'One Place.'}
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            {t.home.heroSubtitle}
          </p>

          {/* Hero Search Box */}
          <div className="max-w-2xl mx-auto shadow-sm">
            <SearchBar
              size="large"
              showQuickTags={true}
              onSearch={(q) => onNavigate(`/search?q=${encodeURIComponent(q)}`)}
            />
          </div>
        </div>
      </section>

      {/* Urgent Citizen Helplines Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PhoneCall size={18} className="text-emerald-700 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {t.emergencyBanner.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/helplines')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline cursor-pointer"
          >
            <span>{language === 'bn' ? 'সকল জরুরি হেল্পলাইন (২০+)' : 'View All Helplines (20+)'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {urgentHelplines.map((item) => (
            <a
              key={item.number}
              href={`tel:${item.number}`}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer shadow-2xs ${item.color}`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wide opacity-90">
                  {item.title}
                </span>
                <p className="text-xs opacity-75 mt-0.5 line-clamp-1">{item.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-base sm:text-lg font-extrabold shrink-0 pl-2">
                <PhoneCall size={16} />
                <span>{item.number}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Sector Overview Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Government Sector */}
          <div
            onClick={() => onNavigate('/services?sector=government-or-public')}
            className="group p-5 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                <Building2 size={22} />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
                {sectorCounts.government} {language === 'bn' ? 'সেবা' : 'services'}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors mb-1">
              {language === 'bn' ? 'সরকারি ও জনসেবা' : 'Government & Public Services'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {language === 'bn'
                ? 'জাতীয় তথ্য বাতায়ন, মাইগভ, পাসপোর্ট, বিআরটিএ, ভূমি ও এনবিআর সরকারি সেবা।'
                : 'National Portal, myGov, passport, BRTA licensing, land records, and NBR tax returns.'}
            </p>
          </div>

          {/* Private / Community Sector */}
          <div
            onClick={() => onNavigate('/services?sector=private-or-community')}
            className="group p-5 bg-white dark:bg-slate-900 rounded-xl border border-purple-100 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all cursor-pointer text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                <Sparkles size={22} />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800">
                {sectorCounts.private} {language === 'bn' ? 'সেবা' : 'services'}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors mb-1">
              {language === 'bn' ? 'বেসরকারি ও নাগরিক সেবা' : 'Private & Everyday Citizen Services'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {language === 'bn'
                ? 'ইউটিলিটি পেমেন্ট, মোবাইল ব্যাংকিং, স্বাস্থ্য নেটওয়ার্ক ও নিত্যপ্রয়োজনীয় পোর্টাল।'
                : 'Utility bill payments, mobile financial services, health networks, and daily citizen tools.'}
            </p>
          </div>
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.home.popularCategoriesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {t.home.popularCategoriesSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/categories')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{t.home.viewAllCategories}</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onNavigate(`/categories/${category.slug}`)}
            />
          ))}
        </div>
      </section>

      {/* Featured Essential Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                {language === 'bn' ? 'যাচাইকৃত জাতীয় সেবা' : 'Verified National Portals'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.home.featuredServicesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {t.home.featuredServicesSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{t.home.viewAllServices}</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewDetails={() => onNavigate(`/services/${service.slug}`)}
            />
          ))}
        </div>
      </section>

      {/* Three-Step How It Works Section */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              {t.home.howItWorksTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.home.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-lg mb-4 border border-emerald-100 dark:border-emerald-800">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {t.home.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.home.step1Desc}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-lg mb-4 border border-blue-100 dark:border-blue-800">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {t.home.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.home.step2Desc}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
              <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-400 font-bold flex items-center justify-center text-lg mb-4 border border-teal-100 dark:border-teal-800">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {t.home.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.home.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency and Verification Commitment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-2">
                <ShieldCheck size={18} />
                <span>{t.home.transparencyTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.home.transparencyDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    {language === 'bn'
                      ? 'অফিসিয়াল উৎস নিশ্চিতকৃত সরকারি ও প্রাতিষ্ঠানিক ডোমেন'
                      : 'Official source identified institutional domains'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <AlertCircle size={15} className="text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>
                    {language === 'bn'
                      ? 'বেসরকারি বা প্রার্থী সেবা পর্যালোচনারত'
                      : 'Private or candidate service under review'}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/about')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              {language === 'bn' ? 'যাচাইকরণ নীতিমালা জানুন' : 'Read Audit Methodology'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
