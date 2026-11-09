import React from 'react';
import { FESTIVAL_METADATA } from '../data/festivalData';
import { BookOpen, Sparkles, Scroll, Landmark } from 'lucide-react';
import heroImage from '../assets/images/sanjanani_english_corner_hero_1791314924841.jpg';
import { SafeImage } from './SafeImage';
import { WordOfTheDay } from './WordOfTheDay';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onOpenAiTutor?: (prefillQuery?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAiTutor }) => {
  const { language, t } = useLanguage();
  const isSi = language === 'si';

  return (
    <section id="pavilion" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-stone-300/80 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header & Metadata Line */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-600 tracking-wide uppercase">
            <span className="text-amber-900 font-bold">{isSi ? FESTIVAL_METADATA.festivalSinhala : FESTIVAL_METADATA.festivalName}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>{isSi ? 'ඓතිහාසික අස්ගිරි මහා විහාර මහ පිරිවෙන' : FESTIVAL_METADATA.institution}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Kandy, Sri Lanka</span>
          </div>

          <p className="mt-2 text-xs font-serif text-amber-900/90 font-medium">
            {FESTIVAL_METADATA.festivalSubTitleSinhala} · {FESTIVAL_METADATA.festivalSinhala}
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight text-balance leading-none sm:leading-tight">
            {t.heroTitle}
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-serif italic text-amber-950/85 max-w-3xl leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Operational Utility Ribbon */}
        <div className="mb-10 py-3.5 px-5 bg-[#F4EFE6] border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-700 flex flex-wrap items-center justify-between gap-y-2 gap-x-6 shadow-2xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-stone-900">{t.venueLabel}</span>
            <span>{t.venueValue}</span>
            <span aria-hidden="true" className="text-stone-400 hidden sm:inline">|</span>
            <span className="font-semibold text-stone-900">{t.datesLabel}</span>
            <span className="font-medium text-amber-950">{t.datesValue}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-900 font-semibold bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-md">
              {t.badgeOpen}
            </span>
            <span className="text-stone-600 hidden md:inline">Kandy, Central Province</span>
          </div>
        </div>

        {/* Hero Visual & Curatorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Visual Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative group overflow-hidden rounded-2xl border-2 border-stone-300 shadow-md bg-stone-900 aspect-16/9">
              <SafeImage
                src={heroImage}
                fallbackName="sanjanani_english_corner_hero_1791314924841.jpg"
                alt="English Corner at Sanjanani Literary Festival 2026, Asgiri Maha Vihara Maha Pirivena Kandy"
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-wider text-amber-200/95 font-medium">
                  {FESTIVAL_METADATA.theme}
                </p>
                <p className="text-sm font-serif italic text-stone-100 mt-1">
                  &ldquo;Language is a lantern: the more ancient its wick, the farther its beam illuminates the foreign sea.&rdquo;
                </p>
              </div>
            </div>

            <figcaption className="text-xs font-serif text-stone-600 italic mt-2.5">
              Plate I — English Corner Scholarly Pavilion, Asgiri Maha Vihara Maha Pirivena, Kandy, Sri Lanka (Sanjanani 2026).
            </figcaption>
          </div>

          {/* Curatorial Text & Orientation Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#F7F2E8] border border-stone-300/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
                <Landmark className="w-4 h-4 text-amber-800" />
                <span>{isSi ? 'පිරිවෙන් විද්වත් මගපෙන්වීම' : 'Monastic Curatorial Dispatch'}</span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-stone-900 leading-snug">
                {t.curatorialTitle}
              </h2>

              <p className="mt-4 text-sm text-stone-700 leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-amber-900">
                {isSi 
                  ? 'මධ්‍යතන සෙංකඩගල රාජධානි සමයේ පිහිටුවන ලද ඓතිහාසික අස්ගිරි මහා විහාර මහ පිරිවෙන සියවස් ගණනාවක් පුරා පූජනීය බෞද්ධ ත්‍රිපිටක සාහිත්‍යය සංරක්ෂණය කර ඇත. සංජානනී 2026 මහෝත්සවයේදී, ඉංග්‍රීසි අංශය අපේ පැරණි ශාස්ත්‍රීය උරුමය සහ නූතන ලෝක ඉංග්‍රීසි භාෂා භාවිතය යාකරන සුවිශේෂී පාලමකි.'
                  : 'Founded during the medieval kingdom of Kandy, Asgiri Maha Vihara Maha Pirivena has preserved sacred Buddhist scriptures for centuries. At Sanjanani 2026, the English Corner serves as a bridge between monastic scholarship and the living stream of modern English usage.'}
              </p>

              <p className="mt-3 text-sm text-stone-700 leading-relaxed">
                {isSi
                  ? 'ඉංග්‍රීසි ව්‍යාකරණ ප්‍රගුණ කිරීමට, එලිසබෙත් යුගයේ සිට අද්‍යතන පශ්චාත්-යටත්විජිත යුගය දක්වා ලෝක සාහිත්‍යය ගවේෂණය කිරීමට, විලියම් ෂේක්ස්පියර් නාට්‍ය රසවිඳීමට සහ දිනපතා සාහිත්‍ය ප්‍රශ්නාවලියට සහභාගී වීමට මෙහිදී ඔබට අවස්ථාව උදාවේ.'
                  : 'Step inside to master English grammar, explore world literature from Elizabethan drama to modern post-colonial epics, immerse yourself in our William Shakespeare review, and participate in workshops that celebrate every tone of expression.'}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-300/80">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <a
                  href="#grammar"
                  className="p-3 bg-[#FDFBF7] hover:bg-white border border-stone-300 rounded-xl transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 group-hover:text-amber-900">
                    <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                    <span>{t.navGrammar}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">Syntax, tenses, and punctuation doctor.</p>
                </a>

                <a
                  href="#shakespeare"
                  className="p-3 bg-[#FDFBF7] hover:bg-white border border-stone-300 rounded-xl transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 group-hover:text-amber-900">
                    <Scroll className="w-3.5 h-3.5 text-amber-800" />
                    <span>{t.navShakespeare}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">Hamlet, Macbeth, Sonnets & Globe folio.</p>
                </a>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href="#timeline"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-950 hover:text-amber-800 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>{isSi ? 'සාහිත්‍ය කාලරේඛාව බලන්න' : 'Explore Literary Eras Timeline'}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Scholarly Word of the Day & Etymology Showcase */}
        <div className="mt-12 sm:mt-16">
          <WordOfTheDay onOpenAiTutor={onOpenAiTutor} />
        </div>

      </div>
    </section>
  );
};
