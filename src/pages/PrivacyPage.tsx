import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Shield, Lock, EyeOff, Server } from 'lucide-react';

export const PrivacyPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        items={[{ label: t.nav.privacy, active: true }]}
        onNavigate={onNavigate}
      />

      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-xs mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-4 border border-emerald-100">
          <Shield size={14} />
          <span>{language === 'bn' ? 'ব্যবহারকারী সুরক্ষা' : 'User Privacy Protection'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          {language === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
          {language === 'bn'
            ? 'সেবা নেক্সা বিডি নাগরিকদের ব্যক্তিগত গোপনীয়তাকে সর্বোচ্চ অগ্রাধিকার দেয়। আমাদের প্ল্যাটফর্মটি এমনভাবে নকশা করা হয়েছে যাতে আপনার কোনো ব্যক্তিগত তথ্য বা ব্রাউজিং ইতিহাস ট্র্যাক করা না হয়।'
            : 'At Seba Nexa BD, we prioritize transparency and privacy. Our portal operates without account creation or intrusive surveillance trackers.'}
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
              <EyeOff size={16} className="text-emerald-700" />
              <span>{language === 'bn' ? '১. কোনো ব্যক্তিগত তথ্য সংগ্রহ করা হয় না' : '1. No Personal Tracking'}</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              {language === 'bn'
                ? 'আমরা কোনো এনআইডি নম্বর, পাসওয়ার্ড, জন্ম নিবন্ধন কোড কিংবা পেমেন্ট তথ্য সংগ্রহ বা সংরক্ষণ করি না। আপনি যা খুঁজছেন তা শুধুমাত্র আপনার ডিভাইসের ব্রাউজারে স্থানীয়ভাবে প্রসেস হয়।'
                : 'We never solicit, store, or process sensitive identifiers like NID numbers, biometric records, or financial cards. All keyword filtering is handled client-side in your web browser.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
              <Lock size={16} className="text-emerald-700" />
              <span>{language === 'bn' ? '২. স্থানীয় ব্রাউজার স্টোরেজ (Local Storage)' : '2. Browser Local Storage'}</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              {language === 'bn'
                ? 'আপনার নির্বাচিত ভাষা পছন্দ (বাংলা বা ইংরেজি) শুধুমাত্র আপনার ডিভাইসের ব্রাউজার ক্যাশে সংরক্ষণ করা হয়, যাতে পরবর্তী ভিজিটে আপনার পছন্দের ভাষা বজায় থাকে।'
                : 'We only use localStorage to remember your preferred language selection (Bangla or English) across page visits.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
              <Server size={16} className="text-emerald-700" />
              <span>{language === 'bn' ? '৩. বহিঃস্থ লিঙ্কের ক্ষেত্রে গোপনীয়তা' : '3. External Links & Third Parties'}</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              {language === 'bn'
                ? 'সেবা নেক্সা বিডি মূল সরকারি বা অনুমোদিত পোর্টালে বহিঃস্থ সংযোগ প্রদান করে। সেইসব তৃতীয় পক্ষের ওয়েবসাইটে প্রবেশের পর তাদের নিজস্ব গোপনীয়তা নীতি প্রযোজ্য হবে।'
                : 'When you navigate to third-party government or commercial websites via our direct links, their respective privacy policies and terms apply.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
