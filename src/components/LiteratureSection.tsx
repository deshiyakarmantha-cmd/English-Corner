import React, { useState } from 'react';
import { LITERATURE_ERAS } from '../data/festivalData';
import { BookMarked, Feather, Quote, ChevronRight } from 'lucide-react';
import literatureImage from '../assets/images/kandy_asgiri_literary_fest_1791314962470.jpg';

export const LiteratureSection: React.FC = () => {
  const [selectedEraId, setSelectedEraId] = useState<string>(LITERATURE_ERAS[0].id);

  const activeEra = LITERATURE_ERAS.find(era => era.id === selectedEraId) || LITERATURE_ERAS[0];

  return (
    <section id="literature" className="py-16 lg:py-24 border-b border-stone-200 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
            <BookMarked className="w-4 h-4 text-amber-800" />
            <span>The Canon & The Island Voice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Chronicles of English Literature
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Traverse five centuries of poetic revolution, social realism, and colonial deconstruction—culminating in the unique, fragrant cadence of Sri Lankan English writing rooted in Kandy and its monastic traditions.
          </p>
        </div>

        {/* Era Segmented Selector (Buttons/Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {LITERATURE_ERAS.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEraId(era.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                selectedEraId === era.id
                  ? 'bg-amber-950 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-950'
              }`}
            >
              <span>{era.era}</span>
              <span className="ml-1.5 opacity-60 text-[10px]">({era.period})</span>
            </button>
          ))}
        </div>

        {/* Selected Era Deep Dive Container */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Cols: Overview & Notable Works */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-900 mb-1">
                  <span>HISTORICAL HORIZON</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeEra.period}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4">
                  {activeEra.era}
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed mb-6 first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-amber-900">
                  {activeEra.overview}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2.5">
                    Hallmark Characteristics:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    {activeEra.definingTraits.map((trait, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-stone-50 rounded-lg border border-stone-100">
                        <span className="text-amber-800 font-bold">•</span>
                        <span>{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                    Milestone Works & Excerpts:
                  </h4>
                  <div className="space-y-3">
                    {activeEra.notableWorks.map((work, idx) => (
                      <div key={idx} className="p-3.5 bg-[#FAF7F2] border border-amber-950/10 rounded-xl">
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="font-serif font-bold text-amber-950 text-sm">
                            {work.title}
                          </span>
                          <span className="text-[11px] font-mono text-stone-500">
                            {work.author} ({work.year})
                          </span>
                        </div>
                        <p className="text-xs font-serif italic text-stone-700 mt-1">
                          {work.snippet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-stone-900">Key Luminaries:</span>
                {activeEra.keyFigures.map((fig, idx) => (
                  <span key={idx} className="text-stone-600">
                    {fig}{idx < activeEra.keyFigures.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Era Atmosphere & Festival Commentary */}
            <div className="lg:col-span-5 bg-[#F6F1E8] border border-amber-900/15 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2">
                  <Quote className="w-3.5 h-3.5 text-amber-800" />
                  <span>Curatorial Commentary</span>
                </div>
                <h4 className="text-lg font-serif font-bold text-stone-900 mb-3">
                  Why We Teach This at Asgiri Pirivena
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed mb-4">
                  Literature is human consciousness speaking across time. When monastic scholars read the Romantics or Shakespeare, they observe how Western poets wrestled with the exact inquiries that still shape modern life: love, mortality, civic duty, and the soul's unrest.
                </p>
                <div className="p-4 bg-white/90 border border-stone-200 rounded-xl">
                  <p className="font-serif italic text-xs text-stone-800 leading-relaxed">
                    &ldquo;To master English without literature is to build a ship and never sail upon the ocean. Literature teaches us not merely grammar, but the heartbeat of humanity.&rdquo;
                  </p>
                  <p className="text-[11px] font-medium text-amber-950 mt-2 text-right">
                    — Sanjanani Festival Academic Board
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200">
                <a
                  href="#activities"
                  className="inline-flex items-center justify-between w-full p-3 bg-amber-950 text-white rounded-lg text-xs font-medium hover:bg-amber-900 transition-colors"
                >
                  <span>Test Your Knowledge on this Era</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Monastic Translation Heritage Feature */}
        <div className="p-8 bg-stone-900 text-stone-100 rounded-2xl overflow-hidden relative shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300">
                <Feather className="w-4 h-4" />
                <span>Special Festival Exhibition</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                The Sacred Ola Leaf Meets English Typography
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                For over two centuries, monastic pirivenas in Kandy have been pivotal in transmitting the Theravada Buddhist Canon to the Western world. Through pioneering translations of the Dhamma and scholarly textual work, they have long connected ancient learning with modern English expression.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-amber-200/90 font-mono">
                <span>• Pali to English Lexicons</span>
                <span>• Dhamma Discourses in Prose</span>
                <span>• Monastic Philosophical Treatises</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-stone-700 bg-stone-800 aspect-4/3">
                <img
                  src={literatureImage}
                  alt="Scholarly pavilion at Asgiri Maha Vihara Pirivena Kandy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-[11px] font-serif text-stone-400 italic mt-2 text-center">
                Plate II — Study cloister at Asgiri Maha Vihara, Kandy: Where classical languages harmonize with English letters.
              </figcaption>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
