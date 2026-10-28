import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { useRouter } from './hooks/useRouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { NotFoundState } from './components/States';
import { categorySlugMap, serviceSlugMap } from './data/directoryData';

const AppContent: React.FC = () => {
  const { pathname, searchParams, route, navigate } = useRouter();
  const { language, t } = useLanguage();

  // Dynamic document title update based on route
  useEffect(() => {
    let title = `${t.siteName} — ${t.tagline}`;
    if (route.name === 'categories') {
      title = `${t.nav.categories} | ${t.siteName}`;
    } else if (route.name === 'category') {
      const cat = categorySlugMap.get(route.slug);
      if (cat) {
        title = `${cat.name[language]} | ${t.siteName}`;
      }
    } else if (route.name === 'services') {
      title = `${t.nav.services} | ${t.siteName}`;
    } else if (route.name === 'service') {
      const srv = serviceSlugMap.get(route.slug);
      if (srv) {
        title = `${srv.name[language]} | ${t.siteName}`;
      }
    } else if (route.name === 'search') {
      title = `${t.search.resultsFor} "${route.query}" | ${t.siteName}`;
    } else if (route.name === 'about') {
      title = `${t.nav.about} | ${t.siteName}`;
    } else if (route.name === 'contact') {
      title = `${t.nav.contact} | ${t.siteName}`;
    } else if (route.name === 'privacy') {
      title = `${t.nav.privacy} | ${t.siteName}`;
    } else if (route.name === 'disclaimer') {
      title = `${t.nav.disclaimer} | ${t.siteName}`;
    } else if (route.name === 'not_found') {
      title = `${t.common.notFoundTitle} | ${t.siteName}`;
    }
    document.title = title;
  }, [route, language, t]);

  const renderCurrentPage = () => {
    switch (route.name) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'categories':
        return <CategoriesPage onNavigate={navigate} />;
      case 'category':
        return (
          <CategoryDetailPage
            slug={route.slug}
            subSlug={route.subSlug}
            onNavigate={navigate}
          />
        );
      case 'services':
        return (
          <ServicesPage
            onNavigate={navigate}
            searchParams={searchParams}
            isSearchRoute={false}
          />
        );
      case 'service':
        return <ServiceDetailPage slug={route.slug} onNavigate={navigate} />;
      case 'search':
        return (
          <ServicesPage
            onNavigate={navigate}
            searchParams={searchParams}
            initialQuery={route.query}
            isSearchRoute={true}
          />
        );
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case 'disclaimer':
        return <DisclaimerPage onNavigate={navigate} />;
      case 'not_found':
      default:
        return <NotFoundState onNavigateHome={() => navigate('/')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header onNavigate={navigate} currentPath={pathname} />
      <main className="flex-1 w-full">{renderCurrentPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
