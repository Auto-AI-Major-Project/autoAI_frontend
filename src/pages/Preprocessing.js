import { useApp } from '../context/AppContext';

export default function Preprocessing() {
const { preprocessedReady, setPreprocessedReady } = useApp();
return (
<div className="rounded-2xl p-6 bg-white border shadow-sm">
<h2 className="text-2xl font-bold text-[#1A6B8E]">Data Preprocessing</h2>
<p className="text-slate-500">Encode categoricals, scale numerical features, and split data.</p>


<div className="mt-6">
<div className="rounded-xl border p-4 mb-4">Outputs: Encodings, scaling, train/test split</div>
<div className="flex gap-3">
<button onClick={() => setPreprocessedReady(true)} className="px-4 py-2 rounded-xl bg-[#1A6B8E] text-white">Run Preprocessing</button>
<button disabled={!preprocessedReady} className={`px-4 py-2 rounded-xl border ${preprocessedReady ? 'bg-white hover:bg-slate-50' : 'opacity-50'}`}>Next</button>
</div>
</div>
</div>
);
}