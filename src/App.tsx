import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LanguageSection } from './components/LanguageSection';
import { GrammarLab } from './components/GrammarLab';
import { LiteraryErasTimeline } from './components/LiteraryErasTimeline';
import { LiteratureSection } from './components/LiteratureSection';
import { ShakespeareReview } from './components/ShakespeareReview';
import { InteractiveActivities } from './components/InteractiveActivities';
import { FestivalSchedule } from './components/FestivalSchedule';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { AiEnglishTutor } from './components/AiEnglishTutor';
import { ReadingProgress } from './components/ReadingProgress';
import { LiteraryTrivia } from './components/LiteraryTrivia';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [globalCertOpen, setGlobalCertOpen] = useState(false);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [aiTutorPrompt, setAiTutorPrompt] = useState<string>('');
  const [recipientName, setRecipientName] = useState('Festival Scholar');

  const handleOpenAiTutor = (prefillPrompt?: string) => {
    if (prefillPrompt) {
      setAiTutorPrompt(prefillPrompt);
    }
    setAiTutorOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-stone-900 selection:bg-amber-800/20 selection:text-amber-950 font-sans">
        {/* Top Reading Progress Bar for Literature & Shakespeare sections */}
        <ReadingProgress />

        {/* 3-Zone Top Navigation Contract with Language Switcher */}
        <Header 
          onOpenCertificate={() => setGlobalCertOpen(true)} 
          onOpenAiTutor={() => handleOpenAiTutor()}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          <HeroSection onOpenAiTutor={handleOpenAiTutor} />
          <LanguageSection />
          <GrammarLab />
          <LiteraryErasTimeline onOpenAiTutor={handleOpenAiTutor} />
          <LiteratureSection />
          <ShakespeareReview />
          <LiteraryTrivia onOpenAiTutor={handleOpenAiTutor} />
          <InteractiveActivities />
          <FestivalSchedule />
        </main>

        {/* Institutional Footer */}
        <Footer onOpenCertificate={() => setGlobalCertOpen(true)} />

        {/* AI English Learning Tutor Chatbot with Web Speech & Translation */}
        <AiEnglishTutor 
          isOpen={aiTutorOpen} 
          onClose={() => setAiTutorOpen(false)} 
          onOpen={() => setAiTutorOpen(true)} 
          initialPrompt={aiTutorPrompt}
        />

        {/* Global Keepsake Certificate Modal */}
        <CertificateModal
          isOpen={globalCertOpen}
          onClose={() => setGlobalCertOpen(false)}
          recipientName={recipientName}
          achievementTitle="Official English Corner Scholar · Sanjanani 2026"
        />
      </div>
    </LanguageProvider>
  );
}
