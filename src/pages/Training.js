import { useApp } from '../context/AppContext';


export default function Training() {
const { selectedModel, trainingLog, setTrainingLog } = useApp();


const run = () => {
if (!selectedModel) return;
const steps = [
'Initializing pipeline…',
'Loading preprocessed data…',
`Training ${selectedModel.name}…`,
'Cross-validating…',
'Saving best checkpoint…',
'Done! Accuracy: 0.92',
];
setTrainingLog([]);
steps.forEach((s, i) => setTimeout(() => setTrainingLog((p) => [...p, s]), i * 500));
};


return (
<div className="rounded-2xl p-6 bg-white border shadow-sm">
<h2 className="text-2xl font-bold text-[#1A6B8E]">Model Training</h2>
<p className="text-slate-500">{selectedModel ? `Training ${selectedModel.name}` : 'Select a model first.'}</p>


<div className="rounded-xl border p-4 my-4 bg-slate-50 min-h-[120px]">
<div className="font-medium mb-2">Console</div>
<div className="text-sm font-mono whitespace-pre-wrap">
{trainingLog.map((l, i) => <div key={i}>{l}</div>)}
</div>
</div>


<div className="flex gap-3">
<button onClick={run} disabled={!selectedModel} className={`px-4 py-2 rounded-xl text-white ${selectedModel ? 'bg-[#1A6B8E]' : 'opacity-50 cursor-not-allowed'}`}>Start Training</button>
<button className="px-4 py-2 rounded-xl border">Go to Results</button>
</div>
</div>
);
}