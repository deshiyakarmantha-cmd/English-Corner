import React, { useState, useEffect } from 'react';
import { LiteraryWord, getCuratedWord, CURATED_LITERARY_WORDS } from '../data/literaryWords';
import { Volume2, VolumeX, Sparkles, RefreshCw, Copy, Check, MessageSquare, BookOpen, Globe } from 'lucide-react';

interface WordOfTheDayProps {
  onOpenAiTutor?: (prefillQuery?: string) => void;
}

export const WordOfTheDay: React.FC<WordOfTheDayProps> = ({ onOpenAiTutor }) => {
  const [wordData, setWordData] = useState<LiteraryWord>(getCuratedWord());
  const [loading, setLoading] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sourceTag, setSourceTag] = useState<'scholar_ai_live' | 'scholar_engine'>('scholar_engine');

  const fetchWord = async (nextIndex?: number) => {
    setLoading(true);
    const targetIndex = nextIndex !== undefined ? nextIndex : currentIndex + 1;
    setCurrentIndex(targetIndex);

    // Check if on static host like GitHub Pages without backend
    const isStaticHost =
      typeof window !== 'undefined' &&
      (window.location.hostname.endsWith('github.io') ||
        window.location.hostname.endsWith('gitlab.io') ||
        window.location.protocol === 'file:');

    const customApiBase =
      (import.meta.env.VITE_API_URL as string | undefined)?.trim() ||
      (typeof window !== 'undefined' && (window as any).__BACKEND_API_URL__) ||
      '';

    if (isStaticHost && !customApiBase) {
      // Smooth offline cycle through curated lexicon
      await new Promise(r => setTimeout(r, 250));
      setWordData(CURATED_LITERARY_WORDS[targetIndex % CURATED_LITERARY_WORDS.length]);
      setSourceTag('scholar_engine');
      setLoading(false);
      return;
    }

    try {
      const url = customApiBase
        ? `${customApiBase.replace(/\/$/, '')}/api/word-of-the-day?seed=${targetIndex}`
        : `/api/word-of-the-day?seed=${targetIndex}`;

      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        if (data.word) {
          setWordData(data.word);
          setSourceTag(data.source === 'scholar_ai_live' ? 'scholar_ai_live' : 'scholar_engine');
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback cleanly on network glitch
    }

    setWordData(CURATED_LITERARY_WORDS[targetIndex % CURATED_LITERARY_WORDS.length]);
    setSourceTag('scholar_engine');
    setLoading(false);
  };

  const handlePronounce = () => {
    if (!('speechSynthesis' in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(wordData.word);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.lang = 'en-GB';

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    const textToCopy = `"${wordData.word}" (${wordData.partOfSpeech}) ${wordData.phonetic}\nDefinition: ${wordData.definition}\nEtymology: ${wordData.etymology}\nLiterary Example: "${wordData.literaryExample}" — ${wordData.authorOrWork}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleAskTutor = () => {
    if (onOpenAiTutor) {
      onOpenAiTutor(`Explain the literary word "${wordData.word}", its etymology, and provide 2 example sentences in literature.`);
    }
  };

  return (
    <div className="relative bg-[#FAF6EE] border-2 border-stone-300/90 rounded-2xl p-6 sm:p-8 shadow-xs overflow-hidden transition-all">
      {/* Antique subtle corner embellishment */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/25 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

      {/* Header kicker & controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200/80">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-800" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-950">
            Literary Word of the Day
          </span>
          <span className="text-stone-400">·</span>
          <span className="text-xs text-stone-500 font-serif italic">
            Lexicon & Etymology Archive
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchWord()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-amber-950 bg-stone-100 hover:bg-stone-200/80 border border-stone-300/80 rounded-lg transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
            title="Fetch another classical literary word"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-800 ${loading ? 'animate-spin' : ''}`} />
            <span>Discover Another Word</span>
          </button>
        </div>
      </div>

      {/* Main Word Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Word, Phonetics, Audio, Definition */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                {wordData.word}
              </h3>
              <span className="text-sm font-mono text-stone-500">
                {wordData.phonetic}
              </span>
              <span className="text-xs font-serif italic text-amber-900 font-medium">
                {wordData.partOfSpeech}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={handlePronounce}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-md text-xs font-medium transition-colors cursor-pointer"
                title="Listen to pronunciation"
              >
                {speaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                    <span className="text-rose-700">Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                    <span>Pronounce</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                title="Copy word and etymology citation"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>

              <button
                onClick={handleAskTutor}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-amber-950 hover:bg-amber-100/60 rounded-md transition-colors cursor-pointer"
                title="Ask Scholar AI to teach this word"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-800" />
                <span>Ask Scholar AI</span>
              </button>
            </div>
          </div>

          {/* Academic Definition */}
          <div className="bg-white border border-stone-200/90 rounded-xl p-4 shadow-2xs">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
              Scholastic Definition
            </span>
            <p className="text-sm sm:text-base text-stone-800 font-serif leading-relaxed">
              {wordData.definition}
            </p>
          </div>

          {/* Literary Example Quote */}
          {wordData.literaryExample && (
            <div className="border-l-2 border-amber-800/60 pl-3.5 py-1">
              <blockquote className="text-xs sm:text-sm font-serif italic text-stone-700 leading-relaxed">
                &ldquo;{wordData.literaryExample}&rdquo;
              </blockquote>
              <cite className="text-[11px] font-sans text-stone-500 block mt-1 not-italic">
                — {wordData.authorOrWork}
              </cite>
            </div>
          )}
        </div>

        {/* Right Column: Etymology, Classical Roots, Multilingual equivalents */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Etymology & Classical Roots Box */}
          <div className="bg-[#F6F1E8] border border-amber-950/10 rounded-xl p-4 sm:p-5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>Etymology & Classical Roots</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
              {wordData.etymology}
            </p>
          </div>

          {/* Multilingual Context (Sinhala & Tamil) */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-stone-500">
              <Globe className="w-3 h-3 text-amber-800" />
              <span>Island Voice Translations</span>
            </div>
            
            <div className="text-xs space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-amber-950 shrink-0 font-serif">සිංහල:</span>
                <span className="text-stone-700 font-sans">{wordData.sinhalaTranslation}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-amber-950 shrink-0 font-serif">தமிழ்:</span>
                <span className="text-stone-700 font-sans">{wordData.tamilTranslation}</span>
              </div>
            </div>
          </div>

          {/* Scholar's Pedagogical Note */}
          {wordData.scholarNote && (
            <p className="text-[11px] text-stone-500 italic font-serif leading-normal">
              Scholar&apos;s Note: {wordData.scholarNote}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
