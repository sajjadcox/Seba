import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  RotateCw,
  Lock,
  Maximize2,
  Minimize2,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  FileText,
  PhoneCall,
  Clock,
  Layers,
  ArrowRight,
  Globe,
  HelpCircle,
  Info,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Service } from '../types';

interface InAppPortalViewerProps {
  url: string;
  title: string;
  provider?: string;
  service?: Service;
  onClose: () => void;
}

export const InAppPortalViewer: React.FC<InAppPortalViewerProps> = ({
  url,
  title,
  provider,
  service,
  onClose,
}) => {
  const { language } = useLanguage();
  const [iframeKey, setIframeKey] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'frame' | 'desk'>('frame');
  const [frameLoadTimeout, setFrameLoadTimeout] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // If frame takes > 4.5s to trigger onLoad, browser likely blocked the iframe via X-Frame-Options
  useEffect(() => {
    setIsLoading(true);
    setFrameLoadTimeout(false);
    const timer = setTimeout(() => {
      setFrameLoadTimeout(true);
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, [iframeKey]);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setFrameLoadTimeout(false);
    setIframeKey((prev) => prev + 1);
  };

  const isBn = language === 'bn';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        className={`flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 w-full ${
          isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-6xl h-[92vh]'
        }`}
      >
        {/* Browser Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 gap-2 shrink-0">
          {/* Left: Traffic light dots & Service Identity */}
          <div className="flex items-center gap-2.5 min-w-0 max-w-xs sm:max-w-md">
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="truncate">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate block">
                {title}
              </span>
              {provider && (
                <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                  {provider}
                </span>
              )}
            </div>
          </div>

          {/* Center: Address Bar */}
          <div className="flex-1 max-w-lg mx-auto order-3 sm:order-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
              <Lock size={12} className="text-emerald-600 shrink-0" />
              <span className="truncate font-mono select-all flex-1">{url}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0 transition-colors"
                title="Copy URL"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 order-2 sm:order-3 ml-auto sm:ml-0">
            {activeTab === 'frame' && (
              <button
                type="button"
                onClick={handleReload}
                className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title={isBn ? 'রিফ্রেশ করুন' : 'Refresh'}
              >
                <RotateCw size={15} className={isLoading ? 'animate-spin' : ''} />
              </button>
            )}

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
              title={isBn ? 'আলাদা উইন্ডোতে খুলুন' : 'Open in new window'}
            >
              <ExternalLink size={13} />
              <span className="hidden md:inline">{isBn ? 'সরাসরি পোর্টাল' : 'Direct Portal'}</span>
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
              title={isBn ? 'বন্ধ করুন' : 'Close'}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('frame')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                activeTab === 'frame'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Globe size={13} />
              <span>{isBn ? 'লাইভ ওয়েব ফ্রেম' : 'Live Web Frame'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('desk')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                activeTab === 'desk'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers size={13} />
              <span>{isBn ? 'ডিজিটাল সেবা ডেস্ক' : 'Citizen Service Desk'}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span>{isBn ? 'সুরক্ষিত সরকারি সংযোগ' : 'Verified Secure Gateway'}</span>
          </div>
        </div>

        {/* Tab 1: Live Web Frame Mode */}
        {activeTab === 'frame' && (
          <div className="relative flex-1 w-full bg-slate-50 dark:bg-slate-950 overflow-hidden flex flex-col">
            {/* If frame timed out or appears blocked, show smart overlay fallback */}
            {frameLoadTimeout && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/80 border-b border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs flex flex-wrap items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-amber-600 shrink-0" />
                  <span>
                    {isBn
                      ? 'কর্তৃপক্ষের নিরাপত্তা বিধির কারণে স্ক্রিন ব্ল্যাংক দেখা গেলে সেবা ডেস্কে প্রয়োজনীয় তথ্য দেখুন বা সরাসরি উইন্ডোতে খুলুন।'
                      : 'If this official portal restricts iframe embedding, switch to Citizen Service Desk or open directly.'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('desk')}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs transition-colors cursor-pointer"
                  >
                    {isBn ? 'ডিজিটাল সেবা ডেস্ক' : 'Open Service Desk'}
                  </button>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold rounded text-xs transition-colors cursor-pointer"
                  >
                    {isBn ? 'সরাসরি চালু করুন' : 'Launch Directly'}
                  </a>
                </div>
              </div>
            )}

            {/* Spinner when loading */}
            {isLoading && !frameLoadTimeout && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs z-10 pointer-events-none">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isBn ? 'অফিসিয়াল পোর্টাল লোড হচ্ছে...' : 'Connecting to official portal...'}
                </p>
              </div>
            )}

            <iframe
              key={iframeKey}
              src={url}
              title={title}
              onLoad={() => {
                setIsLoading(false);
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              className="w-full h-full border-0"
            />
          </div>
        )}

        {/* Tab 2: Digital Citizen Service Desk (Always Guaranteed to Work 100%) */}
        {activeTab === 'desk' && (
          <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Top Overview & Action Banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-semibold mb-3">
                    <ShieldCheck size={14} className="text-emerald-300" />
                    <span>{isBn ? 'যাচাইকৃত জাতীয় পোর্টাল গেটওয়ে' : 'Verified Authority Gateway'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mb-2">{title}</h2>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    {service?.description
                      ? (service.description[language] || service.description.en)
                      : (isBn
                          ? 'এই সরকারি ও বেসরকারি সেবার আনুষ্ঠানিক পোর্টালে সরাসরি নাগরিক আবেদন ও সেবা গ্রহণ নিশ্চিত করুন।'
                          : 'Official portal access for citizen applications, renewals, and tracking.')}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 shrink-0">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-emerald-950 font-black rounded-xl shadow-lg hover:bg-emerald-50 transition-all text-sm cursor-pointer"
                  >
                    <span>{isBn ? 'সরাসরি পোর্টালে প্রবেশ করুন' : 'Launch Official Portal'}</span>
                    <ExternalLink size={16} />
                  </a>
                  {service?.helpline && (
                    <a
                      href={`tel:${service.helpline}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-400/30 text-white font-bold rounded-xl transition-all text-xs cursor-pointer"
                    >
                      <PhoneCall size={14} />
                      <span>
                        {isBn ? 'হটলাইনে কল করুন: ' : 'Call Hotline: '}
                        {service.helpline}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Service Desk Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Step-by-Step Procedure */}
              <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-emerald-600" />
                  <span>{isBn ? 'সেবা গ্রহণের সহজ ধাপসমূহ' : 'Step-by-Step Service Guide'}</span>
                </h3>

                <ol className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      ১
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {isBn ? 'অফিসিয়াল পোর্টালে প্রবেশ ও অ্যাকাউন্ট লগইন' : 'Official Portal Access & Login'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isBn
                          ? 'উপরে "সরাসরি পোর্টালে প্রবেশ করুন" বাটনে ক্লিক করে মূল পোর্টালে মোবাইল বা এনআইডি দিয়ে প্রবেশ করুন।'
                          : 'Click "Launch Official Portal" to access with your phone number, NID, or citizen credentials.'}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      ২
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {isBn ? 'আবেদন ফরম সঠিক তথ্যে পূরণ' : 'Application Form Fill-up'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isBn
                          ? 'অনলাইন ফরমে নাম, ঠিকানা, জন্ম তারিখ ও প্রয়োজনীয় তথ্য জাতীয় পরিচয়পত্র অনুযায়ী প্রদান করুন।'
                          : 'Enter your personal details, verified addresses, and identity references exactly as in NID.'}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      ৩
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {isBn ? 'কাগজপত্র সংযুক্ত ও ফি পরিশোধ' : 'Document Upload & Fee Payment'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isBn
                          ? 'ছবি বা স্ক্যান কপি আপলোড করুন এবং প্রযোজ্য ক্ষেত্রে বিকাশ/নগদ/রকেট বা কার্ডে ফি পরিশোধ করুন।'
                          : 'Upload required scanned copies and settle government fees via bKash, Nagad, or debit cards.'}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      ৪
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {isBn ? 'ট্র্যাকিং স্লিপ ও সেবা সংগ্রহ' : 'Track Application & Receive Service'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isBn
                          ? 'সাবমিটের পর প্রাপ্ত অ্যাপ্লিকেশন স্লিপ ডাউনলোড করুন এবং এসএমএস নোটিফিকেশন চেক করুন।'
                          : 'Save the application tracking reference slip and monitor status via SMS updates.'}
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Card 2: Prerequisites & Credentials */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-3.5 flex items-center gap-2">
                  <Check size={18} className="text-emerald-600" />
                  <span>{isBn ? 'প্রয়োজনীয় কাগজপত্র' : 'Prerequisites Checklist'}</span>
                </h3>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  {service?.requirements && service.requirements[language] && service.requirements[language].length > 0 ? (
                    service.requirements[language].map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{isBn ? 'জাতীয় পরিচয়পত্র (NID) নম্বর অথবা অনলাইন জন্ম নিবন্ধন সনদ' : 'NID Card or Online Birth Registration Certificate'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{isBn ? 'সচল মোবাইল নম্বর (এসএমএস ভেরিফিকেশনের জন্য)' : 'Active Mobile Number for OTP Verification'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{isBn ? 'পাসপোর্ট সাইজ ছবি ও প্রযোজ্য ক্ষেত্রে সহায়ক দলিল' : 'Passport-size digital photo and supporting deeds'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{isBn ? 'মোবাইল ব্যাংকিং (বিকাশ/নগদ/রকেট) বা ডেবিট কার্ড' : 'Mobile Banking or Debit Card for payment'}</span>
                      </li>
                    </>
                  )}
                </ul>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold block text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'নিরাপত্তা বার্তা:' : 'Security Notice:'}
                  </span>
                  <p>
                    {isBn
                      ? 'নাগরিকের গোপনীয়তা রক্ষার স্বার্থে অনেক সরকারি পোর্টাল তাদের লগইন পেজ থার্ড পার্টি ফ্রেমে এম্বেড নিষিদ্ধ করে। তাই নিরাপদভাবে সেবা পেতে অফিসিয়াল পোর্টালে সরাসরি সম্পন্ন করা সবচেয়ে নির্ভরযোগ্য।'
                      : 'To protect citizen credentials and payment integrity, authorities enforce strict CSP headers. Launching the verified gateway ensures end-to-end security.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
