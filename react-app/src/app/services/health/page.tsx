'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HealthPage() {
  const { t } = useLanguage();

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">{t('nav-home')}</Link>
          <span>/</span>
          <Link href="/services">{t('nav-services')}</Link>
          <span>/</span>
          <span aria-current="page">{t('health-page-title')}</span>
        </nav>
      </div>

      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge">
              <i className="bi bi-heart-pulse-fill"></i>
              <span>{t('health-page-badge')}</span>
            </span>
            <h1>{t('health-page-title')}</h1>
            <p className="page-header-desc">{t('health-page-desc')}</p>
          </div>
        </div>
      </section>

      <section className="service-accuracy-notice" aria-labelledby="service-accuracy-title">
        <div className="container">
          <div className="service-accuracy-card">
            <i className="bi bi-info-circle-fill service-accuracy-icon" aria-hidden="true"></i>
            <div>
              <h2 id="service-accuracy-title">Service information status</h2>
              <p>
                Agoo&apos;s official Citizen&apos;s Charter was not available from a public official
                source during the 30 July 2026 review. Confirm exact requirements, fees, schedules,
                and routing with the Agoo RHU–MHO before transacting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            <div className="service-item-card">
              <h3 className="service-item-title">
                <i className="bi bi-hospital"></i>
                <span>{t('health-consultation')}</span>
              </h3>
              <p className="service-item-desc">{t('health-consultation-desc')}</p>
              <div className="service-item-meta">
                <span>
                  <strong>{t('label-fee')}</strong> Confirm with office
                </span>
                <span>
                  <strong>{t('label-time')}</strong> Confirm with office
                </span>
              </div>
            </div>

            <div className="service-item-card">
              <h3 className="service-item-title">
                <i className="bi bi-shield-plus"></i>
                <span>{t('health-vaccination')}</span>
              </h3>
              <p className="service-item-desc">{t('health-vaccination-desc')}</p>
              <div className="service-item-meta">
                <span>
                  <strong>{t('label-fee')}</strong> Confirm with office
                </span>
                <span>
                  <strong>{t('label-time')}</strong> Confirm with office
                </span>
              </div>
            </div>

            <div className="service-item-card">
              <h3 className="service-item-title">
                <i className="bi bi-heart"></i>
                <span>{t('health-maternal')}</span>
              </h3>
              <p className="service-item-desc">{t('health-maternal-desc')}</p>
              <div className="service-item-meta">
                <span>
                  <strong>{t('label-fee')}</strong> Confirm with office
                </span>
                <span>
                  <strong>{t('label-time')}</strong> Confirm with office
                </span>
              </div>
            </div>

            <div className="service-item-card">
              <h3 className="service-item-title">
                <i className="bi bi-prescription2"></i>
                <span>{t('health-medicine')}</span>
              </h3>
              <p className="service-item-desc">{t('health-medicine-desc')}</p>
              <div className="service-item-meta">
                <span>
                  <strong>{t('label-fee')}</strong> Confirm with office
                </span>
                <span>
                  <strong>{t('label-time')}</strong> Confirm with office
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified municipal health contact */}
      <section className="section section-compact">
        <div className="container">
          <div className="health-stats-grid">
            <div className="health-stat-card">
              <span className="health-stat-num">
                <i className="bi bi-telephone" aria-hidden="true"></i>
              </span>
              <span className="health-stat-label">Landline: 072 607 4187</span>
            </div>
            <div className="health-stat-card">
              <span className="health-stat-num">
                <i className="bi bi-phone" aria-hidden="true"></i>
              </span>
              <span className="health-stat-label">Globe: 0905 235 8713</span>
            </div>
            <div className="health-stat-card">
              <span className="health-stat-num">
                <i className="bi bi-hospital" aria-hidden="true"></i>
              </span>
              <span className="health-stat-label">Agoo RHU–MHO</span>
            </div>
            <div className="health-stat-card">
              <span className="health-stat-num">
                <i className="bi bi-geo-alt" aria-hidden="true"></i>
              </span>
              <span className="health-stat-label">Agoo, La Union 2504</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hospitals Directory */}
      <section className="section section-compact">
        <div className="container">
          <h2 className="section-title">
            <i className="bi bi-hospital"></i>
            <span>{t('health-section-hospitals')}</span>
          </h2>
          <div className="health-facilities-grid">
            <div className="health-facility-card health-facility-card--hospital">
              <div className="health-facility-badge">Tertiary Hospital</div>
              <h3>{t('health-pltciluis-a-tiam-medical-center')}</h3>
              <p className="health-facility-desc">
                {t('health-a-tertiary-level-philhealthaccredited-private')}
              </p>
              <div className="health-facility-meta">
                <span>
                  <i className="bi bi-geo-alt"></i>
                  <span>{t('health-national-highway-agoo')}</span>
                </span>
              </div>
            </div>

            <div className="health-facility-card health-facility-card--hospital">
              <div className="health-facility-badge">Private Hospital</div>
              <h3>{t('health-medical-mission-group-hospital-health-services')}</h3>
              <p className="health-facility-desc">
                {t('health-also-known-as-new-mmg-hospital-providing-quality')}
              </p>
              <div className="health-facility-meta">
                <span>
                  <i className="bi bi-geo-alt"></i>
                  <span>{t('health-consolacion-road-brgy-consolacion')}</span>
                </span>
              </div>
            </div>

            <div className="health-facility-card health-facility-card--hospital">
              <div className="health-facility-badge">Medical Center</div>
              <h3>{t('health-salubris-inc-salubris-medical-center')}</h3>
              <p className="health-facility-desc">
                {t('health-private-medical-center-offering-various')}
              </p>
              <div className="health-facility-meta">
                <span>
                  <i className="bi bi-geo-alt"></i>
                  <span>{t('health-national-highway-agoo')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Municipal Health Office */}
      <section className="section section-compact bg-alt">
        <div className="container">
          <h2 className="section-title">
            <i className="bi bi-building"></i>
            <span>{t('health-section-mho')}</span>
          </h2>
          <div className="health-mho-card">
            <div className="health-mho-content">
              <h3>{t('health-mho-title')}</h3>
              <p>{t('health-mho-desc')}</p>
              <div className="health-mho-services">
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-lying-in')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-laboratory')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-immunization')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-prenatal')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-family-planning')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-tb-dots')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barangay health service routing */}
      <section className="section section-compact">
        <div className="container">
          <h2 className="section-title">
            <i className="bi bi-plus-circle"></i>
            <span>Barangay Health Services</span>
          </h2>
          <p className="section-subtitle">
            Contact the Agoo RHU–MHO to confirm the correct health station, service schedule, and
            referral path for your barangay.
          </p>
          <div className="health-bhs-grid">
            <a className="health-bhs-item" href="tel:0726074187">
              <span>Call 072 607 4187</span>
            </a>
            <a className="health-bhs-item" href="tel:09052358713">
              <span>Call 0905 235 8713</span>
            </a>
          </div>
        </div>
      </section>

      {/* HIV Care Philippines CTA */}
      <section
        className="section hivcare-cta-section"
        aria-label="HIV Care Philippines facility directory"
      >
        <div className="container">
          <div className="hivcare-cta-card">
            <span className="hivcare-cta-eyebrow">
              <i className="bi bi-shield-check" aria-hidden="true"></i>
              <span>{t('health-hivcare-cta-eyebrow')}</span>
            </span>
            <img
              src="/assets/images/logo/hivcareph-logo.svg"
              alt="HIV Care Philippines"
              className="hivcare-cta-logo"
              width={168}
              height={50}
              loading="lazy"
            />
            <h2 className="hivcare-cta-heading">{t('health-hivcare-cta-heading')}</h2>
            <p className="hivcare-cta-text">{t('health-hivcare-cta-desc')}</p>
            <div className="hivcare-cta-stats">
              <span className="hivcare-cta-stat">
                <i className="bi bi-hospital" aria-hidden="true"></i>
                <strong>338</strong>
                <span>{t('health-hivcare-cta-stat-facilities')}</span>
              </span>
              <span className="hivcare-cta-stat">
                <i className="bi bi-phone" aria-hidden="true"></i>
                <span>{t('health-hivcare-cta-stat-mobile')}</span>
              </span>
              <span className="hivcare-cta-stat">
                <i className="bi bi-patch-check-fill" aria-hidden="true"></i>
                <span>{t('health-hivcare-cta-stat-verified')}</span>
              </span>
            </div>
            <a
              href="https://hivcareph.org/"
              className="hivcare-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              <span>{t('health-hivcare-cta-btn')}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
