import React, { useState, useEffect } from 'react';
import { TriviaQuestion, getDailyTriviaQuestions, LITERARY_TRIVIA_BANK } from '../data/triviaData';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Trophy, 
  Flame, 
  BookOpen,
  Share2
} from 'lucide-react';

interface LiteraryTriviaProps {
  onOpenAiTutor?: (prefillQuery?: string) => void;
}

interface TriviaStats {
  gamesPlayed: number;
  totalAnswered: number;
  totalCorrect: number;
  bestScore: number;
  currentStreak: number;
  bestStreak: number;
}

export const LiteraryTrivia: React.FC<LiteraryTriviaProps> = ({ onOpenAiTutor }) => {
  const [roundOffset, setRoundOffset] = useState<number>(0);
  const [questions, setQuestions] = useState<TriviaQuestion[]>(() => getDailyTriviaQuestions(5, 0));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [roundCompleted, setRoundCompleted] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);

  // Persistent stats
  const [stats, setStats] = useState<TriviaStats>(() => {
    const saved = localStorage.getItem('sanjanani_trivia_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall through to default
      }
    }
    return {
      gamesPlayed: 0,
      totalAnswered: 0,
      totalCorrect: 0,
      bestScore: 0,
      currentStreak: 0,
      bestStreak: 0,
    };
  });

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return; // Prevent multiple clicks

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Update persistent stats
    setStats(prev => {
      const updated: TriviaStats = {
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
      };
      localStorage.setItem('sanjanani_trivia_stats', JSON.stringify(updated));
      return updated;
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Complete round
      setRoundCompleted(true);
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 0 : 0); // score already updated
      
      setStats(prev => {
        const updated: TriviaStats = {
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          bestScore: Math.max(prev.bestScore, finalScore),
        };
        localStorage.setItem('sanjanani_trivia_stats', JSON.stringify(updated));
        return updated;
      });

      if (score >= 4) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestartRound = (offsetIncrement = 1) => {
    const nextOffset = roundOffset + offsetIncrement;
    setRoundOffset(nextOffset);
    setQuestions(getDailyTriviaQuestions(5, nextOffset));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setRoundCompleted(false);
  };

  const handleAskTutorAboutQuestion = () => {
    if (onOpenAiTutor) {
      onOpenAiTutor(`Please explain this literature trivia question in depth: "${currentQ.question}" (Category: ${currentQ.category}). The answer is "${currentQ.options[currentQ.correctIndex]}". Provide literary analysis and related works.`);
    }
  };

  // Rank title determination
  const getRankBadge = (sc: number, total: number) => {
    const pct = (sc / total) * 100;
    if (pct === 100) return { title: 'Laureate of English Letters', color: 'text-amber-900 bg-amber-100 border-amber-300' };
    if (pct >= 80) return { title: 'Distinguished Scholar', color: 'text-emerald-900 bg-emerald-100 border-emerald-300' };
    if (pct >= 60) return { title: 'Avid Bibliophile', color: 'text-sky-900 bg-sky-100 border-sky-300' };
    return { title: 'Aspiring Reader', color: 'text-stone-800 bg-stone-100 border-stone-300' };
  };

  const rank = getRankBadge(score, questions.length);

  return (
    <section id="trivia" className="py-16 lg:py-24 border-b border-stone-300/80 bg-[#F5EFE4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
            <Trophy className="w-4 h-4 text-amber-800" />
            <span>The Daily Scholarly Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Literary Trivia & Mind Gymnasium
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
            Test your erudition across classical English literature, Shakespearean drama, poetic meters, and Island loanword etymologies.
          </p>
        </div>

        {/* Global Statistics Ribbon */}
        <div className="mb-8 p-4 bg-[#FDFBF7] border border-stone-300/80 rounded-2xl shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-1.5 text-stone-700">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>Questions Answered:</span>
              <span className="font-bold text-stone-900">{stats.totalAnswered}</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-700">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Lifetime Accuracy:</span>
              <span className="font-bold text-stone-900">
                {stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-700">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Best Round:</span>
              <span className="font-bold text-amber-950">{stats.bestScore}/5</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {streak > 1 && (
              <span className="flex items-center gap-1 text-xs font-sans font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-600" />
                <span>{streak} Streak!</span>
              </span>
            )}
            <button
              onClick={() => handleRestartRound(1)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Generate new daily trivia round"
            >
              <RotateCcw className="w-3 h-3 text-amber-800" />
              <span>New Round</span>
            </button>
          </div>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-[#FCFAF7] border border-stone-300 shadow-sm rounded-2xl overflow-hidden p-6 sm:p-8">
          {!roundCompleted ? (
            <div>
              {/* Question Navigation & Category Topline */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <div className="flex items-center gap-2 text-xs font-sans text-stone-500">
                  <span className="font-semibold text-amber-950">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span>·</span>
                  <span className="font-serif italic text-amber-900">
                    {currentQ.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-stone-700">
                    Current Score: {score}/{currentIndex + (isAnswered ? 1 : 0)}
                  </span>
                </div>
              </div>

              {/* Progress Track Bar */}
              <div className="w-full h-1.5 bg-stone-200 rounded-full mb-6 overflow-hidden">
                <div 
                  className="h-full bg-amber-800 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* The Question Text */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug mb-6">
                {currentQ.question}
              </h3>

              {/* Multiple Choice Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6" role="radiogroup">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = 'bg-[#FDFBF7] hover:bg-amber-50/50 border-stone-300/80 text-stone-800';
                  let icon = null;

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                      icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-rose-50 border-rose-300 text-rose-950 ring-1 ring-rose-300';
                      icon = <XCircle className="w-4 h-4 text-rose-600 shrink-0" />;
                    } else {
                      btnStyle = 'bg-stone-50/60 border-stone-200 text-stone-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
                      role="radio"
                      aria-checked={selectedOption === idx}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-stone-400 font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{option}</span>
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Instant Scholastic Feedback Drawer */}
              {isAnswered && (
                <div className="mb-6 p-4 sm:p-5 bg-[#F6F1E8] border border-amber-900/15 rounded-xl animate-fade-in space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                      <span>Scholastic Feedback & Context</span>
                    </span>
                    <button
                      onClick={handleAskTutorAboutQuestion}
                      className="inline-flex items-center gap-1 text-[11px] font-sans text-amber-950 hover:underline cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3 text-amber-800" />
                      <span>Ask Scholar AI</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                    {currentQ.explanation}
                  </p>

                  <p className="text-[11px] text-stone-500 italic font-serif pt-1 border-t border-amber-900/10">
                    Canonical Reference: {currentQ.literaryContext}
                  </p>
                </div>
              )}

              {/* Bottom Action Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <div className="text-xs text-stone-500 font-mono">
                  {isAnswered ? (
                    selectedOption === currentQ.correctIndex ? (
                      <span className="text-emerald-700 font-bold">✓ Correct answer!</span>
                    ) : (
                      <span className="text-rose-700 font-bold">✗ Incorrect</span>
                    )
                  ) : (
                    <span>Select the correct literary answer above</span>
                  )}
                </div>

                {isAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-amber-950 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Challenge'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Round Completion Summary Screen */
            <div className="text-center py-6 sm:py-8 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-900 border border-amber-300">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  Challenge Complete!
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  You scored <span className="font-bold text-amber-950 text-base">{score} out of {questions.length}</span> ({Math.round((score / questions.length) * 100)}%) in this round of Literary Trivia.
                </p>

                <div className="pt-2">
                  <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold border ${rank.color}`}>
                    Awarded Rank: {rank.title}
                  </span>
                </div>
              </div>

              {/* Review List */}
              <div className="max-w-xl mx-auto text-left bg-[#FAF6EE] border border-stone-300/80 rounded-xl p-4 divide-y divide-stone-200/60 text-xs">
                {questions.map((q, idx) => (
                  <div key={q.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-2.5">
                    <span className="font-bold font-mono text-stone-400 mt-0.5">{idx + 1}.</span>
                    <div className="flex-1">
                      <p className="text-stone-800 font-serif font-medium">{q.question}</p>
                      <p className="text-stone-500 mt-0.5">Answer: <strong className="text-emerald-800">{q.options[q.correctIndex]}</strong></p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => handleRestartRound(1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-950 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Another Round (New Questions)</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenAiTutor) {
                      onOpenAiTutor(`I just completed the Sanjanani Literary Trivia with a score of ${score}/5. Can you test me with 3 challenging Shakespeare and literary questions?`);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-amber-800" />
                  <span>Challenge Scholar AI</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
