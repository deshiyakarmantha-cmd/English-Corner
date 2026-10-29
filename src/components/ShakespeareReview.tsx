import React, { useState, useEffect } from 'react';
import { SHAKESPEARE_WORKS, SHAKESPEARE_COINED_PHRASES } from '../data/festivalData';
import { ShakespeareWork } from '../types';
import { Volume2, VolumeX, Sparkles, Theater, BookOpen, Music, Check, Landmark } from 'lucide-react';
import shakespearePortraitImage from '../assets/images/william_shakespeare_portrait_1791314938105.jpg';
import globeTheatreImage from '../assets/images/shakespeare_globe_theatre_books_1791314950626.jpg';

const FAMOUS_LINES_FOR_METER = [
  {
    line: 'Shall I compare thee to a summer\'s day?',
    play: 'Sonnet 18',
    stressPattern: [
      { syl: 'Shall', stress: false },
      { syl: 'I', stress: true },
      { syl: 'com-', stress: false },
      { syl: 'PARE', stress: true },
      { syl: 'thee', stress: false },
      { syl: 'TO', stress: true },
      { syl: 'a', stress: false },
      { syl: 'SUM-', stress: true },
      { syl: 'mer\'s', stress: false },
      { syl: 'DAY?', stress: true },
    ]
  },
  {
    line: 'To be, or not to be, that is the question',
    play: 'Hamlet, Act III Sc 1',
    stressPattern: [
      { syl: 'To', stress: false },
      { syl: 'BE,', stress: true },
      { syl: 'or', stress: false },
      { syl: 'NOT', stress: true },
      { syl: 'to', stress: false },
      { syl: 'BE,', stress: true },
      { syl: 'that', stress: false },
      { syl: 'IS', stress: true },
      { syl: 'the', stress: false },
      { syl: 'QUES-tion', stress: true },
    ]
  },
  {
    line: 'Now is the winter of our discontent',
    play: 'Richard III, Act I Sc 1',
    stressPattern: [
      { syl: 'Now', stress: true },
      { syl: 'is', stress: false },
      { syl: 'the', stress: false },
      { syl: 'WIN-', stress: true },
      { syl: 'ter', stress: false },
      { syl: 'OF', stress: true },
      { syl: 'our', stress: false },
      { syl: 'DIS-', stress: true },
      { syl: 'con-', stress: false },
      { syl: 'TENT', stress: true },
    ]
  }
];

export const ShakespeareReview: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [speakingWorkId, setSpeakingWorkId] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<ShakespeareWork>(SHAKESPEARE_WORKS[0]);
  const [activeMeterLineIndex, setActiveMeterLineIndex] = useState(0);
  const [meterPlaying, setMeterPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState<number>(-1);

  const filteredWorks = SHAKESPEARE_WORKS.filter(work => {
    if (selectedGenre === 'All') return true;
    return work.genre === selectedGenre;
  });

  const handleRecite = (work: ShakespeareWork) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (speakingWorkId === work.id) {
      window.speechSynthesis.cancel();
      setSpeakingWorkId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(work.iconicQuote.lines);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const statelyVoice = voices.find(v => v.lang.includes('en-GB') || v.name.includes('UK') || v.name.includes('Classic'));
    if (statelyVoice) utterance.voice = statelyVoice;

    utterance.onend = () => setSpeakingWorkId(null);
    utterance.onerror = () => setSpeakingWorkId(null);

    setSpeakingWorkId(work.id);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    let interval: any;
    if (meterPlaying) {
      setCurrentBeat(0);
      interval = setInterval(() => {
        setCurrentBeat((prev) => {
          if (prev >= 9) {
            setMeterPlaying(false);
            return -1;
          }
          return prev + 1;
        });
      }, 550);
    } else {
      setCurrentBeat(-1);
    }
    return () => clearInterval(interval);
  }, [meterPlaying]);

  const activeMeterLine = FAMOUS_LINES_FOR_METER[activeMeterLineIndex];

  return (
    <section id="shakespeare" className="py-16 lg:py-24 border-b border-stone-200 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
            <Theater className="w-4 h-4 text-amber-800" />
            <span>The Bard of Avon Retrospective</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            William Shakespeare: Review & Canonical Works
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Few mortals have expanded the boundaries of language, human psychology, and dramatic catharsis like William Shakespeare (1564–1616). Discover comprehensive critical reviews of his landmark plays, sonnets, and the enduring English phrases he invented.
          </p>
        </div>

        {/* Shakespeare Biographical & Globe Presentation Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Portrait Column */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="rounded-2xl overflow-hidden border border-stone-300 shadow-md bg-stone-900 aspect-3/4">
              <img
                src={shakespearePortraitImage}
                alt="William Shakespeare museum oil portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-xs font-serif text-stone-500 italic mt-2.5 text-center">
              William Shakespeare (1564–1616) — Playwright, Poet, and Actor of The King&apos;s Men.
            </figcaption>
          </div>

          {/* Biographical Overview & First Folio Analysis */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-900 mb-2">
                <span>STRATFORD-UPON-AVON TO LONDON</span>
                <span aria-hidden="true">·</span>
                <span>THE ELIZABETHAN RENAISSANCE</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">
                The Architect of Modern Human Introspection
              </h3>

              <p className="text-sm text-stone-700 leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-amber-900">
                Writing across thirty-seven plays, 154 sonnets, and two narrative poems, Shakespeare forged over 1,700 new words and countless idioms that remain foundational to English today. At the heart of his genius is his unmatched understanding of human emotion, power, grief, ambition, and love.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] font-mono uppercase text-amber-900 font-bold block">Plays Penned</span>
                  <span className="text-2xl font-serif font-bold text-stone-900">37 Dramas</span>
                  <p className="text-[11px] text-stone-500 mt-0.5">Tragedies, Comedies, Histories & Romances.</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] font-mono uppercase text-amber-900 font-bold block">Poetic Canon</span>
                  <span className="text-2xl font-serif font-bold text-stone-900">154 Sonnets</span>
                  <p className="text-[11px] text-stone-500 mt-0.5">Mastery of the 14-line iambic pentameter.</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] font-mono uppercase text-amber-900 font-bold block">First Folio</span>
                  <span className="text-2xl font-serif font-bold text-stone-900">1623 Folio</span>
                  <p className="text-[11px] text-stone-500 mt-0.5">Assembled by fellow actors Heminge & Condell.</p>
                </div>
              </div>

              {/* Globe Theatre Feature */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#FAF7F2] border border-amber-950/15 rounded-xl mb-4">
                <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden shrink-0 border border-stone-300 shadow-xs">
                  <img
                    src={globeTheatreImage}
                    alt="The Globe Theatre and Shakespeare First Folios"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs text-stone-700">
                  <span className="font-serif font-bold text-amber-950 text-sm block mb-1">
                    Plate III — The Globe Playhouse & Canonical Folios
                  </span>
                  <p className="leading-relaxed">
                    Under the open skies of London, Shakespeare&apos;s acting company, The King&apos;s Men, staged legendary dramas that shaped modern human psychology. Preserved in the 1623 First Folio, his words continue to echo from Stratford to Kandy.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
              <span className="font-serif italic">
                &ldquo;He was not of an age, but for all time!&rdquo; — Ben Jonson, 1623 First Folio Preface
              </span>
              <a
                href="#activities"
                className="px-3.5 py-1.5 bg-amber-950 text-white rounded-lg font-medium hover:bg-amber-900 transition-colors whitespace-nowrap"
              >
                Test Shakespeare Trivia
              </a>
            </div>
          </div>
        </div>

        {/* WORK REVIEWS SECTION */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Critical Reviews of Landmark Works
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Select any play or sonnet to read plot analyses, iconic quotes, critical appraisals, and character rosters.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl border border-stone-300">
              {['All', 'Tragedy', 'Comedy', 'Poetry'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedGenre === genre
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {genre === 'All' ? 'All Works' : genre}
                </button>
              ))}
            </div>
          </div>

          {/* Work Selection Pills / Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {filteredWorks.map((work) => (
              <button
                key={work.id}
                onClick={() => setSelectedWork(work)}
                className={`p-3 text-left border rounded-xl transition-all ${
                  selectedWork.id === work.id
                    ? 'border-amber-900 bg-amber-50/90 ring-1 ring-amber-900/30'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <span className="text-[10px] font-mono uppercase text-amber-900 font-bold block truncate">
                  {work.genre}
                </span>
                <span className="text-xs font-serif font-bold text-stone-900 block truncate mt-0.5">
                  {work.title}
                </span>
              </button>
            ))}
          </div>

          {/* Active Work In-Depth Review Dossier */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
                  <span className="text-amber-900 font-semibold">{selectedWork.genre}</span>
                  <span aria-hidden="true">·</span>
                  <span>Composed {selectedWork.compositionYear}</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {selectedWork.title}
                </h4>
              </div>

              {/* Recitation Trigger */}
              <button
                onClick={() => handleRecite(selectedWork)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  speakingWorkId === selectedWork.id
                    ? 'bg-rose-900 text-white border-rose-900 animate-pulse'
                    : 'bg-[#FAF7F2] text-amber-950 border-amber-300 hover:bg-amber-100'
                }`}
                title="Listen to dramatic reading using Web Speech API"
              >
                {speakingWorkId === selectedWork.id ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Stop Soliloquy</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-800" />
                    <span>Recite Iconic Quote</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left 7 Columns: Dramatic Synopsis & Critical Review */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2">
                    Dramatic Arc & Narrative Overview:
                  </h5>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {selectedWork.overview}
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] border border-amber-950/15 rounded-xl">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold mb-1">
                    Iconic Soliloquy / Lines ({selectedWork.iconicQuote.speaker})
                  </div>
                  <p className="font-serif italic text-base sm:text-lg text-amber-950 leading-relaxed my-2">
                    &ldquo;{selectedWork.iconicQuote.lines}&rdquo;
                  </p>
                  <p className="text-xs text-stone-500">
                    Context: {selectedWork.iconicQuote.context}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2">
                    Critical Appraisal & Psychological Depth:
                  </h5>
                  <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200/80">
                    {selectedWork.criticalReview}
                  </p>
                </div>
              </div>

              {/* Right 5 Columns: Thematic Matrix & Key Personages */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                    Central Thematic Pillars:
                  </h5>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {selectedWork.centralThemes.map((theme, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-800 font-bold">✓</span>
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                    Dramatis Personae (Key Figures):
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWork.characters.map((char, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs bg-white border border-stone-200 rounded-md text-stone-800"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-[#F8F5EE] border border-amber-950/15 rounded-xl">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-amber-950 mb-1">
                    Academic Significance:
                  </h5>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {selectedWork.academicSignificance}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* INTERACTIVE IAMBIC PENTAMETER SCANNER */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                <Music className="w-4 h-4 text-amber-800" />
                <span>Interactive Metric Meter Scanner</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Understanding Iambic Pentameter: The da-DUM Rhythm
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl">
                Shakespeare composed largely in iambs: a metric foot with one unstressed syllable followed by a stressed syllable. Five iambs per line yield the legendary 10-syllable heartbeat of Elizabethan verse.
              </p>
            </div>

            {/* Metronome Beat Button */}
            <button
              onClick={() => setMeterPlaying(!meterPlaying)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border flex items-center gap-2 transition-all ${
                meterPlaying
                  ? 'bg-amber-900 text-white border-amber-950'
                  : 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${meterPlaying ? 'animate-bounce' : ''}`} />
              <span>{meterPlaying ? 'Playing Metric Beat...' : 'Hear the Metronome (da-DUM)'}</span>
            </button>
          </div>

          {/* Select Sample Line */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {FAMOUS_LINES_FOR_METER.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveMeterLineIndex(idx);
                  setMeterPlaying(false);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap border ${
                  activeMeterLineIndex === idx
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {item.play}
              </button>
            ))}
          </div>

          {/* Syllable Scanning Visualizer */}
          <div className="p-6 bg-[#FAF7F2] border border-amber-950/15 rounded-xl text-center">
            <p className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-4">
              Scansion: {activeMeterLine.play}
            </p>

            <div className="flex flex-wrap justify-center items-end gap-2 sm:gap-3 py-4">
              {activeMeterLine.stressPattern.map((item, beatIdx) => {
                const isCurrentBeat = currentBeat === beatIdx;
                return (
                  <div key={beatIdx} className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-stone-400 mb-1">
                      {item.stress ? 'DUM (/) ' : 'da (˘)'}
                    </span>
                    <div
                      className={`px-3 py-2.5 rounded-lg border text-sm sm:text-base font-serif transition-all ${
                        isCurrentBeat
                          ? 'bg-amber-800 text-white scale-110 shadow-md ring-2 ring-amber-400'
                          : item.stress
                          ? 'bg-amber-100/90 border-amber-300 font-bold text-amber-950'
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      {item.syl}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-stone-600 mt-4 max-w-xl mx-auto">
              Total: 10 syllables divided into 5 poetic feet (da-DUM × 5). Try reciting with the accents to feel the natural cadence of the human heartbeat!
            </p>
          </div>
        </div>

        {/* SHAKESPEARE'S COINED PHRASES */}
        <div className="bg-[#F5EFE6] border border-amber-950/15 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>Lexical Legacies</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Everyday English Coined by Shakespeare
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Whenever you say &ldquo;break the ice&rdquo; or &ldquo;wild goose chase&rdquo;, you are quoting William Shakespeare directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {SHAKESPEARE_COINED_PHRASES.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-xs hover:border-amber-900/30 transition-colors"
              >
                <div className="font-serif font-bold text-amber-950 text-sm mb-1">
                  &ldquo;{item.phrase}&rdquo;
                </div>
                <div className="text-[11px] font-mono text-amber-900/80 mb-2">
                  Origin: {item.source}
                </div>
                <p className="text-[11px] text-stone-600 leading-snug">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
