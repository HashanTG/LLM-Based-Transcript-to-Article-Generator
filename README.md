# n8n Webhook Workflow for generate article using huggingface api

<img width="1467" height="564" alt="image" src="https://github.com/user-attachments/assets/bd80f699-bb83-4f07-8f0a-d667fdfd69fc" />


🤖 AI-Powered Article Generator
Project Overview
The AI-Powered Article Generator is a web application that transforms various forms of interview-style content into clean, concise, and engaging articles. Users can upload a PDF, paste a website URL, or provide a YouTube video link. The application's backend automatically processes the content and uses a large language model (LLM) to generate a ~300-word article, complete with an automated title and subtitle.

This project is an excellent example of a full-stack AI application, demonstrating serverless architecture, multi-source data processing, and seamless integration with an external LLM API.

Features
Multi-Source Input: Process content from PDFs, website URLs, and YouTube video links.

AI-Powered Generation: Converts unstructured interview content into a coherent, well-written article.

Smart Options: Customize the output by providing specific instructions for tone, length, and language.

Auto Title & Subtitle: The LLM automatically generates a relevant title and subtitle for each article, saving you time.

Efficient Backend: Utilizes a Vercel serverless function to handle content extraction and API calls, ensuring a scalable and cost-effective solution.

Technical Stack
Frontend: A modern web framework (e.g., React, Next.js, or a single HTML file) for a clean and responsive user interface.

Backend: Vercel Serverless Functions (Node.js) to manage the core logic.

PDF Extraction: pdf.js for client-side text extraction from PDF documents.

LLM Integration: Hugging Face Inference API for free and efficient AI-powered text generation.

Getting Started
Prerequisites
A Hugging Face account with a valid API token.

A Vercel account for serverless deployment.

An n8n account or a locally running instance.

Installation
Clone the repository:

git clone [https://github.com/your-username/ai-article-generator.git](https://github.com/your-username/ai-article-generator.git)
cd ai-article-generator

Install dependencies:

npm install

n8n Workflow Setup
The core backend logic is handled by a simple n8n workflow. Follow these steps to set it up:

Create a Webhook Node:

Add a Webhook node and set its HTTP Method to POST.

Click Listen for Test Event and copy the unique URL. This is the endpoint your frontend will send data to.

Add an HTTP Request Node:

Connect an HTTP Request node to the Webhook. This node will send the prompt to the Hugging Face API.

Set the Authentication to Header Auth.

Header Name: Authorization

Header Value: Bearer YOUR_HUGGING_FACE_TOKEN

Set the Request Method to POST.

Set the URL to your chosen LLM endpoint (e.g., https://api-inference.huggingface.co/models/google/flan-t5-xxl).

Set the Body Type to JSON and paste the following prompt in the Body Content:

{
  "inputs": "You are an expert content writer. Your task is to analyze the provided text, automatically detect its main topic, and craft a compelling, SEO-friendly article from it. The article should be well-structured with a clear, concise title and easy-to-read paragraphs. Focus on clarity and readability for a general audience. The final output must be in the following exact format, without any extra text or conversation:\n\nTitle: <Article Title Here>\n\nArticle: <Article Content Here>\n\nText to Analyze:\n{{ $json['text'] }}"
}

Add a Respond to Webhook Node:

Connect a Respond to Webhook node to the HTTP Request node.

Set the Response Mode to Using JSON.

Paste the following JSON in the Body, which parses the title and article from the LLM's response:

{
  "title": "{{ $json.generated_text.match(/Title:\s*([^\n\r]+)/i)[1] }}",
  "article": "{{ $json.generated_text.match(/Article:\s*([\s\S]+)/i)[1] }}"
}

Activate the Workflow:

Click the Activate button in the top-right corner of the n8n editor.

Running Locally
To start the development server, run:

npm run dev

Deployment
This project is designed for seamless deployment on Vercel. Simply connect your GitHub repository to your Vercel account, and Vercel will handle the rest.

Contributing
We welcome contributions! Please feel free to open a pull request or submit an issue on the repository page.

License
This project is licensed under the MIT License.
