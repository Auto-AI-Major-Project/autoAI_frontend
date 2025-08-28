import { useNavigate } from 'react-router-dom';


export default function ContactUs() {
const nav = useNavigate();
return (
<div className="rounded-2xl p-6 bg-white border shadow-sm">
<h2 className="text-2xl font-bold text-[#1A6B8E]">Contact Us</h2>
<p className="text-slate-500">Reach out through the channels below.</p>
<div className="grid md:grid-cols-2 gap-4 mt-4">
<div className="p-4 rounded border bg-slate-50">Email: hello@auto-ai.example</div>
<div className="p-4 rounded border bg-slate-50">Instagram: @autoai_official</div>
<div className="p-4 rounded border bg-slate-50">LinkedIn: linkedin.com/company/auto-ai</div>
<div className="p-4 rounded border bg-slate-50">Website: www.auto-ai.example</div>
</div>
<div className="mt-4"><button onClick={() => nav('/about')} className="px-4 py-2 rounded-xl bg-[#1A6B8E] text-white">Know more about us</button></div>
</div>
);
}