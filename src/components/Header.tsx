import React, { useState } from 'react';
import { Menu, X, Feather } from 'lucide-react';

interface HeaderProps {
  onOpenCertificate: () => void;
  onOpenAiTutor: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCertificate, onOpenAiTutor }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <a 
            href="#" 
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-amber-950 hover:text-amber-800 transition-colors"
          >
            Sanjanani &apos;26 · English Corner
          </a>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <a href="#pavilion" className="hover:text-amber-900 transition-colors">
              The Pavilion
            </a>
            <a href="#language" className="hover:text-amber-900 transition-colors">
              Origins
            </a>
            <a href="#grammar" className="hover:text-amber-900 transition-colors">
              Grammar Lab
            </a>
            <a href="#literature" className="hover:text-amber-900 transition-colors">
              Literature
            </a>
            <a href="#shakespeare" className="hover:text-amber-900 transition-colors">
              Shakespeare Review
            </a>
            <a href="#activities" className="hover:text-amber-900 transition-colors">
              Activities
            </a>
          </nav>

          {/* Zone 3: Primary action buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={onOpenAiTutor}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-200/80 hover:bg-amber-300 border border-amber-400 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <Feather className="w-3.5 h-3.5 text-amber-900" />
              <span>AI English Tutor</span>
            </button>
            <button
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <span>Festival Pass</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
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
        <div className="md:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <a 
              href="#pavilion" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-100"
            >
              The Pavilion & Asgiriya
            </a>
            <a 
              href="#language" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-100"
            >
              Language & Origins
            </a>
            <a 
              href="#grammar" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-100"
            >
              Grammar Lab
            </a>
            <a 
              href="#literature" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-100"
            >
              Literature Eras
            </a>
            <a 
              href="#shakespeare" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-100"
            >
              Shakespeare Review
            </a>
            <a 
              href="#activities" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-900 border-b border-stone-100"
            >
              Interactive Activities
            </a>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiTutor();
              }}
              className="w-full text-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-amber-200 border border-amber-400 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Feather className="w-3.5 h-3.5 text-amber-900" />
              <span>AI English Tutor (Chat Bot)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCertificate();
              }}
              className="w-full text-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-100 border border-stone-300 rounded-lg"
            >
              Festival Pass & Certificate
            </button>
            <a
              href="#activities"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg"
            >
              Play & Write
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
