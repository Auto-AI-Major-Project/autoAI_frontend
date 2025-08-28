import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Pencil, LogOut } from 'lucide-react';


export default function Profile() {
const { profile, setProfile } = useApp();
const [editing, setEditing] = useState(null);


const Field = ({ id, label, type='text' }) => (
<div className="mb-4">
<div className="text-xs text-slate-500 mb-1">{label}</div>
<div className="flex items-center gap-2">
{editing === id ? (
<input type={type} value={profile[id] || ''} onChange={(e) => setProfile((p) => ({ ...p, [id]: e.target.value }))} className="px-3 py-2 rounded-xl border w-full" />
) : (
<div className="px-3 py-2 rounded-xl border bg-slate-50 w-full">{type==='password' ? (profile[id] ? '••••••' : '') : profile[id]}</div>
)}
{editing === id ? (
<>
<button onClick={() => setEditing(null)} className="p-2 rounded-xl border"><Pencil size={16} /></button>
</>
) : (
<button onClick={() => setEditing(id)} className="p-2 rounded-xl border"><Pencil size={16} /></button>
)}
</div>
</div>
);


return (
<div className="grid md:grid-cols-3 gap-6">
<div className="md:col-span-2 p-6 rounded-2xl bg-white border shadow-sm">
<h2 className="text-2xl font-bold text-[#1A6B8E] mb-4">Profile</h2>
<Field id="username" label="Username" />
<Field id="email" label="Email" />
<Field id="password" label="Password" type="password" />
<Field id="profession" label="Profession" />
<Field id="company" label="Company" />
<div className="flex gap-3 mt-4">
<button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl bg-[#1A6B8E] text-white">Save Changes</button>
<button className="px-4 py-2 rounded-xl border">Log Out <LogOut size={14} className="inline ml-2" /></button>
</div>
</div>


<div className="p-6 rounded-2xl bg-white border shadow-sm flex flex-col items-center">
<div className="relative">
<img src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(profile.username||'User')}`} alt="Profile" className="w-32 h-32 rounded-2xl border" />
<button className="absolute -right-2 -bottom-2 p-2 rounded-xl border bg-white shadow"><Pencil size={14} /></button>
</div>
<button className="mt-4 px-4 py-2 rounded-xl border">View Previous Projects</button>
</div>
</div>
);
}