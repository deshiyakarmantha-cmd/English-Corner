import React from 'react';
import { FESTIVAL_METADATA } from '../data/festivalData';
import { ArrowUp, Printer, Feather } from 'lucide-react';

interface FooterProps {
  onOpenCertificate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCertificate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrintHandbook = () => {
    window.print();
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Monastic Heritage */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              {FESTIVAL_METADATA.festivalName}
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400">
              {FESTIVAL_METADATA.institution} · Kandy, Sri Lanka
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              The English Corner is an educational pavilion established to foster linguistic mastery, grammatical precision, world literature appreciation, and Shakespearean study within the venerable monastic heritage of Sri Lanka.
            </p>
            <div className="text-xs text-stone-400 pt-2 space-y-1">
              <div>Tel: {FESTIVAL_METADATA.contact.tel} | Mobile: {FESTIVAL_METADATA.contact.mobile}</div>
              <div>Email: {FESTIVAL_METADATA.contact.email}</div>
              <div className="text-stone-500 text-[11px]">Media Sponsor: {FESTIVAL_METADATA.contact.mediaUnit}</div>
            </div>
          </div>

          {/* Pavilion Quick Sections */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300">
              Pavilion Highlights
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#language" className="hover:text-amber-200 transition-colors">
                  Origins of English & Sri Lankan Loanwords
                </a>
              </li>
              <li>
                <a href="#grammar" className="hover:text-amber-200 transition-colors">
                  Grammar Lab: Parts of Speech, Tenses & Syntax Clinic
                </a>
              </li>
              <li>
                <a href="#literature" className="hover:text-amber-200 transition-colors">
                  Literary Eras & Monastic Translation Legacy
                </a>
              </li>
              <li>
                <a href="#shakespeare" className="hover:text-amber-200 transition-colors">
                  William Shakespeare Review: Hamlet, Macbeth & Sonnets
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-amber-200 transition-colors">
                  Interactive Studio: Writing, Quiz, Insults & Lexicon Crucible
                </a>
              </li>
            </ul>
          </div>

          {/* Actions & Keepsakes */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300">
              Participant Keepsakes
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Generate an official festival certificate with your name and score, or print a personal copy of the festival guide.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenCertificate}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-900/80 hover:bg-amber-800 text-amber-100 rounded-lg text-xs font-semibold transition-colors"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Festival Certificate</span>
              </button>
              <button
                onClick={handlePrintHandbook}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Festival Pages</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>
              © 2026 Sanjanani Literary Festival Committee · Asgiri Maha Vihara Maha Pirivena, Kandy, Sri Lanka.
            </p>
            <span className="hidden sm:inline text-stone-600">|</span>
            <p className="text-amber-400 font-medium tracking-wide">
              Developer: Oshadha Vedith
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <span>Ascend to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
