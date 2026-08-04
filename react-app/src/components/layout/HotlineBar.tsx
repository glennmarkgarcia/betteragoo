'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HotlineBar() {
  const { t } = useLanguage();

  return (
    <div className="hotline-bar">
      <div className="container">
        <div className="hotline-inner">
          <div className="hotline-items">
            <Link href="/contact/#emergency-hotlines" className="hotline-item">
              <i className="bi bi-telephone-fill" aria-hidden="true" />
              <span>{t('header-hotlines-link')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
