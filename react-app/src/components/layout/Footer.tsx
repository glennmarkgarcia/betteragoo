'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [version, setVersion] = useState('');

  useEffect(() => {
    fetch('/version.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.version) setVersion(data.version);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-new">
          <div className="footer-brand">
            <img
              src="/assets/images/logo/better-agoo-logo-white.svg"
              alt="Better Agoo logo"
              className="footer-logo"
            />
            <p className="footer-tagline">{t('footer-tagline')}</p>
            <div className="footer-social-new">
              <a
                href="https://www.facebook.com/MunicipalityofAgooLaUnion"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              {/* LinkedIn and Discord are temporarily disabled until official accounts are available.
              <a
                href="https://www.linkedin.com/company/betteragoo/"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://discord.com/invite/qeSu7RJkjQ"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <i className="bi bi-discord"></i>
              </a>
              */}
            </div>
          </div>
          <div className="footer-column">
            <h4>{t('footer-quick-links')}</h4>
            <ul className="footer-links-new">
              <li>
                <a href="https://quiz.betteragoo.org/" target="_blank" rel="noopener noreferrer">
                  {t('footer-agoo-quiz')}
                </a>
              </li>
              <li>
                <a href="/sitemap/">{t('footer-sitemap')}</a>
              </li>
              <li>
                <a href="/terms/">{t('footer-terms')}</a>
              </li>
              <li>
                <a href="/privacy/">{t('footer-privacy')}</a>
              </li>
              <li>
                <a href="/accessibility/">{t('footer-accessibility')}</a>
              </li>
              <li>
                <a href="/faq/">{t('footer-faq')}</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>{t('footer-resources')}</h4>
            <ul className="footer-links-new">
              <li>
                <a href="https://data.gov.ph" target="_blank" rel="noopener noreferrer">
                  {t('footer-open-data')}
                </a>
              </li>
              <li>
                <a href="https://www.foi.gov.ph/" target="_blank" rel="noopener noreferrer">
                  {t('footer-foi')}
                </a>
              </li>
              <li>
                <a href="https://agoolaunion.gov.ph/" target="_blank" rel="noopener noreferrer">
                  {t('footer-lgu-portal')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/MunicipalityofAgooLaUnion/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer-lgu-facebook')}
                </a>
              </li>
              <li>
                <a href="https://blgf.gov.ph/" target="_blank" rel="noopener noreferrer">
                  {t('footer-blgf')}
                </a>
              </li>
              <li>
                <a href="https://cmci.dti.gov.ph/" target="_blank" rel="noopener noreferrer">
                  {t('footer-cmci')}
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <div
              className="footer-cost"
              role="status"
              aria-label="Cost to the People of Agoo: Zero Pesos"
            >
              {t('footer-cost')} <span className="footer-cost-value">₱0</span>
            </div>
            <a href="mailto:betteragoo@gmail.com" className="footer-contribute">
              <i className="bi bi-envelope-heart"></i> {t('footer-volunteer')}
            </a>
            <a
              href="https://github.com/glennmarkgarcia/betteragoo"
              className="footer-contribute"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-github"></i> {t('footer-contribute')}
            </a>
            <div className="footer-partners">
              <a className="wordmark" href="https://wkndprjkt.com" aria-label="WKNDPRJKT home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide wordmark-icon wordmark-terminal lucide-terminal"
                  aria-hidden="true"
                >
                  <path d="M12 19h8"></path>
                  <path d="m4 17 6-6-6-6"></path>
                </svg>
                <span>WKNDPRJKT</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom-new">
          <div className="footer-copyright">
            <span className="footer-copyright-text">
              &copy; {currentYear} {t('footer-copyright-text')}
            </span>
            <span className="footer-copyright-license">MIT | CC BY 4.0</span>
            <span className="footer-copyright-disclaimer">{t('footer-copyright-disclaimer')}</span>
            <span className="footer-version">
              <i className="bi bi-boxes"></i> {version ? `Ver. ${version}` : ''}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
