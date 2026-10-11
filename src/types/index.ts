export interface LiteratureEra {
  id: string;
  era: string;
  period: string;
  overview: string;
  keyFigures: string[];
  definingTraits: string[];
  notableWorks: {
    title: string;
    author: string;
    year: string;
    snippet: string;
  }[];
}

export interface ShakespeareWork {
  id: string;
  title: string;
  genre: 'Tragedy' | 'Comedy' | 'History' | 'Poetry';
  compositionYear: string;
  overview: string;
  centralThemes: string[];
  iconicQuote: {
    lines: string;
    speaker: string;
    context: string;
  };
  criticalReview: string;
  academicSignificance: string;
  characters: string[];
}

export interface GrammarTopic {
  id: string;
  title: string;
  subtitle: string;
  rules: string[];
  examples: {
    correct: string;
    incorrect?: string;
    explanation: string;
  }[];
  interactiveTip: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: 'Grammar' | 'Shakespeare' | 'Literature' | 'Vocabulary';
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WritingSubmission {
  id: string;
  author: string;
  institution: string;
  title: string;
  genre: 'Haiku' | 'Poem' | 'Micro-Story' | 'Reflections';
  content: string;
  timestamp: string;
  likes: number;
}

export interface FestivalEvent {
  time: string;
  title: string;
  speakerOrLead: string;
  location: string;
  description: string;
}
