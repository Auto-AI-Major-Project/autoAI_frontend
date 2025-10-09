import { Link, useNavigate } from 'react-router-dom';
import { Home, User, Info, Cpu, BarChart3, Mail } from 'lucide-react';

export default function Navbar() {
  const nav = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  return (
    <header className="w-full sticky top-0 z-40 bg-white/70 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => nav('/')}>
          <div className="w-10 h-10 rounded-2xl grid place-items-center text-white font-black bg-[#1A6B8E]">AI</div>
          <div>
            <div className="font-extrabold text-xl text-[#1A6B8E]">Auto-AI</div>
            <div className="text-xs text-slate-500">Changing the way AutoML works</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100" to="/">
            <Home size={16} /> <span className="hidden lg:inline">Home</span>
          </Link>
          {/* <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100" to="/profile">
            <User size={16} /> <span className="hidden lg:inline">Profile</span>
          </Link> */}
          <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100" to="/about">
            <Info size={16} /> <span className="hidden lg:inline">About</span>
          </Link>
          <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100" to="/automl">
            <Cpu size={16} /> <span className="hidden lg:inline">AutoML</span>
          </Link>
          {/* <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100" to="/visualizations">
            <BarChart3 size={16} /> <span className="hidden lg:inline">Visualizations</span>
          </Link> */}
          <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100" to="/contact">
            <Mail size={16} /> <span className="hidden lg:inline">Contact</span>
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100">
              <User size={20} className="text-[#1A6B8E]" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          ) : (
            <>
              <Link to="/signin" className="px-3 py-2 rounded-xl border border-slate-200 text-sm">Sign In</Link>
              <Link to="/signup" className="px-3 py-2 rounded-xl bg-[#1A6B8E] text-white text-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}