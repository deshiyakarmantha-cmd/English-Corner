import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'si';

interface Translations {
  navPavilion: string;
  navOrigins: string;
  navGrammar: string;
  navTimeline: string;
  navLiterature: string;
  navShakespeare: string;
  navTrivia: string;
  navActivities: string;
  btnAiTutor: string;
  btnPass: string;
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  venueLabel: string;
  venueValue: string;
  datesLabel: string;
  datesValue: string;
  badgeOpen: string;
  curatorialTitle: string;
  timelineTitle: string;
  timelineSubtitle: string;
  triviaTitle: string;
  grammarTitle: string;
  scheduleTitle: string;
  footerRights: string;
  tutorTitle: string;
  tutorSubtitle: string;
  tutorPlaceholder: string;
  handsFreeMode: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    navPavilion: 'The Pavilion',
    navOrigins: 'Origins',
    navGrammar: 'Grammar Lab',
    navTimeline: 'Eras Timeline',
    navLiterature: 'Literature',
    navShakespeare: 'Shakespeare Review',
    navTrivia: 'Daily Trivia',
    navActivities: 'Activities',
    btnAiTutor: 'AI English Tutor',
    btnPass: 'Festival Pass',
    heroKicker: 'Asgiri Maha Vihara Maha Pirivena · Kandy, Sri Lanka',
    heroTitle: 'The English Corner',
    heroSubtitle: 'Where Sacred Monastic Heritage Meets the Symphony of English Letters, Grammar & Shakespearean Drama',
    venueLabel: 'Venue:',
    venueValue: 'Asgiri Maha Vihara Maha Pirivena Premises, Kandy',
    datesLabel: 'Festival Dates:',
    datesValue: 'October 07, 08, 09, 2026 (All Three Days)',
    badgeOpen: 'Open to All',
    curatorialTitle: 'Fostering Global Expression from the Foothills of Kandy',
    timelineTitle: 'Chronicles of English Literary Eras',
    timelineSubtitle: 'Explore the historical progression of English literature from Anglo-Saxon roots to contemporary Sri Lankan letters.',
    triviaTitle: 'Literary Trivia & Mind Gymnasium',
    grammarTitle: 'The Grammar Laboratory',
    scheduleTitle: 'Three-Day Festival Program',
    footerRights: 'All Rights Reserved · Asgiri Maha Vihara Maha Pirivena',
    tutorTitle: 'Sanjanani English Scholar AI',
    tutorSubtitle: 'English Corner · Asgiri Maha Vihara (Oct 07–09, 2026)',
    tutorPlaceholder: 'Type or speak in Sinhala, Tamil, English, or any tongue...',
    handsFreeMode: 'Hands-Free Voice Practice',
  },
  si: {
    navPavilion: 'මණ්ඩපය',
    navOrigins: 'මූලාරම්භය',
    navGrammar: 'ව්‍යාකරණ විද්‍යාගාරය',
    navTimeline: 'සාහිත්‍ය කාලරේඛාව',
    navLiterature: 'සාහිත්‍යය',
    navShakespeare: 'ෂේක්ස්පියර් විවරණය',
    navTrivia: 'දිනපතා ප්‍රශ්නාවලිය',
    navActivities: 'ක්‍රියාකාරකම්',
    btnAiTutor: 'ඉංග්‍රීසි AI උපදේශක',
    btnPass: 'උත්සව ප්‍රවේශපත්‍රය',
    heroKicker: 'අස්ගිරි මහා විහාර මහ පිරිවෙන · මහනුවර, ශ්‍රී ලංකාව',
    heroTitle: 'ඉංග්‍රීසි කලාපය (The English Corner)',
    heroSubtitle: 'ඓතිහාසික අස්ගිරි පිරිවෙන් සම්ප්‍රදාය හා ලෝක ඉංග්‍රීසි සාහිත්‍යය එකමුතු වන ශාස්ත්‍රීය වේදිකාව',
    venueLabel: 'ස්ථානය:',
    venueValue: 'අස්ගිරි මහා විහාර මහ පිරිවෙන් පරිශ්‍රය, මහනුවර',
    datesLabel: 'දින වකවානු:',
    datesValue: '2026 ඔක්තෝබර් 07, 08, 09 (තෙදින පුරා)',
    badgeOpen: 'සැමට විවෘතයි',
    curatorialTitle: 'මහනුවර අස්ගිරි පරිශ්‍රයෙන් ගෝලීය භාෂා ඥානයට මඟපෙන්වීම',
    timelineTitle: 'ඉංග්‍රීසි සාහිත්‍ය යුග කාලරේඛාව (Literary Eras Timeline)',
    timelineSubtitle: 'ඇන්ග්ලෝ-සැක්සන් යුගයේ සිට ශ්‍රී ලාංකේය ඉංග්‍රීසි සාහිත්‍යය දක්වා සියවස් ගණනාවක ඓතිහාසික විකාශනය ගවේෂණය කරන්න.',
    triviaTitle: 'සාහිත්‍ය ප්‍රශ්නාවලිය සහ බුද්ධි ව්‍යායාමය',
    grammarTitle: 'ඉංග්‍රීසි ව්‍යාකරණ විද්‍යාගාරය',
    scheduleTitle: 'තෙදින මහෝත්සව වැඩසටහන් මාලාව',
    footerRights: 'සියලු හිමිකම් ඇවිරිණි · අස්ගිරි මහා විහාර මහ පිරිවෙන',
    tutorTitle: 'සංජානනී ඉංග්‍රීසි විද්වත් AI (Scholar AI)',
    tutorSubtitle: 'ඉංග්‍රීසි අංශය · අස්ගිරි මහා විහාරය (2026 ඔක්තෝබර් 07–09)',
    tutorPlaceholder: 'සිංහලෙන් හෝ ඉංග්‍රීසියෙන් ලියන්න, නැතහොත් කතා කරන්න...',
    handsFreeMode: 'හඬ මගින් සෘජු සංවාද පුහුණුව (Hands-Free)',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: TRANSLATIONS.en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sanjanani_lang');
      if (saved === 'si' || saved === 'en') return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanjanani_lang', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: TRANSLATIONS[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
