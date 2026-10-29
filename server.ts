import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateScholarResponse } from './src/data/scholarAiEngine';

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
  ai = new GoogleGenAI();
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

    if (!ai && process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    if (!ai) {
      console.warn('[Gemini Notice] No API key available; using scholar engine');
      return res.json({
        reply: generateEducationalFallback(promptText),
        source: 'local_scholar',
      });
    }

    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.8-flash'];
    let reply = '';
    let usedModel = '';

    for (const modelName of candidateModels) {
      const abortController = new AbortController();
      const timeoutTimer = setTimeout(() => {
        abortController.abort();
      }, 15000);

      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
            abortSignal: abortController.signal,
          },
        });
        if (response.text && response.text.trim()) {
          reply = response.text.trim();
          usedModel = modelName;
          clearTimeout(timeoutTimer);
          break;
        }
      } catch (err: any) {
        console.warn(`[Gemini Model Notice] Model ${modelName} encounter:`, err?.message || err);
      } finally {
        clearTimeout(timeoutTimer);
      }
    }

    if (!reply) {
      console.warn('[Gemini Notice] Engaging local scholar fallback engine');
      reply = generateEducationalFallback(promptText);
      return res.json({
        reply,
        source: 'local_scholar',
      });
    }

    return res.json({
      reply,
      source: usedModel,
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
