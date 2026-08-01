'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation data
const translations: Record<string, Record<string, string>> = {
  en: {
    'emergency-header-911': 'Emergency',
    'emergency-header-mdrrmo': 'MDRRMO',
    'emergency-header-pnp': 'Police',
    'emergency-header-bfp': 'Fire',
    'emergency-header-rhu': 'RHU–MHO',
    'emergency-header-coast-guard': 'Coast Guard',
    'emergency-header-lumc': 'LUMC',
    'emergency-header-luelco': 'LUELCO',
    'emergency-directory-subtitle': 'Tap any number to call the appropriate emergency service.',
    'emergency-directory-updated': 'Last updated: July 29, 2026',
    'emergency-network-smart': 'Smart',
    'emergency-network-globe': 'Globe',
    'emergency-network-landline': 'Landline',
    'emergency-network-mobile': 'Mobile',
    'emergency-network-emergency': 'Emergency',
    'emergency-agency-mdrrmo-agoo': 'MDRRMO – Agoo',
    'emergency-description-mdrrmo-agoo': 'Disaster and emergency response',
    'emergency-agency-rhu-mho-agoo': 'Agoo RHU–MHO',
    'emergency-description-rhu-mho-agoo': 'Health concerns',
    'emergency-agency-bfp-agoo': 'BFP – Agoo Station',
    'emergency-description-bfp-agoo': 'Fire safety and other emergencies',
    'emergency-agency-pnp-agoo': 'PNP – Agoo Station',
    'emergency-description-pnp-agoo': 'Peace, order, and security',
    'emergency-agency-coast-guard-agoo': 'Coast Guard – Agoo',
    'emergency-description-coast-guard-agoo': 'Coastal safety and emergencies',
    'emergency-agency-lumc': 'La Union Medical Center (LUMC)',
    'emergency-description-lumc': 'Hospital and health concerns',
    'emergency-agency-luelco': 'LUELCO',
    'emergency-description-luelco': 'Electrical safety concerns',
    'emergency-agency-pdrrmo-la-union': 'La Union PDRRMO / Rescue 911',
    'emergency-description-pdrrmo-la-union': 'Provincial emergency response',
    'contact-agoo-municipal-hall-address':
      'Agoo Municipal Hall, Cases Boulevard, Agoo, La Union 2504',

    // Agoo barangays
    'gov-brgy-ambitacay': 'Ambitacay',
    'gov-brgy-balawarte': 'Balawarte',
    'gov-brgy-capas': 'Capas',
    'gov-brgy-consolacion': 'Consolacion',
    'gov-brgy-macalva-central': 'Macalva Central',
    'gov-brgy-macalva-norte': 'Macalva Norte',
    'gov-brgy-macalva-sur': 'Macalva Sur',
    'gov-brgy-nazareno': 'Nazareno',
    'gov-brgy-purok': 'Purok',
    'gov-brgy-san-agustin-east': 'San Agustin East',
    'gov-brgy-san-agustin-norte': 'San Agustin Norte',
    'gov-brgy-san-agustin-sur': 'San Agustin Sur',
    'gov-brgy-san-antonino': 'San Antonino',
    'gov-brgy-san-antonio': 'San Antonio',
    'gov-brgy-san-francisco': 'San Francisco',
    'gov-brgy-san-isidro': 'San Isidro',
    'gov-brgy-san-joaquin-norte': 'San Joaquin Norte',
    'gov-brgy-san-joaquin-sur': 'San Joaquin Sur',
    'gov-brgy-san-jose-norte': 'San Jose Norte',
    'gov-brgy-san-jose-sur': 'San Jose Sur',
    'gov-brgy-san-juan': 'San Juan',
    'gov-brgy-san-julian-central': 'San Julian Central',
    'gov-brgy-san-julian-east': 'San Julian East',
    'gov-brgy-san-julian-norte': 'San Julian Norte',
    'gov-brgy-san-julian-west': 'San Julian West',
    'gov-brgy-san-manuel-norte': 'San Manuel Norte',
    'gov-brgy-san-manuel-sur': 'San Manuel Sur',
    'gov-brgy-san-marcos': 'San Marcos',
    'gov-brgy-san-miguel': 'San Miguel',
    'gov-brgy-san-nicolas-central': 'San Nicolas Central',
    'gov-brgy-san-nicolas-east': 'San Nicolas East',
    'gov-brgy-san-nicolas-norte': 'San Nicolas Norte',
    'gov-brgy-san-nicolas-sur': 'San Nicolas Sur',
    'gov-brgy-san-nicolas-west': 'San Nicolas West',
    'gov-brgy-san-pedro': 'San Pedro',
    'gov-brgy-san-roque-east': 'San Roque East',
    'gov-brgy-san-roque-west': 'San Roque West',
    'gov-brgy-san-vicente-norte': 'San Vicente Norte',
    'gov-brgy-san-vicente-sur': 'San Vicente Sur',
    'gov-brgy-santa-ana': 'Santa Ana',
    'gov-brgy-santa-barbara': 'Santa Barbara',
    'gov-brgy-santa-fe': 'Santa Fe',
    'gov-brgy-santa-maria': 'Santa Maria',
    'gov-brgy-santa-monica': 'Santa Monica',
    'gov-brgy-santa-rita': 'Santa Rita',
    'gov-brgy-santa-rita-east': 'Santa Rita East',
    'gov-brgy-santa-rita-norte': 'Santa Rita Norte',
    'gov-brgy-santa-rita-sur': 'Santa Rita Sur',
    'gov-brgy-santa-rita-west': 'Santa Rita West',

    // Navigation
    'nav-home': 'Home',
    'nav-history': 'Brief History',
    'nav-services': 'Services',
    'nav-government': 'Government',
    'nav-statistics': 'Statistics',
    'nav-legislative': 'Legislative',
    'nav-transparency': 'Transparency',
    'nav-contact': 'Contact',

    // Appointment CTA
    'appointment-cta-heading': "Enhancing Appointment Services of LGU Agoo Mayor's Office",
    'appointment-cta-subtitle': 'No lines. No back-and-forth. Just efficient appointments.',
    'appointment-schedule-btn': 'Schedule Appointment',
    'appointment-create-btn': 'Create Account',

    // Hero Section
    'hero-welcome': 'Welcome to BetterAgoo.org',
    'hero-subtitle':
      'Access government services, information, and resources for the people of Agoo, La Union.',
    'hero-find-service': 'Find a Service',

    // Popular Services
    'section-popular': 'Popular Services',
    'service-certificates': 'Certificates',
    'service-certificates-desc': 'Birth, marriage, death certificates',
    'service-business': 'Business Permits',
    'service-business-desc': 'New permits and renewals',
    'service-tax': 'Tax Payments',
    'service-tax-desc': 'Property and business taxes',
    'service-social': 'Social Services',
    'service-social-desc': 'Senior citizen & PWD services',
    'service-health': 'Health Services',
    'service-health-desc': 'Medical assistance & programs',
    'btn-view-all-services': 'View All Services',

    // Latest Updates
    'section-updates': 'Latest Updates',
    'btn-view-all': 'View All',

    // Municipal Leadership
    'section-leadership': 'Municipal Leadership',
    'title-mayor': 'Municipal Mayor',
    'title-vice-mayor': 'Municipal Vice Mayor',
    'btn-view-officials': 'View All Officials',

    // Contact Section
    'section-contact': 'Contact Information',
    'contact-phone': 'Phone',
    'contact-email': 'Email',
    'contact-address': 'Address',
    'contact-hours': 'Mon-Fri: 8:00 AM - 5:00 PM',
    'contact-response': "We'll respond within 24 hours",
    'contact-municipal-hall': 'Municipal Hall',

    // Services Page
    'services-title': 'Municipal Services Directory',
    'services-subtitle': 'Browse all services offered by the Municipality of Agoo',
    'life-events-title': 'Browse by Life Event',
    'life-events-subtitle': "Find services based on what's happening in your life",
    'life-starting-business': 'Starting a Business',
    'life-getting-married': 'Getting Married',
    'life-having-baby': 'Having a Baby',
    'life-financial-help': 'Need Financial Help',
    'life-senior': 'Senior Citizen Services',
    'life-pwd': 'Person with Disability',
    'life-building': 'Building/Home Improvement',
    'life-trouble': 'Got in Trouble',

    // Service Categories
    'cat-certificates': 'Certificates & Vital Records',
    'cat-certificates-desc': 'Birth, death, marriage certificates, and other vital records.',
    'cat-business': 'Business & Trade',
    'cat-business-desc': 'Business permits, licenses, and trade registration services.',
    'cat-social': 'Social Services',
    'cat-social-desc':
      'Welfare programs, senior citizen services, PWD benefits, and financial aid.',
    'cat-health': 'Health & Wellness',
    'cat-health-desc': 'Vaccination programs, health certificates, and medical assistance.',
    'cat-tax': 'Taxation & Payments',
    'cat-tax-desc': 'Property tax, business tax, payments, and tax clearance.',
    'cat-agriculture': 'Agriculture',
    'cat-agriculture-desc':
      'Agricultural loans, crop insurance, fertilizer assistance, and training.',
    'cat-infrastructure': 'Infrastructure',
    'cat-infrastructure-desc':
      'Construction permits, road maintenance requests, and public facilities.',
    'cat-education': 'Education & Scholarship',
    'cat-education-desc': 'Scholarship programs, student assistance, and educational grants.',
    'cat-safety': 'Public Safety',
    'cat-safety-desc': 'Emergency services, disaster preparedness, and community safety programs.',
    'cat-environment': 'Environment',
    'cat-environment-desc': 'Environmental permits, waste management, and conservation programs.',

    // FAQ Page
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'Find answers to common questions about municipal services',
    'faq-general': 'General Questions',
    'faq-certificates': 'Certificates & Documents',
    'faq-business': 'Business & Permits',
    'faq-payments': 'Payments & Fees',
    'faq-social': 'Social Services',
    'faq-technical': 'Technical Questions',
    'faq-still-questions': 'Still have questions?',
    'faq-contact-help':
      "If you didn't find the answer you were looking for, please don't hesitate to contact us.",

    // Common Labels
    'label-fee': 'Fee:',
    'label-time': 'Time:',
    'label-free': 'Free',
    'label-varies': 'Varies',
    'label-walk-in': 'Walk-in',
    'label-seasonal': 'Seasonal',
    'label-1-day': '1 day',
    'label-1-2-days': '1-2 days',
    'label-3-5-days': '3-5 days',
    'section-responsible-offices': 'Responsible Offices',

    // Health Page
    'health-page-title': 'Health Services',
    'health-page-desc': 'Medical consultations, vaccinations, and health programs',
    'health-page-badge': 'Health',
    'health-consultation': 'Medical Consultation',
    'health-consultation-desc': 'Free consultation at Rural Health Units',
    'health-vaccination': 'Vaccination Programs',
    'health-vaccination-desc': 'Free immunization for children and adults',
    'health-prenatal': 'Prenatal Care',
    'health-prenatal-desc': 'Free prenatal checkups and services',
    'health-dental': 'Dental Services',
    'health-dental-desc': 'Basic dental care and extraction',
    'health-stats-title': 'Health Statistics',
    'health-rhu': 'Rural Health Units',
    'health-bhw': 'Barangay Health Workers',
    'health-hospitals-title': 'Hospitals in the Area',
    'label-schedule-varies': 'Schedule varies',
    'label-by-appointment': 'By appointment',
    'label-free-subsidy': 'Free (subsidy)',
    'label-1-3-days': '1-3 days',
    'health-maternal': 'Maternal Care',
    'health-maternal-desc': 'Prenatal and postnatal health services',
    'health-medicine': 'Medicine Assistance',
    'health-medicine-desc': 'Financial assistance for medicines through MSWDO',
    'health-stat-facilities': 'Total Health Facilities',
    'health-stat-hospitals': 'Major Hospitals',
    'health-stat-mho': 'Municipal Health Office',
    'health-section-hospitals': 'Hospitals in Agoo',
    'health-section-mho': 'Municipal Health Office',
    'health-bhs-subtitle': '22 Barangay Health Stations/Centers serving all barangays of Agoo',
    'health-mho-title': 'Agoo Municipal Health Office',
    'health-mho-desc':
      'The Municipal Health Office provides primary healthcare services including a lying-in facility and laboratory services. It serves as the main public health center for the municipality.',
    'health-service-lying-in': 'Lying-in Facility',
    'health-service-laboratory': 'Laboratory Services',
    'health-service-immunization': 'Immunization',
    'health-service-prenatal': 'Prenatal Care',
    'health-service-family-planning': 'Family Planning',
    'health-service-tb-dots': 'TB-DOTS',
    'health-pltciluis-a-tiam-medical-center': 'PLTCI-Luis A. Tiam Medical Center',
    'health-a-tertiary-level-philhealthaccredited-private':
      'A tertiary level, PhilHealth-accredited private hospital providing comprehensive medical services.',
    'health-national-highway-agoo': 'National Highway, Agoo',
    'health-medical-mission-group-hospital-health-services':
      'Medical Mission Group Hospital & Health Services Cooperative',
    'health-also-known-as-new-mmg-hospital-providing-quality':
      'Also known as New MMG Hospital, providing quality healthcare services to the community.',
    'health-consolacion-road-brgy-consolacion': 'Consolacion Road, Brgy. Consolacion',
    'health-salubris-inc-salubris-medical-center': 'SALUBRIS, INC. (Salubris Medical Center)',
    'health-private-medical-center-offering-various':
      'Private medical center offering various healthcare and diagnostic services.',
    'health-hivcare-cta-eyebrow': 'Official DOH-Sourced Directory',
    'health-hivcare-cta-heading': 'Find HIV Treatment & Care Facilities Near You',
    'health-hivcare-cta-desc':
      'A searchable, mobile-first web directory of all 338 DOH-designated HIV treatment and care facilities in the Philippines, sourced from DOH Circular No. 2026-0065.',
    'health-hivcare-cta-btn': 'Find HIV Care Facilities',
    'health-hivcare-cta-stat-facilities': 'Facilities Nationwide',
    'health-hivcare-cta-stat-mobile': 'Mobile-Friendly Search',
    'health-hivcare-cta-stat-verified': 'DOH-Verified Listings',

    // Agriculture Page
    'agri-page-title': 'Agriculture Services',
    'agri-page-desc': 'Support for farmers and agricultural development',
    'agri-page-badge': 'Agriculture',
    'agri-seedling': 'Seedling Distribution',
    'agri-seedling-desc': 'Free seeds and seedlings for farmers',
    'agri-equipment': 'Farm Equipment',
    'agri-equipment-desc': 'Equipment rental and assistance',
    'agri-livelihood': 'Livelihood Programs',
    'agri-livelihood-desc': 'Training and support for farmers',
    'agri-office-mao': 'Municipal Agriculture Office',
    'agri-office-mao-desc':
      'RSBSA registration, certifications, rice/corn programs, livestock, fishery services',

    // Ordinance Framework Page
    'ord-page-title': 'Ordinance Framework',
    'ord-page-desc': 'Municipal ordinances enacted by the Sangguniang Bayan ng Agoo',
    'ord-page-badge': 'Legislative',
    'ord-what-is': 'What is an Ordinance?',
    'ord-what-is-p1':
      'A municipal ordinance is a local law enacted by the Sangguniang Bayan (Municipal Council) that governs the municipality and its residents. Ordinances have the force and effect of law within the territorial jurisdiction of the municipality.',
    'ord-what-is-p2':
      'Ordinances may cover various subjects including but not limited to: taxation, business regulations, public safety, environmental protection, traffic management, and zoning.',
    'ord-categories-title': 'Ordinance Categories',
    'ord-cat-revenue': 'Revenue & Taxation',
    'ord-cat-business': 'Business & Trade',
    'ord-cat-safety': 'Public Safety',
    'ord-cat-environment': 'Environment',
    'ord-cat-traffic': 'Traffic & Transportation',
    'ord-cat-zoning': 'Zoning & Land Use',
    'ord-2025-title': '2025 Ordinances',
    'ord-2025-subtitle': 'Official ordinances enacted by the Sangguniang Bayan ng Agoo in 2025',
    'ord-table-number': 'Ordinance No.',
    'ord-table-title': 'Title',
    'ord-table-date': 'Session Date',
    'ord-view-all': 'View All Ordinances on SB Website',

    // Resolution Framework Page
    'reso-page-title': 'Resolution Framework',
    'reso-page-desc': 'Resolutions passed by the Sangguniang Bayan ng Agoo',
    'reso-page-badge': 'Legislative',
    'reso-what-is': 'What is a Resolution?',
    'reso-what-is-p1':
      'A resolution is a formal expression of the opinion or will of the Sangguniang Bayan. Unlike ordinances, resolutions do not have the force and effect of law but serve as official statements of the legislative body.',
    'reso-what-is-p2':
      'Resolutions are commonly used for: commendations, requests to higher government agencies, expressions of support or opposition, and administrative matters of the Sangguniang Bayan.',
    'reso-types-title': 'Types of Resolutions',
    'reso-type-commendation': 'Commendation',
    'reso-type-request': 'Request/Appeal',
    'reso-type-support': 'Support/Endorsement',
    'reso-type-condolence': 'Condolence',
    'reso-type-authorization': 'Authorization',
    'reso-type-appropriation': 'Appropriation',
    'reso-2026-title': '2026 Resolutions',
    'reso-2026-subtitle': 'Official resolutions passed by the Sangguniang Bayan ng Agoo in 2026',
    'reso-2025-title': '2025 Resolutions',
    'reso-2025-subtitle': 'Official resolutions passed by the Sangguniang Bayan ng Agoo in 2025',
    'reso-table-number': 'Resolution No.',
    'reso-table-title': 'Title',
    'reso-table-date': 'Session Date',
    'reso-view-all': 'View All Resolutions on SB Website',

    // Business Services Page
    'biz-page-title': 'Business Services',
    'biz-page-desc': 'Permits, licenses, and support for businesses in Agoo',
    'biz-page-badge': 'Business',
    'biz-permit-new': 'Business Permit (New)',
    'biz-permit-new-desc': "Apply for a new mayor's permit for your business",
    'biz-permit-renew': 'Business Permit Renewal',
    'biz-permit-renew-desc': 'Renew your annual business permit',
    'biz-closure': 'Business Closure',
    'biz-closure-desc': 'Process business closure and clearance',
    'biz-cedula': 'Cedula (CTC)',
    'biz-cedula-desc': 'Community tax certificate for individuals and businesses',
    'biz-online-badge': 'Online Services via Filipizen',
    'biz-online-title': 'Online Business Transactions',
    'biz-online-subtitle':
      'Complete your business transactions online through the official Filipizen portal',
    'biz-billing': 'Business Online Billing & Payment',
    'biz-billing-desc': 'View and pay your business tax bills online',

    // Tax & Payments Page
    'tax-page-title': 'Tax & Payments',
    'tax-page-desc': 'Property tax, business tax, and other municipal payments',
    'tax-page-badge': 'Tax & Payments',
    'tax-property': 'Real Property Tax',
    'tax-property-desc': 'Annual tax on land and improvements',
    'tax-business': 'Business Tax',
    'tax-business-desc': 'Quarterly and annual business tax payments',
    'tax-online-badge': 'Online Services via Filipizen',
    'tax-online-title': 'Online Tax Transactions',
    'tax-online-subtitle':
      'Complete your tax payments online through the official Filipizen portal',

    // Social Services Page
    'social-page-title': 'Social Services',
    'social-page-desc': 'Support programs for vulnerable sectors and communities',
    'social-page-badge': 'Social Services',
    'social-senior': 'Senior Citizen ID',
    'social-senior-desc': 'ID for citizens 60 years and above',
    'social-pwd': 'PWD ID',
    'social-pwd-desc': 'Identification for persons with disabilities',
    'social-assistance': 'Financial Assistance',
    'social-assistance-desc': 'Emergency financial aid for medical, burial, and education',

    // Education Page
    'edu-page-title': 'Education Services',
    'edu-page-desc': 'Scholarship programs and educational assistance',
    'edu-page-badge': 'Education',
    'edu-scholarship': 'Scholarship Programs',
    'edu-scholarship-desc': 'Municipal scholarships for students',
    'edu-training': 'Educational Assistance',
    'edu-training-desc': 'Financial aid for education',

    // Infrastructure Page
    'infra-page-title': 'Infrastructure Services',
    'infra-page-desc': 'Building permits, construction, and engineering services',
    'infra-page-badge': 'Infrastructure',
    'infra-building': 'Building Permit',
    'infra-building-desc': 'Permit for new construction and renovation',
    'infra-occupancy': 'Occupancy Permit',
    'infra-occupancy-desc': 'Certificate of occupancy for completed buildings',
    'infra-engineering': 'Engineering Services',
    'infra-engineering-desc': 'Technical assistance and plan review',

    // Public Safety Page
    'safety-page-title': 'Public Safety Services',
    'safety-page-desc': 'Emergency response and disaster preparedness',
    'safety-page-badge': 'Public Safety',
    'safety-disaster': 'Emergency Response',
    'safety-disaster-desc': '24/7 emergency response and rescue services',
    'safety-relief': 'Disaster Assistance',
    'safety-relief-desc': 'Relief goods and evacuation support',
    'safety-preparedness': 'Disaster Preparedness',
    'safety-preparedness-desc': 'Training and resources for disaster readiness',

    // Environment Page
    'env-page-title': 'Environment Services',
    'env-page-desc': 'Waste management and environmental protection',
    'env-page-badge': 'Environment',
    'env-waste': 'Garbage Collection',
    'env-waste-desc': 'Waste collection schedules by barangay',
    'env-recycling': 'Recycling Program',
    'env-recycling-desc': 'Segregation and recycling initiatives',

    // Header Dropdown Items
    'dropdown-certificates': 'Certificates',
    'dropdown-business': 'Business',
    'dropdown-tax-payments': 'Tax Payments',
    'dropdown-social-services': 'Social Services',
    'dropdown-health': 'Health',
    'dropdown-agriculture': 'Agriculture',
    'dropdown-infrastructure': 'Infrastructure',
    'dropdown-education': 'Education',
    'dropdown-public-safety': 'Public Safety',
    'dropdown-environment': 'Environment',
    'dropdown-ordinance-framework': 'Ordinance Framework',
    'dropdown-resolution-framework': 'Resolution Framework',

    // Homepage - Hero
    'hero-browse-services': 'Browse Services',
    'hero-contact-us': 'Contact Us',
    'hero-search-placeholder': 'e.g., birth certificate, business permit',
    'hero-popular': 'Popular:',
    'hero-birth-certificate': 'Birth Certificate',
    'hero-business-permit': 'Business Permit',
    'hero-real-property-tax': 'Real Property Tax',

    // Homepage - Popular Services
    'popular-services-subtitle': 'Quick access to frequently requested municipal services',
    'popular-browse-directory': 'Browse complete directory',

    // Homepage - Stats
    'stats-at-a-glance': 'Agoo at a Glance',
    'stats-view-statistics': 'View Statistics',
    'stats-population-label': 'Population',
    'stats-population-source': '2020 Census',
    'stats-barangays-label': 'Barangays',
    'stats-barangays-source': 'Administrative Units',
    'stats-municipality-label': 'Municipality',
    'stats-municipality-source': 'Income Classification',
    'stats-land-area-label': 'Land Area',
    'stats-land-area-source': 'Total Municipal Area',

    // Homepage - Weather & Map
    'weather-map-title': 'Weather and Map of Agoo',
    'weather-mainly-clear': 'Mainly clear',
    'weather-location': 'Agoo, La Union',

    // Homepage - History
    'history-title': 'Brief History of Agoo',
    'history-era-precolonial': 'Pre-Colonial',
    'history-era-present': 'Present',
    'history-precolonial':
      'Known as "Puerto de Japón," Agoo was a bustling international port trading with Japanese, Chinese, and Ryukyuan merchants before Spanish colonization.',
    'history-1578':
      'Franciscan friars Father Juan Bautista Lucarelli and Father Sebastian de Baeza founded the town and parish of Agoo, with the mission dedicated to Santa Monica.',
    'history-1582':
      'Augustinian missionaries assumed administration of the settlement. Its name is associated with the "aroo," the pine-like Casuarina trees that once lined the coast and riverbanks.',
    'history-1850':
      'Agoo became part of the newly created province of La Union under the decree of Governor-General Antonio María Blanco.',
    'history-1982':
      'On 15 July 1982, Pope John Paul II elevated the Shrine of Our Lady of Charity to the rank of Basilica Minore.',
    'history-present':
      'Agoo continues to grow as an educational, commercial, and cultural center while celebrating its heritage through the annual Dinengdeng Festival.',
    'history-basilica-town-title': 'The Basilica Town',
    'history-basilica-town-desc':
      "Founded in 1578, Agoo is La Union's oldest town and home to the historic Basilica Minore of Our Lady of Charity.",
    'history-puerto-de-japon-title': 'Puerto de Japón',
    'history-puerto-de-japon-desc':
      'Before Spanish colonization, Agoo served as an international trading port for Japanese, Chinese, and Ryukyuan merchants.',
    'news-announcement': 'Announcement',
    'news-project': 'Project',
    'news-advisory': 'Advisory',
    'news-business-permit-title': 'Business Permit Renewal 2025',
    'news-business-permit-desc':
      'Deadline for business permit renewal is set for January 20, 2025. Early renewal is encouraged.',
    'news-market-title': 'New Public Market Wing Opens',
    'news-market-desc':
      'The renovated wing of the Agoo Public Market is now open to vendors and the public.',
    'news-power-title': 'Power Service Advisories',
    'news-power-desc':
      'Check official LUELCO announcements for verified outage and maintenance schedules.',

    // Homepage - Quiz CTA
    'quiz-title': 'Agoo Quiz',
    'quiz-subtitle': 'How well do you know Agoo, La Union?',
    'quiz-description':
      "Evaluate your familiarity with the municipality's heritage, cultural identity, and geographic significance through an interactive knowledge assessment designed to showcase one of La Union's most prominent localities.",
    'quiz-take': 'Take the Quiz',

    // Footer
    'footer-tagline':
      'Empowering the people of Agoo with transparent access to the services, programs, and public funds of LGU Agoo.',
    'footer-quick-links': 'Quick Links',
    'footer-resources': 'Resources',
    'footer-agoo-quiz': 'Agoo Quiz',
    'footer-sitemap': 'Sitemap',
    'footer-citizens-charter': "Citizen's Charter",
    'footer-terms': 'Terms of Use',
    'footer-privacy': 'Privacy Policy',
    'footer-accessibility': 'Accessibility',
    'footer-faq': 'FAQ',
    'footer-open-data': 'Open Data Philippines',
    'footer-foi': 'Freedom of Information',
    'footer-lgu-portal': 'Official LGU Agoo Portal',
    'footer-sb': 'Sangguniang Bayan',
    'footer-lgu-facebook': 'LGU Agoo Facebook',
    'footer-blgf': 'BLGF Portal',
    'footer-cmci': 'CMCI DTI Portal',
    'footer-cost': 'Cost to the People of Agoo =',
    'footer-volunteer': 'Volunteer with us',
    'footer-contribute': 'Contribute code with us',
    'footer-copyright-text': 'BetterAgoo.org',
    'footer-copyright-disclaimer':
      'All public information sourced from official government portals.',
    'footer-skip-to-main': 'Skip to main content',
  },
  fil: {
    'emergency-header-911': 'Emerhensiya',
    'emergency-header-mdrrmo': 'MDRRMO',
    'emergency-header-pnp': 'Pulis',
    'emergency-header-bfp': 'Bumbero',
    'emergency-header-rhu': 'RHU–MHO',
    'emergency-header-coast-guard': 'Tanod Baybayin',
    'emergency-header-lumc': 'LUMC',
    'emergency-header-luelco': 'LUELCO',
    'emergency-directory-subtitle':
      'Pindutin ang anumang numero upang tawagan ang naaangkop na serbisyong pang-emerhensiya.',
    'emergency-directory-updated': 'Huling na-update: Hulyo 29, 2026',
    'emergency-network-smart': 'Smart',
    'emergency-network-globe': 'Globe',
    'emergency-network-landline': 'Landline',
    'emergency-network-mobile': 'Mobile',
    'emergency-network-emergency': 'Emerhensiya',
    'emergency-agency-mdrrmo-agoo': 'MDRRMO – Agoo',
    'emergency-description-mdrrmo-agoo': 'Pagtugon sa sakuna at emerhensiya',
    'emergency-agency-rhu-mho-agoo': 'Agoo RHU–MHO',
    'emergency-description-rhu-mho-agoo': 'Mga alalahanin sa kalusugan',
    'emergency-agency-bfp-agoo': 'BFP – Himpilan ng Agoo',
    'emergency-description-bfp-agoo': 'Kaligtasan sa sunog at iba pang emerhensiya',
    'emergency-agency-pnp-agoo': 'PNP – Himpilan ng Agoo',
    'emergency-description-pnp-agoo': 'Kapayapaan, kaayusan, at seguridad',
    'emergency-agency-coast-guard-agoo': 'Coast Guard – Agoo',
    'emergency-description-coast-guard-agoo': 'Kaligtasan at emerhensiya sa baybayin',
    'emergency-agency-lumc': 'La Union Medical Center (LUMC)',
    'emergency-description-lumc': 'Ospital at mga alalahanin sa kalusugan',
    'emergency-agency-luelco': 'LUELCO',
    'emergency-description-luelco': 'Mga alalahanin sa kaligtasang elektrikal',
    'emergency-agency-pdrrmo-la-union': 'La Union PDRRMO / Rescue 911',
    'emergency-description-pdrrmo-la-union': 'Panlalawigang pagtugon sa emerhensiya',
    'contact-agoo-municipal-hall-address':
      'Munisipyo ng Agoo, Cases Boulevard, Agoo, La Union 2504',

    // Agoo barangays
    'gov-brgy-ambitacay': 'Ambitacay',
    'gov-brgy-balawarte': 'Balawarte',
    'gov-brgy-capas': 'Capas',
    'gov-brgy-consolacion': 'Consolacion',
    'gov-brgy-macalva-central': 'Macalva Central',
    'gov-brgy-macalva-norte': 'Macalva Norte',
    'gov-brgy-macalva-sur': 'Macalva Sur',
    'gov-brgy-nazareno': 'Nazareno',
    'gov-brgy-purok': 'Purok',
    'gov-brgy-san-agustin-east': 'San Agustin East',
    'gov-brgy-san-agustin-norte': 'San Agustin Norte',
    'gov-brgy-san-agustin-sur': 'San Agustin Sur',
    'gov-brgy-san-antonino': 'San Antonino',
    'gov-brgy-san-antonio': 'San Antonio',
    'gov-brgy-san-francisco': 'San Francisco',
    'gov-brgy-san-isidro': 'San Isidro',
    'gov-brgy-san-joaquin-norte': 'San Joaquin Norte',
    'gov-brgy-san-joaquin-sur': 'San Joaquin Sur',
    'gov-brgy-san-jose-norte': 'San Jose Norte',
    'gov-brgy-san-jose-sur': 'San Jose Sur',
    'gov-brgy-san-juan': 'San Juan',
    'gov-brgy-san-julian-central': 'San Julian Central',
    'gov-brgy-san-julian-east': 'San Julian East',
    'gov-brgy-san-julian-norte': 'San Julian Norte',
    'gov-brgy-san-julian-west': 'San Julian West',
    'gov-brgy-san-manuel-norte': 'San Manuel Norte',
    'gov-brgy-san-manuel-sur': 'San Manuel Sur',
    'gov-brgy-san-marcos': 'San Marcos',
    'gov-brgy-san-miguel': 'San Miguel',
    'gov-brgy-san-nicolas-central': 'San Nicolas Central',
    'gov-brgy-san-nicolas-east': 'San Nicolas East',
    'gov-brgy-san-nicolas-norte': 'San Nicolas Norte',
    'gov-brgy-san-nicolas-sur': 'San Nicolas Sur',
    'gov-brgy-san-nicolas-west': 'San Nicolas West',
    'gov-brgy-san-pedro': 'San Pedro',
    'gov-brgy-san-roque-east': 'San Roque East',
    'gov-brgy-san-roque-west': 'San Roque West',
    'gov-brgy-san-vicente-norte': 'San Vicente Norte',
    'gov-brgy-san-vicente-sur': 'San Vicente Sur',
    'gov-brgy-santa-ana': 'Santa Ana',
    'gov-brgy-santa-barbara': 'Santa Barbara',
    'gov-brgy-santa-fe': 'Santa Fe',
    'gov-brgy-santa-maria': 'Santa Maria',
    'gov-brgy-santa-monica': 'Santa Monica',
    'gov-brgy-santa-rita': 'Santa Rita',
    'gov-brgy-santa-rita-east': 'Santa Rita East',
    'gov-brgy-santa-rita-norte': 'Santa Rita Norte',
    'gov-brgy-santa-rita-sur': 'Santa Rita Sur',
    'gov-brgy-santa-rita-west': 'Santa Rita West',

    // Navigation - Filipino
    'nav-home': 'Tahanan',
    'nav-history': 'Maikling Kasaysayan',
    'nav-services': 'Mga Serbisyo',
    'nav-government': 'Pamahalaan',
    'nav-statistics': 'Estadistika',
    'nav-legislative': 'Lehislatura',
    'nav-transparency': 'Transparensiya',
    'nav-contact': 'Makipag-ugnayan',

    // Appointment CTA
    'appointment-cta-heading':
      'Pagpapahusay ng Serbisyo sa Appointment ng Opisina ng Alkalde ng LGU Agoo',
    'appointment-cta-subtitle': 'Walang pila. Walang pabalik-balik. Mahusay na appointment lang.',
    'appointment-schedule-btn': 'Mag-iskedyul ng Appointment',
    'appointment-create-btn': 'Gumawa ng Account',

    // Hero Section
    'hero-welcome': 'Maligayang Pagdating sa BetterAgoo.org',
    'hero-subtitle':
      'I-access ang mga serbisyo ng pamahalaan, impormasyon, at mga mapagkukunan para sa mga mamamayan ng Agoo, La Union.',
    'hero-find-service': 'Maghanap ng Serbisyo',

    // Popular Services
    'section-popular': 'Mga Sikat na Serbisyo',
    'service-certificates': 'Mga Sertipiko',
    'service-certificates-desc': 'Sertipiko ng kapanganakan, kasal, at kamatayan',
    'service-business': 'Mga Permit sa Negosyo',
    'service-business-desc': 'Bagong permit at pag-renew',
    'service-tax': 'Pagbabayad ng Buwis',
    'service-tax-desc': 'Buwis sa ari-arian at negosyo',
    'service-social': 'Serbisyong Panlipunan',
    'service-social-desc': 'Serbisyo para sa senior citizen at PWD',
    'service-health': 'Serbisyong Pangkalusugan',
    'service-health-desc': 'Tulong medikal at mga programa',
    'btn-view-all-services': 'Tingnan Lahat ng Serbisyo',

    // Latest Updates
    'section-updates': 'Pinakabagong mga Update',
    'btn-view-all': 'Tingnan Lahat',

    // Municipal Leadership
    'section-leadership': 'Pamunuan ng Munisipalidad',
    'title-mayor': 'Punong Bayan',
    'title-vice-mayor': 'Bise Punong Bayan',
    'btn-view-officials': 'Tingnan Lahat ng Opisyal',

    // Contact Section
    'section-contact': 'Impormasyon sa Pakikipag-ugnayan',
    'contact-phone': 'Telepono',
    'contact-email': 'Email',
    'contact-address': 'Adres',
    'contact-hours': 'Lunes-Biyernes: 8:00 AM - 5:00 PM',
    'contact-response': 'Sasagutin namin sa loob ng 24 na oras',
    'contact-municipal-hall': 'Munisipyo',

    // Services Page
    'services-title': 'Direktoryo ng Serbisyong Munisipal',
    'services-subtitle': 'Tingnan ang lahat ng serbisyong inaalok ng Munisipalidad ng Agoo',
    'life-events-title': 'Maghanap Ayon sa Pangyayari sa Buhay',
    'life-events-subtitle': 'Hanapin ang mga serbisyo batay sa nangyayari sa iyong buhay',
    'life-starting-business': 'Magsimula ng Negosyo',
    'life-getting-married': 'Magpakasal',
    'life-having-baby': 'Magkaanak',
    'life-financial-help': 'Kailangan ng Tulong Pinansyal',
    'life-senior': 'Serbisyo para sa Senior Citizen',
    'life-pwd': 'Taong may Kapansanan',
    'life-building': 'Pagtatayo/Pagpapabuti ng Bahay',
    'life-trouble': 'Nalagay sa Problema',

    // Service Categories
    'cat-certificates': 'Mga Sertipiko at Vital Records',
    'cat-certificates-desc':
      'Sertipiko ng kapanganakan, kamatayan, kasal, at iba pang vital records.',
    'cat-business': 'Negosyo at Kalakalan',
    'cat-business-desc':
      'Mga permit sa negosyo, lisensya, at serbisyo sa pagpaparehistro ng kalakalan.',
    'cat-social': 'Serbisyong Panlipunan',
    'cat-social-desc':
      'Mga programa sa kapakanan, serbisyo para sa senior citizen, benepisyo ng PWD, at tulong pinansyal.',
    'cat-health': 'Kalusugan at Kagalingan',
    'cat-health-desc': 'Mga programa sa bakuna, health certificates, at tulong medikal.',
    'cat-tax': 'Pagbubuwis at Pagbabayad',
    'cat-tax-desc': 'Buwis sa ari-arian, buwis sa negosyo, pagbabayad, at tax clearance.',
    'cat-agriculture': 'Agrikultura',
    'cat-agriculture-desc':
      'Mga pautang sa agrikultura, insurance sa pananim, tulong sa pataba, at pagsasanay.',
    'cat-infrastructure': 'Imprastraktura',
    'cat-infrastructure-desc':
      'Mga permit sa konstruksyon, kahilingan sa pagpapanatili ng kalsada, at pampublikong pasilidad.',
    'cat-education': 'Edukasyon at Iskolarship',
    'cat-education-desc':
      'Mga programa sa iskolarship, tulong sa estudyante, at mga grant sa edukasyon.',
    'cat-safety': 'Kaligtasan ng Publiko',
    'cat-safety-desc':
      'Mga serbisyong pang-emergency, paghahanda sa sakuna, at mga programa sa kaligtasan ng komunidad.',
    'cat-environment': 'Kapaligiran',
    'cat-environment-desc':
      'Mga permit sa kapaligiran, pamamahala ng basura, at mga programa sa konserbasyon.',

    // FAQ Page
    'faq-title': 'Mga Madalas Itanong',
    'faq-subtitle':
      'Hanapin ang mga sagot sa mga karaniwang tanong tungkol sa mga serbisyong munisipal',
    'faq-general': 'Mga Pangkalahatang Tanong',
    'faq-certificates': 'Mga Sertipiko at Dokumento',
    'faq-business': 'Negosyo at Permit',
    'faq-payments': 'Pagbabayad at Bayarin',
    'faq-social': 'Serbisyong Panlipunan',
    'faq-technical': 'Mga Teknikal na Tanong',
    'faq-still-questions': 'May tanong pa ba kayo?',
    'faq-contact-help':
      'Kung hindi ninyo nakita ang sagot na hinahanap, huwag mag-atubiling makipag-ugnayan sa amin.',

    // Common Labels - Filipino
    'label-fee': 'Bayad:',
    'label-time': 'Oras:',
    'label-free': 'Libre',
    'label-varies': 'Nag-iiba',
    'label-walk-in': 'Walk-in',
    'label-seasonal': 'Pana-panahon',
    'label-1-day': '1 araw',
    'label-1-2-days': '1-2 araw',
    'label-3-5-days': '3-5 araw',
    'section-responsible-offices': 'Mga Responsableng Opisina',

    // Health Page - Filipino
    'health-page-title': 'Serbisyong Pangkalusugan',
    'health-page-desc': 'Mga konsultasyong medikal, bakuna, at programa sa kalusugan',
    'health-page-badge': 'Kalusugan',
    'health-consultation': 'Konsultasyong Medikal',
    'health-consultation-desc': 'Libreng konsultasyon sa Rural Health Units',
    'health-vaccination': 'Mga Programa sa Bakuna',
    'health-vaccination-desc': 'Libreng immunization para sa mga bata at matatanda',
    'health-prenatal': 'Prenatal Care',
    'health-prenatal-desc': 'Libreng prenatal checkups at serbisyo',
    'health-dental': 'Serbisyong Dental',
    'health-dental-desc': 'Basic dental care at bunot',
    'health-stats-title': 'Estadistika ng Kalusugan',
    'health-rhu': 'Rural Health Units',
    'health-bhw': 'Barangay Health Workers',
    'health-hospitals-title': 'Mga Ospital sa Lugar',
    'label-schedule-varies': 'Iba-iba ang iskedyul',
    'label-by-appointment': 'Sa pamamagitan ng appointment',
    'label-free-subsidy': 'Libre (subsidiya)',
    'label-1-3-days': '1-3 araw',
    'health-maternal': 'Pangangalaga sa Ina',
    'health-maternal-desc': 'Serbisyo sa kalusugan bago at pagkatapos manganak',
    'health-medicine': 'Tulong sa Gamot',
    'health-medicine-desc': 'Tulong pinansyal para sa gamot sa pamamagitan ng MSWDO',
    'health-stat-facilities': 'Kabuuang Pasilidad sa Kalusugan',
    'health-stat-hospitals': 'Mga Pangunahing Ospital',
    'health-stat-mho': 'Opisina ng Kalusugan ng Munisipalidad',
    'health-section-hospitals': 'Mga Ospital sa Agoo',
    'health-section-mho': 'Opisina ng Kalusugan ng Munisipalidad',
    'health-bhs-subtitle':
      '22 Barangay Health Stations/Centers na naglilingkod sa lahat ng barangay ng Agoo',
    'health-mho-title': 'Opisina ng Kalusugan ng Munisipalidad ng Agoo',
    'health-mho-desc':
      'Ang Municipal Health Office ay nagbibigay ng pangunahing serbisyo sa kalusugan kabilang ang lying-in facility at laboratory services. Ito ang pangunahing public health center ng munisipalidad.',
    'health-service-lying-in': 'Lying-in Facility',
    'health-service-laboratory': 'Serbisyo sa Laboratoryo',
    'health-service-immunization': 'Immunisasyon',
    'health-service-prenatal': 'Pangangalaga Bago Manganak',
    'health-service-family-planning': 'Pagpaplano ng Pamilya',
    'health-service-tb-dots': 'TB-DOTS',
    'health-pltciluis-a-tiam-medical-center': 'PLTCI-Luis A. Tiam Medical Center',
    'health-a-tertiary-level-philhealthaccredited-private':
      'A tertiary level, PhilHealth-accredited pribadong hospital nagbibigay ng komprehensibong mga serbisyong medikal.',
    'health-national-highway-agoo': 'Pambansa Highway, Agoo',
    'health-medical-mission-group-hospital-health-services':
      'Medical Mission Group Hospital & Health Mga serbisyo Cooperative',
    'health-also-known-as-new-mmg-hospital-providing-quality':
      'Also known as Bagong MMG Hospital, nagbibigay ng quality mga serbisyo sa kalusugan sa ang community.',
    'health-consolacion-road-brgy-consolacion': 'Consolacion Road, Brgy. Consolacion',
    'health-salubris-inc-salubris-medical-center': 'SALUBRIS, INC. (Salubris Medical Center)',
    'health-private-medical-center-offering-various':
      'Pribado medical center offering various healthcare and diagnostic mga serbisyo.',
    'health-hivcare-cta-eyebrow': 'Opisyal na Direktoryo mula sa DOH',
    'health-hivcare-cta-heading': 'Hanapin ang Pasilidad para sa Paggamot at Pangangalaga sa HIV',
    'health-hivcare-cta-desc':
      'A searchable, mobile-first web directory of all 338 DOH-designated HIV treatment and care facilities in the Philippines, sourced from DOH Circular No. 2026-0065.',
    'health-hivcare-cta-btn': 'Find HIV Care Facilities',
    'health-hivcare-cta-stat-facilities': 'Pasilidad sa Buong Bansa',
    'health-hivcare-cta-stat-mobile': 'Mobile-Friendly na Paghahanap',
    'health-hivcare-cta-stat-verified': 'Beripikado ng DOH',

    // Agriculture Page - Filipino
    'agri-page-title': 'Serbisyong Agrikultura',
    'agri-page-desc': 'Suporta para sa mga magsasaka at pag-unlad ng agrikultura',
    'agri-page-badge': 'Agrikultura',
    'agri-seedling': 'Pamamahagi ng Binhi',
    'agri-seedling-desc': 'Libreng buto at binhi para sa mga magsasaka',
    'agri-equipment': 'Kagamitan sa Bukid',
    'agri-equipment-desc': 'Renta at tulong sa kagamitan',
    'agri-livelihood': 'Mga Programa sa Kabuhayan',
    'agri-livelihood-desc': 'Pagsasanay at suporta para sa mga magsasaka',
    'agri-office-mao': 'Opisina ng Agrikultura ng Munisipalidad',
    'agri-office-mao-desc':
      'Pagpaparehistro sa RSBSA, mga sertipikasyon, programa sa palay/mais, livestock, serbisyo sa pangisdaan',

    // Ordinance Framework Page - Filipino
    'ord-page-title': 'Balangkas ng Ordinansa',
    'ord-page-desc': 'Mga ordinansang ipinasa ng Sangguniang Bayan ng Agoo',
    'ord-page-badge': 'Lehislatura',
    'ord-what-is': 'Ano ang Ordinansa?',
    'ord-what-is-p1':
      'Ang munisipal na ordinansa ay lokal na batas na ipinasa ng Sangguniang Bayan (Konseho ng Munisipalidad) na namamahala sa munisipalidad at mga residente nito. Ang mga ordinansa ay may bisa at epekto ng batas sa saklaw ng munisipalidad.',
    'ord-what-is-p2':
      "Ang mga ordinansa ay maaaring sumasaklaw sa iba't ibang paksa kabilang ngunit hindi limitado sa: pagbubuwis, regulasyon sa negosyo, kaligtasang pampubliko, proteksyon sa kapaligiran, pamamahala ng trapiko, at zoning.",
    'ord-categories-title': 'Mga Kategorya ng Ordinansa',
    'ord-cat-revenue': 'Kita at Pagbubuwis',
    'ord-cat-business': 'Negosyo at Kalakalan',
    'ord-cat-safety': 'Kaligtasang Pampubliko',
    'ord-cat-environment': 'Kapaligiran',
    'ord-cat-traffic': 'Trapiko at Transportasyon',
    'ord-cat-zoning': 'Zoning at Paggamit ng Lupa',
    'ord-2025-title': 'Mga Ordinansa ng 2025',
    'ord-2025-subtitle': 'Mga opisyal na ordinansang ipinasa ng Sangguniang Bayan ng Agoo sa 2025',
    'ord-table-number': 'Numero ng Ordinansa',
    'ord-table-title': 'Pamagat',
    'ord-table-date': 'Petsa ng Sesyon',
    'ord-view-all': 'Tingnan Lahat ng Ordinansa sa SB Website',

    // Resolution Framework Page - Filipino
    'reso-page-title': 'Balangkas ng Resolusyon',
    'reso-page-desc': 'Mga resolusyong ipinasa ng Sangguniang Bayan ng Agoo',
    'reso-page-badge': 'Lehislatura',
    'reso-what-is': 'Ano ang Resolusyon?',
    'reso-what-is-p1':
      'Ang resolusyon ay pormal na pagpapahayag ng opinyon o kalooban ng Sangguniang Bayan. Hindi tulad ng mga ordinansa, ang mga resolusyon ay walang bisa at epekto ng batas ngunit nagsisilbing opisyal na pahayag ng lehislatura.',
    'reso-what-is-p2':
      'Ang mga resolusyon ay karaniwang ginagamit para sa: mga pagpupugay, mga kahilingan sa mas mataas na ahensya ng pamahalaan, mga pagpapahayag ng suporta o pagtutol, at mga administratibong bagay ng Sangguniang Bayan.',
    'reso-types-title': 'Mga Uri ng Resolusyon',
    'reso-type-commendation': 'Pagpupugay',
    'reso-type-request': 'Kahilingan/Apela',
    'reso-type-support': 'Suporta/Endorsement',
    'reso-type-condolence': 'Pakikiramay',
    'reso-type-authorization': 'Awtorisasyon',
    'reso-type-appropriation': 'Apropriyasyon',
    'reso-2026-title': 'Mga Resolusyon ng 2026',
    'reso-2026-subtitle': 'Mga opisyal na resolusyong ipinasa ng Sangguniang Bayan ng Agoo sa 2026',
    'reso-2025-title': 'Mga Resolusyon ng 2025',
    'reso-2025-subtitle': 'Mga opisyal na resolusyong ipinasa ng Sangguniang Bayan ng Agoo sa 2025',
    'reso-table-number': 'Numero ng Resolusyon',
    'reso-table-title': 'Pamagat',
    'reso-table-date': 'Petsa ng Sesyon',
    'reso-view-all': 'Tingnan Lahat ng Resolusyon sa SB Website',

    // Business Services Page - Filipino
    'biz-page-title': 'Serbisyo sa Negosyo',
    'biz-page-desc': 'Mga permit, lisensya, at suporta para sa mga negosyo sa Agoo',
    'biz-page-badge': 'Negosyo',
    'biz-permit-new': 'Permit ng Negosyo (Bago)',
    'biz-permit-new-desc': "Mag-apply ng bagong mayor's permit para sa iyong negosyo",
    'biz-permit-renew': 'Pag-renew ng Permit ng Negosyo',
    'biz-permit-renew-desc': 'I-renew ang taunang permit ng negosyo',
    'biz-closure': 'Pagsasara ng Negosyo',
    'biz-closure-desc': 'Proseso ng pagsasara at clearance ng negosyo',
    'biz-cedula': 'Sedula (CTC)',
    'biz-cedula-desc': 'Community tax certificate para sa mga indibidwal at negosyo',
    'biz-online-badge': 'Online Services sa pamamagitan ng Filipizen',
    'biz-online-title': 'Online na Transaksyon sa Negosyo',
    'biz-online-subtitle':
      'Kumpletuhin ang iyong mga transaksyon sa negosyo online sa pamamagitan ng opisyal na portal ng Filipizen',
    'biz-billing': 'Online Billing at Pagbabayad ng Negosyo',
    'biz-billing-desc': 'Tingnan at bayaran ang iyong business tax bills online',

    // Tax & Payments Page - Filipino
    'tax-page-title': 'Buwis at Pagbabayad',
    'tax-page-desc': 'Buwis sa ari-arian, buwis sa negosyo, at iba pang bayarin sa munisipalidad',
    'tax-page-badge': 'Buwis at Pagbabayad',
    'tax-property': 'Real Property Tax',
    'tax-property-desc': 'Taunang buwis sa lupa at mga pagpapabuti',
    'tax-business': 'Buwis sa Negosyo',
    'tax-business-desc': 'Quarterly at taunang pagbabayad ng buwis sa negosyo',
    'tax-online-badge': 'Online Services sa pamamagitan ng Filipizen',
    'tax-online-title': 'Online na Transaksyon sa Buwis',
    'tax-online-subtitle':
      'Kumpletuhin ang iyong mga pagbabayad ng buwis online sa pamamagitan ng opisyal na portal ng Filipizen',

    // Social Services Page - Filipino
    'social-page-title': 'Serbisyong Panlipunan',
    'social-page-desc': 'Mga programa ng suporta para sa mga vulnerable na sektor at komunidad',
    'social-page-badge': 'Serbisyong Panlipunan',
    'social-senior': 'Senior Citizen ID',
    'social-senior-desc': 'ID para sa mga mamamayang 60 taong gulang pataas',
    'social-pwd': 'PWD ID',
    'social-pwd-desc': 'Pagkakakilanlan para sa mga may kapansanan',
    'social-assistance': 'Tulong Pinansyal',
    'social-assistance-desc': 'Emergency na tulong pinansyal para sa medikal, libing, at edukasyon',

    // Education Page - Filipino
    'edu-page-title': 'Serbisyong Pang-edukasyon',
    'edu-page-desc': 'Mga programa ng iskolarship at tulong pang-edukasyon',
    'edu-page-badge': 'Edukasyon',
    'edu-scholarship': 'Mga Programa ng Iskolarship',
    'edu-scholarship-desc': 'Mga iskolarship ng munisipalidad para sa mga estudyante',
    'edu-training': 'Tulong Pang-edukasyon',
    'edu-training-desc': 'Tulong pinansyal para sa edukasyon',

    // Infrastructure Page - Filipino
    'infra-page-title': 'Serbisyong Imprastraktura',
    'infra-page-desc': 'Building permits, konstruksyon, at serbisyong engineering',
    'infra-page-badge': 'Imprastraktura',
    'infra-building': 'Building Permit',
    'infra-building-desc': 'Permit para sa bagong konstruksyon at renovation',
    'infra-occupancy': 'Occupancy Permit',
    'infra-occupancy-desc': 'Certificate of occupancy para sa natapos na mga gusali',
    'infra-engineering': 'Serbisyong Engineering',
    'infra-engineering-desc': 'Teknikal na tulong at pagsusuri ng plano',

    // Public Safety Page - Filipino
    'safety-page-title': 'Serbisyong Pangkaligtasan',
    'safety-page-desc': 'Tugon sa emergency at paghahanda sa kalamidad',
    'safety-page-badge': 'Kaligtasang Pampubliko',
    'safety-disaster': 'Tugon sa Emergency',
    'safety-disaster-desc': '24/7 na tugon at serbisyong rescue sa emergency',
    'safety-relief': 'Tulong sa Kalamidad',
    'safety-relief-desc': 'Relief goods at suporta sa paglikas',
    'safety-preparedness': 'Paghahanda sa Kalamidad',
    'safety-preparedness-desc': 'Pagsasanay at mga resources para sa disaster readiness',

    // Environment Page - Filipino
    'env-page-title': 'Serbisyong Pangkapaligiran',
    'env-page-desc': 'Pamamahala ng basura at proteksyon sa kapaligiran',
    'env-page-badge': 'Kapaligiran',
    'env-waste': 'Pangongolekta ng Basura',
    'env-waste-desc': 'Mga iskedyul ng pangongolekta ng basura ayon sa barangay',
    'env-recycling': 'Programa sa Recycling',
    'env-recycling-desc': 'Segregasyon at mga inisyatiba sa recycling',

    // Header Dropdown Items
    'dropdown-certificates': 'Mga Sertipiko',
    'dropdown-business': 'Negosyo',
    'dropdown-tax-payments': 'Pagbabayad ng Buwis',
    'dropdown-social-services': 'Serbisyong Panlipunan',
    'dropdown-health': 'Kalusugan',
    'dropdown-agriculture': 'Agrikultura',
    'dropdown-infrastructure': 'Imprastraktura',
    'dropdown-education': 'Edukasyon',
    'dropdown-public-safety': 'Kaligtasang Pampubliko',
    'dropdown-environment': 'Kapaligiran',
    'dropdown-ordinance-framework': 'Balangkas ng Ordinansa',
    'dropdown-resolution-framework': 'Balangkas ng Resolusyon',

    // Homepage - Hero
    'hero-browse-services': 'Tingnan ang mga Serbisyo',
    'hero-contact-us': 'Makipag-ugnayan',
    'hero-search-placeholder': 'hal., birth certificate, business permit',
    'hero-popular': 'Sikat:',
    'hero-birth-certificate': 'Birth Certificate',
    'hero-business-permit': 'Permit sa Negosyo',
    'hero-real-property-tax': 'Buwis sa Ari-arian',

    // Homepage - Popular Services
    'popular-services-subtitle':
      'Mabilis na access sa mga madalas na hinihinging serbisyo ng munisipalidad',
    'popular-browse-directory': 'Tingnan ang kumpletong direktoryo',

    // Homepage - Stats
    'stats-at-a-glance': 'Isang Tingin sa Agoo',
    'stats-view-statistics': 'Tingnan ang Estadistika',
    'stats-population-label': 'Populasyon',
    'stats-population-source': '2020 Senso',
    'stats-barangays-label': 'Mga Barangay',
    'stats-barangays-source': 'Mga Yunit Administratibo',
    'stats-municipality-label': 'Munisipalidad',
    'stats-municipality-source': 'Klasipikasyon ng Kita',
    'stats-land-area-label': 'Lawak ng Lupa',
    'stats-land-area-source': 'Kabuuang Lawak ng Munisipalidad',

    // Homepage - Weather & Map
    'weather-map-title': 'Panahon at Mapa ng Agoo',
    'weather-mainly-clear': 'Halos maaliwalas',
    'weather-location': 'Agoo, La Union',

    // Homepage - History
    'history-title': 'Maikling Kasaysayan ng Agoo',
    'history-era-precolonial': 'Bago ang Pananakop',
    'history-era-present': 'Kasalukuyan',
    'history-precolonial':
      'Kilala bilang "Puerto de Japón," ang Agoo ay isang masiglang daungang pandaigdig na nakikipagkalakalan sa mga Hapones, Tsino, at Ryukyuan bago ang pananakop ng Espanya.',
    'history-1578':
      'Itinatag nina Padre Juan Bautista Lucarelli at Padre Sebastian de Baeza, mga paring Pransiskano, ang bayan at parokya ng Agoo, at inialay ang misyon kay Santa Monica.',
    'history-1582':
      'Pinamahalaan ng mga misyonerong Agustino ang pamayanan. Iniuugnay ang pangalang Agoo sa "aroo," ang mga punong Casuarina na kahawig ng pino at dating nakahanay sa baybayin at mga pampang ng ilog.',
    'history-1850':
      'Naging bahagi ang Agoo ng bagong tatag na lalawigan ng La Union sa bisa ng kautusan ni Gobernador-Heneral Antonio María Blanco.',
    'history-1982':
      'Noong 15 Hulyo 1982, itinaas ni Papa Juan Pablo II ang Dambana ng Nuestra Señora de Caridad sa ranggong Basilica Minore.',
    'history-present':
      'Patuloy na umuunlad ang Agoo bilang sentro ng edukasyon, kalakalan, at kultura habang ipinagdiriwang ang pamana nito sa taunang Dinengdeng Festival.',
    'history-basilica-town-title': 'Ang Bayan ng Basilica',
    'history-basilica-town-desc':
      'Itinatag noong 1578, ang Agoo ang pinakamatandang bayan sa La Union at tahanan ng makasaysayang Basilica Minore ng Nuestra Señora de Caridad.',
    'history-puerto-de-japon-title': 'Puerto de Japón',
    'history-puerto-de-japon-desc':
      'Bago ang pananakop ng Espanya, nagsilbi ang Agoo bilang daungang pandaigdig para sa mga mangangalakal na Hapones, Tsino, at Ryukyuan.',
    'news-announcement': 'Anunsyo',
    'news-project': 'Proyekto',
    'news-advisory': 'Abiso',
    'news-business-permit-title': 'Pag-renew ng Permit sa Negosyo 2025',
    'news-business-permit-desc':
      'Ang deadline para sa pag-renew ng permit sa negosyo ay Enero 20, 2025. Hinihikayat ang maagang pag-renew.',
    'news-market-title': 'Bagong Wing ng Pampublikong Palengke Bukas Na',
    'news-market-desc':
      'Ang na-renovate na wing ng Pampublikong Palengke ng Agoo ay bukas na sa mga nagtitinda at publiko.',
    'news-power-title': 'Mga Abiso sa Serbisyo ng Kuryente',
    'news-power-desc':
      'Tingnan ang mga opisyal na anunsyo ng LUELCO para sa beripikadong iskedyul ng pagkawala ng kuryente at maintenance.',

    // Homepage - Quiz CTA
    'quiz-title': 'Agoo Quiz',
    'quiz-subtitle': 'Gaano mo kakilala ang Agoo, La Union?',
    'quiz-description':
      'Suriin ang iyong kaalaman sa pamana, pagkakakilanlan sa kultura, at kahalagahang heograpiko ng munisipalidad sa pamamagitan ng isang interactive na pagtatasa ng kaalaman na idinisenyo upang ipakita ang isa sa mga pinakatanyag na lokalidad ng La Union.',
    'quiz-take': 'Subukin ang Quiz',

    // Footer
    'footer-tagline':
      'Pagbibigay-kapangyarihan sa mga tao ng Agoo na may transparent na access sa mga serbisyo, programa, at pampublikong pondo ng LGU Agoo.',
    'footer-quick-links': 'Mga Mabilisang Link',
    'footer-resources': 'Mga Mapagkukunan',
    'footer-agoo-quiz': 'Agoo Quiz',
    'footer-sitemap': 'Mapa ng Site',
    'footer-citizens-charter': "Citizen's Charter",
    'footer-terms': 'Mga Tuntunin ng Paggamit',
    'footer-privacy': 'Patakaran sa Privacy',
    'footer-accessibility': 'Aksesibilidad',
    'footer-faq': 'FAQ',
    'footer-open-data': 'Open Data Philippines',
    'footer-foi': 'Kalayaan sa Impormasyon',
    'footer-lgu-portal': 'Opisyal na Portal ng LGU Agoo',
    'footer-sb': 'Sangguniang Bayan',
    'footer-lgu-facebook': 'LGU Agoo Facebook',
    'footer-blgf': 'BLGF Portal',
    'footer-cmci': 'CMCI DTI Portal',
    'footer-cost': 'Gastos sa mga Tao ng Agoo =',
    'footer-volunteer': 'Mag-volunteer sa amin',
    'footer-contribute': 'Mag-ambag ng code sa amin',
    'footer-copyright-text': 'BetterAgoo.org',
    'footer-copyright-disclaimer':
      'Lahat ng pampublikong impormasyon ay mula sa mga opisyal na portal ng pamahalaan.',
    'footer-skip-to-main': 'Lumaktaw sa pangunahing nilalaman',
  },
  ilo: {
    'emergency-header-911': 'Emerhensia',
    'emergency-header-mdrrmo': 'MDRRMO',
    'emergency-header-pnp': 'Pulis',
    'emergency-header-bfp': 'Bombero',
    'emergency-header-rhu': 'RHU–MHO',
    'emergency-header-coast-guard': 'Coast Guard',
    'emergency-header-lumc': 'LUMC',
    'emergency-header-luelco': 'LUELCO',
    'emergency-directory-subtitle':
      'Pinduten ti aniaman a numero tapno matawagan ti umno a serbisio ti emerhensia.',
    'emergency-directory-updated': 'Naudi a napabaro: Hulio 29, 2026',
    'emergency-network-smart': 'Smart',
    'emergency-network-globe': 'Globe',
    'emergency-network-landline': 'Landline',
    'emergency-network-mobile': 'Mobile',
    'emergency-network-emergency': 'Emerhensia',
    'emergency-agency-mdrrmo-agoo': 'MDRRMO – Agoo',
    'emergency-description-mdrrmo-agoo': 'Panangsungbat iti didigra ken emerhensia',
    'emergency-agency-rhu-mho-agoo': 'Agoo RHU–MHO',
    'emergency-description-rhu-mho-agoo': 'Dagiti pakaseknan iti salun-at',
    'emergency-agency-bfp-agoo': 'BFP – Estasion ti Agoo',
    'emergency-description-bfp-agoo': 'Kinatalged iti apuy ken dadduma pay nga emerhensia',
    'emergency-agency-pnp-agoo': 'PNP – Estasion ti Agoo',
    'emergency-description-pnp-agoo': 'Talna, urnos, ken seguridad',
    'emergency-agency-coast-guard-agoo': 'Coast Guard – Agoo',
    'emergency-description-coast-guard-agoo': 'Kinatalged ken emerhensia iti baybay',
    'emergency-agency-lumc': 'La Union Medical Center (LUMC)',
    'emergency-description-lumc': 'Ospital ken dagiti pakaseknan iti salun-at',
    'emergency-agency-luelco': 'LUELCO',
    'emergency-description-luelco': 'Dagiti pakaseknan iti kinatalged ti elektrisidad',
    'emergency-agency-pdrrmo-la-union': 'La Union PDRRMO / Rescue 911',
    'emergency-description-pdrrmo-la-union': 'Panangsungbat ti probinsia iti emerhensia',
    'contact-agoo-municipal-hall-address':
      'Munisipio ti Agoo, Cases Boulevard, Agoo, La Union 2504',

    // Agoo barangays
    'gov-brgy-ambitacay': 'Ambitacay',
    'gov-brgy-balawarte': 'Balawarte',
    'gov-brgy-capas': 'Capas',
    'gov-brgy-consolacion': 'Consolacion',
    'gov-brgy-macalva-central': 'Macalva Central',
    'gov-brgy-macalva-norte': 'Macalva Norte',
    'gov-brgy-macalva-sur': 'Macalva Sur',
    'gov-brgy-nazareno': 'Nazareno',
    'gov-brgy-purok': 'Purok',
    'gov-brgy-san-agustin-east': 'San Agustin East',
    'gov-brgy-san-agustin-norte': 'San Agustin Norte',
    'gov-brgy-san-agustin-sur': 'San Agustin Sur',
    'gov-brgy-san-antonino': 'San Antonino',
    'gov-brgy-san-antonio': 'San Antonio',
    'gov-brgy-san-francisco': 'San Francisco',
    'gov-brgy-san-isidro': 'San Isidro',
    'gov-brgy-san-joaquin-norte': 'San Joaquin Norte',
    'gov-brgy-san-joaquin-sur': 'San Joaquin Sur',
    'gov-brgy-san-jose-norte': 'San Jose Norte',
    'gov-brgy-san-jose-sur': 'San Jose Sur',
    'gov-brgy-san-juan': 'San Juan',
    'gov-brgy-san-julian-central': 'San Julian Central',
    'gov-brgy-san-julian-east': 'San Julian East',
    'gov-brgy-san-julian-norte': 'San Julian Norte',
    'gov-brgy-san-julian-west': 'San Julian West',
    'gov-brgy-san-manuel-norte': 'San Manuel Norte',
    'gov-brgy-san-manuel-sur': 'San Manuel Sur',
    'gov-brgy-san-marcos': 'San Marcos',
    'gov-brgy-san-miguel': 'San Miguel',
    'gov-brgy-san-nicolas-central': 'San Nicolas Central',
    'gov-brgy-san-nicolas-east': 'San Nicolas East',
    'gov-brgy-san-nicolas-norte': 'San Nicolas Norte',
    'gov-brgy-san-nicolas-sur': 'San Nicolas Sur',
    'gov-brgy-san-nicolas-west': 'San Nicolas West',
    'gov-brgy-san-pedro': 'San Pedro',
    'gov-brgy-san-roque-east': 'San Roque East',
    'gov-brgy-san-roque-west': 'San Roque West',
    'gov-brgy-san-vicente-norte': 'San Vicente Norte',
    'gov-brgy-san-vicente-sur': 'San Vicente Sur',
    'gov-brgy-santa-ana': 'Santa Ana',
    'gov-brgy-santa-barbara': 'Santa Barbara',
    'gov-brgy-santa-fe': 'Santa Fe',
    'gov-brgy-santa-maria': 'Santa Maria',
    'gov-brgy-santa-monica': 'Santa Monica',
    'gov-brgy-santa-rita': 'Santa Rita',
    'gov-brgy-santa-rita-east': 'Santa Rita East',
    'gov-brgy-santa-rita-norte': 'Santa Rita Norte',
    'gov-brgy-santa-rita-sur': 'Santa Rita Sur',
    'gov-brgy-santa-rita-west': 'Santa Rita West',

    // Navigation - Ilocano
    'nav-home': 'Pagtaengan',
    'nav-history': 'Ababa a Pakasaritaan',
    'nav-services': 'Dagiti Serbisyo',
    'nav-government': 'Gobierno',
    'nav-statistics': 'Estadistika',
    'nav-legislative': 'Lehislatura',
    'nav-transparency': 'Transparensiya',
    'nav-contact': 'Kontaken',

    // Appointment CTA
    'appointment-cta-heading':
      'Panagpasayaat ti Serbisio ti Appointment ti Opisina ti Alkalde ti LGU Agoo',
    'appointment-cta-subtitle': 'Awan pila. Awan agpapasubli. Nasayaat nga appointment laeng.',
    'appointment-schedule-btn': 'Ag-iskedyul ti Appointment',
    'appointment-create-btn': 'Agaramid ti Account',

    // Hero Section
    'hero-welcome': 'Naragsak nga Isasangbay iti BetterAgoo.org',
    'hero-subtitle':
      'Aksesen dagiti serbisyo ti gobierno, impormasyon, ken dagiti resources para kadagiti umili ti Agoo, La Union.',
    'hero-find-service': 'Agsapul ti Serbisyo',

    // Popular Services
    'section-popular': 'Dagiti Popular a Serbisyo',
    'service-certificates': 'Dagiti Sertipiko',
    'service-certificates-desc': 'Sertipiko ti pannakayanak, kasar, ken patay',
    'service-business': 'Permit ti Negosyo',
    'service-business-desc': 'Baro a permit ken panagrenew',
    'service-tax': 'Panagbayad ti Buwis',
    'service-tax-desc': 'Buwis ti sanikua ken negosyo',
    'service-social': 'Serbisyo Sosyal',
    'service-social-desc': 'Serbisyo para kadagiti senior citizen ken PWD',
    'service-health': 'Serbisyo ti Salun-at',
    'service-health-desc': 'Tulong medikal ken dagiti programa',
    'btn-view-all-services': 'Kitaen Amin a Serbisyo',

    // Latest Updates
    'section-updates': 'Kabarbaro nga Update',
    'btn-view-all': 'Kitaen Amin',

    // Municipal Leadership
    'section-leadership': 'Panguluan ti Munisipalidad',
    'title-mayor': 'Mayor ti Munisipalidad',
    'title-vice-mayor': 'Bise Mayor ti Munisipalidad',
    'btn-view-officials': 'Kitaen Amin nga Opisyal',

    // Contact Section
    'section-contact': 'Impormasyon ti Panagkontak',
    'contact-phone': 'Telepono',
    'contact-email': 'Email',
    'contact-address': 'Adres',
    'contact-hours': 'Lunes-Biernes: 8:00 AM - 5:00 PM',
    'contact-response': 'Sumungbat kami iti uneg ti 24 nga oras',
    'contact-municipal-hall': 'Munisipio',

    // Services Page
    'services-title': 'Direktorio ti Serbisyo ti Munisipalidad',
    'services-subtitle': 'Kitaen amin a serbisyo nga idatag ti Munisipalidad ti Agoo',
    'life-events-title': 'Agsapul Segun iti Pasamak iti Biag',
    'life-events-subtitle': 'Biroken dagiti serbisyo segun iti mapasamak iti biagmo',
    'life-starting-business': 'Mangrugi ti Negosyo',
    'life-getting-married': 'Agkasar',
    'life-having-baby': 'Addaan ti Ubing',
    'life-financial-help': 'Kasapulan ti Tulong Pinansyal',
    'life-senior': 'Serbisyo para kadagiti Senior Citizen',
    'life-pwd': 'Tao nga Addaan Kapansanan',
    'life-building': 'Panagbangon/Panagpasayaat ti Balay',
    'life-trouble': 'Nairaman iti Problema',

    // Service Categories
    'cat-certificates': 'Dagiti Sertipiko ken Vital Records',
    'cat-certificates-desc':
      'Sertipiko ti pannakayanak, patay, kasar, ken dadduma pay a vital records.',
    'cat-business': 'Negosyo ken Kalakalan',
    'cat-business-desc':
      'Dagiti permit ti negosyo, lisensya, ken serbisyo ti panagparehistro ti kalakalan.',
    'cat-social': 'Serbisyo Sosyal',
    'cat-social-desc':
      'Dagiti programa ti welfare, serbisyo para kadagiti senior citizen, benepisyo ti PWD, ken tulong pinansyal.',
    'cat-health': 'Salun-at ken Wellness',
    'cat-health-desc': 'Dagiti programa ti bakuna, health certificates, ken tulong medikal.',
    'cat-tax': 'Panagbuwis ken Panagbayad',
    'cat-tax-desc': 'Buwis ti sanikua, buwis ti negosyo, panagbayad, ken tax clearance.',
    'cat-agriculture': 'Agrikultura',
    'cat-agriculture-desc':
      'Dagiti pautang ti agrikultura, insurance ti mula, tulong ti abono, ken panagsanay.',
    'cat-infrastructure': 'Imprastraktura',
    'cat-infrastructure-desc':
      'Dagiti permit ti konstruksyon, dawat ti panagmantener ti kalsada, ken pampubliko a pasilidad.',
    'cat-education': 'Edukasyon ken Iskolarship',
    'cat-education-desc':
      'Dagiti programa ti iskolarship, tulong ti estudiante, ken dagiti grant ti edukasyon.',
    'cat-safety': 'Kinatalged ti Publiko',
    'cat-safety-desc':
      'Dagiti serbisyo ti emergency, panagisagana ti kalamidad, ken dagiti programa ti kinatalged ti komunidad.',
    'cat-environment': 'Aglawlaw',
    'cat-environment-desc':
      'Dagiti permit ti aglawlaw, panagtaripato ti basura, ken dagiti programa ti konserbasyon.',

    // FAQ Page
    'faq-title': 'Masansan a Maisaludsod',
    'faq-subtitle':
      'Biruken dagiti sungbat kadagiti gagangay a saludsod maipapan kadagiti serbisyo ti munisipalidad',
    'faq-general': 'Dagiti Gagangay a Saludsod',
    'faq-certificates': 'Dagiti Sertipiko ken Dokumento',
    'faq-business': 'Negosyo ken Permit',
    'faq-payments': 'Panagbayad ken Bayadan',
    'faq-social': 'Serbisyo Sosyal',
    'faq-technical': 'Dagiti Teknikal a Saludsod',
    'faq-still-questions': 'Adda pay saludsodyo?',
    'faq-contact-help':
      'No saandayo a nasarakan ti sungbat a sapulenyo, dikay agmuna nga agkontak kadakami.',

    // Common Labels - Ilocano
    'label-fee': 'Bayad:',
    'label-time': 'Tiempo:',
    'label-free': 'Libre',
    'label-varies': 'Agdumaduma',
    'label-walk-in': 'Walk-in',
    'label-seasonal': 'Panawen',
    'label-1-day': '1 aldaw',
    'label-1-2-days': '1-2 aldaw',
    'label-3-5-days': '3-5 aldaw',
    'section-responsible-offices': 'Dagiti Responsable nga Opisina',

    // Health Page - Ilocano
    'health-page-title': 'Serbisio ti Salun-at',
    'health-page-desc': 'Dagiti konsulta medikal, bakuna, ken programa ti salun-at',
    'health-page-badge': 'Salun-at',
    'health-consultation': 'Konsulta Medikal',
    'health-consultation-desc': 'Libre a konsulta kadagiti Rural Health Units',
    'health-vaccination': 'Dagiti Programa ti Bakuna',
    'health-vaccination-desc': 'Libre nga immunization para kadagiti ubbing ken nataengan',
    'health-prenatal': 'Prenatal Care',
    'health-prenatal-desc': 'Libre a prenatal checkups ken serbisio',
    'health-dental': 'Serbisio Dental',
    'health-dental-desc': 'Basiko a dental care ken panagbunot',
    'health-stats-title': 'Estadistika ti Salun-at',
    'health-rhu': 'Rural Health Units',
    'health-bhw': 'Barangay Health Workers',
    'health-hospitals-title': 'Dagiti Ospital iti Lugar',
    'label-schedule-varies': 'Agduduma ti iskedyul',
    'label-by-appointment': 'Babaen ti appointment',
    'label-free-subsidy': 'Libre (subsidiya)',
    'label-1-3-days': '1-3 nga aldaw',
    'health-maternal': 'Panangaywan iti Ina',
    'health-maternal-desc': 'Serbisio ti salun-at sakbay ken kalpasan ti panaganak',
    'health-medicine': 'Tulong iti Agas',
    'health-medicine-desc': 'Tulong pinansyal para iti agas babaen ti MSWDO',
    'health-stat-facilities': 'Dagup a Pasilidad ti Salun-at',
    'health-stat-hospitals': 'Dagiti Kangrunaan nga Ospital',
    'health-stat-mho': 'Opisina ti Salun-at ti Munisipalidad',
    'health-section-hospitals': 'Dagiti Ospital idiay Agoo',
    'health-section-mho': 'Opisina ti Salun-at ti Munisipalidad',
    'health-bhs-subtitle':
      '22 a Barangay Health Stations/Centers a mangserserbisio iti amin a barangay ti Agoo',
    'health-mho-title': 'Opisina ti Salun-at ti Munisipalidad ti Agoo',
    'health-mho-desc':
      'Ti Municipal Health Office ket mangted ti kangrunaan a serbisio ti salun-at a mairaman ti lying-in facility ken serbisio ti laboratorio. Daytoy ti kangrunaan a public health center ti munisipalidad.',
    'health-service-lying-in': 'Lying-in Facility',
    'health-service-laboratory': 'Serbisio ti Laboratorio',
    'health-service-immunization': 'Immunisasion',
    'health-service-prenatal': 'Panangyawan Sakbay Panaganak',
    'health-service-family-planning': 'Panagplano ti Pamilya',
    'health-service-tb-dots': 'TB-DOTS',
    'health-pltciluis-a-tiam-medical-center': 'PLTCI-Luis A. Tiam Medical Center',
    'health-a-tertiary-level-philhealthaccredited-private':
      'A tertiary level, PhilHealth-accredited pribadong hospital nagbibigay ti komprehensibong dagiti serbisyong medikal.',
    'health-national-highway-agoo': 'Nailian Highway, Agoo',
    'health-medical-mission-group-hospital-health-services':
      'Medical Mission Group Hospital & Health Dagiti serbisio Cooperative',
    'health-also-known-as-new-mmg-hospital-providing-quality':
      'Also known as Baro a MMG Hospital, nagbibigay ti quality dagiti serbisio iti kalusugan iti ti community.',
    'health-consolacion-road-brgy-consolacion': 'Consolacion Road, Brgy. Consolacion',
    'health-salubris-inc-salubris-medical-center': 'SALUBRIS, INC. (Salubris Medical Center)',
    'health-private-medical-center-offering-various':
      'Pribado medical center offering various healthcare and diagnostic dagiti serbisio.',
    'health-hivcare-cta-eyebrow': 'Opisial a Direktorio manipud iti DOH',
    'health-hivcare-cta-heading':
      'Birukem ti Pasilidad para iti Panangagas ken Panangaywan iti HIV',
    'health-hivcare-cta-desc':
      'A searchable, mobile-first web directory of all 338 DOH-designated HIV treatment and care facilities in the Philippines, sourced from DOH Circular No. 2026-0065.',
    'health-hivcare-cta-btn': 'Find HIV Care Facilities',
    'health-hivcare-cta-stat-facilities': 'Pasilidad iti Intero a Pagilian',
    'health-hivcare-cta-stat-mobile': 'Mobile-Friendly a Panagbirok',
    'health-hivcare-cta-stat-verified': 'Naverify ti DOH',

    // Agriculture Page - Ilocano
    'agri-page-title': 'Serbisio ti Agrikultura',
    'agri-page-desc': 'Suporta kadagiti mannalon ken progreso ti agrikultura',
    'agri-page-badge': 'Agrikultura',
    'agri-seedling': 'Panangibuno ti Mula',
    'agri-seedling-desc': 'Libre a buto ken mula para kadagiti mannalon',
    'agri-equipment': 'Gamit iti Talon',
    'agri-equipment-desc': 'Pagrenta ken tulong iti gamit',
    'agri-livelihood': 'Dagiti Programa ti Panagbiag',
    'agri-livelihood-desc': 'Panagsanay ken suporta para kadagiti mannalon',
    'agri-office-mao': 'Opisina ti Agrikultura ti Munisipalidad',
    'agri-office-mao-desc':
      'Panagrehistro iti RSBSA, sertipikasion, programa ti irik/mais, livestock, serbisio ti panagkalap',

    // Ordinance Framework Page - Ilocano
    'ord-page-title': 'Balangkas ti Ordinansa',
    'ord-page-desc': 'Dagiti ordinansa a naipasa ti Sangguniang Bayan ng Agoo',
    'ord-page-badge': 'Lehislatura',
    'ord-what-is': 'Ania ti Ordinansa?',
    'ord-what-is-p1':
      'Ti munisipal nga ordinansa ket lokal a linteg a naipasa ti Sangguniang Bayan (Konseho ti Munisipalidad) a mangituray ti munisipalidad ken dagiti residente na. Dagiti ordinansa ket addaan ti pigsa ken epekto ti linteg iti saklaw ti munisipalidad.',
    'ord-what-is-p2':
      'Dagiti ordinansa ket mabalin a manakup kadagiti nadumaduma a paksa a mairaman ngem saan a limitado iti: panagbuwis, regulasion ti negosio, kaligtasan pampubliko, proteksion ti aglawlaw, panagtaripato ti trapiko, ken zoning.',
    'ord-categories-title': 'Dagiti Kategorya ti Ordinansa',
    'ord-cat-revenue': 'Kita ken Panagbuwis',
    'ord-cat-business': 'Negosio ken Kalakalan',
    'ord-cat-safety': 'Kaligtasan Pampubliko',
    'ord-cat-environment': 'Aglawlaw',
    'ord-cat-traffic': 'Trapiko ken Transportasion',
    'ord-cat-zoning': 'Zoning ken Panagusar ti Daga',
    'ord-2025-title': 'Dagiti Ordinansa ti 2025',
    'ord-2025-subtitle':
      'Dagiti opisial nga ordinansa a naipasa ti Sangguniang Bayan ng Agoo iti 2025',
    'ord-table-number': 'Numero ti Ordinansa',
    'ord-table-title': 'Titulo',
    'ord-table-date': 'Petsa ti Sesion',
    'ord-view-all': 'Kitaen Amin nga Ordinansa iti SB Website',

    // Resolution Framework Page - Ilocano
    'reso-page-title': 'Balangkas ti Resolusion',
    'reso-page-desc': 'Dagiti resolusion a naipasa ti Sangguniang Bayan ng Agoo',
    'reso-page-badge': 'Lehislatura',
    'reso-what-is': 'Ania ti Resolusion?',
    'reso-what-is-p1':
      'Ti resolusion ket pormal a panangibaga ti opinion wenno pagayatan ti Sangguniang Bayan. Saan a kas kadagiti ordinansa, dagiti resolusion ket awan ti pigsa ken epekto ti linteg ngem agserbida a kas opisial a pahayag ti lehislatura.',
    'reso-what-is-p2':
      'Dagiti resolusion ket kadawyan a mausar para iti: panangpadayaw, dawat kadagiti nangatngato nga ahensya ti gobierno, panangibaga ti suporta wenno supiat, ken dagiti administratibo a banag ti Sangguniang Bayan.',
    'reso-types-title': 'Dagiti Kita ti Resolusion',
    'reso-type-commendation': 'Panangpadayaw',
    'reso-type-request': 'Dawat/Apela',
    'reso-type-support': 'Suporta/Endorsement',
    'reso-type-condolence': 'Pakipaglungkot',
    'reso-type-authorization': 'Awtorisasion',
    'reso-type-appropriation': 'Apropriyasion',
    'reso-2026-title': 'Dagiti Resolusion ti 2026',
    'reso-2026-subtitle':
      'Dagiti opisial a resolusion a naipasa ti Sangguniang Bayan ng Agoo iti 2026',
    'reso-2025-title': 'Dagiti Resolusion ti 2025',
    'reso-2025-subtitle':
      'Dagiti opisial a resolusion a naipasa ti Sangguniang Bayan ng Agoo iti 2025',
    'reso-table-number': 'Numero ti Resolusion',
    'reso-table-title': 'Titulo',
    'reso-table-date': 'Petsa ti Sesion',
    'reso-view-all': 'Kitaen Amin a Resolusion iti SB Website',

    // Business Services Page - Ilocano
    'biz-page-title': 'Serbisio ti Negosio',
    'biz-page-desc': 'Dagiti permit, lisensya, ken suporta para kadagiti negosio idiay Agoo',
    'biz-page-badge': 'Negosio',
    'biz-permit-new': 'Permit ti Negosio (Baro)',
    'biz-permit-new-desc': "Agaplikar ti baro a mayor's permit para iti negosio",
    'biz-permit-renew': 'Panag-renew ti Permit ti Negosio',
    'biz-permit-renew-desc': 'I-renew ti tawenantawen a permit ti negosio',
    'biz-closure': 'Panagrikep ti Negosio',
    'biz-closure-desc': 'Proseso ti panagrikep ken clearance ti negosio',
    'biz-cedula': 'Sedula (CTC)',
    'biz-cedula-desc': 'Community tax certificate para kadagiti indibidual ken negosio',
    'biz-online-badge': 'Online Services babaen ti Filipizen',
    'biz-online-title': 'Online a Transaksion ti Negosio',
    'biz-online-subtitle':
      'Kompleto dagiti transaksionmo iti negosio online babaen ti opisial a portal ti Filipizen',
    'biz-billing': 'Online Billing ken Panagbayad ti Negosio',
    'biz-billing-desc': 'Kitaen ken bayadan dagiti business tax bills online',

    // Tax & Payments Page - Ilocano
    'tax-page-title': 'Buwis ken Panagbayad',
    'tax-page-desc':
      'Buwis ti sanikua, buwis ti negosio, ken dadduma pay a bayadan iti munisipalidad',
    'tax-page-badge': 'Buwis ken Panagbayad',
    'tax-property': 'Real Property Tax',
    'tax-property-desc': 'Tawenantawen a buwis ti daga ken dagiti pagpasayaat',
    'tax-business': 'Buwis ti Negosio',
    'tax-business-desc': 'Quarterly ken tawenantawen a panagbayad ti buwis ti negosio',
    'tax-online-badge': 'Online Services babaen ti Filipizen',
    'tax-online-title': 'Online a Transaksion ti Buwis',
    'tax-online-subtitle':
      'Kompleto dagiti panagbayad ti buwis online babaen ti opisial a portal ti Filipizen',

    // Social Services Page - Ilocano
    'social-page-title': 'Serbisio Sosyal',
    'social-page-desc':
      'Dagiti programa ti suporta para kadagiti vulnerable a sektor ken komunidad',
    'social-page-badge': 'Serbisio Sosyal',
    'social-senior': 'Senior Citizen ID',
    'social-senior-desc': 'ID para kadagiti umili nga 60 a tawen pataas',
    'social-pwd': 'PWD ID',
    'social-pwd-desc': 'Pagbibiagian para kadagiti addaan ti kapansanan',
    'social-assistance': 'Tulong Pinansyal',
    'social-assistance-desc':
      'Emergency a tulong pinansyal para iti medikal, libing, ken edukasion',

    // Education Page - Ilocano
    'edu-page-title': 'Serbisio ti Edukasion',
    'edu-page-desc': 'Dagiti programa ti iskolarship ken tulong pang-edukasion',
    'edu-page-badge': 'Edukasion',
    'edu-scholarship': 'Dagiti Programa ti Iskolarship',
    'edu-scholarship-desc': 'Dagiti iskolarship ti munisipalidad para kadagiti estudiante',
    'edu-training': 'Tulong Pang-edukasion',
    'edu-training-desc': 'Tulong pinansyal para iti edukasion',

    // Infrastructure Page - Ilocano
    'infra-page-title': 'Serbisio ti Imprastraktura',
    'infra-page-desc': 'Building permits, konstruksion, ken serbisio ti engineering',
    'infra-page-badge': 'Imprastraktura',
    'infra-building': 'Building Permit',
    'infra-building-desc': 'Permit para iti baro a konstruksion ken renovation',
    'infra-occupancy': 'Occupancy Permit',
    'infra-occupancy-desc': 'Certificate of occupancy para kadagiti nalpas a pasdek',
    'infra-engineering': 'Serbisio ti Engineering',
    'infra-engineering-desc': 'Teknikal a tulong ken panagrepaso ti plano',

    // Public Safety Page - Ilocano
    'safety-page-title': 'Serbisio ti Kaligtasan Pampubliko',
    'safety-page-desc': 'Tugon iti emergency ken panagisagana iti kalamidad',
    'safety-page-badge': 'Kaligtasan Pampubliko',
    'safety-disaster': 'Tugon iti Emergency',
    'safety-disaster-desc': '24/7 a tugon ken serbisio ti rescue iti emergency',
    'safety-relief': 'Tulong iti Kalamidad',
    'safety-relief-desc': 'Relief goods ken suporta iti panaglikas',
    'safety-preparedness': 'Panagisagana iti Kalamidad',
    'safety-preparedness-desc': 'Panagsanay ken dagiti resources para iti disaster readiness',

    // Environment Page - Ilocano
    'env-page-title': 'Serbisio ti Aglawlaw',
    'env-page-desc': 'Panagtaripato ti basura ken proteksion ti aglawlaw',
    'env-page-badge': 'Aglawlaw',
    'env-waste': 'Panangurnong ti Basura',
    'env-waste-desc': 'Dagiti iskedyul ti panangurnong ti basura segun iti barangay',
    'env-recycling': 'Programa ti Recycling',
    'env-recycling-desc': 'Segregasion ken dagiti inisyatiba ti recycling',

    // Header Dropdown Items
    'dropdown-certificates': 'Dagiti Sertipiko',
    'dropdown-business': 'Negosio',
    'dropdown-tax-payments': 'Panagbayad ti Buwis',
    'dropdown-social-services': 'Serbisio Sosyal',
    'dropdown-health': 'Salun-at',
    'dropdown-agriculture': 'Agrikultura',
    'dropdown-infrastructure': 'Imprastraktura',
    'dropdown-education': 'Edukasion',
    'dropdown-public-safety': 'Kaligtasan Pampubliko',
    'dropdown-environment': 'Aglawlaw',
    'dropdown-ordinance-framework': 'Balangkas ti Ordinansa',
    'dropdown-resolution-framework': 'Balangkas ti Resolusion',

    // Homepage - Hero
    'hero-browse-services': 'Kitaen dagiti Serbisio',
    'hero-contact-us': 'Kontaken',
    'hero-search-placeholder': 'kas pagarigan, birth certificate, business permit',
    'hero-popular': 'Popular:',
    'hero-birth-certificate': 'Birth Certificate',
    'hero-business-permit': 'Permit ti Negosio',
    'hero-real-property-tax': 'Buwis ti Kukua',

    // Homepage - Popular Services
    'popular-services-subtitle':
      'Napartak a panag-akses kadagiti masansan a makiddaw a serbisio ti munisipalidad',
    'popular-browse-directory': 'Kitaen ti kompleto a direktorio',

    // Homepage - Stats
    'stats-at-a-glance': 'Maysa a Panagkita iti Agoo',
    'stats-view-statistics': 'Kitaen ti Estadistika',
    'stats-population-label': 'Populasion',
    'stats-population-source': '2020 a Senso',
    'stats-barangays-label': 'Dagiti Barangay',
    'stats-barangays-source': 'Dagiti Yunit Administratibo',
    'stats-municipality-label': 'Munisipalidad',
    'stats-municipality-source': 'Klasipikasion ti Sapul',
    'stats-land-area-label': 'Kalawa ti Daga',
    'stats-land-area-source': 'Dagup a Kalawa ti Munisipalidad',

    // Homepage - Weather & Map
    'weather-map-title': 'Tiempo ken Mapa ti Agoo',
    'weather-mainly-clear': 'Kaaduan a nalawag',
    'weather-location': 'Agoo, La Union',

    // Homepage - History
    'history-title': 'Ababa a Pakasaritaan ti Agoo',
    'history-era-precolonial': 'Sakbay ti Kolonisasion',
    'history-era-present': 'Agdama',
    'history-precolonial':
      'Naam-ammo kas "Puerto de Japón," ti Agoo ket narang-ay nga internasional a puerto a nakilaklako kadagiti negosiante a Hapon, Tsino, ken Ryukyuan sakbay ti panangkolonia ti Espanya.',
    'history-1578':
      'Dagiti padi a Pransiskano a da Padre Juan Bautista Lucarelli ken Padre Sebastian de Baeza ti nangipasdek iti ili ken parokia ti Agoo, ket indatonda ti mision ken Santa Monica.',
    'history-1582':
      'Dagiti misionero nga Agustino ti nangimaton iti komunidad. Ti nagan nga Agoo ket mainaig iti "aroo," dagiti kasla pino a kayo a Casuarina a naglinia idi iti igid ti baybay ken karayan.',
    'history-1850':
      'Nairaman ti Agoo iti baro a naipasdek a probinsia ti La Union babaen iti bilin ni Gobernador-Heneral Antonio María Blanco.',
    'history-1982':
      'Idi 15 Hulio 1982, intan-ok ni Papa Juan Pablo II ti Santuario ti Nuestra Señora de Caridad iti ranggo kas Basilica Minore.',
    'history-present':
      'Agtultuloy a rumang-ay ti Agoo kas sentro ti edukasion, komersio, ken kultura bayat a rambakanna ti tawidna babaen iti tinawen a Dinengdeng Festival.',
    'history-basilica-town-title': 'Ti Ili ti Basilica',
    'history-basilica-town-desc':
      'Naipasdek idi 1578, ti Agoo ti kadaanan nga ili iti La Union ken pagtaengan ti naipateg a Basilica Minore ti Nuestra Señora de Caridad.',
    'history-puerto-de-japon-title': 'Puerto de Japón',
    'history-puerto-de-japon-desc':
      'Sakbay ti panangkolonia ti Espanya, nagserbi ti Agoo kas internasional a puerto dagiti negosiante a Hapon, Tsino, ken Ryukyuan.',

    // Homepage - News
    'news-announcement': 'Pakaammo',
    'news-project': 'Proyekto',
    'news-advisory': 'Abiso',
    'news-business-permit-title': 'Panag-renew ti Permit ti Negosio 2025',
    'news-business-permit-desc':
      'Ti deadline para iti panag-renew ti permit ti negosio ket Enero 20, 2025. Maparegta ti nasapa a panag-renew.',
    'news-market-title': 'Baro a Wing ti Pampubliko a Tiendaan Nalukat',
    'news-market-desc':
      'Ti na-renovate a wing ti Pampubliko a Tiendaan ti Agoo ket nalukat kadagiti aglaklako ken publiko.',
    'news-power-title': 'Dagiti Pakaammo iti Serbisyo ti Kuryente',
    'news-power-desc':
      'Kitaen dagiti opisial a pakaammo ti LUELCO para kadagiti napaneknekan nga iskediul ti pannakapukaw ti kuryente ken maintenance.',

    // Homepage - Quiz CTA
    'quiz-title': 'Agoo Quiz',
    'quiz-subtitle': 'Kasano ti pannakaammom iti Agoo, La Union?',
    'quiz-description':
      'Evaluaren ti pannakaammom iti tawid, kultural a pagbigbigan, ken heograpiko a kapatgan ti munisipalidad babaen ti maysa nga interactive a panagsubok ti pannakaammo a naidisinio tapno ipakita ti maysa kadagiti kalatakan a lokalidad ti La Union.',
    'quiz-take': 'Subokan ti Quiz',

    // Footer
    'footer-tagline':
      'Panangted ti bileg kadagiti umili ti Agoo nga addaan ti transparente a panag-akses kadagiti serbisio, programa, ken pampubliko a pondo ti LGU Agoo.',
    'footer-quick-links': 'Dagiti Napartak a Silpo',
    'footer-resources': 'Dagiti Rekurso',
    'footer-agoo-quiz': 'Agoo Quiz',
    'footer-sitemap': 'Mapa ti Site',
    'footer-citizens-charter': "Citizen's Charter",
    'footer-terms': 'Dagiti Kondision ti Panagusar',
    'footer-privacy': 'Pagannurotan ti Pagkapribado',
    'footer-accessibility': 'Aksesibilidad',
    'footer-faq': 'FAQ',
    'footer-open-data': 'Open Data Philippines',
    'footer-foi': 'Wayawaya ti Impormasion',
    'footer-lgu-portal': 'Opisial a Portal ti LGU Agoo',
    'footer-sb': 'Sangguniang Bayan',
    'footer-lgu-facebook': 'LGU Agoo Facebook',
    'footer-blgf': 'BLGF Portal',
    'footer-cmci': 'CMCI DTI Portal',
    'footer-cost': 'Gastos kadagiti Umili ti Agoo =',
    'footer-volunteer': 'Ag-volunteer kadakami',
    'footer-contribute': 'Ag-ambag ti code kadakami',
    'footer-copyright-text': 'BetterAgoo.org',
    'footer-copyright-disclaimer':
      'Amin a pampubliko nga impormasion ket nagtaud kadagiti opisial a portal ti gobierno.',
    'footer-skip-to-main': 'Lumaktaw iti kangrunaan a linaon',
  },
};

type Language = 'en' | 'fil' | 'ilo';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('betteragoo_lang') as Language;
    if (savedLang && ['en', 'fil', 'ilo'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('betteragoo_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
