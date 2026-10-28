import React, { useState } from 'react';
import { Menu, X, Globe, Search, ShieldCheck, Sun, Moon, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onNavigate: (href: string) => void;
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPath }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.categories, href: '/categories' },
    { label: language === 'bn' ? 'জাতীয় হেল্পলাইন' : 'Helplines', href: '/helplines' },
    { label: t.nav.govServices, href: '/services?sector=government-or-public' },
    { label: t.nav.privateServices, href: '/services?sector=private-or-community' },
    { label: t.nav.about, href: '/about' },
  ];

  const handleLinkClick = (href: string) => {
    onNavigate(href);
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return currentPath === '/' || currentPath === '';
    }
    return currentPath.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand Logo & Tagline */}
          <button
            type="button"
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2.5 text-left focus:outline-hidden group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck size={22} className="text-white" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Seba Nexa BD
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  BD
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 truncate max-w-[170px] sm:max-w-xs">
                {language === 'bn' ? 'সকল প্রয়োজনীয় সেবা, এক ঠিকানায়' : 'All Essential Services, One Place'}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle & Language Switch & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Quick Search Shortcut */}
            <button
              type="button"
              onClick={() => handleLinkClick('/services')}
              className="hidden sm:inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title={t.search.button}
            >
              <Search size={14} className="text-slate-500 dark:text-slate-400" />
              <span>{t.search.button}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title={theme === 'dark' ? (language === 'bn' ? 'লাইট মোড চালু করুন' : 'Switch to Light Mode') : (language === 'bn' ? 'নাইট মোড চালু করুন' : 'Switch to Dark Mode')}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-amber-400" />
              ) : (
                <Moon size={16} className="text-slate-600" />
              )}
            </button>

            {/* Language Switch Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-200/80 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
              aria-label={`Switch language to ${language === 'bn' ? 'English' : 'Bangla'}`}
            >
              <Globe size={15} className="text-emerald-700 dark:text-emerald-400" />
              <span>{language === 'bn' ? 'EN' : 'বাংলা'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-5 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-sm text-left font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}

            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleLinkClick('/services')}
                className="flex items-center gap-2 w-full px-3.5 py-2.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
              >
                <Search size={16} />
                <span>{t.search.placeholder}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
