import { useNavigate } from 'react-router-dom';

export default function SignUp() {
const nav = useNavigate();
return (
<div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm border">
<h2 className="text-2xl font-bold text-[#1A6B8E]">Sign Up</h2>
<div className="mt-4 space-y-3">
<input className="w-full px-4 py-3 rounded-xl border" placeholder="Username" />
<input className="w-full px-4 py-3 rounded-xl border" placeholder="Email" />
<input className="w-full px-4 py-3 rounded-xl border" type="password" placeholder="Password" />
<input className="w-full px-4 py-3 rounded-xl border" type="password" placeholder="Confirm Password" />
<button onClick={() => nav('/')} className="w-full py-3 rounded-xl bg-[#1A6B8E] text-white">Create Account</button>
</div>
<div className="text-center text-xs text-slate-500 mt-4">Made by the students of <span className="font-semibold">MIT College, Chh.Sambahjinagar</span></div>
</div>
);
}