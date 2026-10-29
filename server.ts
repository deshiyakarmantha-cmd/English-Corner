import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI client on the server side with strict timeout & retry configuration
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
      timeout: 12000,
      retryOptions: {
        attempts: 1,
      },
    },
  });
}

// Educational responses generator for offline/fallback mode
function generateEducationalFallback(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('oxford comma') || p.includes('serial comma')) {
    return `### The Oxford (Serial) Comma
The Oxford comma is the comma placed immediately before the coordinating conjunction (such as **and** or **or**) in a list of three or more items.

**Why It Matters:**
Without it, sentences can create hilarious or confusing ambiguities!

- **Confusing:** *We invited the scholars, William Shakespeare and the Venerable Abbot.* (This might mean the scholars ARE Shakespeare and the Abbot!)
- **Clear with Oxford Comma:** *We invited the scholars, William Shakespeare, and the Venerable Abbot.*

**Golden Rule:** At the Sanjanani English Corner, we strongly encourage the Oxford comma for clear academic and creative expression.`;
  }

  if (p.includes('active') || p.includes('passive') || p.includes('voice')) {
    return `### Active vs. Passive Voice Masterclass

**Active Voice (Subject Performs Action):**
- *Structure:* Subject + Verb + Object
- *Example:* *The novice monk composed a lyric poem.*
- *Benefit:* Direct, kinetic, and forceful.

**Passive Voice (Action Befalls the Object):**
- *Structure:* Object + Auxiliary Verb + Past Participle (+ by Subject)
- *Example:* *A lyric poem was composed by the novice monk.*
- *Benefit:* Ideal when the focus is on the object or the actor is anonymous.

**Pro-Tip:** Aim for about 80-85% active voice in your essays and stories at Sanjanani 2026!`;
  }

  if (p.includes('tense') || p.includes('past') || p.includes('present') || p.includes('future') || p.includes('perfect')) {
    return `### English Tenses Quick Reference Guide

English uses 12 standard verb tenses built from **Present**, **Past**, and **Future** combined with:
1. **Simple:** General truths or completed actions (*"I study," "I studied," "I will study"*).
2. **Continuous (Progressive):** Ongoing actions (*"I am writing," "I was reading," "I will be practicing"*).
3. **Perfect:** Actions connected to another point in time (*"I have finished," "I had departed," "I will have completed"*).
4. **Perfect Continuous:** Ongoing duration up to a point (*"I have been studying for three hours"*).

**Key Tip:** Ensure consistent tense within a single paragraph unless a time-shift is explicitly signaled!`;
  }

  if (p.includes('preposition') || p.includes('in on at') || p.includes('at night') || p.includes('in the morning')) {
    return `### Prepositions of Time & Place ("In", "On", "At")

**Rule of Specificity (Broad to Specific):**
- **IN (General / Enclosed / Long Periods):**
  - Time: *in 2026, in October, in the morning, in summer*
  - Place: *in Kandy, in Sri Lanka, in the library*
- **ON (More Specific / Surfaces / Days & Dates):**
  - Time: *on Wednesday, on October 7th, on my birthday*
  - Place: *on the table, on the page, on Temple Street*
- **AT (Most Specific / Precise Points & Clock Times):**
  - Time: *at 9:00 AM, at noon, at midnight*
  - Place: *at Asgiri Maha Vihara, at the entrance, at home*`;
  }

  if (p.includes('hamlet') || p.includes('to be or not to be') || p.includes('shakespeare') || p.includes('macbeth') || p.includes('sonnet')) {
    return `### Analysis of Hamlet's Soliloquy ("To be, or not to be")
Prince Hamlet speaks this immortal soliloquy in **Act III, Scene 1** of Shakespeare's tragedy.

**Core Themes:**
1. **Existential Burden:** Hamlet weighs the nobility of bearing life's suffering ("the slings and arrows of outrageous fortune") against taking action to end it.
2. **Fear of the Unknown:** What paralyzes humans is the "undiscovered country from whose bourn no traveller returns"—the mystery of what dreams may come after death.
3. **Paralysis of Reason:** Shakespeare shows how intense philosophical contemplation can freeze decisive kinetic action: *"Thus conscience does make cowards of us all."*

**Shakespearean Verse:** Written in unrhymed **iambic pentameter** (blank verse), echoing the natural rhythm of high-elevated English thought.`;
  }

  if (p.includes('check') || p.includes('mistake') || p.includes('correct') || p.includes('each of') || p.includes('grammar')) {
    return `### Sentence Surgery & Grammar Check
If your sentence contains: *"Each of the monks have a book"*
- **Correction:** *Each of the monks **has** a book.*
- **Grammar Rule:** The subject is **"Each"**, which is a singular distributive pronoun. The prepositional phrase *"of the monks"* contains a plural noun, but the verb must agree with the singular head word **"Each"**.

**Checklist for Polished Sentences:**
1. Check subject-verb agreement (singular subject = singular verb).
2. Watch dangling modifiers (*"Walking to the temple, the bell rang"* -> *"While walking to the temple, I heard the bell ring"*).
3. Use strong, descriptive verbs instead of relying on *"very + adjective"*!`;
  }

  if (p.includes('sinhala') || p.includes('sri lanka') || p.includes('origin') || p.includes('loanword') || p.includes('kandy')) {
    return `### English Words with Sri Lankan & South Asian Heritage
English has borrowed vibrant words originating from Sri Lanka and the Indian Ocean:
1. **Serendipity:** Derived from *Serendib*, the historic Persian/Arabic name for Sri Lanka. Coined by Horace Walpole in 1754 to mean fortunate discoveries made by accident.
2. **Tourmaline:** From the Sinhala word *Thoramalli (තෝරමල්ලි)*, identifying vibrant multi-colored gemstones found in Sri Lankan gem pits.
3. **Catamaran:** From *Kattu-maram* (tied logs), ocean craft navigating Ceylon's coasts.
4. **Mulligatawny:** From *Milagu-tannir* (pepper water), celebrated soup of colonial Ceylon.
5. **Anicut:** Ancient irrigation weir and dam terminology originating in South Asian hydraulic civilization.`;
  }

  return `### Greetings from the Sanjanani English Scholar AI!
Welcome to the English Corner at **Asgiri Maha Vihara Maha Pirivena, Kandy (October 07, 08, 09, 2026)**.

I am here to guide you in your English learning journey:
- **Grammar Queries:** Ask me about tenses, prepositions, clauses, punctuation, or active/passive voice.
- **Vocabulary Expansion:** Discover elevated adjectives and vivid verbs.
- **William Shakespeare:** Explore soliloquies, iambic pentameter, and Elizabethan plays.
- **Writing Feedback:** Paste your poem, Haiku, or essay paragraph for constructive feedback!

*What English question would you like to explore today?*`;
}

// Server endpoint for AI English tutor
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userMessage } = req.body;
    const promptText = userMessage || (messages && messages[messages.length - 1]?.content) || '';

    if (!promptText.trim()) {
      return res.status(400).json({ error: 'Message content cannot be empty.' });
    }

    if (!ai) {
      // Offline fallback
      return res.json({
        reply: generateEducationalFallback(promptText),
        source: 'local_scholar',
      });
    }

    const systemInstruction = `You are the Sanjanani English Scholar AI, an erudite, encouraging, and highly articulate English language and literature tutor at the English Corner in the Sanjanani Literary Festival 2026 (සංජානනී ශිෂ්‍ය කලා මහෝත්සවය සහ අධ්‍යාපන සංස්කෘතික ප්‍රදර්ශනය 2026), held at the historic Asgiri Maha Vihara Maha Pirivena in Kandy, Sri Lanka on October 07, 08, 09, 2026.
Your audience includes student monks (Pirivena students), school children, teachers, and literature lovers.
Your guidelines:
1. Explain English grammar rules with simplicity, precision, and 2 vivid examples.
2. If given a sentence to review, gently identify errors, explain the underlying rule, and suggest a more poetic or academic phrasing.
3. When discussing literature or Shakespeare (Hamlet, Macbeth, The Tempest, Sonnets), offer illuminating thematic insights and explain archaic terms.
4. If the user mentions Sri Lanka, Kandy, or Sinhala words, respectfully connect the linguistic bridge.
5. Format your output with clear markdown headings, bullet points, and bold key terms. Keep answers concise yet deeply educational.`;

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(messages) && messages.length > 0) {
      for (const msg of messages.slice(-8)) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: promptText }],
      });
    }

    const abortController = new AbortController();
    const timeoutTimer = setTimeout(() => {
      abortController.abort();
    }, 11000);

    let reply = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          abortSignal: abortController.signal,
        },
      });
      reply = response.text || '';
    } catch (apiErr: any) {
      console.warn('[Gemini Service Notice] Upstream Gemini API fallback engaged:', apiErr?.message || apiErr);
      reply = generateEducationalFallback(promptText);
    } finally {
      clearTimeout(timeoutTimer);
    }

    return res.json({
      reply: reply || generateEducationalFallback(promptText),
      source: reply ? 'gemini' : 'fallback',
    });
  } catch (err: any) {
    console.warn('[Chat Endpoint Notice] Fallback response dispatched:', err?.message || err);
    const fallback = generateEducationalFallback(req.body?.userMessage || '');
    return res.json({
      reply: fallback,
      source: 'fallback',
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
