import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Theater, ChevronDown, ChevronUp } from 'lucide-react';

export const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<'literature' | 'shakespeare' | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const calculateProgress = useCallback(() => {
    const litEl = document.getElementById('literature');
    const shakeEl = document.getElementById('shakespeare');

    if (!litEl || !shakeEl) return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Header height offset (header is 80px tall)
    const headerOffset = 80;

    const litRect = litEl.getBoundingClientRect();
    const shakeRect = shakeEl.getBoundingClientRect();

    const litTop = litRect.top + scrollY;
    const shakeBottom = shakeRect.bottom + scrollY;

    // Start tracking when top of literature section hits the header
    const startY = litTop - headerOffset;
    // Finish when bottom of Shakespeare section hits bottom of viewport
    const endY = shakeBottom - viewportHeight;
    const totalDistance = Math.max(1, endY - startY);

    if (scrollY < startY) {
      setProgress(0);
      setActiveSection(null);
      setIsVisible(false);
    } else if (scrollY > endY + viewportHeight * 0.5) {
      // Past the combined literature & Shakespeare sections
      setProgress(100);
      setActiveSection(null);
      setIsVisible(false);
    } else {
      // Within or right around the reading range
      const rawProgress = ((scrollY - startY) / totalDistance) * 100;
      const clamped = Math.min(100, Math.max(0, rawProgress));
      setProgress(clamped);
      setIsVisible(true);

      // Determine whether user is currently reading Literature or Shakespeare
      // If Shakespeare section top is near or past header
      if (shakeRect.top <= headerOffset + 100) {
        setActiveSection('shakespeare');
      } else {
        setActiveSection('literature');
      }
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [calculateProgress]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 76;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* 1. Ultra-clean Top Progress Bar (Fixed at top of screen) */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-60 bg-stone-200/50 backdrop-blur-xs pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Literature and Shakespeare Reading Progress"
      >
        <div 
          className="h-full bg-gradient-to-r from-amber-800 via-amber-600 to-amber-500 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(217,119,6,0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. Micro Companion Status Bar when reading through Literature & Shakespeare */}
      <div 
        className={`fixed top-20 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-amber-900/10 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
          {/* Active Chapter Label */}
          <div className="flex items-center gap-2 text-stone-700 font-serif">
            {activeSection === 'literature' ? (
              <>
                <BookOpen className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span className="font-semibold text-stone-900">Chronicles of Literature</span>
                <span className="text-stone-400 font-sans hidden sm:inline">· Part I</span>
              </>
            ) : (
              <>
                <Theater className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span className="font-semibold text-stone-900">Shakespeare Retrospective</span>
                <span className="text-stone-400 font-sans hidden sm:inline">· Part II</span>
              </>
            )}
          </div>

          {/* Reading Percentage & Fast Navigation Jumpers */}
          <div className="flex items-center gap-4 text-stone-600 font-mono text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-sans text-xs">Reading:</span>
              <span className="font-semibold text-amber-950">{Math.round(progress)}%</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 border-l border-stone-300 pl-3">
              {activeSection === 'literature' ? (
                <button
                  onClick={() => scrollToSection('shakespeare')}
                  className="inline-flex items-center gap-1 text-[11px] font-sans text-stone-600 hover:text-amber-950 transition-colors cursor-pointer"
                  title="Jump to Shakespeare section"
                >
                  <span>Skip to Shakespeare</span>
                  <ChevronDown className="w-3 h-3 text-amber-800" />
                </button>
              ) : (
                <button
                  onClick={() => scrollToSection('literature')}
                  className="inline-flex items-center gap-1 text-[11px] font-sans text-stone-600 hover:text-amber-950 transition-colors cursor-pointer"
                  title="Return to Literature section"
                >
                  <ChevronUp className="w-3 h-3 text-amber-800" />
                  <span>Back to Literature</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
