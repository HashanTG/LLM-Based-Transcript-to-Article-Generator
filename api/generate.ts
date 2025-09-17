// api/generate.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const HF_API = 'https://api-inference.huggingface.co/models/gpt2'; // example model — replace with better instruct model
const HF_KEY = process.env.HF_API_KEY; // set on Vercel

function buildPrompt(sourceText: string, options: any) {
  const { tone, length, language, userGuidance } = options;
  const wordTarget = length === 'short' ? 100 : length === 'long' ? 500 : 300;
  return `
You are an assistant that must generate three things from the provided source text (which is a transcript of an interview or a web article).
1) A short, catchy title (max 10 words).
2) Two to three subheadings suitable for the article.
3) A ${wordTarget}-word well-structured article in ${language} with the requested tone: ${tone}.
User guidance: ${userGuidance || 'None'}
Source:
"""${sourceText.slice(0, 30000)}"""
Format your response as JSON with fields: title, subheadings (array), article.
`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({error: 'POST only'});
  const { text, options } = req.body;
  if (!text) return res.status(400).json({error: 'text required'});

  const prompt = buildPrompt(text, options || {});
  // Call Hugging Face Inference (text-generation)
  const model = process.env.HF_MODEL || 'google/flan-t5-small'; // set a model env var if you want
  const endpoint = `https://api-inference.huggingface.co/models/${model}`;

  const hfResp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 800, do_sample: false }
    })
  });

  if (!hfResp.ok) {
    const textErr = await hfResp.text();
    return res.status(502).json({ error: 'LLM error', details: textErr });
  }

  const data = await hfResp.json();
  // Different HF models return different shapes. For many text-generation models the generated text is in data[0].generated_text
  const generated = (data[0]?.generated_text ?? data[0]?.generated_text) || (typeof data === 'string' ? data : JSON.stringify(data));

  // Try to parse JSON from output (because our prompt asked for JSON)
  try {
    const jsonStart = generated.indexOf('{');
    const jsonStr = generated.slice(jsonStart);
    const parsed = JSON.parse(jsonStr);
    return res.json({ ok: true, result: parsed });
  } catch (e) {
    // fallback: return plain generated text
    return res.json({ ok: true, raw: generated });
  }
}
