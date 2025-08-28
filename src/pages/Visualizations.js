import { useState } from 'react';
import {
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';


const data = [
  { name: "Feb", value: 30, value2: 13 },
  { name: "Mar", value: 20, value2: 98 },
  { name: "Apr", value: 27, value2: 39 },
  { name: "May", value: 18, value2: 48 },
];

export default function Visualizations() {
  const [type, setType] = useState("bar");

return (
<div className="rounded-2xl p-6 bg-white border shadow-sm">
<h2 className="text-2xl font-bold text-[#1A6B8E]">Visualizations</h2>
<p className="text-slate-500">Explore your data with different chart types.</p>


<div className="h-72 w-full rounded-xl border p-3 bg-slate-50 mt-4">
  {type === "line" && (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <Line type="monotone" dataKey="value2" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )}

  {type === "bar" && (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
        <Bar dataKey="value2" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )}

  {type === "pie" && (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip />
        <Legend />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  )}
</div>


<div className="flex gap-3 mt-4">
<button onClick={() => setType('line')} className={`px-3 py-2 rounded-xl border ${type==='line'?'ring-2 ring-teal-400':''}`}>Line</button>
<button onClick={() => setType('bar')} className={`px-3 py-2 rounded-xl border ${type==='bar'?'ring-2 ring-teal-400':''}`}>Bar</button>
<button onClick={() => setType('pie')} className={`px-3 py-2 rounded-xl border ${type==='pie'?'ring-2 ring-teal-400':''}`}>Pie</button>
</div>
</div>
);
}