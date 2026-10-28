import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

export interface Translations {
  siteName: string;
  tagline: string;
  taglineBangla: string;
  nav: {
    home: string;
    categories: string;
    services: string;
    govServices: string;
    privateServices: string;
    communityServices: string;
    helplines: string;
    about: string;
    contact: string;
    privacy: string;
    disclaimer: string;
  };
  search: {
    placeholder: string;
    button: string;
    quickTagsLabel: string;
    resultsFor: string;
    foundServices: string;
    clearSearch: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetFilters: string;
  };
  filters: {
    filterBy: string;
    allSectors: string;
    sector: string;
    government: string;
    private: string;
    community: string;
    category: string;
    allCategories: string;
    verificationStatus: string;
    allVerification: string;
    verifiedOnly: string;
    reviewNeeded: string;
    sortBy: string;
    sortPopular: string;
    sortNameAsc: string;
    sortNameDesc: string;
    sortCategory: string;
    totalCount: string;
  };
  badges: {
    verified: string;
    reviewNeeded: string;
    unverified: string;
    government: string;
    private: string;
    community: string;
    featured: string;
  };
  serviceCard: {
    viewDetails: string;
    visitPortal: string;
    helpline: string;
    provider: string;
    requirements: string;
  };
  serviceDetails: {
    overview: string;
    officialProvider: string;
    serviceCharter: string;
    directPortalLink: string;
    openExternalNotice: string;
    hotlineHelpline: string;
    operatingHours: string;
    requiredDocuments: string;
    verificationAudit: string;
    keywords: string;
    relatedServices: string;
    backToServices: string;
    copyLink: string;
    linkCopied: string;
    externalDisclaimer: string;
  };
  emergencyBanner: {
    title: string;
    subtitle: string;
    callNow: string;
  };
  home: {
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    statsHelpline: string;
    statsVerified: string;
    statsSectors: string;
    popularCategoriesTitle: string;
    popularCategoriesSubtitle: string;
    featuredServicesTitle: string;
    featuredServicesSubtitle: string;
    viewAllCategories: string;
    viewAllServices: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    transparencyTitle: string;
    transparencyDesc: string;
    transparencyBadgeVerified: string;
    transparencyBadgeReview: string;
  };
  footer: {
    aboutText: string;
    quickLinks: string;
    citizenHelplines: string;
    legalTrust: string;
    disclaimerNotice: string;
    copyright: string;
  };
  common: {
    loading: string;
    backHome: string;
    notFoundTitle: string;
    notFoundDesc: string;
    languageToggle: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    siteName: 'Seba Nexa BD',
    tagline: 'All Essential Services, One Place.',
    taglineBangla: 'All Essential Services Bangladesh, One Place.',
    nav: {
      home: 'Home',
      categories: 'Categories',
      services: 'All Services',
      govServices: 'Government Services',
      privateServices: 'Private Services',
      communityServices: 'Community Services',
      helplines: 'National Helplines',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      disclaimer: 'Disclaimer',
    },
    search: {
      placeholder: 'Search by service name, NID, passport, railway, 999, utility...',
      button: 'Search',
      quickTagsLabel: 'Popular Searches:',
      resultsFor: 'Search results for',
      foundServices: 'services found',
      clearSearch: 'Clear search',
      noResultsTitle: 'No matching services found',
      noResultsDesc: 'Try adjusting your search terms, removing filters, or searching in Bangla.',
      resetFilters: 'Reset all filters',
    },
    filters: {
      filterBy: 'Filter Services',
      allSectors: 'All Sectors',
      sector: 'Sector',
      government: 'Government',
      private: 'Private',
      community: 'Community',
      category: 'Category',
      allCategories: 'All Categories',
      verificationStatus: 'Verification Status',
      allVerification: 'All Statuses',
      verifiedOnly: 'Verified Only',
      reviewNeeded: 'Review Needed',
      sortBy: 'Sort By',
      sortPopular: 'Featured First',
      sortNameAsc: 'Name (A to Z)',
      sortNameDesc: 'Name (Z to A)',
      sortCategory: 'By Category',
      totalCount: 'Showing',
    },
    badges: {
      verified: 'Verified Official Portal',
      reviewNeeded: 'Review Needed / 3rd Party',
      unverified: 'Unverified Provider',
      government: 'Government',
      private: 'Private Sector',
      community: 'Community / NGO',
      featured: 'Featured',
    },
    serviceCard: {
      viewDetails: 'View Details',
      visitPortal: 'Visit Portal',
      helpline: 'Hotline',
      provider: 'Provider',
      requirements: 'Requirements',
    },
    serviceDetails: {
      overview: 'Service Overview & Procedure',
      officialProvider: 'Authorized Department / Entity',
      serviceCharter: 'Citizen Charter & Information',
      directPortalLink: 'Visit Official Portal Website',
      openExternalNotice: 'Opens the external official authority website in a secure new tab.',
      hotlineHelpline: 'Emergency & Inquiry Hotline',
      operatingHours: 'Service Hours & Availability',
      requiredDocuments: 'Prerequisites & Required Documents',
      verificationAudit: 'Verification & Integrity Audit',
      keywords: 'Search Keywords & Aliases',
      relatedServices: 'Related Services in this Category',
      backToServices: 'Back to all services',
      copyLink: 'Share Service',
      linkCopied: 'Link copied to clipboard!',
      externalDisclaimer: 'Please note: Seba Nexa BD links directly to third-party public and private portals. We do not process payments, store your credentials, or guarantee third-party server uptime.',
    },
    emergencyBanner: {
      title: 'Emergency Citizen Helplines (24/7 Toll-Free)',
      subtitle: 'Dial immediately for police, medical, fire emergency, child protection, or women safety.',
      callNow: 'Call Now',
    },
    home: {
      heroTitlePrefix: 'Bangladesh Essential Service Directory',
      heroTitleHighlight: 'All Essential Services, One Place.',
      heroSubtitle: 'Access verified government citizen portals, utility bill payments, emergency hotlines, and community health networks across Bangladesh.',
      statsHelpline: 'Emergency Lines',
      statsVerified: 'Verified Portals',
      statsSectors: 'Key Sectors',
      popularCategoriesTitle: 'Explore by Category',
      popularCategoriesSubtitle: 'Browse curated collections of public utilities, civil identity, transit, and social welfare portals.',
      featuredServicesTitle: 'Essential Citizen Services',
      featuredServicesSubtitle: 'Frequently accessed national portals and verified citizen charters.',
      viewAllCategories: 'Browse All Categories',
      viewAllServices: 'View Complete Directory',
      howItWorksTitle: 'Simple, Direct & Transparent',
      howItWorksSubtitle: 'How Seba Nexa BD helps citizens find reliable information in seconds.',
      step1Title: '1. Fast Search',
      step1Desc: 'Type in English or Bangla. Search by hotline number, department, or keyword.',
      step2Title: '2. Verify Requirements',
      step2Desc: 'Check prerequisites, fees, helpline numbers, and verification notes before visiting.',
      step3Title: '3. Direct Access',
      step3Desc: 'Navigate straight to the official authoritative portal with zero intermediary fees.',
      transparencyTitle: 'Data Verification & Transparency Commitment',
      transparencyDesc: 'We strictly distinguish between verified government domains and third-party commercial portals. We never inflate statistics, create fake ratings, or claim government affiliation.',
      transparencyBadgeVerified: 'Indicates the domain is an authentic institutional or .gov.bd website.',
      transparencyBadgeReview: 'Indicates a private aggregator or community initiative requiring user review.',
    },
    footer: {
      aboutText: 'Seba Nexa BD is an independent, non-governmental public digital directory built to provide transparent, structured, bilingual access to essential services in Bangladesh.',
      quickLinks: 'Navigation',
      citizenHelplines: 'National Helplines',
      legalTrust: 'Trust & Governance',
      disclaimerNotice: 'Disclaimer: Seba Nexa BD is an independent public discovery portal and is not affiliated with or endorsed by the Government of Bangladesh. All third-party trademarks and official portals belong to their respective authorities.',
      copyright: 'All rights reserved.',
    },
    common: {
      loading: 'Loading services directory...',
      backHome: 'Back to Home',
      notFoundTitle: 'Page Not Found (404)',
      notFoundDesc: 'The page or service you are looking for does not exist or has been moved.',
      languageToggle: 'বাংলা',
    },
  },
  bn: {
    siteName: 'সেবা নেক্সা বিডি',
    tagline: 'সকল প্রয়োজনীয় সেবা, এক ঠিকানায়।',
    taglineBangla: 'সকল প্রয়োজনীয় সেবা বাংলাদেশ, এক ঠিকানায়।',
    nav: {
      home: 'হোম',
      categories: 'ক্যাটাগরি',
      services: 'সকল সেবা',
      govServices: 'সরকারি সেবা',
      privateServices: 'বেসরকারি সেবা',
      communityServices: 'কমিউনিটি সেবা',
      helplines: 'জাতীয় হেল্পলাইন',
      about: 'আমাদের সম্পর্কে',
      contact: 'যোগাযোগ',
      privacy: 'গোপনীয়তা নীতি',
      disclaimer: 'দাবিত্যাগ',
    },
    search: {
      placeholder: 'সেবার নাম, এনআইডি, পাসপোর্ট, ট্রেন টিকিট, বিদ্যুৎ বিল, ৯৯৯ দিয়ে খুঁজুন...',
      button: 'অনুসন্ধান',
      quickTagsLabel: 'জনপ্রিয় অনুসন্ধান:',
      resultsFor: 'অনুসন্ধানের ফলাফল',
      foundServices: 'টি সেবা পাওয়া গেছে',
      clearSearch: 'অনুসন্ধান মুছুন',
      noResultsTitle: 'কোনো সেবা পাওয়া যায়নি',
      noResultsDesc: 'অনুগ্রহ করে ভিন্ন কোনো শব্দ বা কিওয়ার্ড দিয়ে চেষ্টা করুন অথবা ফিল্টার পরিবর্তন করুন।',
      resetFilters: 'সব ফিল্টার রিসেট করুন',
    },
    filters: {
      filterBy: 'ফিল্টার করুন',
      allSectors: 'সকল খাত',
      sector: 'খাত',
      government: 'সরকারি',
      private: 'বেসরকারি',
      community: 'কমিউনিটি / স্বেচ্ছাসেবী',
      category: 'ক্যাটাগরি',
      allCategories: 'সকল ক্যাটাগরি',
      verificationStatus: 'যাচাইকরণ স্ট্যাটাস',
      allVerification: 'সকল স্ট্যাটাস',
      verifiedOnly: 'শুধুমাত্র যাচাইকৃত',
      reviewNeeded: 'পর্যালোচনা প্রয়োজন',
      sortBy: 'ক্রমানুসারে সাজান',
      sortPopular: 'জনপ্রিয় সেবা আগে',
      sortNameAsc: 'নাম (অ থেকে ক্ষ)',
      sortNameDesc: 'নাম (উল্টো ক্রমানুসারে)',
      sortCategory: 'ক্যাটাগরি অনুযায়ী',
      totalCount: 'প্রদর্শিত হচ্ছে',
    },
    badges: {
      verified: 'যাচাইকৃত সরকারি/অফিসিয়াল পোর্টাল',
      reviewNeeded: 'পর্যালোচনা প্রয়োজন / ৩য় পক্ষ',
      unverified: 'অযাচাইকৃত প্রতিষ্ঠান',
      government: 'সরকারি খাত',
      private: 'বেসরকারি খাত',
      community: 'স্বেচ্ছাসেবী / এনজিও',
      featured: 'প্রয়োজনীয় সেবা',
    },
    serviceCard: {
      viewDetails: 'বিস্তারিত দেখুন',
      visitPortal: 'পোর্টালে যান',
      helpline: 'হটলাইন',
      provider: 'কর্তৃপক্ষ',
      requirements: 'প্রয়োজনীয় শর্ত',
    },
    serviceDetails: {
      overview: 'সেবা বিবরণ ও নিয়মাবলী',
      officialProvider: 'সংশ্লিষ্ট দপ্তর বা কর্তৃপক্ষ',
      serviceCharter: 'সিটিজেন চার্টার ও তথ্য',
      directPortalLink: 'অফিসিয়াল পোর্টাল ওয়েবসাইটে যান',
      openExternalNotice: 'একটি নিরাপদ নতুন ট্যাবে সংশ্লিষ্ট সরকারি বা প্রাতিষ্ঠানিক ওয়েবসাইটটি খুলবে।',
      hotlineHelpline: 'জরুরি অনুসন্ধান ও হেল্পলাইন',
      operatingHours: 'কার্যসময় ও অনলাইন প্রাপ্যতা',
      requiredDocuments: 'প্রয়োজনীয় কাগজপত্র ও যোগ্যতা',
      verificationAudit: 'যাচাইকরণ ও তথ্যের সত্যতা',
      keywords: 'অনুসন্ধান কিওয়ার্ড',
      relatedServices: 'একই ক্যাটাগরির অন্যান্য সেবা',
      backToServices: 'সব সেবায় ফিরে যান',
      copyLink: 'শেয়ার করুন',
      linkCopied: 'লিংক কপি করা হয়েছে!',
      externalDisclaimer: 'সতর্কতা: সেবা নেক্সা বিডি সরাসরি মূল সরকারি ও প্রাতিষ্ঠানিক পোর্টালে রিডাইরেক্ট করে। আমরা কোনো তথ্য বা পাসওয়ার্ড সংরক্ষণ করি না এবং কোনো ফি গ্রহণ করি না।',
    },
    emergencyBanner: {
      title: 'জাতীয় জরুরি হটলাইন (সার্বক্ষণিক টোল-ফ্রি)',
      subtitle: 'পুলিশ, ফায়ার সার্ভিস, অ্যাম্বুলেন্স, আইনি সহায়তা কিংবা স্বাস্থ্য পরামর্শের জন্য অবিলম্বে কল করুন।',
      callNow: 'কল করুন',
    },
    home: {
      heroTitlePrefix: 'বাংলাদেশ ডিজিটাল সেবা ডিরেক্টরি',
      heroTitleHighlight: 'সকল প্রয়োজনীয় সেবা, এক ঠিকানায়।',
      heroSubtitle: 'বাংলাদেশের সরকারি সিটিজেন পোর্টাল, বিদ্যুৎ ও ইউটিলিটি বিল, জরুরি হটলাইন এবং স্বেচ্ছাসেবী রক্তসেবার নির্ভরযোগ্য অফিশিয়াল লিংক ও নির্দেশিকা।',
      statsHelpline: 'জরুরি হেল্পলাইন',
      statsVerified: 'যাচাইকৃত পোর্টাল',
      statsSectors: 'প্রধান খাত',
      popularCategoriesTitle: 'ক্যাটাগরি অনুযায়ী খুঁজুন',
      popularCategoriesSubtitle: 'নাগরিক পরিচয়পত্র, ইউটিলিটি, পরিবহন, ভূমি ও স্বাস্থ্যসেবার নির্ভরযোগ্য পোর্টাল সমূহ।',
      featuredServicesTitle: 'সবচেয়ে প্রয়োজনীয় নাগরিক সেবাসমূহ',
      featuredServicesSubtitle: 'নিয়মিত ব্যবহৃত জাতীয় পোর্টাল ও সরকারি আবেদন লিংক।',
      viewAllCategories: 'সকল ক্যাটাগরি দেখুন',
      viewAllServices: 'সম্পূর্ণ ডিরেক্টরি দেখুন',
      howItWorksTitle: 'সহজ, প্রত্যক্ষ ও স্বচ্ছ',
      howItWorksSubtitle: 'সেবা নেক্সা বিডি কীভাবে নাগরিকদের প্রয়োজনীয় সরকারি পোর্টাল খুঁজে পেতে সাহায্য করে।',
      step1Title: '১. দ্রুত অনুসন্ধান',
      step1Desc: 'বাংলা বা ইংরেজিতে সেবার নাম, হটলাইন নম্বর বা মন্ত্রণালয়ের নাম লিখে তাৎক্ষণিক খুঁজুন।',
      step2Title: '২. নিয়ম ও শর্তাবলী জানুন',
      step2Desc: 'আবেদন করার আগে প্রয়োজনীয় কাগজপত্র, ফি ও হেল্পলাইন নিশ্চিত হয়ে নিন।',
      step3Title: '৩. সরাসরি অফিশিয়াল পোর্টালে যান',
      step3Desc: 'কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি মূল সরকারি বা প্রাতিষ্ঠানিক পোর্টালে সেবা নিন।',
      transparencyTitle: 'তথ্য যাচাইকরণ ও স্বচ্ছতা নীতি',
      transparencyDesc: 'আমরা প্রতিটি সেবার ডোমেইন সততা নিশ্চিত করি। কোনো ভুয়া রেটিং, অতিরঞ্জিত পরিসংখ্যান বা কৃত্রিম পর্যালোচনা যুক্ত করা হয় না।',
      transparencyBadgeVerified: 'সবুজ ব্যাজ নির্দেশ করে এটি সরকারি বা অফিশিয়াল অনুমোদিত ডোমেইন।',
      transparencyBadgeReview: 'হলুদ ব্যাজ নির্দেশ করে এটি বেসরকারি বা পর্যালোচনারত ৩য় পক্ষ।',
    },
    footer: {
      aboutText: 'সেবা নেক্সা বিডি একটি স্বাধীন নাগরিক উদ্যোগ যার লক্ষ্য বাংলাদেশের সকল প্রয়োজনীয় সরকারি, বেসরকারি ও মানবিক সেবাকে এক প্ল্যাটফর্মে নির্ভরযোগ্যভাবে উপস্থাপন করা।',
      quickLinks: 'নেভিগেশন',
      citizenHelplines: 'জাতীয় হেল্পলাইন',
      legalTrust: 'বিশ্বাসযোগ্যতা ও আইনি তথ্য',
      disclaimerNotice: 'দাবিত্যাগ: সেবা নেক্সা বিডি একটি স্বাধীন নির্দেশিকা পোর্টাল। এটি বাংলাদেশ সরকারের কোনো অঙ্গপ্রতিষ্ঠান নয়। সকল ট্রেডমার্ক ও সরকারি লোগো তাদের নিজ নিজ কর্তৃপক্ষের মালিকানাধীন।',
      copyright: 'সর্বস্বত্ব সংরক্ষিত।',
    },
    common: {
      loading: 'সেবা ডিরেক্টরি লোড হচ্ছে...',
      backHome: 'হোম পেজে ফিরুন',
      notFoundTitle: 'পৃষ্ঠাটি পাওয়া যায়নি (৪০৪)',
      notFoundDesc: 'আপনি যে পৃষ্ঠা বা সেবায় প্রবেশ করতে চেয়েছেন তা পরিবর্তিত হয়েছে বা সরিয়ে ফেলা হয়েছে।',
      languageToggle: 'English',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'seba_nexa_bd_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'bn') return saved;
    } catch {
      // Fallback
    }
    return 'bn'; // Default to Bengali for native Bangladesh citizen audience
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
