import React, { createContext, useContext, useEffect, useState } from 'react';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const translations = {
    az: require('../Language/az'),
    en: require('../Language/en'),
  };
  useEffect(() => {
    let currentLanguage;

    currentLanguage = localStorage.getItem('currentLanguage') || 'az';
    setCurrentLanguage(currentLanguage);
  }, []);
  const [currentLanguage, setCurrentLanguage] = useState('az');

  const translate = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('currentLanguage', newLanguage);
  };

  return (
    <TranslationContext.Provider
      value={{ translate, changeLanguage, currentLanguage }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};
