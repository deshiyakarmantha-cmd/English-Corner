import React, { useState, useRef, useEffect } from 'react';
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
  ArrowRight
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
    lang: 'සිංහල (Sinhala)',
    prompt: 'Tenses සහ කාල භේදය සිංහලෙන් සරලව පැහැදිලි කරන්න',
    desc: 'ක්‍රියාපද කාල භේදය සහ ව්‍යාකරණ රීති',
  },
  {
    lang: 'தமிழ் (Tamil)',
    prompt: 'ஆங்கில இலக்கணத்தை தமிழில் எளிமையாக விளக்குங்கள்',
    desc: 'காலங்கள் மற்றும் வாக்கிய அமைப்பு',
  },
  {
    lang: 'Grammar Clinic',
    prompt: 'Check my sentence: "Each of the monks have a book"',
    desc: 'Subject-verb agreement & syntax check',
  },
  {
    lang: 'Shakespeare',
    prompt: 'Analyze Hamlet’s "To be or not to be" soliloquy in detail',
    desc: 'Dramatic themes & poetic meter analysis',
  },
  {
    lang: 'Français',
    prompt: 'Comment utiliser la voix passive en anglais académique ?',
    desc: 'Syntaxe et voix passive en anglais',
  },
  {
    lang: 'Vocabulary',
    prompt: 'Give me 5 evocative literary adjectives for a rainy morning in Kandy',
    desc: 'Advanced descriptive vocabulary for essays',
  },
  {
    lang: 'Essay Blueprint',
    prompt: 'How to structure a high-scoring literature essay using PEEL formula',
    desc: 'Point, Evidence, Explanation, Link framework',
  },
  {
    lang: 'Etymology',
    prompt: 'What English words originated from Sinhala or Sri Lanka?',
    desc: 'Serendipity, Cinnamon, Tourmaline & Teak',
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

🌍 **Universal Multilingual Chat Session:**
You may converse in **any language** of your preference:
- **සිංහල (Sinhala):** ඕනෑම ඉංග්‍රීසි ව්‍යාකරණ, වාක්‍ය රීති, කාල භේදය හෝ ශේක්ස්පියර් නාට්‍ය පිළිබඳව සිංහලෙන් විමසන්න.
- **தமிழ் (Tamil):** ஆங்கில இலக்கணம், வாக்கிய அமைப்பு மற்றும் இலக்கிய வினாக்களைத் தமிழில் கேட்கலாம்.
- **English & Global Tongues:** Sentence diagnostics, grammar clinics, essay composition, and literary analyses in English, French, Spanish, German, Japanese, etc.

*How may I assist your literary and linguistic studies today?*`,
      timestamp: 'Festival Desk',
      source: 'scholar_ai_live',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // Multi-turn chat session payload sent to backend Google Generative AI handler
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
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I am reflecting upon your query. Could you please rephrase or ask again?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini_chat_session',
        model: data.model,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      // Dynamic scholarly response fallback ensuring no dead ends or generic crashes
      const scholarData = generateScholarResponse(text);
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: scholarData.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'scholar_engine',
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (msg: ChatMessage) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === msg.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting symbols for natural vocal enunciation
    const cleanText = msg.content
      .replace(/[#*`_~>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msg.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Conversation session refreshed. What literary topic, grammar principle, or multilingual inquiry would you like to explore next?',
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
              Multilingual · 2026
            </span>
          </div>
        </button>
      )}

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/45 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-[#FAF8F5] text-stone-900 h-full flex flex-col shadow-2xl border-l border-stone-300 animate-slideLeft">
            
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

            {/* Multilingual Support Banner */}
            <div className="px-4 py-2 bg-[#F3ECE1] border-b border-stone-200/90 flex items-center justify-between text-[11px] text-stone-700">
              <div className="flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-amber-900" />
                <span className="font-medium text-stone-900">Multilingual Chat Session Active:</span>
                <span className="text-stone-600">සිංහල, தமிழ், English, Français & World Tongues</span>
              </div>
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
                          ? 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs'
                          : 'bg-stone-900 text-white rounded-tr-xs'
                      }`}
                    >
                      {/* Markdown Text Formatting */}
                      <div className="space-y-2 whitespace-pre-wrap font-sans">
                        {msg.content}
                      </div>

                      {/* Tool Actions for Scholar AI response */}
                      {isAssistant && (
                        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                          <button
                            onClick={() => handleSpeak(msg)}
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
                <div className="flex items-center gap-2 p-3 bg-white border border-stone-200 rounded-xl w-fit text-xs text-stone-700 shadow-xs">
                  <Loader2 className="w-4 h-4 text-amber-800 animate-spin" />
                  <span>The Scholar AI is composing pedagogical guidance...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Inquiries Deck */}
            <div className="p-3 bg-[#F4EFE6] border-t border-stone-200/90 overflow-x-auto no-scrollbar">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-950 font-bold mb-2">
                Curated Scholarly Inquiries:
              </div>
              <div className="flex items-center gap-2">
                {MULTILINGUAL_STARTERS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.prompt)}
                    disabled={isLoading}
                    className="px-3 py-1.5 bg-white border border-stone-300 hover:border-amber-500 hover:bg-amber-50/60 rounded-xl text-left text-xs transition-colors shrink-0 disabled:opacity-50 cursor-pointer shadow-2xs"
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

            {/* Message Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3.5 sm:p-4 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in Sinhala, Tamil, English, or any language..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-900 text-stone-900 placeholder-stone-400 font-sans"
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
