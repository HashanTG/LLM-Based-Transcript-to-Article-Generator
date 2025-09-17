// App.tsx (high-level flow)
import React, { useState } from "react";
import UploadPDF from "./component/UploadPDF";
import OptionsPanel from "./component/OptionsPanel";
import ResultCard from "./component/ResultCard";
import { extractWebsite, extractYoutube, generateArticle } from "./lib/api";
import type { ArticleOptions, ArticleResult } from "./lib/api";

export default function App() {
  const [mode, setMode] = useState<"pdf" | "website" | "youtube">("pdf");
  const [source, setSource] = useState("");
  const [options, setOptions] = useState<ArticleOptions>({
    tone: "Neutral",
    length: "medium",
    language: "English",
    userGuidance: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ArticleResult | null>(null);

  const handleExtractAndGenerate = async (text: string) => {
    setLoading(true);
    try {
      const res = await generateArticle(text, options);
      setResult(res);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message || "Error");
      } else {
        alert("Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateClick = async () => {
    try {
      setLoading(true);
      if (mode === "website") {
        const t = await extractWebsite(source);
        await handleExtractAndGenerate(t);
      } else if (mode === "youtube") {
        const t = await extractYoutube(source);
        await handleExtractAndGenerate(t);
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message || "Something failed");
      } else {
        alert("Something failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">LLM Article Assistant</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-3">
            <label className="mr-2">
              <input
                type="radio"
                checked={mode === "pdf"}
                onChange={() => setMode("pdf")}
              />{" "}
              PDF
            </label>
            <label className="ml-3">
              <input
                type="radio"
                checked={mode === "website"}
                onChange={() => setMode("website")}
              />{" "}
              Website
            </label>
            <label className="ml-3">
              <input
                type="radio"
                checked={mode === "youtube"}
                onChange={() => setMode("youtube")}
              />{" "}
              YouTube
            </label>
          </div>

          {mode === "pdf" ? (
            <UploadPDF onExtract={(t) => handleExtractAndGenerate(t)} />
          ) : (
            <>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder={
                  mode === "website" ? "https://..." : "YouTube video URL"
                }
                className="w-full border p-2 rounded"
              />
              <button
                onClick={handleGenerateClick}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Working..." : "Generate"}
              </button>
            </>
          )}
        </div>

        <OptionsPanel options={options} setOptions={setOptions} />
      </div>

      <div className="mt-8">
        <ResultCard data={result} />
      </div>
    </div>
  );
}
