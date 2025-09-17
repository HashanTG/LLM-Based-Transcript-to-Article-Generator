// api/extract.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import Multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';

// helper to parse multipart (for PDF upload)
function parseForm(req: VercelRequest): Promise<{fields:any, files:any}> {
  return new Promise((resolve, reject) => {
    const form = new Multiparty.Form();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({fields, files});
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).send({error: 'POST only'});

    const {mode} = req.query as any;
    if (mode === 'website') {
      const { url } = req.body;
      if (!url) return res.status(400).json({error: 'url required'});

      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }});
      const html = await r.text();
      const $ = cheerio.load(html);
      // simple extraction - text from <p>
      let text = '';
      $('p').each((i, el) => text += $(el).text() + '\n\n');
      if (!text.trim()) text = $('body').text() || '';
      return res.json({ text: text.slice(0, 200000) }); // limit size
    }

    if (mode === 'youtube') {
      const { videoUrl } = req.body;
      if (!videoUrl) return res.status(400).json({error: 'videoUrl required'});

      // Attempt to extract video id
      const idMatch = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      const videoId = idMatch ? idMatch[1] : videoUrl;
      // For reliability, ask user to paste transcript if this fails.
      try {
        // Try a public transcripts API (example), otherwise return 422
        const transcriptResp = await fetch(`https://r.jina.ai/http://youtube.com/watch?v=${videoId}`);
        const transcript = await transcriptResp.text();
        if (transcript && transcript.trim().length > 0) return res.json({ text: transcript });
      } catch (e) {
        console.warn('youtube transcript failed', e);
      }
      return res.status(422).json({ error: 'Could not fetch transcript — please paste transcript text' });
    }

    // default: PDF: parse file
    // parse multipart
    const {fields, files} = await parseForm(req);
    const pdfFiles = files?.file;
    if (!pdfFiles || pdfFiles.length === 0) return res.status(400).json({error: 'pdf file missing'});
    const pdfPath = pdfFiles[0].path;

    // Use pdfjs-dist to extract text server-side if available (server usage can be heavy).
    // For brevity, we will return a message that client-side extraction is recommended.
    return res.json({ text: 'PDF uploaded. For production, use a PDF parsing service (pdf-parse or pdfjs) to extract text server-side. Or extract PDF client-side and send text to /api/generate.' });
  } catch (err:any) {
    console.error(err);
    res.status(500).json({error: err.message || String(err)});
  }
}
