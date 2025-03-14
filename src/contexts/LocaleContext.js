// src/contexts/LocaleContext.js
import React, { createContext, useState, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '../locales/en.json';  // Import English
import faMessages from '../locales/fa.json';  // Import Farsi

const LocaleContext = createContext();

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('fa'); // Default to Persian

  const messages = locale === 'en' ? enMessages : faMessages;

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages.messages} defaultLocale="en">
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}