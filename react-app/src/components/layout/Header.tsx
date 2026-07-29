'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const emergencyHotlines = [
  {
    labelKey: 'emergency-header-911',
    label: 'Emergency',
    number: '911',
    tel: '911',
    icon: 'bi-life-preserver',
  },
  {
    labelKey: 'emergency-header-mdrrmo',
    label: 'MDRRMO',
    number: '0929 558 7444',
    tel: '09295587444',
    icon: 'bi-exclamation-triangle-fill',
  },
  {
    labelKey: 'emergency-header-pnp',
    label: 'Police',
    number: '0998 598 5153',
    tel: '09985985153',
    icon: 'bi-shield-fill',
  },
  {
    labelKey: 'emergency-header-bfp',
    label: 'Fire',
    number: '0949 641 0979',
    tel: '09496410979',
    icon: 'bi-fire',
  },
  {
    labelKey: 'emergency-header-rhu',
    label: 'RHU–MHO',
    number: '(072) 607-4187',
    tel: '0726074187',
    icon: 'bi-heart-pulse-fill',
  },
  {
    labelKey: 'emergency-header-coast-guard',
    label: 'Coast Guard',
    number: '0981 746 6184',
    tel: '09817466184',
    icon: 'bi-water',
  },
  {
    labelKey: 'emergency-header-lumc',
    label: 'LUMC',
    number: '0928 998 2588',
    tel: '09289982588',
    icon: 'bi-hospital-fill',
  },
  {
    labelKey: 'emergency-header-luelco',
    label: 'LUELCO',
    number: '0917 130 4907',
    tel: '09171304907',
    icon: 'bi-lightning-fill',
  },
];

function isMobileNav(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const scrollYRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const lockBodyScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
    document.body.classList.add('mobile-menu-open');
    document.body.style.top = `-${scrollYRef.current}px`;
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.classList.remove('mobile-menu-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollYRef.current);
  }, []);

  const closeMenu = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    unlockBodyScroll();
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 320);
  }, [unlockBodyScroll]);

  const toggleDropdown = useCallback((index: number, e: React.MouseEvent) => {
    if (isMobileNav()) {
      e.preventDefault();
      setOpenDropdown((prev) => (prev === index ? null : index));
    }
  }, []);

  // Close menu on route change
  useEffect(() => {
    isAnimatingRef.current = false;
    closeMenu();
  }, [pathname, closeMenu]);

  // Cleanup body scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.top = '';
    };
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        closeMenu();
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen, closeMenu]);

  // Escape key to close
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
        toggleRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, closeMenu]);

  // Close mobile menu on resize to desktop (debounced)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isMobileNav() && mobileMenuOpen) {
          isAnimatingRef.current = false;
          closeMenu();
        }
      }, 150);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen, closeMenu]);

  return (
    <>
      <div className="hotline-bar">
        <div className="container">
          <div className="hotline-inner">
            <div className="hotline-items hotline-items-react">
              <div className="hotline-items-track" aria-label="Emergency contacts scrolling">
                <div className="hotline-items-group">
                  {emergencyHotlines.map((hotline) => (
                    <a key={hotline.labelKey} href={`tel:${hotline.tel}`} className="hotline-item">
                      <i className={`bi ${hotline.icon}`} aria-hidden="true"></i>
                      <span>
                        {t(hotline.labelKey) || hotline.label}: {hotline.number}
                      </span>
                    </a>
                  ))}
                </div>
                <div className="hotline-items-group" aria-hidden="true">
                  {emergencyHotlines.map((hotline) => (
                    <a
                      key={`clone-${hotline.labelKey}`}
                      href={`tel:${hotline.tel}`}
                      className="hotline-item"
                      tabIndex={-1}
                    >
                      <i className={`bi ${hotline.icon}`} aria-hidden="true"></i>
                      <span>
                        {t(hotline.labelKey) || hotline.label}: {hotline.number}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo-container">
            <Link href="/">
              <img
                src="/assets/images/logo/better-agoo-logo.svg"
                alt="Better Agoo Logo"
                className="logo-img"
              />
            </Link>
          </div>

          <nav
            ref={navRef}
            className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}
            aria-label="Main Navigation"
          >
            <ul>
              <li>
                <Link href="/" className={pathname === '/' ? 'active' : ''}>
                  {t('nav-home')}
                </Link>
              </li>
              <li>
                <Link href="/#brief-history">{t('nav-history')}</Link>
              </li>
              <li className={`has-dropdown ${openDropdown === 0 ? 'dropdown-open' : ''}`}>
                <Link
                  href="/services"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 0 ? 'true' : 'false'}
                  onClick={(e) => toggleDropdown(0, e)}
                >
                  {t('nav-services')}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/services/certificates">{t('dropdown-certificates')}</Link>
                  </li>
                  <li>
                    <Link href="/services/business">{t('dropdown-business')}</Link>
                  </li>
                  <li>
                    <Link href="/services/tax-payments">{t('dropdown-tax-payments')}</Link>
                  </li>
                  <li>
                    <Link href="/services/social-services">{t('dropdown-social-services')}</Link>
                  </li>
                  <li>
                    <Link href="/services/health">{t('dropdown-health')}</Link>
                  </li>
                  <li>
                    <Link href="/services/agriculture">{t('dropdown-agriculture')}</Link>
                  </li>
                  <li>
                    <Link href="/services/infrastructure">{t('dropdown-infrastructure')}</Link>
                  </li>
                  <li>
                    <Link href="/services/education">{t('dropdown-education')}</Link>
                  </li>
                  <li>
                    <Link href="/services/public-safety">{t('dropdown-public-safety')}</Link>
                  </li>
                  <li>
                    <Link href="/services/environment">{t('dropdown-environment')}</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/government">{t('nav-government')}</Link>
              </li>
              <li>
                <Link href="/statistics">{t('nav-statistics')}</Link>
              </li>
              <li className={`has-dropdown ${openDropdown === 1 ? 'dropdown-open' : ''}`}>
                <Link
                  href="/legislative"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 1 ? 'true' : 'false'}
                  onClick={(e) => toggleDropdown(1, e)}
                >
                  {t('nav-legislative')}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/legislative/ordinance-framework">
                      {t('dropdown-ordinance-framework')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/legislative/resolution-framework">
                      {t('dropdown-resolution-framework')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/budget">{t('nav-transparency')}</Link>
              </li>
              <li>
                <Link href="/contact">{t('nav-contact')}</Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <div className="lang-selector">
              <button
                type="button"
                className={`btn btn-secondary btn-sm lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                className={`btn btn-secondary btn-sm lang-btn ${language === 'fil' ? 'active' : ''}`}
                onClick={() => setLanguage('fil')}
                aria-label="Switch to Filipino"
              >
                FIL
              </button>
              <button
                type="button"
                className={`btn btn-secondary btn-sm lang-btn ${language === 'ilo' ? 'active' : ''}`}
                onClick={() => setLanguage('ilo')}
                aria-label="Switch to Ilocano"
              >
                ILO
              </button>
            </div>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="mobile-menu-toggle btn btn-secondary"
            onClick={() => {
              if (isAnimatingRef.current) return;
              if (mobileMenuOpen) {
                closeMenu();
              } else {
                isAnimatingRef.current = true;
                setMobileMenuOpen(true);
                lockBodyScroll();
                setTimeout(() => {
                  isAnimatingRef.current = false;
                }, 320);
              }
            }}
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen ? 'true' : 'false'}
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true"></i>
          </button>
        </div>
      </header>
    </>
  );
}
