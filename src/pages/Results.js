import { useApp } from '../context/AppContext';

export default function Results() {
  const {
    datasetName,
    downloadCleaned,
    downloadPreprocessed,
    downloadModelCode,
    selectedModel,
  } = useApp();

  return (
    <div className="rounded-2xl p-6 bg-white border shadow-sm">
      <h2 className="text-2xl font-bold text-[#1A6B8E]">Results</h2>
      <p className="text-slate-500">
        View and download your outputs
        {datasetName ? ` for "${datasetName}"` : ''}.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {/* Cleaned Dataset */}
        <div className="p-4 border rounded-xl bg-white">
          <div className="font-semibold">Cleaned Dataset</div>
          <div className="text-xs text-slate-500 my-2">Preview</div>
          <pre className="bg-slate-50 p-3 rounded text-xs">
            id,feature,target{`\n`}1,0.54,0{`\n`}2,0.78,1{`\n`}3,0.12,0
          </pre>
          <button
            onClick={downloadCleaned}
            className="mt-3 px-3 py-2 rounded-xl bg-[#1A6B8E] text-white"
          >
            Download Cleaned CSV
          </button>
        </div>

        {/* Preprocessed Dataset */}
        <div className="p-4 border rounded-xl bg-white">
          <div className="font-semibold">Preprocessed Dataset</div>
          <div className="text-xs text-slate-500 my-2">Preview</div>
          <pre className="bg-slate-50 p-3 rounded text-xs">
            id,f1,f2,f3,target{`\n`}1,0.23,0.10,0.91,0{`\n`}2,0.44,0.78,0.11,1
          </pre>
          <button
            onClick={downloadPreprocessed}
            className="mt-3 px-3 py-2 rounded-xl bg-[#1A6B8E] text-white"
          >
            Download Preprocessed CSV
          </button>
        </div>

        {/* Model Code */}
        <div className="md:col-span-2 p-4 border rounded-xl bg-white">
          <div className="font-semibold mb-2">Trained ML Model Code</div>
          <pre className="bg-slate-50 p-3 rounded text-xs max-h-56 overflow-auto">
            {selectedModel && typeof selectedModel === 'object'
              ? `# Selected: ${selectedModel.name}\n\n...`
              : '# No model selected'}
          </pre>
          <div className="flex gap-3 mt-3">
            <button
              onClick={downloadModelCode}
              className="px-3 py-2 rounded-xl bg-[#1A6B8E] text-white"
            >
              Download Model Code (PY)
            </button>
            <button className="px-3 py-2 rounded-xl border">
              Go to Visual Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
