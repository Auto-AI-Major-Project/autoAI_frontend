import { useApp } from '../context/AppContext';

export default function DataCleaning() {
const { cleanedReady, setCleanedReady } = useApp();
return (
<div className="rounded-2xl p-6 bg-white border shadow-sm">
<h2 className="text-2xl font-bold text-[#1A6B8E]">Data Cleaning</h2>
<p className="text-slate-500">Handle missing values, duplicates, and inconsistent formats.</p>


<div className="mt-6">
<div className="rounded-xl border p-4 mb-4">Outputs: Preview rows, summary, quality checks</div>
<div className="flex gap-3">
<button onClick={() => setCleanedReady(true)} className="px-4 py-2 rounded-xl bg-[#1A6B8E] text-white">Run Data Cleaning</button>
<button disabled={!cleanedReady} className={`px-4 py-2 rounded-xl border ${cleanedReady ? 'bg-white hover:bg-slate-50' : 'opacity-50'}`}>Next</button>
</div>
</div>
</div>
);
}