import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Target, Search, CheckCircle2, HelpCircle } from 'lucide-react';

export const AboutPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  const faqs = [
    {
      q: language === 'bn' ? 'সেবা নেক্সা বিডি কি কোনো সরকারি প্রতিষ্ঠান?' : 'Is Seba Nexa BD an official government body?',
      a: language === 'bn'
        ? 'না। সেবা নেক্সা বিডি একটি সম্পূর্ণ স্বাধীন, অরাজনৈতিক ও জনকল্যাণমুখী ডিজিটাল নাগরিক ডিরেক্টরি। আমরা সরকারের মূল পোর্টাল ও অনুমোদিত সেবাসমূহের লিঙ্ক এবং তথ্য একক প্ল্যাটফর্মে সংগঠিত করে সাধারণ নাগরিকদের সাহায্য করি।'
        : 'No. Seba Nexa BD is an independent, non-governmental public directory. It links directly to official government portals and authorized third-party services to help citizens locate services easily.',
    },
    {
      q: language === 'bn' ? 'সেবাগুলোর তথ্যের সত্যতা কীভাবে যাচাই করা হয়?' : 'How is service information verified?',
      a: language === 'bn'
        ? 'আমরা প্রতিটি সেবা তালিকার বিপরীতে বাংলাদেশ সরকারের প্রাতিষ্ঠানিক ডোমেন (.gov.bd), ট্রেজারি গেজেট কিংবা সংশ্লিষ্ট সংস্থার অফিসিয়াল নথির সাথে তথ্য মিলিয়ে দেখি। বেসরকারি ক্ষেত্রে বাংলাদেশ ব্যাংক বা সংশ্লিষ্ট রেগুলেটরি লাইসেন্স পরীক্ষা করা হয়।'
        : 'Each service is audited against institutional domains (.gov.bd), ministerial gazettes, or regulatory licenses (such as Bangladesh Bank for MFS).',
    },
    {
      q: language === 'bn' ? 'এখানে কি কোনো সার্ভিস ফি বা নিবন্ধন ফি দিতে হয়?' : 'Does Seba Nexa BD charge any fees?',
      a: language === 'bn'
        ? 'না। সেবা নেক্সা বিডি সম্পূর্ণ উন্মুক্ত ও বিনামূল্যে ব্যবহারযোগ্য। আমরা কোনো সেবার ফি বা আবেদন ফি গ্রহণ করি না। সকল সরকারি ফি শুধুমাত্র সংশ্লিষ্ট কর্তৃপক্ষের মূল ওয়েবসাইটে নির্ধারিত গেটওয়ের মাধ্যমে পরিশোধযোগ্য।'
        : 'No. Seba Nexa BD is 100% free. We never charge users or process financial transactions. All official fees are paid directly on the respective authority portals.',
    },
    {
      q: language === 'bn' ? 'কোনো সেবার তথ্য পরিবর্তিত হলে কী করতে হবে?' : 'What if a service URL or requirement changes?',
      a: language === 'bn'
        ? 'আমাদের "যোগাযোগ" পৃষ্ঠার মাধ্যমে তথ্য সংশোধনের অনুরোধ পাঠানো যায়। আমাদের টিম নিয়মিত ডিরেক্টরি অডিট করে তথ্যের হালনাগাদ বজায় রাখে।'
        : 'You can submit an update recommendation via our Contact page. Our team regularly reviews data integrity.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        items={[{ label: t.nav.about, active: true }]}
        onNavigate={onNavigate}
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-xs mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4 border border-emerald-100 dark:border-emerald-800">
          <ShieldCheck size={14} />
          <span>{language === 'bn' ? 'আমাদের দর্শন ও উদ্দেশ্য' : 'Our Mission & Ethics'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          {language === 'bn' ? 'সেবা নেক্সা বিডি সম্পর্কে' : 'About Seba Nexa BD'}
        </h1>

        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-medium">
          {language === 'bn'
            ? 'ডিজিটাল বাংলাদেশে নাগরিক সেবার পরিধি দ্রুত বৃদ্ধি পেলেও শত শত বিভিন্ন পোর্টাল, ভিন্ন ভিন্ন ইউআরএল এবং দাপ্তরিক জটিলতার কারণে সাধারণ মানুষ প্রায়ই বিভ্রান্তির শিকার হন। সেবা নেক্সা বিডি-র লক্ষ্য হলো নির্ভরযোগ্য, নিরাপদ ও সহজ ভাষায় সকল অপরিহার্য সেবাকে এক ঠিকানায় এনে দেওয়া।'
            : 'As Bangladesh rapidly digitizes citizen administration, locating the exact government portal, verified helpline, or required documents across dozens of ministries can be confusing. Seba Nexa BD exists to organize and verify essential services into a fast, bilingual, and accessible single directory.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <Target size={24} className="text-emerald-700 dark:text-emerald-400 mb-2" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {language === 'bn' ? 'আমাদের মূল লক্ষ্য' : 'Core Objectives'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'নাগরিকদের মধ্যস্বত্বভোগী বা দালালের খপ্পর থেকে মুক্ত রেখে সরাসরি অফিশিয়াল ওয়েবসাইটে প্রবেশের সুযোগ করে দেওয়া।'
                : 'Direct citizens straight to authoritative portals, eliminating unofficial intermediaries and fraudulent copycat websites.'}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <CheckCircle2 size={24} className="text-emerald-700 dark:text-emerald-400 mb-2" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {language === 'bn' ? 'স্বচ্ছতা ও সত্যনিষ্ঠা' : 'Integrity & Data Truth'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'কোনো ভুয়া রেটিং, কাল্পনিক পরিসংখ্যান বা বিভ্রান্তিকর রিভিউ অন্তর্ভুক্ত না করে কেবল নির্ভরযোগ্য ডেটাসেটের ওপর ভিত্তি করে তৈরি।'
                : 'No fabricated reviews, invented ratings, or inflated vanity metrics. Built strictly on authentic datasets.'}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={20} className="text-emerald-700 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'bn' ? 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
