import React, { useState } from 'react';
import { ENGLISH_LANGUAGE_FACTS, CURIOUS_LOANWORDS } from '../data/festivalData';
import { Compass, Search, Globe, Sparkles } from 'lucide-react';

export const LanguageSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeOrigin, setActiveOrigin] = useState<string>('all');

  const filteredWords = CURIOUS_LOANWORDS.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeOrigin === 'all') return matchesSearch;
    if (activeOrigin === 'sri-lanka') {
      return matchesSearch && (item.origin.includes('Sinhala') || item.origin.includes('Serendib') || item.origin.includes('Tamil'));
    }
    if (activeOrigin === 'pali-sanskrit') {
      return matchesSearch && (item.origin.includes('Pali') || item.origin.includes('Sanskrit'));
    }
    return matchesSearch;
  });

  return (
    <section id="language" className="py-16 lg:py-24 border-b border-stone-200 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
            <Compass className="w-4 h-4 text-amber-800" />
            <span>Linguistic Heritage & Etymology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            The Odyssey of the English Tongue
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            From the misty shores of Anglo-Saxon Britain to the monastic cloisters of Kandy, English has evolved not by isolation, but by an insatiable appetite for borrowing words from over 350 civilizations.
          </p>
        </div>

        {/* 4 Evolutionary Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {ENGLISH_LANGUAGE_FACTS.map((fact, idx) => (
            <div 
              key={idx}
              className="p-6 bg-white border border-stone-200/90 rounded-2xl shadow-xs hover:border-amber-900/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-mono text-amber-900 font-semibold tracking-wider uppercase">
                    0{idx + 1}. {fact.period}
                  </span>
                  <Globe className="w-4 h-4 text-stone-400" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                  {fact.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {fact.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Loanword & Etymology Crucible */}
        <div className="bg-[#F5EFE6] border border-amber-950/15 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Interactive Etymology Vault</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Words You Speak That Sailed Across Oceans
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-xl">
                Did you know that English words like &ldquo;Serendipity&rdquo; and &ldquo;Tourmaline&rdquo; trace their direct genesis to Sri Lanka? Search or filter below:
              </p>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-white/70 border border-stone-300 rounded-lg">
                <button
                  onClick={() => setActiveOrigin('all')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeOrigin === 'all' ? 'bg-amber-950 text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveOrigin('sri-lanka')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeOrigin === 'sri-lanka' ? 'bg-amber-950 text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Sri Lanka / Serendib
                </button>
                <button
                  onClick={() => setActiveOrigin('pali-sanskrit')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeOrigin === 'pali-sanskrit' ? 'bg-amber-950 text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Pali & Sanskrit
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter words or origins..."
                  className="pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-900 w-full sm:w-48"
                />
              </div>
            </div>
          </div>

          {/* Word Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredWords.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 bg-white/95 border border-stone-200/80 rounded-xl hover:shadow-xs transition-shadow"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <h4 className="text-base font-serif font-bold text-amber-950">
                    {item.word}
                  </h4>
                  <span className="text-[11px] font-mono text-stone-500">
                    Etymology
                  </span>
                </div>
                <p className="text-xs font-medium text-amber-900/90 mb-2">
                  Origin: {item.origin}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>

          {filteredWords.length === 0 && (
            <div className="p-8 text-center text-stone-500 text-sm">
              No matching loanwords found for &ldquo;{searchTerm}&rdquo;. Try clearing your filter.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
