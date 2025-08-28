import FileUpload from '../components/FileUpload';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';


export default function Home() {
const { datasetName } = useApp();
return (
<div>
<div className="text-center mb-8">
<h1 className="text-5xl font-extrabold text-[#1A6B8E]">Auto-AI</h1>
<p className="text-slate-500">Changing the way AutoML works</p>
</div>


<div className="rounded-2xl p-6 bg-white shadow-sm border border-slate-100 mb-6">
<h2 className="text-2xl font-semibold text-[#1A6B8E]">Select and train AI Models tailored to your specific needs</h2>
<div className="mt-4">
<FileUpload />
{datasetName && <div className="mt-3 text-sm text-slate-600">Selected: <span className="font-semibold">{datasetName}</span></div>}
</div>


<div className="grid md:grid-cols-4 gap-4 mt-6">
<Link to="/datacleaning" className="rounded-2xl p-5 bg-white border hover:shadow-md">Data Cleaning</Link>
<Link to="/preprocessing" className="rounded-2xl p-5 bg-white border hover:shadow-md">Data Preprocessing</Link>
<Link to="/modelselection" className="rounded-2xl p-5 bg-white border hover:shadow-md">Model Selection</Link>
<Link to="/training" className="rounded-2xl p-5 bg-white border hover:shadow-md">Model Training</Link>
</div>


<div className="mt-6 flex justify-end">
<Link to="/results" className="px-5 py-3 rounded-2xl bg-[#1A6B8E] text-white font-semibold">See your results</Link>
</div>
</div>
</div>
);
}