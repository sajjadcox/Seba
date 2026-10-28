export interface NationalHelpline {
  number: string;
  title: {
    en: string;
    bn: string;
  };
  organization: {
    en: string;
    bn: string;
  };
  category: 'emergency' | 'citizen' | 'health' | 'land' | 'legal' | 'complaints' | 'agriculture' | 'utilities' | 'transport';
  tollFree: boolean;
  hours: {
    en: string;
    bn: string;
  };
  description: {
    en: string;
    bn: string;
  };
}

export const nationalHelplines: NationalHelpline[] = [
  {
    number: '999',
    title: {
      en: 'National Emergency Service (Police, Fire, Ambulance)',
      bn: 'জাতীয় জরুরি সেবা (পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স)',
    },
    organization: {
      en: 'Bangladesh Police, Ministry of Home Affairs',
      bn: 'বাংলাদেশ পুলিশ, স্বরাষ্ট্র মন্ত্রণালয়',
    },
    category: 'emergency',
    tollFree: true,
    hours: {
      en: '24 Hours / 7 Days (Continuous)',
      bn: '২৪ ঘণ্টা / ৭ দিন (সার্বক্ষণিক)',
    },
    description: {
      en: 'Emergency immediate dispatch for police assistance, fire accidents, rescue operations, and urgent medical ambulance services.',
      bn: 'যেকোনো অপরাধ, দুর্ঘটনা, অগ্নিকাণ্ড ও মুমূর্ষু রোগীর অ্যাম্বুলেন্সের জরুরি প্রয়োজনে দেশব্যাপী তাৎক্ষণিক সহায়তা।',
    },
  },
  {
    number: '333',
    title: {
      en: 'National Citizen Information & Social Problem Helpline',
      bn: 'জাতীয় তথ্য ও নাগরিক সেবা হেল্পলাইন',
    },
    organization: {
      en: 'a2i, ICT Division & Cabinet Division',
      bn: 'এটুআই, আইসিটি বিভাগ ও মন্ত্রিপরিষদ বিভাগ',
    },
    category: 'citizen',
    tollFree: true,
    hours: {
      en: '24 Hours / 7 Days',
      bn: '২৪ ঘণ্টা / ৭ দিন',
    },
    description: {
      en: 'Information on government services, district administration support, disaster relief, reporting child marriage, and public grievances.',
      bn: 'সরকারি সেবার তথ্য, কর্মকর্তা তথ্য, ভেজাল বিরোধী অভিযোগ, সামাজিক সমস্যা ও বাল্যবিয়ে প্রতিরোধের নাগরিক কল সেন্টার।',
    },
  },
  {
    number: '109',
    title: {
      en: 'National Helpline for Prevention of Violence Against Women & Children',
      bn: 'নারী ও শিশু নির্যাতন প্রতিরোধে জাতীয় হেল্পলাইন',
    },
    organization: {
      en: 'Ministry of Women and Children Affairs',
      bn: 'মহিলা ও শিশু বিষয়ক মন্ত্রণালয়',
    },
    category: 'emergency',
    tollFree: true,
    hours: {
      en: '24 Hours / 7 Days',
      bn: '২৪ ঘণ্টা / ৭ দিন',
    },
    description: {
      en: 'Emergency intervention to prevent domestic violence, child marriage, harassment, and provide psychosocial counseling and shelter.',
      bn: 'পারিবারিক নির্যাতন, বাল্যবিয়ে, যৌন হয়রানি ও সহিংসতা প্রতিরোধে তাৎক্ষণিক উদ্ধার ও আইনি সহায়তার টোল-ফ্রি হেল্পলাইন।',
    },
  },
  {
    number: '1098',
    title: {
      en: 'Child Helpline (Protection of Children in Danger)',
      bn: 'চাইল্ড হেল্পলাইন (বিপদগ্রস্ত শিশুর জরুরি সহায়তা)',
    },
    organization: {
      en: 'Department of Social Services (DSS)',
      bn: 'সমাজসেবা অধিদপ্তর',
    },
    category: 'emergency',
    tollFree: true,
    hours: {
      en: '24 Hours / 7 Days',
      bn: '২৪ ঘণ্টা / ৭ দিন',
    },
    description: {
      en: 'Rescue and rehabilitation for lost children, child laborers, victims of abuse, and children at risk.',
      bn: 'নিখোঁজ শিশু, ঝুঁকিপূর্ণ শিশুশ্রমিক এবং বিপদে পড়া শিশুদের তাৎক্ষণিক উদ্ধার ও পুনর্বাসন সহায়তা।',
    },
  },
  {
    number: '16263',
    title: {
      en: 'Shastho Batayon (24/7 Registered Doctor Medical Advice)',
      bn: 'স্বাস্থ্য বাতায়ন (২৪ ঘণ্টা অভিজ্ঞ ডাক্তার পরামর্শ)',
    },
    organization: {
      en: 'Directorate General of Health Services (DGHS)',
      bn: 'স্বাস্থ্য অধিদপ্তর, স্বাস্থ্য মন্ত্রণালয়',
    },
    category: 'health',
    tollFree: false,
    hours: {
      en: '24 Hours / 7 Days',
      bn: '২৪ ঘণ্টা / ৭ দিন',
    },
    description: {
      en: 'Round-the-clock live consultation with registered MBBS physicians, hospital referrals, and telemedicine advice.',
      bn: '২৪ ঘণ্টা সরাসরি রেজিস্টার্ড চিকিৎসকের প্রাথমিক স্বাস্থ্য পরামর্শ, সরকারি হাসপাতালের তথ্য ও অভিযোগ জানানোর মাধ্যম।',
    },
  },
  {
    number: '16122',
    title: {
      en: 'Smart Land Service Citizen Hotline',
      bn: 'স্মার্ট ভূমি সেবা হটলাইন',
    },
    organization: {
      en: 'Ministry of Land',
      bn: 'ভূমি মন্ত্রণালয়',
    },
    category: 'land',
    tollFree: false,
    hours: {
      en: '9:00 AM - 5:00 PM (Working days)',
      bn: 'সকাল ৯টা - বিকাল ৫টা (কার্যদিবস)',
    },
    description: {
      en: 'Guidance and inquiries for online Khatiyan (e-Porcha), e-Mutation (Namjari), and Land Development Tax (LD Tax).',
      bn: 'অনলাইনে খতিয়ান/পর্চা অনুসন্ধান, নামজারি আবেদন ও ভূমি উন্নয়ন কর পরিশোধ সংক্রান্ত যেকোনো পরামর্শ ও অভিযোগ।',
    },
  },
  {
    number: '16430',
    title: {
      en: 'National Legal Aid Services Toll-Free Helpline',
      bn: 'জাতীয় আইনগত সহায়তা (লিগ্যাল এইড) টোল-ফ্রি হেল্পলাইন',
    },
    organization: {
      en: 'National Legal Aid Services Organization (NLASO), Law Ministry',
      bn: 'জাতীয় আইনগত সহায়তা প্রদান সংস্থা, আইন ও বিচার বিভাগ',
    },
    category: 'legal',
    tollFree: true,
    hours: {
      en: '9:00 AM - 5:00 PM (Working days)',
      bn: 'সকাল ৯টা - বিকাল ৫টা (কার্যদিবস)',
    },
    description: {
      en: 'Free legal consultation and state-sponsored court advocate assistance for indigent and financially challenged citizens.',
      bn: 'আর্থিক অসচ্ছল ও অসহায় নাগরিকদের জন্য সরকারি খরচে নিখরচায় আইনজীবী সহায়তা ও আইনি পরামর্শ।',
    },
  },
  {
    number: '106',
    title: {
      en: 'Anti-Corruption Commission (ACC / দুদক) Helpline',
      bn: 'দুর্নীতি দমন কমিশন (দুদক) অভিযোগ হটলাইন',
    },
    organization: {
      en: 'Anti-Corruption Commission (ACC)',
      bn: 'দুর্নীতি দমন কমিশন (দুদক)',
    },
    category: 'complaints',
    tollFree: true,
    hours: {
      en: '9:00 AM - 5:00 PM (Working days)',
      bn: 'সকাল ৯টা - বিকাল ৫টা (কার্যদিবস)',
    },
    description: {
      en: 'Direct reporting of bribery, corruption, harassment, and irregularities in public offices to ACC rapid response teams.',
      bn: 'সরকারি অফিসে ঘুষ গ্রহণ, ক্ষমতার অপব্যবহার ও দুর্নীতির ঘটনা সরাসরি দুদকের টিমকে জানানোর টোল-ফ্রি নম্বর।',
    },
  },
  {
    number: '105',
    title: {
      en: 'National Identity Card (NID) & Election Helpline',
      bn: 'জাতীয় পরিচয়পত্র ও নির্বাচন কমিশন হেল্পলাইন',
    },
    organization: {
      en: 'Election Commission Bangladesh (NIDW)',
      bn: 'বাংলাদেশ নির্বাচন কমিশন (এনআইডি অনুবিভাগ)',
    },
    category: 'citizen',
    tollFree: false,
    hours: {
      en: '9:00 AM - 5:00 PM (Working days)',
      bn: 'সকাল ৯টা - বিকাল ৫টা (কার্যদিবস)',
    },
    description: {
      en: 'Assistance for voter registration, NID profile corrections, smart card status, and lost card reissuance.',
      bn: 'ভোটার তালিকা অন্তর্ভুক্তি, এনআইডি তথ্য সংশোধন, স্মার্টকার্ড ডেলিভারি ও হারানো কার্ড উত্তোলনের তথ্য।',
    },
  },
  {
    number: '16121',
    title: {
      en: 'National Consumer Rights Protection Helpline',
      bn: 'জাতীয় ভোক্তা অধিকার সংরক্ষণ হটলাইন',
    },
    organization: {
      en: 'Directorate of National Consumer Rights Protection (DNCRP)',
      bn: 'জাতীয় ভোক্তা-অধিকার সংরক্ষণ অধিদপ্তর',
    },
    category: 'complaints',
    tollFree: false,
    hours: {
      en: '9:00 AM - 5:00 PM (Working days)',
      bn: 'সকাল ৯টা - বিকাল ৫টা (কার্যদিবস)',
    },
    description: {
      en: 'Lodge complaints against overpricing, adulterated goods, false advertising, and merchant fraud.',
      bn: 'পণ্য বা সেবায় প্রতারণা, অতিরিক্ত মূল্য ও ভেজালের বিরুদ্ধে অভিযোগ দায়ের। প্রমাণিত হলে ২৫% পুরস্কার প্রদান।',
    },
  },
  {
    number: '16123',
    title: {
      en: 'Krishi Batayon & Agriculture Specialist Helpline',
      bn: 'কৃষি বাতায়ন ও কৃষক সেবা হেল্পলাইন',
    },
    organization: {
      en: 'Department of Agricultural Extension (DAE)',
      bn: 'কৃষি সম্প্রসারণ অধিদপ্তর, কৃষি মন্ত্রণালয়',
    },
    category: 'agriculture',
    tollFree: false,
    hours: {
      en: '9:00 AM - 5:00 PM (Working days)',
      bn: 'সকাল ৯টা - বিকাল ৫টা (কার্যদিবস)',
    },
    description: {
      en: 'Live consultation with certified agricultural officers regarding plant diseases, pest control, irrigation, and fertilizers.',
      bn: 'ফসলের রোগবালাই দমন, সার প্রয়োগ ও আধুনিক চাষাবাদ বিষয়ে কৃষি বিশেষজ্ঞদের সরাসরি পরামর্শ সেবা।',
    },
  },
  {
    number: '16445',
    title: {
      en: 'Department of Immigration & e-Passport Helpline',
      bn: 'ই-পাসপোর্ট ও ইমিগ্রেশন হেল্পলাইন',
    },
    organization: {
      en: 'Department of Immigration and Passports (DIP)',
      bn: 'ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর',
    },
    category: 'citizen',
    tollFree: false,
    hours: {
      en: '9:00 AM - 5:00 PM (Working days)',
      bn: 'সকাল ৯টা - বিকাল ৫টা (কার্যদিবস)',
    },
    description: {
      en: 'Information regarding online e-Passport applications, fees, appointment slots, and delivery tracking.',
      bn: 'ই-পাসপোর্ট আবেদন, সরকারি ফি, অ্যাপয়েন্টমেন্ট তারিখ ও পাসপোর্ট ডেলিভারি সম্পর্কিত তথ্য অনুসন্ধান।',
    },
  },
  {
    number: '16575',
    title: {
      en: 'NBR Income Tax & e-Return Citizen Helpline',
      bn: 'এনবিআর আয়কর ও অনলাইন রিটার্ন হেল্পলাইন',
    },
    organization: {
      en: 'National Board of Revenue (NBR)',
      bn: 'জাতীয় রাজস্ব বোর্ড (এনবিআর)',
    },
    category: 'citizen',
    tollFree: false,
    hours: {
      en: '9:00 AM - 5:00 PM (Working days)',
      bn: 'সকাল ৯টা - বিকাল ৫টা (কার্যদিবস)',
    },
    description: {
      en: 'Step-by-step assistance for individual online tax return filing, e-TIN queries, and tax rebate calculation.',
      bn: 'অনলাইনে আয়কর রিটার্ন দাখিল (e-Return), ই-টিন গ্রহণ ও আয়কর জমার নিয়মাবলী সংক্রান্ত গ্রাহক সেবা।',
    },
  },
  {
    number: '16999',
    title: {
      en: 'Central Electricity Complaint & Service Helpline',
      bn: 'কেন্দ্রীয় বিদ্যুৎ সেবা ও অভিযোগ হেল্পলাইন',
    },
    organization: {
      en: 'Power Division, Ministry of Power, Energy and Mineral Resources',
      bn: 'বিদ্যুৎ বিভাগ, বিদ্যুৎ ও জ্বালানি মন্ত্রণালয়',
    },
    category: 'utilities',
    tollFree: false,
    hours: {
      en: '24 Hours / 7 Days',
      bn: '২৪ ঘণ্টা / ৭ দিন',
    },
    description: {
      en: 'Unified electricity complaint line for DESCO, DPDC, BREB (Polli Bidyut), BPDB, WZPDCL, and NESCO customers.',
      bn: 'দেশের সকল বিদ্যুৎ বিতরণ সংস্থা (ডেসকো, ডিপিডিসি, পল্লী বিদ্যুৎ ও নেসকো)-র বিদ্যুৎ বিভ্রান্তি ও মিটার অভিযোগ।',
    },
  },
  {
    number: '1090',
    title: {
      en: 'Disaster Early Warning & Weather Alert IVR',
      bn: 'দুর্যোগের আগাম সতর্কবার্তা আইভিআর',
    },
    organization: {
      en: 'Department of Disaster Management (DDM)',
      bn: 'দুর্যোগ ব্যবস্থাপনা অধিদপ্তর',
    },
    category: 'emergency',
    tollFree: true,
    hours: {
      en: '24 Hours / 7 Days (Automated Voice)',
      bn: '২৪ ঘণ্টা / ৭ দিন (ভয়েস আইভিআর)',
    },
    description: {
      en: 'Automated sea cyclone signals, flood alerts, tidal surge forecasts, and seasonal weather bulletins.',
      bn: 'সমুদ্রের সতর্ক সংকেত, সাইক্লোন ট্র্যাকিং ও নদী অববাহিকার বন্যার আগাম সতর্কবার্তা জানতে ডায়াল করুন।',
    },
  },
  {
    number: '16135',
    title: {
      en: 'Probashi Kallyan & BMET Expatriate Helpline',
      bn: 'প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান হেল্পলাইন',
    },
    organization: {
      en: 'Ministry of Expatriates’ Welfare and Overseas Employment / BMET',
      bn: 'প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয় / বিএমইটি',
    },
    category: 'citizen',
    tollFree: false,
    hours: {
      en: '9:00 AM - 6:00 PM',
      bn: 'সকাল ৯টা - সন্ধ্যা ৬টা',
    },
    description: {
      en: 'Support for overseas workers, BMET biometric card, visa verification, wage earners welfare fund, and repatriation.',
      bn: 'প্রবাসী কর্মী নিবন্ধন, বিএমইটি স্মার্টকার্ড, প্রবাসে আইনি সহায়তা ও ওয়েজ আর্নার্স কল্যাণ সংক্রান্ত সেবা।',
    },
  },
  {
    number: '131',
    title: {
      en: 'Bangladesh Railway Information & Hotline',
      bn: 'বাংলাদেশ রেলওয়ে হটলাইন ও ট্রেন তথ্য',
    },
    organization: {
      en: 'Bangladesh Railway, Ministry of Railways',
      bn: 'বাংলাদেশ রেলওয়ে, রেলপথ মন্ত্রণালয়',
    },
    category: 'transport',
    tollFree: false,
    hours: {
      en: '6:00 AM - 11:00 PM',
      bn: 'সকাল ৬টা - রাত ১১টা',
    },
    description: {
      en: 'Train schedule inquiry, train tracking, seat availability, and online e-ticket booking support.',
      bn: 'আন্তঃনগর ট্রেনের সময়সূচি, বিলম্ব তথ্য, আসন খালি থাকার বিবরণ ও ই-টিকিট সাপোর্ট ডেস্ক।',
    },
  },
  {
    number: '100',
    title: {
      en: 'BTRC Telecom Consumer Grievance Helpline',
      bn: 'বিটিআরসি টেলিকম গ্রাহক অভিযোগ হেল্পলাইন',
    },
    organization: {
      en: 'Bangladesh Telecommunication Regulatory Commission (BTRC)',
      bn: 'বাংলাদেশ টেলিযোগাযোগ নিয়ন্ত্রণ কমিশন (বিটিআরসি)',
    },
    category: 'complaints',
    tollFree: true,
    hours: {
      en: '9:00 AM - 5:00 PM (Working days)',
      bn: 'সকাল ৯টা - বিকাল ৫টা (কার্যদিবস)',
    },
    description: {
      en: 'Complaints against mobile operators, illegal VoIP, SMS spam, sim card disputes, and broadband internet disruption.',
      bn: 'মোবাইল নেটওয়ার্ক, অতিরিক্ত কলরেট, ইন্টারনেটের গতি সমস্যা ও ভুয়া এসএমএসের বিরুদ্ধে বিটিআরসি অভিযোগ নম্বর।',
    },
  },
  {
    number: '102',
    title: {
      en: 'Fire Service & Civil Defence Central Control Room',
      bn: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স কেন্দ্রীয় নিয়ন্ত্রণ কক্ষ',
    },
    organization: {
      en: 'Fire Service and Civil Defence Directorate',
      bn: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স অধিদপ্তর',
    },
    category: 'emergency',
    tollFree: false,
    hours: {
      en: '24 Hours / 7 Days',
      bn: '২৪ ঘণ্টা / ৭ দিন',
    },
    description: {
      en: 'Urgent reporting of building fires, chemical accidents, building collapse, and emergency water rescue.',
      bn: 'অগ্নিকাণ্ড, ভবন ধস, গ্যাস লিকেজ ও পানিতে ডোবা ব্যক্তির জরুরি উদ্ধার তৎপরতার সরাসরি নিয়ন্ত্রণ কক্ষ।',
    },
  },
];
