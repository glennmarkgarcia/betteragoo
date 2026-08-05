'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

function isMobileNav(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 1399px)').matches;
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
    e.preventDefault();
    setOpenDropdown((prev) => (prev === index ? null : index));
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
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo-container">
            <Link href="/">
              <img
                src="/assets/images/logo/better-agoo-logo.png"
                alt="Better Agoo Logo"
                className="logo-img"
              />
              <span className="logo-text">
                BetterAgoo.org
                <span className="hide-on-mobile">
                  Community portal of Agoo, La Union (unofficial)
                </span>
              </span>
            </Link>
          </div>

          <nav
            ref={navRef}
            className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}
            aria-label="Main Navigation"
          >
            <ul>
              {/* SERVICES MEGA MENU */}
              <li className={`has-dropdown has-mega-menu ${openDropdown === 0 ? 'dropdown-open' : ''}`}>
                <Link
                  href="/services"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 0 ? 'true' : 'false'}
                  onClick={(e) => toggleDropdown(0, e)}
                >
                  {t('nav-services')}
                </Link>
                <div className="mega-menu">
                  <div className="container">
                    <div className="mega-menu-grid">
                      {/* Col 1: Online Services */}
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-globe2"></i>
                          <span>{t('mega-online-services')}</span>
                        </div>
                        <Link href="/services" className="mega-menu-link mega-menu-hub-link">
                          <i className="bi bi-grid-fill"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Services Overview & Search</span>
                            <span className="mega-menu-link-desc">Browse all 88 municipal walk-in & online services</span>
                          </div>
                        </Link>
                        <a href="https://agoolaunion.gov.ph/" target="_blank" rel="noopener noreferrer" className="mega-menu-link">
                          <i className="bi bi-shop"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Business Permit Billing</span>
                            <span className="mega-menu-link-desc">Pay or renew business permits online</span>
                          </div>
                        </a>
                        <a href="https://agoolaunion.gov.ph/" target="_blank" rel="noopener noreferrer" className="mega-menu-link">
                          <i className="bi bi-cash-coin"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Real Property Tax (Amilyar)</span>
                            <span className="mega-menu-link-desc">View bill & pay land/property tax</span>
                          </div>
                        </a>
                        <a href="https://agoolaunion.gov.ph/" target="_blank" rel="noopener noreferrer" className="mega-menu-link">
                          <i className="bi bi-box-arrow-up-right"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">View All Online Routes</span>
                            <span className="mega-menu-link-desc">11 live Agoo eLGU BPLS online routes</span>
                          </div>
                        </a>
                      </div>

                      {/* Col 2: Vital Records */}
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-file-earmark-text"></i>
                          <span>{t('mega-certificates-records')}</span>
                        </div>
                        <Link href="/service-details/birth-certificate" className="mega-menu-link">
                          <i className="bi bi-file-earmark-person"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Birth Certificate</span>
                            <span className="mega-menu-link-desc">Local certified copy (₱80 / 5–15 mins)</span>
                          </div>
                        </Link>
                        <Link href="/service-details/marriage-certificate" className="mega-menu-link">
                          <i className="bi bi-heart"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Marriage Certificate</span>
                            <span className="mega-menu-link-desc">Local registration & license (₱380)</span>
                          </div>
                        </Link>
                        <Link href="/service-details/death-certificate" className="mega-menu-link">
                          <i className="bi bi-file-earmark-x"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Death Certificate</span>
                            <span className="mega-menu-link-desc">Burial & transfer permits (Free / ₱50)</span>
                          </div>
                        </Link>
                        <Link href="/service-details/civil-registrar" className="mega-menu-link">
                          <i className="bi bi-building"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">BREQS PSA Outlet</span>
                            <span className="mega-menu-link-desc">Order PSA Birth/CENOMAR on-site</span>
                          </div>
                        </Link>
                      </div>

                      {/* Col 3: Business & Taxes */}
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-shop"></i>
                          <span>{t('mega-business-taxes')}</span>
                        </div>
                        <Link href="/service-details/business-permits-licensing" className="mega-menu-link">
                          <i className="bi bi-briefcase"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Business Permits (BPLS)</span>
                            <span className="mega-menu-link-desc">New business (10 mins) & Renewal (5 mins)</span>
                          </div>
                        </Link>
                        <Link href="/services/tax-payments" className="mega-menu-link">
                          <i className="bi bi-receipt"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Cedula & Local Taxes</span>
                            <span className="mega-menu-link-desc">Community Tax Certificate (₱5+ / 5 mins)</span>
                          </div>
                        </Link>
                        <Link href="/service-details/municipal-assessor" className="mega-menu-link">
                          <i className="bi bi-houses"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Tax Declarations</span>
                            <span className="mega-menu-link-desc">Certified copies (₱105) & Property inspection</span>
                          </div>
                        </Link>
                        <Link href="/service-details/tricycle-franchising" className="mega-menu-link">
                          <i className="bi bi-truck"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Tricycle Franchising</span>
                            <span className="mega-menu-link-desc">MTOP permit (₱1,440/yr) & 3-yr renewal</span>
                          </div>
                        </Link>
                      </div>

                      {/* Col 4: Permits & Community */}
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-hammer"></i>
                          <span>{t('mega-permits-social')}</span>
                        </div>
                        <Link href="/service-details/municipal-engineering" className="mega-menu-link">
                          <i className="bi bi-building-gear"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Building & Occupancy</span>
                            <span className="mega-menu-link-desc">Building permits & Occupancy certificates</span>
                          </div>
                        </Link>
                        <Link href="/service-details/mswdo-services" className="mega-menu-link">
                          <i className="bi bi-people"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Social Assistance (MSWDO)</span>
                            <span className="mega-menu-link-desc">AICS medical/burial assistance & Senior ID</span>
                          </div>
                        </Link>
                        <Link href="/service-details/municipal-agriculture" className="mega-menu-link">
                          <i className="bi bi-tree"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Agriculture & Fisheries</span>
                            <span className="mega-menu-link-desc">Free seedlings (55 mins) & Banca permits</span>
                          </div>
                        </Link>
                        <Link href="/services/health" className="mega-menu-link">
                          <i className="bi bi-heart-pulse"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Health & RHU Services</span>
                            <span className="mega-menu-link-desc">Free consultations & Vaccination</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* GOVERNANCE & TRANSPARENCY MEGA MENU */}
              <li className={`has-dropdown has-mega-menu ${openDropdown === 1 ? 'dropdown-open' : ''}`}>
                <Link
                  href="/government"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 1 ? 'true' : 'false'}
                  onClick={(e) => toggleDropdown(1, e)}
                >
                  {t('nav-governance')}
                </Link>
                <div className="mega-menu">
                  <div className="container">
                    <div className="mega-menu-grid">
                      {/* Col 1: Executive Offices */}
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-building"></i>
                          <span>{t('mega-executive-offices')}</span>
                        </div>
                        <Link href="/government" className="mega-menu-link mega-menu-hub-link">
                          <i className="bi bi-bank2"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Government & LGU Overview</span>
                            <span className="mega-menu-link-desc">Executive offices, Sangguniang Bayan & 49 Barangays</span>
                          </div>
                        </Link>
                        <Link href="/government" className="mega-menu-link">
                          <i className="bi bi-person-badge"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Office of the Mayor</span>
                            <span className="mega-menu-link-desc">Hon. Frank O. Sibuma, Municipal Mayor</span>
                          </div>
                        </Link>
                        <Link href="/government/officials" className="mega-menu-link">
                          <i className="bi bi-person-workspace"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Municipal Officials</span>
                            <span className="mega-menu-link-desc">Executive & Department Heads Directory</span>
                          </div>
                        </Link>
                      </div>

                      {/* Col 2: Legislative SB */}
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-bank"></i>
                          <span>{t('mega-legislative-sb')}</span>
                        </div>
                        <Link href="/legislative" className="mega-menu-link">
                          <i className="bi bi-journal-text"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Sangguniang Bayan</span>
                            <span className="mega-menu-link-desc">Vice Mayor Antonio P. Eslao & Councilors</span>
                          </div>
                        </Link>
                        <Link href="/legislative/ordinance-framework" className="mega-menu-link">
                          <i className="bi bi-file-earmark-ruled"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Ordinances</span>
                            <span className="mega-menu-link-desc">Municipal Revenue Code & Local Laws</span>
                          </div>
                        </Link>
                        <Link href="/legislative/resolution-framework" className="mega-menu-link">
                          <i className="bi bi-file-text"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Resolutions</span>
                            <span className="mega-menu-link-desc">Sangguniang Bayan Resolutions Register</span>
                          </div>
                        </Link>
                      </div>

                      {/* Col 3: Fiscal Transparency */}
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-cash-coin"></i>
                          <span>{t('mega-fiscal-transparency')}</span>
                        </div>
                        <Link href="/budget" className="mega-menu-link">
                          <i className="bi bi-pie-chart"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">FY 2025 BLGF Statement</span>
                            <span className="mega-menu-link-desc">₱141.59M Income & ₱332.91M Fund Balance</span>
                          </div>
                        </Link>
                      </div>

                      {/* Col 4: Infrastructure & Barangays */}
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-cone-striped"></i>
                          <span>{t('mega-infrastructure-community')}</span>
                        </div>
                        <Link href="/budget#infrastructure-investments" className="mega-menu-link">
                          <i className="bi bi-diagram-3"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Local Infrastructure</span>
                            <span className="mega-menu-link-desc">14 Municipal Projects (₱628M)</span>
                          </div>
                        </Link>
                        <Link href="/budget#dpwh-projects" className="mega-menu-link">
                          <i className="bi bi-geo-alt"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">DPWH National Projects</span>
                            <span className="mega-menu-link-desc">201 Official Agoo Contracts (₱3.52B)</span>
                          </div>
                        </Link>
                        <Link href="/government#barangays" className="mega-menu-link">
                          <i className="bi bi-houses"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">All 49 Barangays</span>
                            <span className="mega-menu-link-desc">Barangay Directory & Population Rankings</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* ABOUT AGOO & DATA MEGA MENU */}
              <li className={`has-dropdown has-mega-menu ${openDropdown === 2 ? 'dropdown-open' : ''}`}>
                <Link
                  href="/statistics"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 2 ? 'true' : 'false'}
                  onClick={(e) => toggleDropdown(2, e)}
                >
                  {t('nav-about-agoo')}
                </Link>
                <div className="mega-menu">
                  <div className="container">
                    <div className="mega-menu-grid mega-menu-grid-3">
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-graph-up-arrow"></i>
                          <span>{t('mega-demographics-census')}</span>
                        </div>
                        <Link href="/statistics" className="mega-menu-link mega-menu-hub-link">
                          <i className="bi bi-pie-chart-fill"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Statistics & Data Hub</span>
                            <span className="mega-menu-link-desc">Demographic facts, census trends & CMCI rankings</span>
                          </div>
                        </Link>
                        <Link href="/statistics" className="mega-menu-link">
                          <i className="bi bi-bar-chart-line"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">2020 Census Stats</span>
                            <span className="mega-menu-link-desc">66,028 Population & 52.84 km² Area</span>
                          </div>
                        </Link>
                      </div>
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-award"></i>
                          <span>{t('mega-cmci-awards')}</span>
                        </div>
                        <Link href="/statistics#cmci-rankings" className="mega-menu-link">
                          <i className="bi bi-trophy"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">2024 Region I Awards</span>
                            <span className="mega-menu-link-desc">1st Overall & 1st Infrastructure</span>
                          </div>
                        </Link>
                      </div>
                      <div className="mega-menu-col">
                        <div className="mega-menu-col-title">
                          <i className="bi bi-clock-history"></i>
                          <span>{t('mega-history-heritage')}</span>
                        </div>
                        <Link href="/#brief-history" className="mega-menu-link">
                          <i className="bi bi-landmark"></i>
                          <div className="mega-menu-link-content">
                            <span className="mega-menu-link-title">Basilica Town & Port</span>
                            <span className="mega-menu-link-desc">Founded 1578 & "Puerto de Japón"</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* CONTACT */}
              <li>
                <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>
                  {t('nav-contact')}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions hide-on-mobile">
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
