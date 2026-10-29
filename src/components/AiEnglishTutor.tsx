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
  Loader2
} from 'lucide-react';
import { generateScholarResponse } from '../data/scholarAiEngine';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  'Check my sentence: "Each of the monks have a book"',
  'Explain the Oxford Comma with examples',
  'How do I convert Passive Voice into Active Voice?',
  'Analyze Hamlet’s "To be or not to be" soliloquy',
  'What English words originated from Sinhala or Sri Lanka?',
  'Explain Iambic Pentameter with da-DUM meter',
  'Give me 6 literary adjectives for Kandy’s morning mist',
  'When and where is Sanjanani Festival 2026?'
];

interface AiEnglishTutorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const AiEnglishTutor: React.FC<AiEnglishTutorProps> = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `### Welcome to the English Scholar AI! 
I am your personal learning tutor at the **English Corner** for the **Sanjanani Literary Festival 2026** at Asgiri Maha Vihara Maha Pirivena, Kandy (October 07, 08, 09).

How may I assist your English studies today?
- Ask a grammar question (tenses, clauses, prepositions)
- Request a sentence check or vocabulary elevation
- Explore Shakespearean drama and sonnet metrics
- Learn loanwords and linguistic nuances!`,
      timestamp: 'Festival Desk',
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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: text,
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I am reflecting upon your query. Could you please ask again?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.warn('Network chat API unavailable, engaging client scholarly tutor:', err);
      
      const scholarData = generateScholarResponse(text);
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: scholarData.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
    // Clean markdown headings/symbols for speech
    const cleanText = msg.content.replace(/[#*`_~]/g, '');
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
        content: 'Conversation cleared. What English topic would you like to explore next?',
        timestamp: 'Festival Desk',
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Trigger */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-amber-950 text-white rounded-full shadow-xl hover:bg-amber-900 transition-all hover:scale-105 border-2 border-amber-400/50 group"
          title="Open AI English Learning Tutor"
        >
          <div className="relative">
            <Feather className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
          <div className="text-left pr-1">
            <span className="text-xs font-bold block leading-tight">AI English Tutor</span>
            <span className="text-[10px] text-amber-200 block font-mono">Learn & Practice</span>
          </div>
        </button>
      )}

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-lg bg-[#FAF8F5] text-stone-900 h-full flex flex-col shadow-2xl border-l border-stone-300 animate-slideLeft">
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-400/40 flex items-center justify-center shadow-inner">
                  <Feather className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white flex items-center gap-1.5">
                    <span>Sanjanani English Scholar AI</span>
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 bg-amber-900/80 text-amber-200 rounded-sm">
                      Tutor
                    </span>
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    English Corner · Asgiri Maha Vihara (Oct 07–09, 2026)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
                  title="Clear Conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
                  aria-label="Close tutor"
                >
                  <X className="w-5 h-5" />
                </button>
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
                    <div className="flex items-center gap-2 mb-1 text-[11px] text-stone-500 font-mono">
                      <span>{isAssistant ? 'Scholar AI' : 'Participant'}</span>
                      <span>·</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isAssistant
                          ? 'bg-white border border-stone-200/90 text-stone-800 rounded-tl-xs'
                          : 'bg-amber-950 text-white rounded-tr-xs'
                      }`}
                    >
                      {/* Formatted Text rendering */}
                      <div className="space-y-2 whitespace-pre-wrap font-sans">
                        {msg.content}
                      </div>

                      {/* Action tools for Assistant Message */}
                      {isAssistant && (
                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                          <button
                            onClick={() => handleSpeak(msg)}
                            className="inline-flex items-center gap-1 hover:text-amber-900 transition-colors"
                            title="Listen to English speech"
                          >
                            {speakingId === msg.id ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                                <span className="text-rose-600">Stop Voice</span>
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
                            className="inline-flex items-center gap-1 hover:text-stone-900 transition-colors"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
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
                <div className="flex items-center gap-2 p-3 bg-white/80 border border-stone-200 rounded-xl w-fit text-xs text-stone-600">
                  <Loader2 className="w-4 h-4 text-amber-900 animate-spin" />
                  <span>The Scholar AI is composing guidance...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-3 bg-[#F5EFE6] border-t border-stone-200 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-950 font-bold block mb-1.5">
                Suggested Learning Topics:
              </span>
              <div className="flex items-center gap-1.5">
                {PRESET_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-[11px] text-stone-700 whitespace-nowrap hover:bg-amber-50 hover:border-amber-400 hover:text-amber-950 transition-colors shrink-0 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 bg-white border-t border-stone-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask grammar, sentence check, or Shakespeare..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-900 text-stone-900 placeholder-stone-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-amber-950 text-white rounded-xl hover:bg-amber-900 transition-colors disabled:opacity-40 shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};
