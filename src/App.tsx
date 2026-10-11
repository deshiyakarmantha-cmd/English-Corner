import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LanguageSection } from './components/LanguageSection';
import { GrammarLab } from './components/GrammarLab';
import { LiteratureSection } from './components/LiteratureSection';
import { ShakespeareReview } from './components/ShakespeareReview';
import { InteractiveActivities } from './components/InteractiveActivities';
import { FestivalSchedule } from './components/FestivalSchedule';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { AiEnglishTutor } from './components/AiEnglishTutor';

export default function App() {
  const [globalCertOpen, setGlobalCertOpen] = useState(false);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('Festival Scholar');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-800/20 selection:text-amber-950">
      {/* 3-Zone Top Navigation Contract */}
      <Header 
        onOpenCertificate={() => setGlobalCertOpen(true)} 
        onOpenAiTutor={() => setAiTutorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <LanguageSection />
        <GrammarLab />
        <LiteratureSection />
        <ShakespeareReview />
        <InteractiveActivities />
        <FestivalSchedule />
      </main>

      {/* Institutional Footer */}
      <Footer onOpenCertificate={() => setGlobalCertOpen(true)} />

      {/* AI English Learning Tutor Chatbot */}
      <AiEnglishTutor 
        isOpen={aiTutorOpen} 
        onClose={() => setAiTutorOpen(false)} 
        onOpen={() => setAiTutorOpen(true)} 
      />

      {/* Global Keepsake Certificate Modal */}
      <CertificateModal
        isOpen={globalCertOpen}
        onClose={() => setGlobalCertOpen(false)}
        recipientName={recipientName}
        achievementTitle="Official English Corner Scholar · Sanjanani 2026"
      />
    </div>
  );
}
