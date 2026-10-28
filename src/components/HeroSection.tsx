import React from 'react';
import { FESTIVAL_METADATA } from '../data/festivalData';
import { BookOpen, Sparkles, Scroll, Landmark } from 'lucide-react';
import heroImage from '../assets/images/sanjanani_english_corner_hero_1791314924841.jpg';

<img
src={heroImage}
alt="English Corner at Sanjanani Literary Festival 2026"
referrerPolicy="no-referrer"
className="w-full h-full object cover"
/>

export const HeroSection: React.FC = () => {
  return (
    <section id="pavilion" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header & Metadata Line */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-600 tracking-wide uppercase">
            <span className="text-amber-900 font-semibold">{FESTIVAL_METADATA.festivalName}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>{FESTIVAL_METADATA.institution}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Kandy, Sri Lanka</span>
          </div>

          <p className="mt-2 text-xs font-serif text-amber-900/90 font-medium">
            {FESTIVAL_METADATA.festivalSubTitleSinhala} · {FESTIVAL_METADATA.festivalSinhala}
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight text-balance leading-none sm:leading-tight">
            The English Corner
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-serif italic text-amber-950/80 max-w-3xl">
            Where Sacred Monastic Heritage Meets the Symphony of English Letters, Grammar & Shakespearean Drama
          </p>
        </div>

        {/* Operational Utility Ribbon */}
        <div className="mb-10 py-3.5 px-5 bg-stone-100/90 border border-stone-200/90 rounded-xl text-xs sm:text-sm text-stone-700 flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-stone-900">Venue:</span>
            <span>Asgiri Maha Vihara Maha Pirivena Premises, Kandy</span>
            <span aria-hidden="true" className="text-stone-300 hidden sm:inline">|</span>
            <span className="font-semibold text-stone-900">Festival Dates:</span>
            <span className="font-medium text-amber-950">October 07, 08, 09, 2026 (තෙදින පුරා)</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
              Open to All
            </span>
            <span className="text-stone-500 hidden md:inline">Kandy, Central Province</span>
          </div>
        </div>

        {/* Hero Visual & Curatorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Visual Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative group overflow-hidden rounded-2xl border border-stone-300 shadow-md bg-stone-900 aspect-16/9">
              <img
                src={heroImage}
                alt="English Corner at Sanjanani Literary Festival 2026, Asgiri Maha Vihara Maha Pirivena Kandy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-wider text-amber-200/90 font-medium">
                  {FESTIVAL_METADATA.theme}
                </p>
                <p className="text-sm font-serif italic text-stone-200 mt-1">
                  &ldquo;Language is a lantern: the more ancient its wick, the farther its beam illuminates the foreign sea.&rdquo;
                </p>
              </div>
            </div>

            <figcaption className="text-xs font-serif text-stone-500 italic mt-2.5">
              Plate I — English Corner Scholarly Pavilion, Asgiri Maha Vihara Maha Pirivena, Kandy, Sri Lanka (Sanjanani 2026).
            </figcaption>
          </div>

          {/* Curatorial Text & Orientation Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#F7F3EB] border border-amber-950/10 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
                <Landmark className="w-4 h-4 text-amber-800" />
                <span>Monastic Curatorial Dispatch</span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-stone-900 leading-snug">
                Fostering Global Expression from the Foothills of Kandy
              </h2>

              <p className="mt-4 text-sm text-stone-700 leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-amber-900">
                Founded during the medieval kingdom of Kandy, Asgiri Maha Vihara Maha Pirivena has preserved sacred Buddhist scriptures for centuries. At Sanjanani 2026, the English Corner serves as a bridge between monastic scholarship and the living stream of modern English usage.
              </p>

              <p className="mt-3 text-sm text-stone-700 leading-relaxed">
                Step inside to master English grammar, explore world literature from Elizabethan drama to modern post-colonial epics, immerse yourself in our William Shakespeare review, and participate in workshops that celebrate every tone of expression.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200/80">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <a
                  href="#grammar"
                  className="p-3 bg-white/80 hover:bg-white border border-stone-200 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 group-hover:text-amber-900">
                    <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                    <span>Grammar Lab</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">Syntax, tenses, and punctuation doctor.</p>
                </a>

                <a
                  href="#shakespeare"
                  className="p-3 bg-white/80 hover:bg-white border border-stone-200 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 group-hover:text-amber-900">
                    <Scroll className="w-3.5 h-3.5 text-amber-800" />
                    <span>Shakespeare Review</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">Hamlet, Macbeth, Sonnets & Globe folio.</p>
                </a>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href="#activities"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-950 hover:text-amber-800 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Interactive Writing & Play Activities</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
