'use client';

import React from 'react';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';

function ChangeLanguage() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const onChangeLanguage = () => {
    changeLocale(locale === 'vi' ? 'en' : 'vi');
  };

  return (
    <a
      onClick={onChangeLanguage}
      className="mr-2 h-max cursor-pointer border-l border-r border-l-transparent pr-3 text-xs text-white"
    >
      {locale === 'vi' ? 'Tiếng Việt' : 'English'}
    </a>
  );
}

export default ChangeLanguage;
