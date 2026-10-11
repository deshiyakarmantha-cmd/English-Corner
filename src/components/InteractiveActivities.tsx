import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  QUIZ_QUESTIONS, 
  SHAKESPEARE_INSULT_PARTS, 
  SHAKESPEARE_PRAISE_PARTS, 
  WRITING_PROMPTS, 
  INITIAL_COMMUNITY_SUBMISSIONS 
} from '../data/festivalData';
import { WritingSubmission } from '../types';
import { CertificateModal } from './CertificateModal';
import { 
  PenTool, 
  Gamepad2, 
  Sparkles, 
  Award, 
  Volume2, 
  Copy, 
  Check, 
  Heart, 
  RotateCcw, 
  HelpCircle,
  Lightbulb,
  Share2
} from 'lucide-react';

// Anagram challenge data
const ANAGRAM_WORDS = [
  {
    target: 'SOLILOQUY',
    scrambled: 'QIUOSLYLO',
    clue: 'An act of speaking one\'s thoughts aloud when by oneself on stage, as Hamlet often does.',
    etymology: 'From Latin "solus" (alone) + "loqui" (to speak).',
  },
  {
    target: 'SERENDIPITY',
    scrambled: 'DIPITYSEREN',
    clue: 'The faculty of making fortunate discoveries by chance, inspired by ancient Ceylon (Serendib).',
    etymology: 'Coined by Horace Walpole in 1754.',
  },
  {
    target: 'SHAKESPEARE',
    scrambled: 'KASPEHARESE',
    clue: 'The English playwright celebrated as the Bard of Avon at this festival.',
    etymology: 'Stratford-upon-Avon surname recorded since the 13th century.',
  },
  {
    target: 'METAPHOR',
    scrambled: 'PHORTAME',
    clue: 'A figure of speech where a word or phrase is applied to an object or action without using "like" or "as".',
    etymology: 'From Greek "metapherein" (to transfer or carry over).',
  },
  {
    target: 'ASGIRIYA',
    scrambled: 'YARIASGI',
    clue: 'The historic hill and monastic chapter in Kandy where this Sanjanani festival is hosted.',
    etymology: 'Central monastic fraternity of the Siam Nikaya in Sri Lanka.',
  },
];

export const InteractiveActivities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'writing' | 'quiz' | 'generator' | 'crucible'>('writing');

  // Activity 1: Writing Studio State
  const [authorName, setAuthorName] = useState('');
  const [institution, setInstitution] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState<'Haiku' | 'Poem' | 'Micro-Story' | 'Reflections'>('Haiku');
  const [content, setContent] = useState('');
  const [activePrompt, setActivePrompt] = useState('');
  const [submissions, setSubmissions] = useState<WritingSubmission[]>(() => {
    const saved = localStorage.getItem('sanjanani_submissions');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_SUBMISSIONS;
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Certificate Modal State
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certRecipient, setCertRecipient] = useState('');
  const [certTitle, setCertTitle] = useState('Festival Scholar');
  const [certScore, setCertScore] = useState<number | undefined>(undefined);
  const [certText, setCertText] = useState<string | undefined>(undefined);

  // Activity 2: Quiz State
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Activity 3: Insult/Praise Generator State
  const [generatorMode, setGeneratorMode] = useState<'insult' | 'praise'>('insult');
  const [col1Index, setCol1Index] = useState(0);
  const [col2Index, setCol2Index] = useState(0);
  const [col3Index, setCol3Index] = useState(0);
  const [copiedPhrase, setCopiedPhrase] = useState(false);

  // Activity 4: Lexicon Crucible State
  const [crucibleIndex, setCrucibleIndex] = useState(0);
  const [crucibleInput, setCrucibleInput] = useState('');
  const [crucibleSolved, setCrucibleSolved] = useState(false);
  const [crucibleScore, setCrucibleScore] = useState(0);
  const [showCrucibleClue, setShowCrucibleClue] = useState(false);

  // Save submissions to localStorage
  useEffect(() => {
    localStorage.setItem('sanjanani_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Syllable / Word counting helper
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const lineCount = content ? content.split('\n').length : 0;

  // Handle prompt loader
  const handleRandomPrompt = () => {
    const random = WRITING_PROMPTS[Math.floor(Math.random() * WRITING_PROMPTS.length)];
    setActivePrompt(random.prompt);
  };

  // Submit piece to community wall
  const handlePublishSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim() || !title.trim()) return;

    const newSub: WritingSubmission = {
      id: `sub-${Date.now()}`,
      author: authorName.trim(),
      institution: institution.trim() || 'Sanjanani Festival Scholar',
      title: title.trim(),
      genre,
      content: content.trim(),
      timestamp: 'Just now · Live Pavilion',
      likes: 1,
    };

    setSubmissions([newSub, ...submissions]);
    setSubmissionSuccess(true);
    setTimeout(() => setSubmissionSuccess(false), 4000);
  };

  // Upvote submission
  const handleLikeSubmission = (id: string) => {
    setSubmissions(prev => 
      prev.map(item => item.id === id ? { ...item, likes: item.likes + 1 } : item)
    );
  };

  // Open Certificate for this writer
  const handleOpenWritingCert = () => {
    setCertRecipient(authorName || 'Festival Writer');
    setCertTitle(`${genre} Laureate — Sanjanani 2026`);
    setCertScore(undefined);
    setCertText(content.slice(0, 140) + (content.length > 140 ? '...' : ''));
    setCertModalOpen(true);
  };

  // Handle Quiz Selection
  const handleSelectQuizOption = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  // Grade Quiz
  const handleGradeQuiz = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 6) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#78350F', '#B45309', '#F59E0B', '#1C1917']
        });
      } catch {
        // fallback if confetti is constrained
      }
    }
  };

  // Reset Quiz
  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Open Certificate for Quiz
  const handleOpenQuizCert = () => {
    setCertRecipient(authorName || 'English Corner Scholar');
    setCertTitle(quizScore >= 8 ? 'Distinguished Literary Scholar' : 'Festival Knowledge Fellow');
    setCertScore(quizScore);
    setCertText(undefined);
    setCertModalOpen(true);
  };

  // Generator Roll
  const handleRollGenerator = () => {
    const list = generatorMode === 'insult' ? SHAKESPEARE_INSULT_PARTS : SHAKESPEARE_PRAISE_PARTS;
    setCol1Index(Math.floor(Math.random() * list.column1.length));
    setCol2Index(Math.floor(Math.random() * list.column2.length));
    setCol3Index(Math.floor(Math.random() * list.column3.length));
  };

  const currentGeneratedPhrase = (() => {
    const list = generatorMode === 'insult' ? SHAKESPEARE_INSULT_PARTS : SHAKESPEARE_PRAISE_PARTS;
    return `${list.column1[col1Index]} ${list.column2[col2Index]} ${list.column3[col3Index]}`;
  })();

  const handleCopyGenerator = () => {
    navigator.clipboard.writeText(currentGeneratedPhrase);
    setCopiedPhrase(true);
    setTimeout(() => setCopiedPhrase(false), 2000);
  };

  const handleReciteGenerator = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(currentGeneratedPhrase);
    utt.rate = 0.9;
    utt.pitch = generatorMode === 'insult' ? 0.95 : 1.1;
    window.speechSynthesis.speak(utt);
  };

  // Crucible Answer Check
  const currentCrucible = ANAGRAM_WORDS[crucibleIndex];
  const handleCheckCrucible = (e: React.FormEvent) => {
    e.preventDefault();
    if (crucibleInput.trim().toUpperCase() === currentCrucible.target) {
      setCrucibleSolved(true);
      setCrucibleScore(prev => prev + 10);
      try {
        confetti({ particleCount: 40, spread: 50 });
      } catch {}
    }
  };

  const handleNextCrucibleWord = () => {
    setCrucibleSolved(false);
    setCrucibleInput('');
    setShowCrucibleClue(false);
    setCrucibleIndex((prev) => (prev + 1) % ANAGRAM_WORDS.length);
  };

  return (
    <section id="activities" className="py-16 lg:py-24 border-b border-stone-200 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
            <Gamepad2 className="w-4 h-4 text-amber-800" />
            <span>Interactive Participant Arena</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Write, Compete & Play at the English Corner
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Language comes alive through practice and play. Draft original verses, challenge yourself against the festival quiz, conjure authentic Shakespearean insults, and solve cryptographic word crucibles.
          </p>
        </div>

        {/* 4 Activity Segmented Navigation */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-200/80 border border-stone-300 rounded-xl mb-10 max-w-3xl">
          <button
            onClick={() => setActiveTab('writing')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'writing' ? 'bg-amber-950 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Creative Writing & Poetry Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'quiz' ? 'bg-amber-950 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Sanjanani Literary Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'generator' ? 'bg-amber-950 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shakespearean Insult / Praise</span>
          </button>

          <button
            onClick={() => setActiveTab('crucible')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'crucible' ? 'bg-amber-950 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Lexicon Anagram Crucible</span>
          </button>
        </div>

        {/* ================= ACTIVITY 1: CREATIVE WRITING STUDIO ================= */}
        {activeTab === 'writing' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left 7 Cols: The Writing Desk */}
              <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      The Festival Scribe&apos;s Desk
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Draft your composition for the 2026 Sanjanani Literary Keepsake Wall.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRandomPrompt}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-950 border border-amber-300 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-amber-800" />
                    <span>Inspire Me</span>
                  </button>
                </div>

                {/* Prompt Banner */}
                {activePrompt && (
                  <div className="p-3.5 bg-[#FAF6EE] border border-amber-950/20 rounded-xl mb-6 text-xs text-stone-800 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-950 block mb-0.5">Prompt Spark:</span>
                      <p className="font-serif italic leading-relaxed">{activePrompt}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePublishSubmission} className="space-y-4">
                  {/* Metadata fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Ven. Sumana Thero or Anuki Perera"
                        required
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        School / Pirivena / Affiliation
                      </label>
                      <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="e.g. Asgiri Pirivena, Kandy"
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Composition Title *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title of your poem or prose..."
                        required
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Form / Genre
                      </label>
                      <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-900"
                      >
                        <option value="Haiku">Haiku (5-7-5)</option>
                        <option value="Poem">Lyric Poem</option>
                        <option value="Micro-Story">100-Word Micro-Story</option>
                        <option value="Reflections">Monastic Reflection</option>
                      </select>
                    </div>
                  </div>

                  {/* Textarea */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-stone-700">
                        Manuscript Content *
                      </label>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-stone-500">
                        <span>{wordCount} words</span>
                        <span>·</span>
                        <span>{lineCount} lines</span>
                        <span>·</span>
                        <span>{charCount} chars</span>
                      </div>
                    </div>
                    <textarea
                      rows={6}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={
                        genre === 'Haiku'
                          ? 'Line 1 (5 syllables)\nLine 2 (7 syllables)\nLine 3 (5 syllables)'
                          : 'Inscribe your verses or thoughts here...'
                      }
                      required
                      className="w-full p-4 font-serif text-sm bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-900 leading-relaxed"
                    />
                  </div>

                  {/* Submission & Keepsake Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-amber-950 text-white rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
                      >
                        Publish to Festival Wall
                      </button>

                      <button
                        type="button"
                        onClick={handleOpenWritingCert}
                        disabled={!content.trim()}
                        className="px-4 py-2.5 bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-medium hover:bg-stone-200 transition-colors disabled:opacity-40"
                      >
                        Generate Keepsake Card
                      </button>
                    </div>

                    {submissionSuccess && (
                      <span className="text-xs font-medium text-emerald-800 flex items-center gap-1">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Published to the Festival Board!</span>
                      </span>
                    )}
                  </div>
                </form>
              </div>

              {/* Right 5 Cols: Forms Guide & Rules */}
              <div className="lg:col-span-5 bg-[#F8F5EE] border border-amber-950/15 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-lg font-serif font-bold text-stone-900 mb-2">
                    Guidelines on Literary Forms
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Choose a structure that tests your economy of words. In ancient Pirivena education, brevity and precision in metric verse were prized virtues.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="font-semibold text-amber-950">1. The Haiku (5-7-5)</div>
                    <p className="text-stone-600 mt-1">
                      Capture an ephemeral moment in nature. Line 1: 5 syllables. Line 2: 7 syllables. Line 3: 5 syllables.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="font-semibold text-amber-950">2. The 100-Word Micro-Story</div>
                    <p className="text-stone-600 mt-1">
                      A complete narrative arc (beginning, conflict, resolution) distilled into precisely 100 words or fewer.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="font-semibold text-amber-950">3. Monastic Reflection</div>
                    <p className="text-stone-600 mt-1">
                      Contemplate impermanence, compassion, or the meeting of languages in the Kandyan highlands.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-100/60 border border-amber-300 rounded-xl text-xs text-amber-950">
                  <span className="font-bold block mb-1">Honorarium at Sanjanani 2026:</span>
                  Outstanding submissions will be compiled into the official &ldquo;Sanjanani Monastic Literary Anthology&rdquo; published at the festival conclusion.
                </div>
              </div>

            </div>

            {/* LIVE FESTIVAL COMMUNITY SUBMISSIONS WALL */}
            <div className="pt-8 border-t border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    The Sanjanani Community Keepsake Wall
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Live verses and reflections submitted by attendees, monks, and visiting students.
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-500">
                  {submissions.length} Entries Inscribed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs flex flex-col justify-between hover:border-amber-900/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                          {sub.genre}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {sub.timestamp}
                        </span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-stone-900 mb-1">
                        {sub.title}
                      </h4>
                      <p className="text-xs text-stone-500 mb-3">
                        By {sub.author} · <span className="italic">{sub.institution}</span>
                      </p>
                      <p className="text-xs font-serif italic text-stone-800 leading-relaxed whitespace-pre-line bg-[#FAF7F2] p-3 rounded-xl border border-stone-200/60 mb-4">
                        &ldquo;{sub.content}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => handleLikeSubmission(sub.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-rose-600 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                        <span>{sub.likes} Appreciations</span>
                      </button>
                      <button
                        onClick={() => {
                          setCertRecipient(sub.author);
                          setCertTitle(`${sub.genre} Laureate`);
                          setCertScore(undefined);
                          setCertText(sub.content);
                          setCertModalOpen(true);
                        }}
                        className="text-[11px] font-semibold text-amber-900 hover:underline"
                      >
                        View Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= ACTIVITY 2: LITERARY & GRAMMAR QUIZ ================= */}
        {activeTab === 'quiz' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-900 mb-1">
                  <span>10 ROUND CHALLENGE</span>
                  <span aria-hidden="true">·</span>
                  <span>GRAMMAR, SHAKESPEARE, LOANWORDS & CANON</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  The Sanjanani Literary Fellowship Quiz
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Score 6 or higher to earn the official printable Festival Certificate of Distinction!
                </p>
              </div>

              <div className="flex items-center gap-3">
                {quizSubmitted ? (
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-amber-50 border border-amber-300 rounded-xl text-center">
                      <span className="text-[10px] font-mono uppercase text-amber-900 block">Your Score</span>
                      <span className="text-xl font-serif font-bold text-amber-950">
                        {quizScore} / {QUIZ_QUESTIONS.length}
                      </span>
                    </div>
                    <button
                      onClick={handleResetQuiz}
                      className="p-2.5 text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl hover:bg-stone-50"
                      title="Retake Quiz"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleOpenQuizCert}
                      className="px-4 py-2.5 bg-amber-950 text-white rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
                    >
                      Claim Certificate
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleGradeQuiz}
                    disabled={Object.keys(userAnswers).length === 0}
                    className="px-5 py-2.5 bg-amber-950 text-white rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors disabled:opacity-40 shadow-xs"
                  >
                    Submit Answers & Calculate Grade
                  </button>
                )}
              </div>
            </div>

            {/* Questions Grid */}
            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, qIndex) => {
                const selected = userAnswers[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      quizSubmitted
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40'
                          : 'border-rose-300 bg-rose-50/30'
                        : 'border-stone-200 bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-3 text-xs">
                      <span className="font-mono text-amber-900 font-semibold uppercase">
                        Question {qIndex + 1} of {QUIZ_QUESTIONS.length} · {q.category}
                      </span>
                      {quizSubmitted && (
                        <span className={`font-semibold ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                          {isCorrect ? '✓ Correct (+1 pt)' : '✕ Incorrect'}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-serif font-semibold text-stone-900 mb-4">
                      {q.question}
                    </h4>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                      {q.options.map((opt, optIndex) => {
                        const isThisSelected = selected === optIndex;
                        let optionClass = 'border-stone-200 bg-white hover:border-stone-300 text-stone-800';

                        if (isThisSelected && !quizSubmitted) {
                          optionClass = 'border-amber-900 bg-amber-50 ring-1 ring-amber-900 text-amber-950 font-medium';
                        } else if (quizSubmitted) {
                          if (optIndex === q.correctIndex) {
                            optionClass = 'border-emerald-600 bg-emerald-100/70 text-emerald-950 font-bold';
                          } else if (isThisSelected && !isCorrect) {
                            optionClass = 'border-rose-400 bg-rose-100/70 text-rose-950 line-through';
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() => handleSelectQuizOption(q.id, optIndex)}
                            className={`p-3 text-left rounded-xl border text-xs transition-all flex items-start gap-2.5 ${optionClass}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-stone-300 flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {quizSubmitted && (
                      <div className="mt-3 pt-3 border-t border-stone-200/80 text-xs text-stone-700 bg-white/80 p-3 rounded-lg">
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions if not submitted */}
            {!quizSubmitted && (
              <div className="mt-8 pt-6 border-t border-stone-200 flex justify-end">
                <button
                  onClick={handleGradeQuiz}
                  disabled={Object.keys(userAnswers).length === 0}
                  className="px-6 py-3 bg-amber-950 text-white rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
                >
                  Grade My Quiz ({Object.keys(userAnswers).length} / {QUIZ_QUESTIONS.length} Answered)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= ACTIVITY 3: SHAKESPEAREAN INSULT & PRAISE GENERATOR ================= */}
        {activeTab === 'generator' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
            <div className="max-w-2xl mb-8">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                The Elizabethan Insult & Praise Generator
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Construct authentic 16th-century phrasing using Shakespeare&apos;s rich tripartite syntax. Choose between scathing theatrical banter or noble scholarly encomiums!
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2 p-1 bg-stone-100 border border-stone-300 rounded-xl w-fit mb-8">
              <button
                onClick={() => {
                  setGeneratorMode('insult');
                  setCol1Index(0);
                  setCol2Index(0);
                  setCol3Index(0);
                }}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  generatorMode === 'insult'
                    ? 'bg-amber-950 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Elizabethan Insult
              </button>
              <button
                onClick={() => {
                  setGeneratorMode('praise');
                  setCol1Index(0);
                  setCol2Index(0);
                  setCol3Index(0);
                }}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  generatorMode === 'praise'
                    ? 'bg-amber-950 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Elizabethan Praise & Encomium
              </button>
            </div>

            {/* Result Scroll Card */}
            <div className="p-8 bg-[#FAF6EE] border-2 border-amber-950/20 rounded-2xl text-center relative mb-8 paper-texture">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-900 font-bold block mb-2">
                {generatorMode === 'insult' ? '⚔️ THEATRICAL JIBE' : '👑 ROYAL ENCOMIUM'}
              </span>

              <h4 className="text-2xl sm:text-4xl font-serif font-bold text-amber-950 tracking-tight leading-snug my-4">
                &ldquo;{currentGeneratedPhrase}&rdquo;
              </h4>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={handleRollGenerator}
                  className="px-4 py-2 bg-amber-950 text-white rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
                >
                  Spin New Phrase
                </button>

                <button
                  onClick={handleReciteGenerator}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium text-stone-800 hover:bg-stone-50 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                  <span>Recite Aloud</span>
                </button>

                <button
                  onClick={handleCopyGenerator}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium text-stone-800 hover:bg-stone-50 transition-colors"
                >
                  {copiedPhrase ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhrase ? 'Copied to Quill!' : 'Copy Phrase'}</span>
                </button>
              </div>
            </div>

            {/* 3 Columns Inspection */}
            {(() => {
              const list = generatorMode === 'insult' ? SHAKESPEARE_INSULT_PARTS : SHAKESPEARE_PRAISE_PARTS;
              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="font-semibold text-stone-900 block mb-2">Column 1: Prefix Adjective</span>
                    <div className="flex flex-wrap gap-1">
                      {list.column1.slice(0, 8).map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCol1Index(idx)}
                          className={`px-2 py-1 rounded-md text-[11px] border transition-all ${
                            col1Index === idx ? 'bg-amber-950 text-white' : 'bg-white text-stone-700'
                          }`}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="font-semibold text-stone-900 block mb-2">Column 2: Compound Modifier</span>
                    <div className="flex flex-wrap gap-1">
                      {list.column2.slice(0, 8).map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCol2Index(idx)}
                          className={`px-2 py-1 rounded-md text-[11px] border transition-all ${
                            col2Index === idx ? 'bg-amber-950 text-white' : 'bg-white text-stone-700'
                          }`}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="font-semibold text-stone-900 block mb-2">Column 3: Terminal Epithet</span>
                    <div className="flex flex-wrap gap-1">
                      {list.column3.slice(0, 8).map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCol3Index(idx)}
                          className={`px-2 py-1 rounded-md text-[11px] border transition-all ${
                            col3Index === idx ? 'bg-amber-950 text-white' : 'bg-white text-stone-700'
                          }`}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= ACTIVITY 4: LEXICON ANAGRAM CRUCIBLE ================= */}
        {activeTab === 'crucible' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  The Lexicon Anagram Crucible
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Unscramble classic literary and monastic words to decipher the hidden vocabulary!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-stone-100 rounded-xl text-center">
                  <span className="text-[10px] font-mono uppercase text-stone-500 block">Crucible Points</span>
                  <span className="text-xl font-serif font-bold text-amber-950">{crucibleScore} pts</span>
                </div>
                <span className="text-xs text-stone-500">
                  Word {crucibleIndex + 1} of {ANAGRAM_WORDS.length}
                </span>
              </div>
            </div>

            {/* Word Puzzle Card */}
            <div className="p-8 bg-[#FAF7F2] border border-amber-950/15 rounded-2xl text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono tracking-widest uppercase text-stone-500 block mb-3">
                SCRAMBLED LETTERS
              </span>

              {/* Scrambled letter tiles */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {currentCrucible.scrambled.split('').map((char, idx) => (
                  <span
                    key={idx}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-amber-900/30 rounded-xl flex items-center justify-center text-lg sm:text-xl font-serif font-bold text-amber-950 shadow-xs"
                  >
                    {char}
                  </span>
                ))}
              </div>

              {/* Etymology Clue */}
              <div className="mb-6 text-xs text-stone-600 bg-white/80 p-3.5 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-1">Definition Clue:</span>
                <p className="font-serif italic text-sm text-stone-800 leading-relaxed">
                  &ldquo;{currentCrucible.clue}&rdquo;
                </p>
                {showCrucibleClue && (
                  <p className="mt-2 pt-2 border-t border-stone-200 text-amber-900 font-mono text-[11px]">
                    Etymology: {currentCrucible.etymology}
                  </p>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleCheckCrucible} className="space-y-4 max-w-md mx-auto">
                <input
                  type="text"
                  value={crucibleInput}
                  onChange={(e) => setCrucibleInput(e.target.value.toUpperCase())}
                  placeholder="TYPE UNSCRAMBLED WORD..."
                  disabled={crucibleSolved}
                  maxLength={currentCrucible.target.length}
                  className="w-full text-center tracking-widest text-lg sm:text-xl font-mono uppercase px-4 py-3 bg-white border-2 border-amber-900/40 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                />

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCrucibleClue(!showCrucibleClue)}
                    className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg bg-white"
                  >
                    {showCrucibleClue ? 'Hide Etymology' : 'Reveal Etymology Hint'}
                  </button>

                  {!crucibleSolved ? (
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-950 text-white rounded-lg text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
                    >
                      Verify Solution
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextCrucibleWord}
                      className="px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-xs animate-bounce"
                    >
                      Next Anagram →
                    </button>
                  )}
                </div>

                {crucibleSolved && (
                  <div className="p-3 bg-emerald-100/80 border border-emerald-300 rounded-xl text-emerald-950 text-xs font-semibold">
                    🎉 Splendid! Correct Word: {currentCrucible.target} (+10 Points)
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

      </div>

      {/* Keepsake Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        recipientName={certRecipient}
        achievementTitle={certTitle}
        score={certScore}
        poemOrText={certText}
      />
    </section>
  );
};
