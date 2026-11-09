import React, { useState } from 'react';
import { Menu, X, Feather, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenCertificate: () => void;
  onOpenAiTutor: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCertificate, onOpenAiTutor }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-stone-300/80 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <a 
            href="#" 
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-amber-950 hover:text-amber-800 transition-colors flex flex-col leading-none"
          >
            <span>Sanjanani &apos;26</span>
            <span className="text-xs font-mono font-medium text-amber-900/80 mt-1">
              {language === 'si' ? 'ඉංග්‍රීසි අංශය · අස්ගිරි මහා විහාරය' : 'The English Corner · Asgiriya'}
            </span>
          </a>

          {/* Zone 2: Primary navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-700">
            <a href="#pavilion" className="hover:text-amber-950 transition-colors">
              {t.navPavilion}
            </a>
            <a href="#timeline" className="hover:text-amber-950 transition-colors font-semibold text-amber-900">
              {t.navTimeline}
            </a>
            <a href="#grammar" className="hover:text-amber-950 transition-colors">
              {t.navGrammar}
            </a>
            <a href="#literature" className="hover:text-amber-950 transition-colors">
              {t.navLiterature}
            </a>
            <a href="#shakespeare" className="hover:text-amber-950 transition-colors">
              {t.navShakespeare}
            </a>
            <a href="#trivia" className="hover:text-amber-950 transition-colors">
              {t.navTrivia}
            </a>
            <a href="#activities" className="hover:text-amber-950 transition-colors">
              {t.navActivities}
            </a>
          </nav>

          {/* Zone 3: Primary action buttons & Language Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Language Switcher Segmented Control */}
            <div className="flex items-center p-1 bg-stone-200/80 border border-stone-300 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-950 text-white shadow-2xs font-bold'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('si')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  language === 'si'
                    ? 'bg-amber-950 text-white shadow-2xs font-bold'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
                title="සිංහල භාෂාවට මාරු වන්න"
              >
                සිංහල
              </button>
            </div>

            <button
              onClick={onOpenAiTutor}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-200/90 hover:bg-amber-300 border border-amber-400 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              <Feather className="w-3.5 h-3.5 text-amber-900" />
              <span>{t.btnAiTutor}</span>
            </button>

            <button
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-[#FDFBF7] hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              <span>{t.btnPass}</span>
            </button>
          </div>

          {/* Mobile hamburger & Quick Lang */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'si' : 'en')}
              className="px-2 py-1 text-xs font-mono font-bold bg-stone-200 border border-stone-300 rounded-md text-stone-900"
            >
              {language === 'en' ? 'සිං' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-300 bg-[#FAF6EE] px-4 pt-2 pb-6 space-y-3 shadow-md">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-xs font-medium text-stone-600 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-amber-900" />
              <span>UI Language:</span>
            </span>
            <div className="flex items-center p-0.5 bg-stone-200 border border-stone-300 rounded-md text-xs font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-sm ${language === 'en' ? 'bg-amber-950 text-white' : 'text-stone-700'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('si')}
                className={`px-3 py-1 rounded-sm ${language === 'si' ? 'bg-amber-950 text-white' : 'text-stone-700'}`}
              >
                සිංහල
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-800">
            <a 
              href="#pavilion" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-200/60"
            >
              {t.navPavilion}
            </a>
            <a 
              href="#timeline" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-200/60 font-semibold text-amber-900"
            >
              {t.navTimeline}
            </a>
            <a 
              href="#grammar" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-200/60"
            >
              {t.navGrammar}
            </a>
            <a 
              href="#literature" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-200/60"
            >
              {t.navLiterature}
            </a>
            <a 
              href="#shakespeare" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-200/60"
            >
              {t.navShakespeare}
            </a>
            <a 
              href="#trivia" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-200/60"
            >
              {t.navTrivia}
            </a>
            <a 
              href="#activities" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-200/60"
            >
              {t.navActivities}
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiTutor();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-amber-200 border border-amber-400 rounded-lg flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Feather className="w-3.5 h-3.5 text-amber-900" />
              <span>{t.btnAiTutor}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCertificate();
              }}
              className="w-full text-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-[#FDFBF7] border border-stone-300 rounded-lg"
            >
              {t.btnPass}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
