import { useNavigate } from 'react-router-dom';


export default function AboutUs() {
const nav = useNavigate();
return (
<div className="rounded-2xl p-6 bg-white border shadow-sm">
<h2 className="text-2xl font-bold text-[#1A6B8E]">Who are we?</h2>
<p className="text-slate-700 leading-7 mt-3">Auto-AI is a student-driven initiative focused on democratizing AutoML for small and medium businesses. Our platform blends intuitive design with robust automation to help users clean datasets, engineer features, select models, and train pipelines in a few guided steps. We built Auto-AI with a focus on transparency and portability so you can export code and reproduce experiments.</p>
<div className="mt-6"><button onClick={() => nav('/contact')} className="px-4 py-2 rounded-xl bg-[#1A6B8E] text-white">Contact Us</button></div>
</div>
);
}