# n8n Webhook Workflow for generate article using huggingface API (Becouse of limitation i cant deploy it )

<img width="1467" height="564" alt="image" src="https://github.com/user-attachments/assets/bd80f699-bb83-4f07-8f0a-d667fdfd69fc" />



# 🤖 AI-Powered Article Generator

## Project Overview
The **AI-Powered Article Generator** is a web application that transforms various forms of interview-style content into clean, concise, and engaging articles.  
Users can upload a **PDF**, paste a **website URL**, or provide a **YouTube video link**.  
The backend automatically processes the content and uses a **large language model (LLM)** to generate a ~300-word article, complete with an automated title and subtitle.

This project is an excellent example of a **full-stack AI application**, demonstrating:
- **Serverless architecture**
- **Multi-source data processing**
- **Seamless integration with an external LLM API**

---

## ✨ Features
- **Multi-Source Input**: Process content from PDFs, website URLs, and YouTube video links.  
- **AI-Powered Generation**: Converts unstructured interview content into a coherent, well-written article.  
- **Smart Options**: Customize the output by providing specific instructions for tone, length, and language.  
- **Auto Title & Subtitle**: The LLM automatically generates a relevant title and subtitle for each article.  
- **Efficient Backend**: Serverless functions handle content extraction and API calls, ensuring scalability.  

---

## 🛠️ Technical Stack
- **Frontend**: React, Next.js, or a simple HTML file for a clean and responsive UI.  
- **Backend**: Vercel Serverless Functions (Node.js).  
- **PDF Extraction**: [pdf.js](https://mozilla.github.io/pdf.js/) for client-side text extraction.  
- **LLM Integration**: Hugging Face Inference API for text generation.  
- **Automation**: n8n workflow to orchestrate requests and responses.  

---

## 🚀 Getting Started

### Prerequisites
- A [Hugging Face](https://huggingface.co/) account with a valid API token.  
- A [Vercel](https://vercel.com/) account for serverless deployment.  
- An [n8n](https://n8n.io/) account or locally running instance.  

### Installation
Clone the repository:
```bash
git clone https://github.com/your-username/ai-article-generator.git
cd ai-article-generator
````

Install dependencies:

```bash
npm install
```

---

## 🔄 n8n Workflow Setup

### 1. Create a Webhook Node

* Add a **Webhook node** and set **HTTP Method** to `POST`.
* Click **Listen for Test Event** and copy the unique URL.
* This is the endpoint your frontend will send data to.

### 2. Add an HTTP Request Node

* Connect an **HTTP Request node** to the Webhook.
* This node will send the prompt to the **Hugging Face API**.

**Settings:**

* Authentication → **Header Auth**
* Header Name → `Authorization`
* Header Value → `Bearer YOUR_HUGGING_FACE_TOKEN`
* Request Method → `POST`
* URL → `https://api-inference.huggingface.co/models/google/flan-t5-xxl`
* Body Type → JSON

**Body Content:**

```json
{
  "inputs": "You are an expert content writer. Your task is to analyze the provided text, automatically detect its main topic, and craft a compelling, SEO-friendly article from it. The article should be well-structured with a clear, concise title and easy-to-read paragraphs. Focus on clarity and readability for a general audience. The final output must be in the following exact format, without any extra text or conversation:\n\nTitle: <Article Title Here>\n\nArticle: <Article Content Here>\n\nText to Analyze:\n{{ $json['text'] }}"
}
```

### 3. Add a Respond to Webhook Node

* Connect a **Respond to Webhook node** to the HTTP Request node.
* Set Response Mode → **Using JSON**

**Body:**

```json
{
  "title": "{{ $json.generated_text.match(/Title:\\s*([^\\n\\r]+)/i)[1] }}",
  "article": "{{ $json.generated_text.match(/Article:\\s*([\\s\\S]+)/i)[1] }}"
}
```

### 4. Activate the Workflow

Click **Activate** in the top-right corner of the n8n editor.

---

## 💻 Running Locally

Start the development server:

```bash
npm run dev
```

---

## ☁️ Deployment

This project is designed for **seamless deployment on Vercel**.
Simply connect your GitHub repository to your Vercel account, and Vercel will handle the rest.

---

## 🤝 Contributing

We welcome contributions! Please open a pull request or submit an issue on the repository page.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

```

👉 You can save this content as **`README.md`** in your repo, and it will render beautifully on GitHub.  

Would you like me to also create a **sample `package.json` and folder structure** for this project so your GitHub repo looks complete from the start?
```

