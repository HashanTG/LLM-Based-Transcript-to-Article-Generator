import { saveAs } from "file-saver";
import jsPDF from "jspdf";

import type { ArticleResult } from "../lib/api";

export default function ResultCard({ data }: { data: ArticleResult | null }) {
  if (!data) return null;
  const { title, subheadings, article, raw } = data.result ?? {};
  const content = article || raw || "";

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title || "Article", 10, 10);
    let y = 20;
    (subheadings || []).forEach((s: string) => {
      doc.setFontSize(12);
      doc.text(s, 10, y);
      y += 8;
    });
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 10, y + 5);
    doc.save(`${(title || "article").slice(0, 30)}.pdf`);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-2 space-y-1">
        {(subheadings || []).map((s: string, i: number) => (
          <div key={i} className="text-sm italic">
            - {s}
          </div>
        ))}
      </div>
      <div className="mt-4 whitespace-pre-wrap">{content}</div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigator.clipboard.writeText(content)}
          className="px-4 py-2 bg-gray-100 rounded"
        >
          Copy
        </button>
        <button
          onClick={downloadPdf}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
