import React from 'react';
import { FESTIVAL_METADATA } from '../data/festivalData';
import { X, Printer, Award, Feather, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  achievementTitle?: string;
  score?: number;
  poemOrText?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  achievementTitle = 'Distinguished Participant & Literary Scholar',
  score,
  poemOrText,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = 'October 07 – 09, 2026';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF6EE] text-stone-900 border-4 border-amber-900/40 rounded-2xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl overflow-hidden paper-texture">
        
        {/* Controls - Hidden during print */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-300 no-print">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <Award className="w-4 h-4 text-amber-800" />
            <span>Official Festival Keepsake Certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE BODY */}
        <div className="border-2 border-amber-800/60 p-6 sm:p-10 text-center relative bg-white/60 rounded-xl">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-amber-900 font-serif text-lg select-none">❧</div>
          <div className="absolute top-2 right-2 text-amber-900 font-serif text-lg select-none">☙</div>
          <div className="absolute bottom-2 left-2 text-amber-900 font-serif text-lg select-none">❧</div>
          <div className="absolute bottom-2 right-2 text-amber-900 font-serif text-lg select-none">☙</div>

          {/* Institution & Festival Header */}
          <p className="text-[11px] font-mono tracking-widest uppercase text-amber-950 font-bold mb-1">
            {FESTIVAL_METADATA.institutionSinhala} · {FESTIVAL_METADATA.institution}
          </p>
          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-3">
            {FESTIVAL_METADATA.festivalName} · Kandy, Sri Lanka
          </p>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-950 tracking-tight mb-2">
            Certificate of Literary Distinction
          </h2>
          <p className="text-xs font-serif italic text-stone-600 mb-6">
            The English Corner · Pavilion for Grammar, Eloquence & Shakespearean Letters
          </p>

          <div className="my-6">
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">
              This Honor is Bestowed Upon
            </p>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 border-b-2 border-stone-300 pb-2 inline-block min-w-[280px]">
              {recipientName.trim() || 'Honored Festival Scholar'}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto leading-relaxed my-4">
            In recognition of commendable participation in the English Corner at Sanjanani 2026. Demonstrating intellectual curiosity in English grammar, mastery of world literary traditions, and creative composition.
          </p>

          {achievementTitle && (
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2">
              Honour: {achievementTitle} {score !== undefined ? `(Score: ${score}/10)` : ''}
            </p>
          )}

          {poemOrText && (
            <div className="my-4 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs font-serif italic text-stone-800 max-w-md mx-auto text-left">
              &ldquo;{poemOrText}&rdquo;
            </div>
          )}

          {/* Seal and Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-stone-200 text-center items-end">
            <div>
              <div className="font-serif italic text-sm text-stone-900 border-b border-stone-300 pb-1">
                Ven. Faculty Head
              </div>
              <p className="text-[10px] text-stone-500 uppercase tracking-wider mt-1">
                Asgiri Chapter, Kandy
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-amber-900/40 flex items-center justify-center bg-amber-50 shadow-inner mb-1">
                <ShieldCheck className="w-7 h-7 text-amber-900" />
              </div>
              <span className="text-[9px] font-mono tracking-widest text-stone-500 uppercase">
                SANJANANI 2026 SEAL
              </span>
            </div>

            <div>
              <div className="font-serif italic text-sm text-stone-900 border-b border-stone-300 pb-1">
                Convenor & Chief Reader
              </div>
              <p className="text-[10px] text-stone-500 uppercase tracking-wider mt-1">
                The English Corner
              </p>
            </div>
          </div>

          <div className="mt-6 text-[10px] font-mono text-stone-400">
            Conferred on {currentDate} · Asgiri Maha Vihara Maha Pirivena, Kandy, Sri Lanka
          </div>
        </div>

      </div>
    </div>
  );
};
