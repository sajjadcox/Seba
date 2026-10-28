/**
 * Dynamic SEO, OpenGraph, Twitter Cards, and Schema.org JSON-LD Manager
 * Designed specifically for Google Search indexing and social snippet rendering.
 */

import { Language } from '../types';
import { Route } from '../hooks/useRouter';
import { categorySlugMap, serviceSlugMap, subcategoryMap } from '../data/directoryData';
import { nationalHelplines } from '../data/nationalHelplines';

function setMetaTag(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function setStructuredData(jsonObj: Record<string, any>) {
  let script = document.getElementById('schema-jsonld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'schema-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonObj);
}

export function updatePageSEO(route: Route, language: Language, origin: string) {
  const isBn = language === 'bn';
  const siteName = 'Seba Nexa BD';
  const canonicalUrl = `${origin}${window.location.pathname}`;

  let title = `${siteName} — ${isBn ? 'সকল প্রয়োজনীয় সেবা, এক ঠিকানায়' : 'All Essential Services, One Place'}`;
  let description = isBn
    ? 'বাংলাদেশ সরকারের নাগরিক সেবা, পাসপোর্ট, এনআইডি, ইউটিলিটি বিল, ড্রাইভিং লাইসেন্স এবং জরুরি হেল্পলাইনের নির্ভরযোগ্য নির্দেশিকা।'
    : 'Comprehensive Bangladesh service directory for essential government citizen portals, utility bills, emergency helplines, and verified portals.';
  let ogType = 'website';
  let structuredData: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: origin,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${origin}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    description,
  };

  if (route.name === 'home') {
    title = `${siteName} — ${isBn ? 'সকল প্রয়োজনীয় সেবা, এক ঠিকানায় | বাংলাদেশ সেবা ডিরেক্টরি' : 'All Essential Services, One Place | Bangladesh Service Directory'}`;
  } else if (route.name === 'categories') {
    title = `${isBn ? 'সেবা ক্যাটাগরি ও সেক্টর' : 'Service Categories & Sectors'} | ${siteName}`;
    description = isBn
      ? 'বাংলাদেশ নাগরিক সেবা, ইউটিলিটি, ভূমি, পরিচয়পত্র ও আইনগত সেবাসমূহের পূর্ণাঙ্গ ক্যাটাগরি তালিকা।'
      : 'Browse structured collections of citizen services, utility providers, transit bookings, and social welfare portals.';
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: canonicalUrl,
    };
  } else if (route.name === 'category') {
    const cat = categorySlugMap.get(route.slug);
    if (cat) {
      const catName = cat.name[language] || cat.name.en;
      const catDesc = cat.description[language] || cat.description.en;
      title = `${catName} | ${isBn ? 'নাগরিক সেবা' : 'Services'} | ${siteName}`;
      description = catDesc || description;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: catName,
        description: catDesc,
        url: canonicalUrl,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
            { '@type': 'ListItem', position: 2, name: 'Categories', item: `${origin}/categories` },
            { '@type': 'ListItem', position: 3, name: catName, item: canonicalUrl },
          ],
        },
      };
    }
  } else if (route.name === 'services') {
    title = `${isBn ? 'সকল সেবা ডিরেক্টরি' : 'All Essential Services Directory'} | ${siteName}`;
    description = isBn
      ? 'বাংলাদেশের ২৪০+ সরকারি ও অনুমোদিত বেসরকারি সেবার পূর্ণ তালিকা, অফিশিয়াল লিংক ও গাইডলাইন।'
      : 'Complete list of 240+ verified government and licensed citizen services in Bangladesh.';
  } else if (route.name === 'service') {
    const srv = serviceSlugMap.get(route.slug);
    if (srv) {
      const srvName = srv.name[language] || srv.name.en;
      const srvDesc = srv.description[language] || srv.description.en;
      const org = srv.organization ? (srv.organization[language] || srv.organization.en) : 'Government of Bangladesh';
      title = `${srvName} — ${isBn ? 'সরকারি নাগরিক সেবা' : 'Official Service'} | ${siteName}`;
      description = srvDesc ? srvDesc.slice(0, 160) : description;
      ogType = 'article';

      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: srvName,
        description: srvDesc,
        provider: {
          '@type': 'GovernmentOrganization',
          name: org,
        },
        serviceType: srv.serviceType || 'CitizenService',
        areaServed: {
          '@type': 'Country',
          name: 'Bangladesh',
        },
        url: srv.officialUrl || canonicalUrl,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${origin}/services` },
            { '@type': 'ListItem', position: 3, name: srvName, item: canonicalUrl },
          ],
        },
      };
    }
  } else if (route.name === 'helplines') {
    title = `${isBn ? 'জাতীয় হেল্পলাইন ও জরুরি নম্বর (৯৯৯, ৩৩৩)' : 'National Helplines of Bangladesh (999, 333)'} | ${siteName}`;
    description = isBn
      ? 'পুলিশ, ফায়ার সার্ভিস, স্বাস্থ্য বাতায়ন, নারী নির্যাতন ও ভূমি সেবার সকল অফিশিয়াল টোল-ফ্রি জরুরি নম্বর।'
      : 'Verified official national emergency hotlines for police, fire, health telemedicine, and citizen services in Bangladesh.';
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: title,
      description,
      url: canonicalUrl,
      mainEntity: nationalHelplines.slice(0, 10).map((h) => ({
        '@type': 'ContactPoint',
        telephone: h.number,
        contactType: h.title.en,
        areaServed: 'BD',
        availableLanguage: ['Bengali', 'English'],
      })),
    };
  } else if (route.name === 'search') {
    title = `${isBn ? 'অনুসন্ধানের ফলাফল' : 'Search Results'}: "${route.query}" | ${siteName}`;
    description = isBn
      ? `"${route.query}" সম্পর্কিত সকল প্রয়োজনীয় সেবা ও সরকারি পোর্টাল অনুসন্ধান ফলাফল।`
      : `Search results and directory listings matching "${route.query}" in Bangladesh.`;
  } else if (route.name === 'about') {
    title = `${isBn ? 'আমাদের সম্পর্কে' : 'About Us'} | ${siteName}`;
    description = isBn
      ? 'সেবা নেক্সা বিডি একটি স্বতন্ত্র অরাজনৈতিক নাগরিক ডিরেক্টরি। আমাদের লক্ষ্য ও যাচাইকরণ পদ্ধতি জানুন।'
      : 'Seba Nexa BD is an independent public digital directory for essential citizen services in Bangladesh.';
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: title,
      description,
      url: canonicalUrl,
    };
  } else if (route.name === 'contact') {
    title = `${isBn ? 'যোগাযোগ ও তথ্য পরামর্শ' : 'Contact & Feedback'} | ${siteName}`;
    description = isBn
      ? 'সেবা নেক্সা বিডি টিমের সাথে যোগাযোগ করুন, তথ্যের ভুল রিপোর্ট করুন বা নতুন সেবা প্রস্তাব করুন।'
      : 'Contact Seba Nexa BD to recommend portal link updates, report inaccuracies, or share suggestions.';
  } else if (route.name === 'privacy') {
    title = `${isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'} | ${siteName}`;
  } else if (route.name === 'disclaimer') {
    title = `${isBn ? 'দাবিত্যাগ ও পাবলিক নোটিশ' : 'Disclaimer & Public Notice'} | ${siteName}`;
  }

  // Update HTML Document Head
  document.title = title;
  setMetaTag('description', description);
  setMetaTag('robots', 'index, follow');
  setMetaTag('og:title', title, true);
  setMetaTag('og:description', description, true);
  setMetaTag('og:url', canonicalUrl, true);
  setMetaTag('og:type', ogType, true);
  setMetaTag('og:site_name', siteName, true);
  setMetaTag('og:locale', isBn ? 'bn_BD' : 'en_US', true);
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', title);
  setMetaTag('twitter:description', description);
  setCanonical(canonicalUrl);

  // Set Schema.org JSON-LD
  setStructuredData(structuredData);
}
