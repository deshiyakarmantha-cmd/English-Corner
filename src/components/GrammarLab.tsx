import React, { useState } from 'react';
import { GRAMMAR_TOPICS } from '../data/festivalData';
import { BookOpen, CheckCircle, HelpCircle, Layers, Clock, ArrowRightLeft, Sparkles } from 'lucide-react';

const TENSES_DATA = [
  {
    tense: 'Simple Present',
    formula: 'Subject + Base Verb (s/es)',
    example: 'The monks chant sacred stanzas at dawn.',
    use: 'Habitual actions, timeless truths, permanent states.',
  },
  {
    tense: 'Present Continuous',
    formula: 'Subject + am/is/are + Verb-ing',
    example: 'The scholars are translating an English sonnet right now.',
    use: 'Actions taking place currently or temporary situations.',
  },
  {
    tense: 'Present Perfect',
    formula: 'Subject + have/has + Past Participle',
    example: 'The festival has welcomed over a thousand guests today.',
    use: 'Actions completed at an unspecified past time with current relevance.',
  },
  {
    tense: 'Present Perfect Continuous',
    formula: 'Subject + have/has been + Verb-ing',
    example: 'Students have been reciting Hamlet since early morning.',
    use: 'Actions initiated in the past continuing uninterrupted into present.',
  },
  {
    tense: 'Simple Past',
    formula: 'Subject + Past Verb (-ed or irregular)',
    example: 'Shakespeare wrote Hamlet around 1600 in London.',
    use: 'Completed events at a definite past moment.',
  },
  {
    tense: 'Past Continuous',
    formula: 'Subject + was/were + Verb-ing',
    example: 'Rain was falling softly over the Kandy stupa while they read.',
    use: 'Ongoing action interrupted or co-occurring in the past.',
  },
  {
    tense: 'Past Perfect',
    formula: 'Subject + had + Past Participle',
    example: 'The audience had gathered before the keynote lecture commenced.',
    use: 'An action completed prior to another past action.',
  },
  {
    tense: 'Past Perfect Continuous',
    formula: 'Subject + had been + Verb-ing',
    example: 'The scribe had been preparing ola manuscripts for three weeks before the exhibition.',
    use: 'Duration of an action leading up to a specific past landmark.',
  },
  {
    tense: 'Simple Future',
    formula: 'Subject + will/shall + Base Verb',
    example: 'The Asgiri Pirivena will celebrate its heritage tomorrow.',
    use: 'Future predictions, decisions, or promises.',
  },
  {
    tense: 'Future Continuous',
    formula: 'Subject + will be + Verb-ing',
    example: 'At noon, the debate society will be presenting their arguments.',
    use: 'Action that will be in progress at a specific future moment.',
  },
  {
    tense: 'Future Perfect',
    formula: 'Subject + will have + Past Participle',
    example: 'By dusk, the scholars will have completed the Shakespeare review.',
    use: 'Action that will be accomplished before a specific future deadline.',
  },
  {
    tense: 'Future Perfect Continuous',
    formula: 'Subject + will have been + Verb-ing',
    example: 'By 2026, the faculty will have been teaching English for over half a century.',
    use: 'Duration of ongoing action benchmarked against a future horizon.',
  },
];

const FIX_THE_LINE_EXERCISES = [
  {
    id: 1,
    incorrect: 'Between you and I, the Shakespearean tragedy was profoundly moving.',
    correct: 'Between you and me, the Shakespearean tragedy was profoundly moving.',
    rule: 'The preposition "between" requires objective case pronouns ("me", not nominative "I").',
  },
  {
    id: 2,
    incorrect: 'Walking across the Asgiri courtyard, the temple bells echoed clearly.',
    correct: 'Walking across the Asgiri courtyard, the scholar heard the temple bells echo clearly.',
    rule: 'Dangling participle fix: The temple bells were not walking across the courtyard; the human scholar was.',
  },
  {
    id: 3,
    incorrect: 'The library has rare books, it’s collection includes sixteenth-century folios.',
    correct: 'The library has rare books; its collection includes sixteenth-century folios.',
    rule: '"Its" is possessive; "it\'s" is the contraction for "it is". Also replaces comma splice with a semicolon.',
  },
  {
    id: 4,
    incorrect: 'Each of the student monks have prepared an English speech.',
    correct: 'Each of the student monks has prepared an English speech.',
    rule: '"Each" is a singular distributive pronoun and requires the singular verb "has".',
  },
];

export const GrammarLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'parts' | 'tenses' | 'voice' | 'clinic'>('parts');
  const [selectedTenseIndex, setSelectedTenseIndex] = useState(0);
  const [revealedFixes, setRevealedFixes] = useState<number[]>([]);
  const [voiceToggle, setVoiceToggle] = useState<'active' | 'passive'>('active');

  const toggleRevealFix = (id: number) => {
    setRevealedFixes(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="grammar" className="py-16 lg:py-24 border-b border-stone-200 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
            <BookOpen className="w-4 h-4 text-amber-800" />
            <span>Syntax, Structure & Style</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            The Grammar Laboratory
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Grammar is the subtle architecture of meaning. Here at the English Corner, we demystify syntax, calibrate tense precision, and refine rhetorical poise for academic and creative writing.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-200/70 border border-stone-300 rounded-xl mb-8 max-w-2xl">
          <button
            onClick={() => setActiveTab('parts')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'parts' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-800" />
            <span>8 Parts of Speech</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tenses')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'tenses' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-800" />
            <span>12 Tenses Compass</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'voice' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-800" />
            <span>Voice & Agency</span>
          </button>

          <button
            onClick={() => setActiveTab('clinic')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'clinic' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-800" />
            <span>Fix-the-Line Clinic</span>
          </button>
        </div>

        {/* TAB 1: PARTS OF SPEECH */}
        {activeTab === 'parts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GRAMMAR_TOPICS.map((topic) => (
                <div key={topic.id} className="p-6 bg-white border border-stone-200 rounded-2xl shadow-xs">
                  <h3 className="text-xl font-serif font-bold text-amber-950 mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">{topic.subtitle}</p>

                  <ul className="space-y-2 mb-4 text-xs text-stone-700">
                    {topic.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-800 font-bold">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3.5 bg-stone-50 border border-stone-200/80 rounded-xl text-xs space-y-2">
                    <div className="font-semibold text-stone-900">Exemplar Analysis:</div>
                    <div className="font-serif italic text-amber-950">
                      &ldquo;{topic.examples[0].correct}&rdquo;
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      {topic.examples[0].explanation}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-amber-900 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Stylistic Note: {topic.interactiveTip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 12 TENSES COMPASS */}
        {activeTab === 'tenses' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                The Chronological Master Matrix
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Select any tense from the grid below to inspect its mathematical formula, literary usage, and exemplar context.
              </p>
            </div>

            {/* Matrix Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {TENSES_DATA.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTenseIndex(idx)}
                  className={`p-3 text-left border rounded-xl transition-all ${
                    selectedTenseIndex === idx
                      ? 'border-amber-900 bg-amber-50/80 shadow-xs ring-1 ring-amber-900/40'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                  }`}
                >
                  <p className="text-xs font-semibold text-stone-900">{t.tense}</p>
                  <p className="text-[10px] text-stone-500 truncate mt-0.5">{t.formula}</p>
                </button>
              ))}
            </div>

            {/* Selected Tense Deep Dive */}
            {(() => {
              const activeTense = TENSES_DATA[selectedTenseIndex];
              return (
                <div className="p-6 bg-[#F8F5EE] border border-amber-950/15 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-stone-200/80 pb-3 mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-900">
                        Temporal Structure
                      </span>
                      <h4 className="text-xl font-serif font-bold text-stone-900">
                        {activeTense.tense}
                      </h4>
                    </div>
                    <div className="text-xs font-mono font-medium px-3 py-1 bg-white border border-stone-300 rounded-lg text-amber-950">
                      Formula: {activeTense.formula}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-stone-800 mb-1">When to Deploy:</p>
                      <p className="text-stone-600 leading-relaxed">{activeTense.use}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800 mb-1">Pirivena & Festival Context Exemplar:</p>
                      <p className="font-serif italic text-sm text-amber-950 leading-relaxed bg-white/70 p-3 rounded-lg border border-stone-200">
                        &ldquo;{activeTense.example}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 3: VOICE & AGENCY */}
        {activeTab === 'voice' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="max-w-2xl mb-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Active versus Passive Voice Studio
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Toggle below to experience how syntactic inversion completely alters the rhetorical gravity, tempo, and focus of your writing.
              </p>
            </div>

            {/* Voice Toggle Switch */}
            <div className="flex items-center gap-3 p-1.5 bg-stone-100 border border-stone-300 rounded-xl w-fit mb-8">
              <button
                onClick={() => setVoiceToggle('active')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  voiceToggle === 'active'
                    ? 'bg-amber-950 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Active Voice (Subject Drives Verb)
              </button>
              <button
                onClick={() => setVoiceToggle('passive')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  voiceToggle === 'passive'
                    ? 'bg-amber-950 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Passive Voice (Action Befalls Object)
              </button>
            </div>

            {/* Live Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl border transition-all ${
                voiceToggle === 'active' ? 'bg-amber-50/70 border-amber-800/40 ring-1 ring-amber-900/20' : 'bg-stone-50 border-stone-200 opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Active Architecture</span>
                  <span className="text-[11px] font-mono text-stone-500">S + V + O</span>
                </div>
                <p className="text-base font-serif font-medium text-stone-900 my-3">
                  &ldquo;The venerable abbot composed thirty English stanzas for the festival opening.&rdquo;
                </p>
                <div className="text-xs text-stone-600 space-y-1">
                  <p><strong>Subject:</strong> The venerable abbot (Clear doer)</p>
                  <p><strong>Action:</strong> composed (Vivid kinetic verb)</p>
                  <p><strong>Result:</strong> Direct, muscular prose with immediate dramatic agency.</p>
                </div>
              </div>

              <div className={`p-6 rounded-xl border transition-all ${
                voiceToggle === 'passive' ? 'bg-amber-50/70 border-amber-800/40 ring-1 ring-amber-900/20' : 'bg-stone-50 border-stone-200 opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Passive Architecture</span>
                  <span className="text-[11px] font-mono text-stone-500">O + Aux + V3 (+ by S)</span>
                </div>
                <p className="text-base font-serif font-medium text-stone-900 my-3">
                  &ldquo;Thirty English stanzas were composed by the venerable abbot for the festival opening.&rdquo;
                </p>
                <div className="text-xs text-stone-600 space-y-1">
                  <p><strong>Focus:</strong> The stanzas (Object receives prime prominence)</p>
                  <p><strong>Verb:</strong> were composed (Auxiliary + participle)</p>
                  <p><strong>Best for:</strong> Scientific treatises, legal decrees, or when the agent is secondary.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FIX-THE-LINE CLINIC */}
        {activeTab === 'clinic' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="max-w-2xl mb-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                The Fix-the-Line Interactive Clinic
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Common errors caught in student essays and manuscripts. Examine each line, test your syntactic diagnostic skills, and click to reveal the grammatical cure.
              </p>
            </div>

            <div className="space-y-4">
              {FIX_THE_LINE_EXERCISES.map((item) => {
                const isRevealed = revealedFixes.includes(item.id);
                return (
                  <div key={item.id} className="p-5 border border-stone-200 rounded-xl bg-stone-50/60">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="text-xs font-semibold text-rose-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                        <span>Problematic Line #{item.id}</span>
                      </div>
                      <button
                        onClick={() => toggleRevealFix(item.id)}
                        className="text-xs font-semibold text-amber-900 hover:text-amber-950 underline self-start sm:self-auto"
                      >
                        {isRevealed ? 'Hide Surgical Repair' : 'Diagnose & Fix Line'}
                      </button>
                    </div>

                    <p className="text-sm font-serif text-stone-800 line-through decoration-rose-400">
                      &ldquo;{item.incorrect}&rdquo;
                    </p>

                    {isRevealed && (
                      <div className="mt-3 pt-3 border-t border-stone-200 text-xs animate-fadeIn">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-800 mb-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Repaired Master Sentence:</span>
                        </div>
                        <p className="font-serif text-sm font-medium text-stone-950 mb-1.5">
                          &ldquo;{item.correct}&rdquo;
                        </p>
                        <p className="text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200/70 text-[11px]">
                          <strong>Rule:</strong> {item.rule}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
