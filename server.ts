import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateScholarResponse } from './src/data/scholarAiEngine';
import { getCuratedWord } from './src/data/literaryWords';
import { getDailyTriviaQuestions } from './src/data/triviaData';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Enable CORS and preflight handling for cross-origin requests (e.g. from GitHub Pages)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, x-gemini-api-key');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// GET health & status check for chat endpoint
app.get('/api/chat', (_req, res) => {
  res.json({
    status: 'online',
    service: 'Sanjanani English Scholar AI Endpoint',
    acceptedMethods: ['POST'],
  });
});

function isValidGeminiKey(key?: string): boolean {
  if (!key) return false;
  const trimmed = key.trim();
  if (!trimmed || trimmed === 'MY_GEMINI_API_KEY') return false;
  if (trimmed.startsWith('ya29.')) return false;
  // Valid Google Generative AI API keys start with AIza
  return trimmed.startsWith('AIza') || (trimmed.length >= 35 && !trimmed.includes(' ') && !trimmed.startsWith('AQ.'));
}

// GET /api/word-of-the-day - Fetches an erudite literary English word with etymology & meaning via Gemini
app.get('/api/word-of-the-day', async (req, res) => {
  const seedParam = req.query.seed ? Number(req.query.seed) : undefined;
  const fallbackWord = getCuratedWord(seedParam);

  const userHeaderKey = (req.headers['x-gemini-api-key'] as string | undefined)?.trim();
  const rawKey = userHeaderKey || process.env.GEMINI_API_KEY?.trim();
  const isValidApiKey = isValidGeminiKey(rawKey);

  if (!isValidApiKey || !rawKey) {
    return res.json({
      word: fallbackWord,
      source: 'scholar_engine',
    });
  }

  const aiClient = new GoogleGenAI({
    apiKey: rawKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const prompt = `You are the chief lexicographer for the English Corner at the Sanjanani Literary Festival 2026 (held at the historic Asgiri Maha Vihara in Kandy, Sri Lanka).
Generate an inspiring, elegant, and erudite literary English word (such as serendipity, petrichor, mellifluous, halcyon, ineffable, verisimilitude, ephemeral, susurrus, quixotic, sonder, panacea, labyrinthine, luminescence).
Seed: ${seedParam ?? Math.random()}
Provide its exact phonetic pronunciation, part of speech, definition, rich etymology (historical roots from Latin, Greek, French, Persian, Old English, or Sanskrit), a luminous literary quote or example sentence, its source, and translations into Sinhala and Tamil.
Respond with ONLY valid JSON adhering strictly to this schema:
{
  "id": "lowercase-word",
  "word": "Word",
  "phonetic": "/.../",
  "partOfSpeech": "noun/adjective/verb",
  "definition": "...",
  "etymology": "...",
  "literaryExample": "...",
  "authorOrWork": "...",
  "sinhalaTranslation": "...",
  "tamilTranslation": "...",
  "scholarNote": "..."
}`;

  const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
  for (const modelName of candidateModels) {
    const abortController = new AbortController();
    const timeoutTimer = setTimeout(() => abortController.abort(), 12000);

    try {
      const response = await aiClient.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          abortSignal: abortController.signal,
          responseMimeType: 'application/json',
        },
      });

      if (response.text && response.text.trim()) {
        const parsed = JSON.parse(response.text.trim());
        if (parsed.word && parsed.definition && parsed.etymology) {
          clearTimeout(timeoutTimer);
          return res.json({
            word: {
              id: parsed.id || parsed.word.toLowerCase().replace(/\s+/g, '-'),
              word: parsed.word,
              phonetic: parsed.phonetic || '',
              partOfSpeech: parsed.partOfSpeech || 'noun',
              definition: parsed.definition,
              etymology: parsed.etymology,
              literaryExample: parsed.literaryExample || '',
              authorOrWork: parsed.authorOrWork || 'Literary Canon',
              sinhalaTranslation: parsed.sinhalaTranslation || fallbackWord.sinhalaTranslation,
              tamilTranslation: parsed.tamilTranslation || fallbackWord.tamilTranslation,
              scholarNote: parsed.scholarNote || fallbackWord.scholarNote,
            },
            source: 'scholar_ai_live',
          });
        }
      }
    } catch {
      // Graceful fallback to next model or curated archive
    } finally {
      clearTimeout(timeoutTimer);
    }
  }

  return res.json({
    word: fallbackWord,
    source: 'scholar_engine',
  });
});

// GET /api/literary-trivia - Fetches daily multiple-choice literary trivia questions
app.get('/api/literary-trivia', (req, res) => {
  const count = Math.min(10, Math.max(1, Number(req.query.count) || 5));
  const offset = Number(req.query.offset) || 0;
  const questions = getDailyTriviaQuestions(count, offset);
  res.json({
    questions,
    count: questions.length,
    offset,
    source: 'scholar_engine',
  });
});

// Initialize GoogleGenAI client on the server side
const apiKey = process.env.GEMINI_API_KEY?.trim();
let ai: GoogleGenAI | null = null;
if (isValidGeminiKey(apiKey)) {
  ai = new GoogleGenAI({
    apiKey: apiKey!,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function generateEducationalFallback(prompt: string): string {
  return generateScholarResponse(prompt).reply;
}

// Server endpoint for AI English tutor
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userMessage } = req.body;
    const promptText = userMessage || (messages && messages[messages.length - 1]?.content) || '';

    if (!promptText.trim()) {
      return res.status(400).json({ error: 'Message content cannot be empty.' });
    }

    const systemInstruction = `You are the Sanjanani English Scholar AI, an erudite, encouraging, and highly articulate English language and literature tutor at the English Corner in the Sanjanani Literary Festival 2026 (සංජානනී ශිෂ්‍ය කලා මහෝත්සවය සහ අධ්‍යාපන සංස්කෘතික ප්‍රදර්ශනය 2026), held at the historic Asgiri Maha Vihara Maha Pirivena in Kandy, Sri Lanka on October 07, 08, 09, 2026.
Your audience includes student monks (Pirivena students), school children, teachers, scholars, and literature enthusiasts.

UNIVERSAL MULTILINGUAL PEDAGOGY:
1. UNDERSTAND AND REPLY IN ANY LANGUAGE: You fluently understand inquiries in ANY language on Earth—including Sinhala (සිංහල), Tamil (தமிழ்), French (Français), German (Deutsch), Spanish (Español), Japanese (日本語), Chinese (中文), Hindi (हिन्दी), Arabic (العربية), etc.
2. ADAPTIVE PEDAGOGICAL RESPONSES:
   - When addressed in Sinhala (e.g. "Tenses සහ Grammar පැහැදිලි කරන්න" or "Shakespeare ගේ නාට්‍ය මොනවාද?"): Provide a warm, scholarly response in natural Sinhala with clear English grammatical terms, formulas, and examples so students can grasp English concepts through their mother tongue.
   - When addressed in Tamil (e.g. "ஆங்கில இலக்கணத்தை விளக்குங்கள்" or "ஷேக்ஸ்பியர் பற்றி சொல்லுங்கள்"): Provide an eloquent Tamil response alongside structured English definitions, syntax guides, and examples.
   - When addressed in another world language (French, Spanish, German, Hindi, Japanese, etc.): Reply respectfully in that language with parallel English explanations.
   - When addressed in English: Respond in elevated, encouraging academic English.
3. GRAMMAR CLINIC: Supply clear grammatical formulas, usage rules, and 2 vivid examples for any grammar topic (tenses, passive voice, conditionals, direct/indirect speech, prepositions).
4. SENTENCE DIAGNOSTICS: If a user shares a sentence to check, pinpoint errors gently, explain the grammatical rule, and offer an elevated literary revision.
5. LITERARY & SHAKESPEAREAN INSIGHT: Offer profound thematic analysis of Shakespeare (Hamlet, Macbeth, The Tempest, Sonnets) and world literature, demystifying archaic vocabulary and meter.
6. ETYMOLOGY & ROOTS: Elucidate linguistic origins from Latin, Greek, Sanskrit, Pali, and Old French.
7. MASTERFUL LITERARY & SCHOLARLY TRANSLATION: You excel in high-fidelity translation across English, Sinhala (සිංහල), and Tamil (தமிழ்) for:
   - Words & Lexicons: Provide precise grammatical category, phonetics, etymological roots (Pali, Sanskrit, Latin, Old French), and bilingual example sentences.
   - Poems & Verses: Translate poetry with metrical sensitivity, rhyme preservation, and aesthetic resonance (*rasa*).
   - Essays & Academic Prose: Translate formal essays maintaining rhetorical coherence, sophisticated vocabulary, and PEEL framework.
8. FORMATTING: Use clean markdown headings, bullet points, and bold key terms. Keep answers concise, inspiring, and accessible.`;

    // Build multi-turn chat history for aiClient.chats.create
    const chatHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      const validMsgs = messages.filter(
        (m: any) => m && typeof m.content === 'string' && m.content.trim() && m.id !== 'welcome' && m.id !== 'welcome-reset'
      );

      let expectedRole: 'user' | 'model' = 'user';
      for (const m of validMsgs.slice(-12)) {
        const mappedRole: 'user' | 'model' = m.role === 'assistant' || m.role === 'model' ? 'model' : 'user';
        if (mappedRole === expectedRole) {
          chatHistory.push({
            role: mappedRole,
            parts: [{ text: m.content.trim() }],
          });
          expectedRole = expectedRole === 'user' ? 'model' : 'user';
        }
      }
    }

    // Ensure history does not end with the current prompt as user (sendMessage will supply it)
    if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role === 'user') {
      const lastText = chatHistory[chatHistory.length - 1].parts[0]?.text;
      if (lastText === promptText.trim()) {
        chatHistory.pop();
      }
    }

    // Verify and retrieve valid Gemini API key from client header or environment
    const userHeaderKey = (req.headers['x-gemini-api-key'] as string | undefined)?.trim();
    const rawKey = userHeaderKey || process.env.GEMINI_API_KEY?.trim();
    const isValidApiKey = isValidGeminiKey(rawKey);

    if (isValidApiKey && rawKey) {
      const aiClient = new GoogleGenAI({
        apiKey: rawKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Permitted non-deprecated models per gemini-api SKILL:
      // 'gemini-3.8-flash' (primary for text & chat) and 'gemini-3.1-flash-lite' (fallback)
      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
      let reply = '';
      let usedModel = '';

      for (const modelName of candidateModels) {
        const abortController = new AbortController();
        const timeoutTimer = setTimeout(() => {
          abortController.abort();
        }, 15000);

        try {
          // Initialize active chat session with system instruction & history
          const chat = aiClient.chats.create({
            model: modelName,
            config: {
              systemInstruction,
              abortSignal: abortController.signal,
            },
            history: chatHistory,
          });

          // Send user message to the active chat session
          const chatResponse = await chat.sendMessage({
            message: promptText.trim(),
          });

          if (chatResponse.text && chatResponse.text.trim()) {
            reply = chatResponse.text.trim();
            usedModel = modelName;
            clearTimeout(timeoutTimer);
            break;
          }
        } catch (err: any) {
          const errMsg = String(err?.message || err || '');
          const isAuthError =
            err?.status === 401 ||
            err?.status === 403 ||
            errMsg.includes('401') ||
            errMsg.includes('403') ||
            errMsg.includes('UNAUTHENTICATED') ||
            errMsg.includes('API key not valid') ||
            errMsg.includes('ACCESS_TOKEN_TYPE_UNSUPPORTED');

          if (isAuthError) {
            console.log(`[Gemini API] API key validation required for ${modelName}. Serving response through scholar engine.`);
            clearTimeout(timeoutTimer);
            break;
          }
          console.log(`[Gemini API] Chat model ${modelName} fallback engaged:`, errMsg);
        } finally {
          clearTimeout(timeoutTimer);
        }
      }

      if (reply) {
        return res.json({
          reply,
          source: 'scholar_ai_live',
          model: usedModel,
        });
      }
    }

    // Dynamic educational scholarly response (never static hardcoded)
    const fallbackReply = generateEducationalFallback(promptText);
    return res.json({
      reply: fallbackReply,
      source: 'scholar_engine',
    });
  } catch (err: any) {
    console.log('[Chat Endpoint] Graceful fallback response dispatched.');
    const fallback = generateEducationalFallback(req.body?.userMessage || '');
    return res.json({
      reply: fallback,
      source: 'scholar_engine',
    });
  }
});

// Serve frontend with Vite in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Festival server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
