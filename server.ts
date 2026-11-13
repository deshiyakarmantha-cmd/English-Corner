import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  generateScholarResponse,
  isTranslationPrompt,
  extractTranslationPayload,
} from './src/data/scholarAiEngine';
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

  const candidateModels = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'];
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

const LANG_LABELS: Record<string, string> = {
  si: 'සිංහල (Sinhala)',
  ta: 'தமிழ் (Tamil)',
  en: 'English',
  fr: 'Français (French)',
  es: 'Español (Spanish)',
  de: 'Deutsch (German)',
  hi: 'हिन्दी (Hindi)',
  ja: '日本語 (Japanese)',
};

function detectSourceLang(text: string): string {
  if (/[\u0D80-\u0DFF]/.test(text)) return 'si';
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  if (/[\u3040-\u30FF\u4E00-\u9FAF]/.test(text)) return 'ja';
  return 'en';
}

function detectTargetLangs(promptText: string, sourceLang: string): string[] {
  const lower = promptText.toLowerCase();
  const explicit: string[] = [];
  if (lower.includes('sinhala') || promptText.includes('සිංහල')) explicit.push('si');
  if (lower.includes('tamil') || promptText.includes('தமிழ்')) explicit.push('ta');
  if (lower.includes('english') || promptText.includes('ඉංග්‍රීසි') || promptText.includes('ஆங்கிலம்')) explicit.push('en');
  if (lower.includes('french') || lower.includes('français')) explicit.push('fr');
  if (lower.includes('spanish') || lower.includes('español')) explicit.push('es');
  if (lower.includes('german') || lower.includes('deutsch')) explicit.push('de');
  if (lower.includes('hindi') || promptText.includes('हिन्दी')) explicit.push('hi');
  if (lower.includes('japanese') || promptText.includes('日本語')) explicit.push('ja');

  // Filter out sourceLang if only sourceLang matched accidentally (e.g., "Translate this English word..." has "english")
  const filtered = explicit.filter((l) => l !== sourceLang);
  if (filtered.length > 0) return filtered.slice(0, 2);
  if (sourceLang === 'en') return ['si', 'ta'];
  return ['en'];
}

function extractCleanSourceForTranslation(rawText: string): string {
  const quoted = extractTranslationPayload(rawText);
  if (quoted) return quoted;

  return rawText
    .replace(
      /\b(please|can\s+you|could\s+you|translate|translation|traduire|traduction|convert|define|definition|explain|this|the|a|an|word|phrase|sentence|paragraph|essay|excerpt|poem|poetry|verse|text|meaning|of|from|into|to|in|and|formal|academic|metrical|sinhala|tamil|english|french|spanish|german|hindi|japanese|explaining|how\s+to\s+say|how\s+do\s+you\s+say|what\s+does|what\s+is|mean|පරිවර්තනය|පරිවර්තන|කරන්න|තේරුම|වචනය|සිංහලට|සිංහලෙන්|ඉංග්‍රීසියට|தமிழில்|மொழிபெயர்ப்பு|மொழிபெயர்க்கவும்)\b/gi,
      ' '
    )
    .replace(/^[:\-\s"'“‘]+|[:\-\s"'”’?]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchMyMemoryTranslation(text: string, sourceLang: string, targetLang: string): Promise<string | null> {
  if (!text.trim() || sourceLang === targetLang) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const pair = `${sourceLang}|${targetLang}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 480))}&langpair=${encodeURIComponent(pair)}`;
    const resp = await fetch(url, { signal: controller.signal });
    if (!resp.ok) return null;
    const data: any = await resp.json();
    const translated = data?.responseData?.translatedText?.trim();
    if (!translated || data?.responseStatus === 403 || /MYMEMORY WARNING/i.test(translated)) {
      return null;
    }
    // Reject corrupted pivot artifacts (Cyrillic or Hangul leaking into si/ta/en)
    if (['si', 'ta', 'en', 'fr', 'es', 'de'].includes(targetLang) && /[\u0400-\u04FF\uAC00-\uD7AF]/.test(translated)) {
      return null;
    }
    // Ensure non-Latin target languages actually returned target script characters rather than random English words
    if (targetLang === 'si' && !/[\u0D80-\u0DFF]/.test(translated)) {
      return null;
    }
    if (targetLang === 'ta' && !/[\u0B80-\u0BFF]/.test(translated)) {
      return null;
    }
    if (targetLang === 'hi' && !/[\u0900-\u097F]/.test(translated)) {
      return null;
    }
    if (targetLang === 'ja' && !/[\u3040-\u30FF\u4E00-\u9FAF]/.test(translated)) {
      return null;
    }
    return translated;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchDictionaryProfile(word: string): Promise<{ phonetic: string; pos: string; definition: string; example?: string } | null> {
  if (!/^[a-zA-Z-]{2,32}$/.test(word)) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`, {
      signal: controller.signal,
    });
    if (!resp.ok) return null;
    const data: any = await resp.json();
    const entry = Array.isArray(data) ? data[0] : null;
    const firstMeaning = entry?.meanings?.[0];
    const firstDef = firstMeaning?.definitions?.[0];
    if (!firstDef?.definition) return null;
    return {
      phonetic: entry.phonetic || entry.phonetics?.find((ph: any) => ph?.text)?.text || '',
      pos: firstMeaning.partOfSpeech || 'term',
      definition: firstDef.definition,
      example: firstDef.example,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function cleanWikiSearchQuery(rawQuery: string): string {
  const stripped = rawQuery
    .trim()
    .replace(
      /^(can\s+you\s+(please\s+)?(tell\s+me\s+about|explain|define|describe)\s+|please\s+(explain|define|tell\s+me\s+about)\s+|what\s+(is|are|was|were)\s+(a\s+|an\s+|the\s+)?|who\s+(is|are|was|were)\s+(the\s+)?|where\s+(is|are|was|were)\s+|when\s+(did|was|were)\s+|tell\s+me\s+about\s+(the\s+)?|explain\s+(the\s+|a\s+|an\s+)?|define\s+(the\s+|a\s+|an\s+)?|describe\s+(the\s+|a\s+|an\s+)?)/i,
      ''
    )
    .replace(/[?!."“”‘’]+$/g, '')
    .trim();
  return stripped.length >= 2 ? stripped : rawQuery.trim();
}

async function fetchWikipediaSummary(query: string): Promise<string | null> {
  const cleanQuery = cleanWikiSearchQuery(query);
  if (!cleanQuery || cleanQuery.length < 2) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  const headers = { 'User-Agent': 'SanjananiEnglishScholar/1.0' };

  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&utf8=&format=json&srlimit=3`;
    const searchResp = await fetch(searchUrl, { headers, signal: controller.signal });
    if (!searchResp.ok) return null;

    const searchData: any = await searchResp.json();
    const results: Array<{ title?: string }> = searchData?.query?.search || [];
    if (results.length === 0) return null;

    for (const item of results.slice(0, 2)) {
      if (!item.title) continue;
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.title.replace(/ /g, '_'))}`;
      const summaryResp = await fetch(summaryUrl, { headers, signal: controller.signal });
      if (!summaryResp.ok) continue;

      const summaryData: any = await summaryResp.json();
      if (summaryData?.type === 'disambiguation' || !summaryData?.extract) continue;

      const title = summaryData.title || item.title;
      const extract = String(summaryData.extract).trim();
      if (extract) {
        return `### ${title}\n${extract}`;
      }
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function performLiveServerTranslation(promptText: string): Promise<string | null> {
  const sourceText = extractCleanSourceForTranslation(promptText);
  if (!sourceText || sourceText.length < 2) return null;

  const sourceLang = detectSourceLang(sourceText);
  const targetLangs = detectTargetLangs(promptText, sourceLang);
  const isPoem =
    /\b(poem|poetry|verse|sonnet|stanza)\b|කවි|පද්‍ය|கவிதை/i.test(promptText) ||
    sourceText.includes('\n') ||
    sourceText.includes(' / ');
  const wordCount = sourceText.split(/\s+/).filter(Boolean).length;
  const isSingleEnglishWord = sourceLang === 'en' && wordCount === 1 && /^[a-zA-Z-]+$/.test(sourceText);

  if (isPoem && (sourceText.includes('\n') || sourceText.includes('/'))) {
    const lines = sourceText
      .split(/\n|\s*\/\s*/)
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 10);

    const primaryTarget = targetLangs[0] || 'si';
    const translatedLines = await Promise.all(
      lines.map(async (line) => (await fetchMyMemoryTranslation(line, sourceLang, primaryTarget)) || line)
    );

    if (translatedLines.every((t, i) => t === lines[i])) {
      return null;
    }

    const formattedOriginal = lines.map((l) => `> *${l}*`).join('  \n');
    const formattedTranslated = translatedLines.map((l) => `> *${l}*`).join('  \n');

    return `### Poetic Verse Translation (${LANG_LABELS[sourceLang] || sourceLang.toUpperCase()} → ${LANG_LABELS[primaryTarget] || primaryTarget.toUpperCase()})

#### 1. Original Verse
${formattedOriginal}

#### 2. Translated Verse (${LANG_LABELS[primaryTarget] || primaryTarget.toUpperCase()})
${formattedTranslated}

**Literary Note:**  
English follows Subject–Verb–Object order, whereas written Sinhala and Tamil preserve poetic cadence cleanly in Subject–Object–Verb rhythm (*rasa*).`;
  }

  const [dictProfile, ...translations] = await Promise.all([
    isSingleEnglishWord ? fetchDictionaryProfile(sourceText) : Promise.resolve(null),
    ...targetLangs.map(async (tl) => ({
      lang: tl,
      label: LANG_LABELS[tl] || tl.toUpperCase(),
      text: await fetchMyMemoryTranslation(sourceText, sourceLang, tl),
    })),
  ]);

  const validTranslations = translations.filter((t) => Boolean(t.text));
  if (validTranslations.length === 0 && !dictProfile) {
    return null;
  }

  if (isSingleEnglishWord) {
    const displayWord = sourceText.charAt(0).toUpperCase() + sourceText.slice(1);
    const sections: string[] = [`### Bilingual Word Translation: "${displayWord}"`];

    if (dictProfile) {
      sections.push(
        `1. **English Definition & Phonetics:**\n   - **Word:** **${displayWord}** *(${dictProfile.pos})*${dictProfile.phonetic ? ` — \`${dictProfile.phonetic}\`` : ''}\n   - **Meaning:** ${dictProfile.definition}${dictProfile.example ? `\n   - **Example:** *"${dictProfile.example}"*` : ''}`
      );
    }

    validTranslations.forEach((tr, idx) => {
      const num = dictProfile ? idx + 2 : idx + 1;
      sections.push(`${num}. **${tr.label}:**\n   - **${tr.text}**`);
    });

    return sections.join('\n\n');
  }

  const sections: string[] = [
    `### Scholarly Translation (${LANG_LABELS[sourceLang] || sourceLang.toUpperCase()} → ${validTranslations.map((v) => v.label).join(' & ')})`,
    `#### Source Text\n> *"${sourceText}"*`,
  ];

  validTranslations.forEach((tr, idx) => {
    sections.push(`#### ${idx + 1}. ${tr.label}\n> **${tr.text}**`);
  });

  return sections.join('\n\n');
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
8. DIRECTNESS & ACCURACY: Always answer the user's exact question directly first before adding supplementary context or examples. Never deflect with vague platitudes. Use clean markdown headings, bullet points, and bold key terms.`;

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
      // 'gemini-4-hydrogen' (primary for text & chat) and 'gemini-3.1-flash-lite' (fallback)
      const candidateModels = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'];
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

    const scholarResult = generateScholarResponse(promptText);
    const curatedCategories = new Set([
      'translation_poem_canonical',
      'translation_essay_curated',
      'translation_word_lexicon',
      'lexicon_word_explanation',
      'lexicon_single_word',
    ]);

    // If not already matched by a deep literary curated entry, perform live server-side translation / dictionary lookup
    if (
      !curatedCategories.has(scholarResult.category) &&
      (isTranslationPrompt(promptText) ||
        /\b(explain|define|meaning of|what does)\s+["“‘']?[a-zA-Z-]{3,}["”’']?/i.test(promptText))
    ) {
      const liveTranslated = await performLiveServerTranslation(promptText);
      if (liveTranslated) {
        return res.json({
          reply: liveTranslated,
          source: 'scholar_ai_live',
        });
      }
    }

    // For open-ended general/English/literary questions outside local rules, resolve dynamically via Dictionary or Wikipedia
    if (scholarResult.category === 'scholar_scope_notice') {
      const trimmedClean = cleanWikiSearchQuery(promptText);
      const isSingleWordQuery = /^[a-zA-Z-]{2,32}$/.test(trimmedClean);
      if (isSingleWordQuery) {
        const [dictProfile, siWord] = await Promise.all([
          fetchDictionaryProfile(trimmedClean),
          fetchMyMemoryTranslation(trimmedClean, 'en', 'si'),
        ]);
        if (dictProfile) {
          const displayWord = trimmedClean.charAt(0).toUpperCase() + trimmedClean.slice(1);
          const dictReply = `### "${displayWord}" *(${dictProfile.pos})*${dictProfile.phonetic ? ` — \`${dictProfile.phonetic}\`` : ''}
- **Definition:** ${dictProfile.definition}${dictProfile.example ? `\n- **Example:** *"${dictProfile.example}"*` : ''}${siWord ? `\n- **Sinhala:** ${siWord}` : ''}`;
          return res.json({
            reply: dictReply,
            source: 'scholar_ai_live',
          });
        }
      }

      const wikiSummary = await fetchWikipediaSummary(promptText);
      if (wikiSummary) {
        return res.json({
          reply: wikiSummary,
          source: 'scholar_ai_live',
        });
      }
    }

    return res.json({
      reply: scholarResult.reply,
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
