export default function AutoML() {
return (
<div className="rounded-2xl p-6 bg-white border shadow-sm">
<h2 className="text-2xl font-bold text-[#1A6B8E]">What is AutoML & How to Use It</h2>
<div className="prose max-w-none mt-3 text-slate-700">
<p><strong>AutoML</strong> automates key steps of the machine learning lifecycle: data cleaning, preprocessing, model selection, hyperparameter tuning, and training. Auto-AI guides you through each step and keeps the pipeline transparent.</p>
<ol>
<li>Upload your dataset (CSV/Excel) on the Home page.</li>
<li>Run Data Cleaning to fix missing values and duplicates.</li>
<li>Run Preprocessing to encode categoricals and scale features.</li>
<li>Review Model Recommendations and select one or let Auto-AI pick for you.</li>
<li>Start Training and monitor the console.</li>
<li>Download Outputs (clean/preprocessed data & model code) from the Results page.</li>
<li>Explore Visualizations to understand patterns and performance.</li>
</ol>
</div>
</div>
);
}