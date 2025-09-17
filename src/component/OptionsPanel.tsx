// OptionsPanel.tsx

type ArticleOptions = {
  tone: string;
  length: string;
  language: string;
  userGuidance: string;
};

type Props = {
  options: ArticleOptions;
  setOptions: (opts: ArticleOptions) => void;
};

export default function OptionsPanel({ options, setOptions }: Props) {
  return (
    <div className="p-4 space-y-3 bg-white rounded shadow">
      <label className="block">
        <span className="text-sm font-medium">Tone</span>
        <select
          value={options.tone}
          onChange={(e) => setOptions({ ...options, tone: e.target.value })}
          className="mt-1 block w-full border p-2 rounded"
        >
          <option value="Neutral">Neutral</option>
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Educational">Educational</option>
          <option value="Marketing">Marketing</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Length</span>
        <select
          value={options.length}
          onChange={(e) => setOptions({ ...options, length: e.target.value })}
          className="mt-1 block w-full border p-2 rounded"
        >
          <option value="short">Short (100)</option>
          <option value="medium">Medium (300)</option>
          <option value="long">Long (500)</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Language</span>
        <select
          value={options.language}
          onChange={(e) => setOptions({ ...options, language: e.target.value })}
          className="mt-1 block w-full border p-2 rounded"
        >
          <option value="English">English</option>
          <option value="Sinhala">සිංහල</option>
          <option value="Tamil">தமிழ்</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Extra guidance (optional)</span>
        <textarea
          value={options.userGuidance}
          onChange={(e) =>
            setOptions({ ...options, userGuidance: e.target.value })
          }
          className="mt-1 block w-full border p-2 rounded"
          placeholder="E.g., Make it simple for beginners..."
        />
      </label>
    </div>
  );
}
