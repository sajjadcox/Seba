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
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InAppPortalViewerProps {
  url: string;
  title: string;
  provider?: string;
  onClose: () => void;
}

export const InAppPortalViewer: React.FC<InAppPortalViewerProps> = ({
  url,
  title,
  provider,
  onClose,
}) => {
  const { language } = useLanguage();
  const [iframeKey, setIframeKey] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showEmbedNotice, setShowEmbedNotice] = useState(true);

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

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

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
          {/* Left: Traffic light dots & Title */}
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
          <div className="flex-1 max-w-xl mx-auto order-3 sm:order-2 w-full sm:w-auto">
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
            <button
              type="button"
              onClick={handleReload}
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title={language === 'bn' ? 'রিফ্রেশ করুন' : 'Refresh'}
            >
              <RotateCw size={15} className={isLoading ? 'animate-spin' : ''} />
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
              title={language === 'bn' ? 'আলাদা ট্যাবে খুলুন' : 'Open in new tab'}
            >
              <ExternalLink size={13} />
              <span className="hidden md:inline">{language === 'bn' ? 'নতুন উইন্ডো' : 'External'}</span>
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
              title={language === 'bn' ? 'বন্ধ করুন' : 'Close'}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Security & Frame Policy Notice Banner */}
        {showEmbedNotice && (
          <div className="flex items-center justify-between px-4 py-2 bg-amber-50 dark:bg-amber-950/70 border-b border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-amber-600 shrink-0" />
              <span>
                {language === 'bn'
                  ? 'তথ্য: কোনো কোনো সরকারি পোর্টাল নিরাপত্তা বিধির (X-Frame-Options) কারণে ফ্রেম ব্লক করতে পারে। ব্ল্যাংক আসলে উপরের "নতুন উইন্ডো" বাটনে ক্লিক করুন।'
                  : 'Notice: Some official authorities restrict embedding via security policies (CSP/X-Frame-Options). If it appears blank, click "External" above to open directly.'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowEmbedNotice(false)}
              className="text-amber-700 dark:text-amber-300 hover:text-amber-900 ml-2 font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {/* Content Frame */}
        <div className="relative flex-1 w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs z-10 pointer-events-none">
              <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {language === 'bn' ? 'অফিসিয়াল পোর্টাল লোড হচ্ছে...' : 'Loading official portal...'}
              </p>
            </div>
          )}

          <iframe
            key={iframeKey}
            src={url}
            title={title}
            onLoad={() => setIsLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
