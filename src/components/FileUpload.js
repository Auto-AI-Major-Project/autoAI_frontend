import React, { useRef, useState } from 'react';
import { FileUp } from 'lucide-react';
import { useApp } from '../context/AppContext';


export default function FileUpload() {
const ref = useRef(null);
const [drag, setDrag] = useState(false);
const { setDatasetName } = useApp();


const handle = (files) => {
if (!files || !files.length) return;
const f = files[0];
if (!f.name.match(/\.(csv|xlsx|xls)$/i)) {
alert('Only CSV or Excel files are allowed');
return;
}
setDatasetName(f.name);
};


return (
<div
onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
onDragLeave={() => setDrag(false)}
onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files); }}
className={`border-2 border-dashed rounded-2xl p-8 mx-auto ${drag ? 'border-slate-400 bg-slate-50' : 'border-slate-300 bg-white'}`} style={{ maxWidth: 720 }}
>
<div className="grid place-items-center gap-3">
<FileUp />
<div className="text-lg font-medium">Drag your dataset here or browse your files</div>
<div className="text-xs text-slate-500">CSV or Excel only</div>
<input ref={ref} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={(e) => handle(e.target.files)} />
<button onClick={() => ref.current?.click()} className="mt-2 px-4 py-2 rounded-xl bg-[#1A6B8E] text-white">Browse Files</button>
</div>
</div>
);
}