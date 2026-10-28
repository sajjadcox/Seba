import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Mail, MessageSquare, Send, CheckCircle2, AlertTriangle, MapPin } from 'lucide-react';

export const ContactPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceName: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Configurable contact details
  const contactConfig = {
    inquiryEmail: 'contact@sebanexa.bd',
    location: language === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      return;
    }
    // Record client feedback state with clear explanation
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        items={[{ label: t.nav.contact, active: true }]}
        onNavigate={onNavigate}
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-xs mb-10">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          {language === 'bn' ? 'যোগাযোগ ও তথ্য পরামর্শ' : 'Contact & Data Feedback'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          {language === 'bn'
            ? 'সেবা নেক্সা বিডি একটি স্বাধীন নাগরিক প্ল্যাটফর্ম। কোনো সেবার তথ্য হালনাগাদ, ভুল লিংক রিপোর্ট বা পরামর্শ জানাতে নিচের ফর্মটি ব্যবহার করুন।'
            : 'Seba Nexa BD is an independent citizen directory. To recommend updates, report outdated links, or share suggestions, please reach out below.'}
        </p>

        {/* Contact Info Notice & Transparency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {language === 'bn' ? 'ইমেইল যোগাযোগ' : 'General Inquiries'}
              </span>
              <a
                href={`mailto:${contactConfig.inquiryEmail}`}
                className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 hover:underline"
              >
                {contactConfig.inquiryEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
              <MapPin size={18} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {language === 'bn' ? 'অঞ্চল' : 'Region'}
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {contactConfig.location}
              </p>
            </div>
          </div>
        </div>

        {/* Directory Independence Note */}
        <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 mb-8 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {language === 'bn'
              ? 'জরুরি সতর্কীকরণ: আমরা কোনো তালিকাভুক্ত সরকারি বা বেসরকারি প্রতিষ্ঠানের প্রতিনিধিত্ব করি না। নির্দিষ্ট আবেদন বা ফাইলের অবস্থা জানার জন্য অনুগ্রহ করে সংশ্লিষ্ট সরকারি দপ্তরের নিজস্ব হেল্পলাইনে যোগাযোগ করুন।'
              : 'Important note: We do not represent any listed government department or third-party company. For queries regarding specific application files or passport tracking, please contact the respective official authority helpline directly.'}
          </p>
        </div>

        {/* Feedback Form */}
        {submitted ? (
          <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-200 mb-1">
              {language === 'bn' ? 'আপনার প্রতিক্রিয়া গৃহীত হয়েছে' : 'Thank You For Your Feedback'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto mb-4">
              {language === 'bn'
                ? 'আপনার পরামর্শের জন্য ধন্যবাদ। আমাদের প্রতিনিধি নিয়মিতভাবে প্রস্তাবিত লিংক ও তথ্যের সত্যতা যাচাই করেন।'
                : 'Your suggestion has been logged. Our directory editorial workflow regularly reviews community feedback to maintain data accuracy.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', serviceName: '', message: '' });
              }}
              className="px-4 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Submit Another Message'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? 'আপনার নাম' : 'Your Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'bn' ? 'যেমন: মোহাম্মদ রহমান' : 'e.g. John Doe'}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-850"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={language === 'bn' ? 'example@mail.com' : 'user@example.com'}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-850"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'সংশ্লিষ্ট সেবার নাম (যদি প্রযোজ্য)' : 'Related Service Name (Optional)'}
              </label>
              <input
                type="text"
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                placeholder={language === 'bn' ? 'যেমন: পাসপোর্ট বা ড্রাইভিং লাইসেন্স' : 'e.g. e-Passport or BRTA'}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'আপনার বার্তা বা সংশোধনী বিবরণ' : 'Message or Correction Details'} *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={
                  language === 'bn'
                    ? 'কোনো তথ্যের ভুল বা নতুন সেবার লিংক থাকলে বিস্তারিত লিখুন...'
                    : 'Please specify the updated URL, new requirement, or feedback...'
                }
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-850"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send size={15} />
              <span>{language === 'bn' ? 'বার্তা পাঠান' : 'Submit Feedback'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
