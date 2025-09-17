// UploadPDF.tsx
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack"; // or 'pdfjs-dist/legacy/build/pdf' depending on bundler

export default function UploadPDF({
  onExtract,
}: {
  onExtract: (text: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: { str: string }) => item.str);
      text += strings.join(" ") + "\n\n";
      // avoid insane loops; optional break if too big
      if (text.length > 100000) break;
    }
    setLoading(false);
    onExtract(text);
  }

  return (
    <div className="p-4 border rounded">
      <input type="file" accept="application/pdf" onChange={handleFile} />
      {loading && <p>Extracting text...</p>}
    </div>
  );
}
