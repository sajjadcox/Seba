import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const helplines = [
    { number: '999', label: language === 'bn' ? 'জাতীয় জরুরি (পুলিশ/অ্যাম্বুলেন্স)' : 'National Emergency (Police/Ambulance)' },
    { number: '333', label: language === 'bn' ? 'জাতীয় তথ্য ও নাগরিক সেবা' : 'National Citizen & Info Helpline' },
    { number: '16263', label: language === 'bn' ? 'স্বাস্থ্য বাতায়ন (২৪ ঘণ্টা ডাক্তার)' : 'Health Directorate Telemedicine' },
    { number: '109', label: language === 'bn' ? 'নারী ও শিশু নির্যাতন প্রতিরোধ' : 'Women & Child Protection' },
    { number: '16122', label: language === 'bn' ? 'ভূমি সেবা হটলাইন' : 'Land Services Hotline' },
    { number: '16430', label: language === 'bn' ? 'জাতীয় আইনগত সহায়তা (লিগ্যাল এইড)' : 'National Legal Aid' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm mt-16">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand & Purpose */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <ShieldCheck size={20} />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Seba Nexa BD
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {t.footer.aboutText}
            </p>

            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1.5 rounded-md">
              <ShieldCheck size={14} className="shrink-0" />
              <span>{language === 'bn' ? 'স্বতন্ত্র অরাজনৈতিক নাগরিক নির্দেশিকা' : 'Independent Citizen Directory'}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/categories')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.categories}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/services?sector=government-or-public')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.govServices}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/services?sector=private-or-community')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.privateServices}
                </button>
              </li>
            </ul>
          </div>

          {/* National Helplines Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.citizenHelplines}
            </h3>
            <ul className="space-y-2.5 text-xs">
              {helplines.slice(0, 4).map((h) => (
                <li key={h.number} className="flex items-center justify-between gap-2">
                  <span className="text-slate-400 truncate">{h.label}</span>
                  <a
                    href={`tel:${h.number}`}
                    className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 shrink-0 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700"
                  >
                    <PhoneCall size={11} />
                    <span>{h.number}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust, Governance & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.legalTrust}
            </h3>
            <ul className="space-y-2 text-xs mb-4">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.privacy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/disclaimer')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.disclaimer}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer & Independence Notice Banner */}
      <div className="bg-slate-950 border-t border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="max-w-3xl leading-relaxed text-center md:text-left">
            {t.footer.disclaimerNotice}
          </p>
          <div className="shrink-0 text-center md:text-right">
            <span>© {currentYear} Seba Nexa BD. {t.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
