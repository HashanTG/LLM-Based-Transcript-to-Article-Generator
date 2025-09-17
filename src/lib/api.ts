import axios from 'axios';

export const extractWebsite = async (url:string) => {
  const resp = await axios.post('/api/extract?mode=website', { url });
  return resp.data.text;
};

export const extractYoutube = async (videoUrl:string) => {
  const resp = await axios.post('/api/extract?mode=youtube', { videoUrl });
  if (resp.data.text) return resp.data.text;
  throw new Error(resp.data.error || 'No transcript');
};

export interface ArticleOptions {
  tone: string;
  length: string;
  language: string;
  userGuidance: string;
}

export interface ArticleResult {
  result: {
    title?: string;
    subheadings?: string[];
    article?: string;
    raw?: string;
  };
}

export const generateArticle = async (text: string, options: ArticleOptions): Promise<ArticleResult> => {
  const resp = await axios.post('/api/generate', { text, options });
  return resp.data;
};
