import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Scale, AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';

export const DisclaimerPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        items={[{ label: t.nav.disclaimer, active: true }]}
        onNavigate={onNavigate}
      />

      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-xs mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-4 border border-amber-200">
          <Scale size={14} />
          <span>{language === 'bn' ? 'আইনি ও তথ্যের স্পষ্টীকরণ' : 'Legal & Operational Notice'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          {language === 'bn' ? 'দাবিত্যাগ ও স্বচ্ছতা ঘোষণা (Disclaimer)' : 'Disclaimer & Public Notice'}
        </h1>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 mb-8 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {language === 'bn'
              ? 'সেবা নেক্সা বিডি একটি স্বাধীন জনস্বার্থমূলক নাগরিক নির্দেশিকা প্ল্যাটফর্ম। এটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকার বা কোনো নির্দিষ্ট মন্ত্রণালয়, অধিদপ্তর বা বাণিজ্যিক প্রতিষ্ঠানের অঙ্গপ্রতিষ্ঠান নয়।'
              : 'Seba Nexa BD is an independent public digital directory. It is not affiliated with, endorsed by, or operated as an official branch of the Government of Bangladesh or any specific private organization.'}
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              {language === 'bn' ? '১. তথ্যের নির্ভরযোগ্যতা ও তৃতীয় পক্ষের লিংক' : '1. Third-Party Portals & Service Continuity'}
            </h2>
            <p className="leading-relaxed text-slate-600 mb-2">
              {language === 'bn'
                ? 'এই প্ল্যাটফর্মে প্রদর্শিত সেবাগুলোর বিবরণ, অফিশিয়াল ইউআরএল এবং প্রয়োজনীয় কাগজপত্রের তালিকা বিভিন্ন সরকারি গ্যাজেট ও প্রাতিষ্ঠানিক উৎস থেকে সতর্কতার সাথে সংকলিত। তবে বহিঃস্থ ওয়েবসাইটগুলোর সার্ভার ডাউনটাইম, রক্ষণাবেক্ষণ, ফি পরিবর্তন বা নতুন নীতিমালা সংক্রান্ত সিদ্ধান্তের ওপর সেবা নেক্সা বিডি-র কোনো নিয়ন্ত্রণ নেই।'
                : 'All service information, requirements, and official URLs are curated from public institutional records. However, Seba Nexa BD exerts no control over third-party server uptime, fee modifications, or technical revisions.'}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              {language === 'bn' ? '২. কোনো আর্থিক লেনদেন নেই' : '2. No Direct Transactions or Fees'}
            </h2>
            <p className="leading-relaxed text-slate-600">
              {language === 'bn'
                ? 'আমরা কখনো নাগরিকদের কাছ থেকে কোনো ফি, আবেদন চার্জ কিংবা ব্যাংকিং তথ্য চাই না। সকল সেবা ফি শুধুমাত্র সংশ্লিষ্ট সরকারি পোর্টালের অনুমোদিত পেমেন্ট গেটওয়ের মাধ্যমে প্রদান করতে হবে।'
                : 'Seba Nexa BD never requests funds, intermediary processing commissions, or payment information. Any required government or utility fee must be submitted directly through official payment channels.'}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              {language === 'bn' ? '৩. ট্রেডমার্ক ও বুদ্ধিবৃত্তিক সম্পদ' : '3. Trademarks & Brand Ownership'}
            </h2>
            <p className="leading-relaxed text-slate-600">
              {language === 'bn'
                ? 'এই ডিরেক্টরিতে উল্লেখিত সকল বিভাগীয় নাম, লোগো, মনোগ্রাম এবং সেবার ট্রেডমার্ক সংশ্লিষ্ট সরকারি দপ্তর বা স্বত্বাধিকারী কর্তৃপক্ষের নিজস্ব সম্পদ। এগুলো শুধুমাত্র শনাক্তকরণ এবং জনসচেতনতা তৈরির উদ্দেশ্যে তথ্যমূলক রেফারেন্স হিসেবে ব্যবহৃত হয়েছে।'
                : 'All departmental names, official seals, and brand trademarks cited herein remain the sole intellectual property of their respective statutory bodies and are used purely for public reference and identification.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
