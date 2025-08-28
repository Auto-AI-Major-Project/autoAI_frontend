import { useApp } from '../context/AppContext';

export default function ModelSelection() {
const { recommendations, selectedModel, setSelectedModel } = useApp();
return (
<div className="rounded-2xl p-6 bg-white border shadow-sm">
<h2 className="text-2xl font-bold text-[#1A6B8E]">Model Selection</h2>
<p className="text-slate-500">Review recommended models and pick one manually or auto-select.</p>


<div className="grid md:grid-cols-2 gap-4 mt-4">
{recommendations.map((m) => (
<button key={m.name} onClick={() => setSelectedModel(m)} className={`p-4 rounded-2xl text-left border ${selectedModel?.name === m.name ? 'border-2 shadow-md' : 'border-slate-200'}`}>
<div className="flex items-center justify-between">
<div className="font-semibold text-[#1A6B8E]">{m.name}</div>
<div className="text-sm text-slate-600">{(m.score * 100).toFixed(1)}%</div>
</div>
<div className="text-xs text-slate-500">Train Time: {m.time}</div>
</button>
))}
</div>


<div className="flex gap-3 mt-4">
<button onClick={() => setSelectedModel(recommendations[0])} className="px-4 py-2 rounded-xl bg-[#1A6B8E] text-white">Select Most Recommended</button>
<button disabled={!selectedModel} className={`px-4 py-2 rounded-xl border ${selectedModel ? 'bg-white hover:bg-slate-50' : 'opacity-50'}`}>Continue to Training</button>
</div>
</div>
);
}