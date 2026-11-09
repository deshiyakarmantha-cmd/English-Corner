import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  X, 
  Send, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  RotateCcw, 
  BookOpen, 
  Feather, 
  Loader2, 
  Languages, 
  ArrowRight,
  Mic,
  MicOff,
  Radio,
  Headphones
} from 'lucide-react';
import { generateScholarResponse } from '../data/scholarAiEngine';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: string;
  model?: string;
}

const MULTILINGUAL_STARTERS = [
  {
    category: 'Translation',
    lang: 'පද්‍ය පරිවර්තනය (Poem)',
    prompt: 'Translate this English poem into Sinhala metrical verse: "The woods are lovely, dark and deep, / But I have promises to keep..."',
    desc: 'Lyrical & metrical verse translation',
  },
  {
    category: 'Translation',
    lang: 'රචනා පරිවර්තනය (Essay)',
    prompt: 'Translate this academic essay excerpt into formal Sinhala: "Literature serves as a profound instrument for cross-cultural empathy and moral insight."',
    desc: 'Academic prose & P.E.E.L. translation',
  },
  {
    category: 'Translation',
    lang: 'වචන පරිවර්තනය (Word & Etymology)',
    prompt: 'Translate the word "Serendipity" into Sinhala and Tamil, explaining its Island origin and etymology.',
    desc: 'Bilingual lexical & historical roots',
  },
  {
    category: 'Sinhala Clinic',
    lang: 'සිංහල (Sinhala)',
    prompt: 'Tenses සහ කාල භේදය සිංහලෙන් සරලව පැහැදිලි කරන්න',
    desc: 'ක්‍රියාපද කාල භේදය සහ ව්‍යාකරණ රීති',
  },
  {
    category: 'Tamil Clinic',
    lang: 'தமிழ் (Tamil)',
    prompt: 'ஆங்கில இலக்கணத்தை தமிழில் எளிமையாக விளக்குங்கள்',
    desc: 'காலங்கள் மற்றும் வாக்கிய அமைப்பு',
  },
  {
    category: 'Grammar',
    lang: 'Sentence Diagnostic',
    prompt: 'Check my sentence: "Each of the monks have a book"',
    desc: 'Subject-verb agreement & syntax clinic',
  },
  {
    category: 'Shakespeare',
    lang: 'Shakespeare Analysis',
    prompt: 'Analyze Hamlet’s "To be or not to be" soliloquy in detail',
    desc: 'Dramatic themes & poetic meter analysis',
  },
  {
    category: 'Vocabulary',
    lang: 'Advanced Lexicon',
    prompt: 'Give me 5 evocative literary adjectives for a rainy morning in Kandy',
    desc: 'Descriptive vocabulary for essays',
  },
];

interface AiEnglishTutorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialPrompt?: string;
}

export const AiEnglishTutor: React.FC<AiEnglishTutorProps> = ({ 
  isOpen, 
  onClose, 
  onOpen, 
  initialPrompt 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `### Welcome to the Sanjanani English Scholar AI
I am your multilingual academic learning tutor at **The English Corner** for the **Sanjanani Literary Festival 2026** at the historic Asgiri Maha Vihara in Kandy (October 07, 08, 09, 2026).

🎙️ **Hands-Free Conversational Practice & Voice Input:**
Click the **Microphone button** to speak your questions naturally! When **Hands-Free Practice** is enabled, I will speak my responses aloud to train your English auditory comprehension and cadence.

🌐 **Masterful Translation Studio (Words, Essays, Poems):**
- **Poetry:** Translate classical or modern verses between English, Sinhala, and Tamil with poetic meter.
- **Essays:** Translate academic prose, speeches, and P.E.E.L. paragraphs with sophisticated register.
- **Words:** Etymological translation of words tracing roots from Latin, Pali, and Sanskrit.

*How may I assist your literary and linguistic studies today?*`,
      timestamp: 'Festival Desk',
      source: 'scholar_ai_live',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [handsFreeMode, setHandsFreeMode] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check Web Speech API availability
  useEffect(() => {
    const hasSpeech = typeof window !== 'undefined' && 
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    setSpeechSupported(Boolean(hasSpeech));
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSpeak = useCallback((msgId: string, textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown headings, links, bullets, and emojis for smooth vocal delivery
    const cleanText = textToSpeak
      .replace(/[#*`_~>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[✦•\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.lang = 'en-GB';

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  }, [speakingId]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const payload = {
      userMessage: text,
      messages: [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      })),
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const newAssistantId = `ast-${Date.now()}`;
      const assistantMsg: ChatMessage = {
        id: newAssistantId,
        role: 'assistant',
        content: data.reply || 'I am reflecting upon your query. Could you please rephrase or ask again?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini_chat_session',
        model: data.model,
      };

      setMessages(prev => [...prev, assistantMsg]);

      // If in hands-free mode or voice was used, speak the response aloud
      if (handsFreeMode && assistantMsg.content) {
        setTimeout(() => {
          handleSpeak(newAssistantId, assistantMsg.content);
        }, 300);
      }
    } catch {
      // Dynamic scholarly response fallback
      const scholarData = generateScholarResponse(text);
      const fallbackId = `ast-${Date.now()}`;
      const fallbackMsg: ChatMessage = {
        id: fallbackId,
        role: 'assistant',
        content: scholarData.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'scholar_engine',
      };
      setMessages(prev => [...prev, fallbackMsg]);

      if (handsFreeMode && fallbackMsg.content) {
        setTimeout(() => {
          handleSpeak(fallbackId, fallbackMsg.content);
        }, 300);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Web Speech Recognition handler
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcriptText = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');

        setInput(transcriptText);

        const isFinal = event.results[0] && event.results[0].isFinal;
        if (isFinal) {
          setIsListening(false);
          if (handsFreeMode && transcriptText.trim()) {
            handleSendMessage(transcriptText);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Conversation session refreshed. What literary topic, grammar principle, or translation inquiry would you like to explore next?',
        timestamp: 'Festival Desk',
        source: 'scholar_ai_live',
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Trigger */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-stone-900 text-white rounded-full shadow-xl hover:bg-amber-950 transition-all hover:scale-105 border border-amber-500/40 cursor-pointer"
          title="Open Sanjanani English Scholar AI Tutor"
        >
          <div className="relative">
            <Feather className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
          <div className="text-left pr-1">
            <span className="text-xs font-bold block leading-tight font-serif text-white">
              Scholar AI Tutor
            </span>
            <span className="text-[10px] text-amber-200/90 block font-mono">
              Voice & Translation
            </span>
          </div>
        </button>
      )}

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/45 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-[#F6F1E7] text-stone-900 h-full flex flex-col shadow-2xl border-l border-stone-300 animate-slideLeft">
            
            {/* Academic Header */}
            <div className="p-4 sm:p-5 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-400/40 flex items-center justify-center shadow-inner text-amber-300">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
                    <span>Sanjanani English Scholar AI</span>
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 font-sans mt-0.5">
                    <span>English Corner</span>
                    <span aria-hidden="true">·</span>
                    <span>Asgiri Maha Vihara (Oct 07–09, 2026)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Hands-Free Mode Toggle */}
                <button
                  onClick={() => setHandsFreeMode(prev => !prev)}
                  className={`p-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer ${
                    handsFreeMode 
                      ? 'bg-amber-600 text-white font-bold' 
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                  title={handsFreeMode ? 'Hands-Free Speech Mode Active (Answers spoken automatically)' : 'Toggle Hands-Free Speech Practice'}
                >
                  <Headphones className="w-4 h-4" />
                  <span className="hidden sm:inline text-[10px]">
                    {handsFreeMode ? 'Voice Mode ON' : 'Voice Mode'}
                  </span>
                </button>

                <button
                  onClick={handleClearHistory}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Clear Chat Session"
                  aria-label="Clear chat session"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                  aria-label="Close tutor modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Multilingual & Translation Support Sub-Bar */}
            <div className="px-4 py-2 bg-[#F3ECE1] border-b border-stone-200/90 flex flex-wrap items-center justify-between text-[11px] text-stone-700 gap-2">
              <div className="flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-amber-900" />
                <span className="font-semibold text-stone-900">Translation & Multilingual Engine:</span>
                <span className="text-stone-600">English, සිංහල, தமிழ், Français</span>
              </div>

              {handsFreeMode && (
                <div className="flex items-center gap-1 text-[10px] text-amber-950 font-semibold bg-amber-200/80 px-2 py-0.5 rounded-md border border-amber-300">
                  <Radio className="w-3 h-3 text-amber-900 animate-pulse" />
                  <span>Hands-Free Active</span>
                </div>
              )}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 paper-texture">
              {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                  >
                    {/* Message Meta Info */}
                    <div className="flex items-center gap-2 mb-1 text-[11px] text-stone-500 font-mono">
                      <span className="font-semibold text-stone-700">
                        {isAssistant ? 'Scholar AI Tutor' : 'Participant'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isAssistant
                          ? 'bg-[#FFFDF9] border border-amber-950/15 text-stone-800 rounded-tl-xs'
                          : 'bg-stone-900 text-white rounded-tr-xs'
                      }`}
                    >
                      {/* Markdown Text Formatting */}
                      <div className="space-y-2 whitespace-pre-wrap font-sans">
                        {msg.content}
                      </div>

                      {/* Tool Actions for Scholar AI response */}
                      {isAssistant && (
                        <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                          <button
                            onClick={() => handleSpeak(msg.id, msg.content)}
                            className="inline-flex items-center gap-1 text-stone-600 hover:text-amber-900 transition-colors cursor-pointer"
                            title="Pronounce response with vocal enunciation"
                          >
                            {speakingId === msg.id ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                                <span className="text-rose-600 font-medium">Stop Speech</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                                <span>Pronounce / Listen</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                            title="Copy response text"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700 font-medium">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 p-3 bg-[#FFFDF9] border border-amber-950/15 rounded-xl w-fit text-xs text-stone-700 shadow-xs">
                  <Loader2 className="w-4 h-4 text-amber-800 animate-spin" />
                  <span>The Scholar AI is analyzing and composing guidance...</span>
                </div>
              )}

              {/* Active Voice Listening Feedback Bar */}
              {isListening && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between gap-3 text-xs text-amber-950 animate-pulse">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-rose-600 animate-bounce" />
                    <span className="font-semibold">Listening to your voice... Speak now</span>
                  </div>
                  <button
                    onClick={toggleListening}
                    className="px-2.5 py-1 bg-rose-600 text-white rounded-md text-[10px] font-semibold hover:bg-rose-700"
                  >
                    Stop
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Curated Inquiries & Translation Deck */}
            <div className="p-3 bg-[#F4EFE6] border-t border-stone-200/90 overflow-x-auto no-scrollbar">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-950 font-bold mb-2">
                Curated Translation & Scholarly Prompts:
              </div>
              <div className="flex items-center gap-2">
                {MULTILINGUAL_STARTERS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.prompt)}
                    disabled={isLoading}
                    className="px-3 py-1.5 bg-[#FFFDF9] border border-stone-300 hover:border-amber-500 hover:bg-amber-50/60 rounded-xl text-left text-xs transition-colors shrink-0 disabled:opacity-50 cursor-pointer shadow-2xs"
                    title={item.prompt}
                  >
                    <div className="font-semibold text-amber-950 text-[11px] leading-tight">
                      {item.lang}
                    </div>
                    <div className="text-stone-500 text-[10px] truncate max-w-[210px]">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input & Speech Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3.5 sm:p-4 bg-[#FAF6EE] border-t border-stone-300/80 flex items-center gap-2 shrink-0"
            >
              {/* Web Speech Recognition Microphone Button */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 border-rose-700 text-white animate-pulse shadow-md'
                      : 'bg-[#FFFDF9] hover:bg-amber-100/70 border-stone-300 text-stone-700 hover:text-amber-950'
                  }`}
                  title={isListening ? "Listening... Click to stop" : "Speak question using Web Speech API"}
                  aria-label="Voice input"
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 text-white" />
                  ) : (
                    <Mic className="w-4 h-4 text-amber-900" />
                  )}
                </button>
              )}

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English or Sinhala, translate poem/essay, or click mic..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[#FFFDF9] border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-900 text-stone-900 placeholder-stone-400 font-sans"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-stone-900 text-white rounded-xl hover:bg-amber-950 transition-colors disabled:opacity-40 shadow-xs cursor-pointer"
                aria-label="Send message to Scholar AI"
              >
                <Send className="w-4 h-4 text-amber-300" />
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};
