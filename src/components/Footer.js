export default function Footer() {
return (
<footer className="mt-16 border-t border-slate-200 bg-white/70">
<div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
<div>© {new Date().getFullYear()} Auto-AI. All rights reserved.</div>
<div className="italic text-slate-500">Made by the students of <span className="font-semibold">MIT College, Chh.Sambahjinagar</span></div>
</div>
</footer>
);
}