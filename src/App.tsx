import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { useRouter } from './hooks/useRouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { HelplinesPage } from './pages/HelplinesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { NotFoundState } from './components/States';
import { categorySlugMap, serviceSlugMap } from './data/directoryData';
import { updatePageSEO } from './utils/seo';

const AppContent: React.FC = () => {
  const { pathname, searchParams, route, navigate } = useRouter();
  const { language, t } = useLanguage();

  // Dynamic document title and Google SEO optimization based on route
  useEffect(() => {
    updatePageSEO(route, language, window.location.origin);
  }, [route, language]);

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
      case 'helplines':
        return <HelplinesPage onNavigate={navigate} />;
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header onNavigate={navigate} currentPath={pathname} />
      <main className="flex-1 w-full">{renderCurrentPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
