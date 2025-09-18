import React, { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Set PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

type InputType = "pdf" | "youtube" | "weblink";

const ContentInput: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<InputType>("pdf");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  // PDF file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdfFile(e.target.files[0]);
      setLink(""); // clear link if any
    }
  };

  // Link input for YouTube/Web
  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setPdfFile(null); // clear PDF if any
  };

  // Extract text or use link
  const handleSubmit = async () => {
    setLoading(true);
    let text = "";

    try {
      if (selectedType === "pdf") {
        if (!pdfFile) {
          alert("Please select a PDF file.");
          setLoading(false);
          return;
        }

        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          text += strings.join(" ") + "\n";
        }

        if (!text.trim()) {
          throw new Error(
            "No text found in PDF. It might be scanned or encrypted."
          );
        }
      } else {
        if (!link.trim()) {
          alert("Please enter a valid URL.");
          setLoading(false);
          return;
        }
        text = link; // For links, just use the URL as the text
      }

      setExtractedText(text.trim());

      // Navigate to ArticlePage with extracted text
      navigate("/article", {
        state: {
          pdfFile,
          extractedText: text.trim(),
          type: selectedType,
        },
      });
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to process content. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans flex justify-center items-start py-20 px-4 md:py-32">
      <motion.div
        className="w-full max-w-4xl bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-700 shadow-2xl p-8 md:p-12 hover:scale-[1.02] transition-transform duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8 text-center md:text-left drop-shadow-lg">
          Upload or Link Your Content
        </h2>

        {/* Type Selection Tabs */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
          {(["pdf", "youtube", "weblink"] as InputType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setPdfFile(null);
                setLink("");
                setExtractedText("");
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all text-sm md:text-base ${
                selectedType === type
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {type === "pdf"
                ? "PDF"
                : type === "youtube"
                ? "YouTube"
                : "Website Link"}
            </button>
          ))}
        </div>

        {/* Input Area */}
        {selectedType === "pdf" && (
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full text-gray-200 bg-gray-800 rounded-2xl px-4 py-3 border border-gray-700 cursor-pointer hover:border-purple-500 shadow-md transition-all mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        )}

        {(selectedType === "youtube" || selectedType === "weblink") && (
          <input
            type="text"
            placeholder={
              selectedType === "youtube"
                ? "Enter YouTube video URL"
                : "Enter website URL"
            }
            value={link}
            onChange={handleLinkChange}
            className="w-full bg-gray-800 text-gray-200 rounded-2xl px-4 py-3 border border-gray-700 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-md transition-all mb-6"
          />
        )}

        {/* Preview of extracted content */}
        {extractedText && (
          <div className="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700 max-h-64 overflow-y-auto text-gray-200 whitespace-pre-line shadow-inner">
            {extractedText}
          </div>
        )}

        {/* Selected PDF Name */}
        {pdfFile && (
          <p className="text-gray-300 mb-6 text-center md:text-left">
            Selected PDF:{" "}
            <span className="font-semibold text-white underline decoration-purple-500">
              {pdfFile.name}
            </span>
          </p>
        )}

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(99,102,241,0.7)",
          }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className={`w-full md:w-auto px-8 py-3 text-lg md:text-xl font-semibold rounded-2xl shadow-lg transition-all duration-300 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          }`}
        >
          {loading ? "Processing..." : "Extract & Continue"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ContentInput;
