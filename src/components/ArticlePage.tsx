import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pdfFile, extractedText } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");

  useEffect(() => {
    const generateArticle = async () => {
      if (!extractedText) return;

      try {
        setLoading(true);
        const response = await fetch(
          "https://hashantg.app.n8n.cloud/webhook-test/generate-article",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: extractedText }),
          }
        );

        if (!response.ok)
          throw new Error(`Workflow request failed: ${response.status}`);
        const data = await response.json();

        setTitle(data.title || pdfFile?.name || "Generated Article");
        setArticle(data.article || extractedText);
      } catch (err) {
        console.error(err);
        setTitle(pdfFile?.name || "Generated Article");
        setArticle(
          "Failed to generate article. Showing extracted PDF text:\n\n" +
            extractedText
        );
      } finally {
        setLoading(false);
      }
    };

    generateArticle();
  }, [extractedText, pdfFile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-6 md:p-12 flex flex-col relative">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-5 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 shadow-lg w-max transition-all"
      >
        ← Back
      </button>

      {loading ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="loader mb-4"></div>
          <p className="text-gray-300 text-lg">Generating article...</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-md">
            {title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-gray-300 whitespace-pre-line p-4 bg-gray-900/50 rounded-2xl shadow-inner border border-gray-700">
            {article}
          </p>
        </>
      )}

      {/* Loader styles */}
      <style>{`
        .loader {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #a78bfa; /* Purple */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ArticlePage;
