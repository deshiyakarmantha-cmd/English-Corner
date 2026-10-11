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

// Initialize GoogleGenAI client on the server side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
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

  if (p.includes('hamlet') || p.includes('to be or not to be')) {
    return `### Analysis of Hamlet's Soliloquy ("To be, or not to be")
Prince Hamlet speaks this immortal soliloquy in **Act III, Scene 1** of Shakespeare's tragedy.

**Core Themes:**
1. **Existential Burden:** Hamlet weighs the nobility of bearing life's suffering ("the slings and arrows of outrageous fortune") against taking action to end it.
2. **Fear of the Unknown:** What paralyzes humans is the "undiscovered country from whose bourn no traveller returns"—the mystery of what dreams may come after death.
3. **Paralysis of Reason:** Shakespeare shows how intense philosophical contemplation can freeze decisive kinetic action: *"Thus conscience does make cowards of us all."*`;
  }

  if (p.includes('check') || p.includes('mistake') || p.includes('correct') || p.includes('each of')) {
    return `### Sentence Surgery & Grammar Check
If your sentence contains: *"Each of the monks have a book"*
- **Correction:** *Each of the monks **has** a book.*
- **Grammar Rule:** The subject is **"Each"**, which is a singular distributive pronoun. The prepositional phrase *"of the monks"* contains a plural noun, but the verb must agree with the singular head word **"Each"**.

Share any sentence with me, and I will dissect its clauses and elevate its vocabulary!`;
  }

  if (p.includes('sinhala') || p.includes('sri lanka') || p.includes('origin') || p.includes('loanword')) {
    return `### English Words with Sri Lankan & Sinhala Roots
English has borrowed vibrant words from Sri Lanka:
1. **Serendipity:** Derived from *Serendib*, the ancient Persian/Arabic name for Sri Lanka. Coined by Horace Walpole in 1754.
2. **Tourmaline:** From the Sinhala word *Thoramalli (තෝරමල්ලි)* for precious colored gemstones.
3. **Catamaran:** From Tamil *Kattu-maram* (tied logs), standard craft on the Indian Ocean.
4. **Mulligatawny:** From *Milagu-tannir* (pepper water), popular soup during Ceylon colonial days.
5. **Anicut:** Ancient irrigation dam terminology from South Asian engineering.`;
  }

  return `### Greetings from the Sanjanani English Scholar AI!
Welcome to the English Corner at **Asgiri Maha Vihara Maha Pirivena, Kandy (October 07, 08, 09, 2026)**.

I am here to guide you in your English learning journey:
- **Grammar Queries:** Ask me about tenses, prepositions, clauses, punctuation, or active/passive voice.
- **Vocabulary Expansion:** Discover elevated adjectives and vivid verbs.
- **William Shakespeare:** Explore soliloquies, iambic pentameter, and Elizabethan plays.
- **Writing Feedback:** Paste your poem, Haiku, or essay paragraph for constructive feedback!

*What would you like to explore today?*`;
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

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || generateEducationalFallback(promptText);
    return res.json({ reply, source: 'gemini' });
  } catch (err: any) {
    console.error('Server Gemini API error:', err);
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
