import { useApp } from '../context/AppContext';

export default function CleaningResults() {
  const { cleaningResults, cleaningInspection } = useApp();

  if (!cleaningResults) {
    return null;
  }

  const handleDownloadReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8000${cleaningResults.next_steps.download_report}?format=docx`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cleaningResults.cleaned_filename}_REPORT.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download report');
    }
  };

  const handleDownloadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8000${cleaningResults.next_steps.download_data}?format=csv`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cleaningResults.cleaned_filename}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download data');
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-white shadow-sm border border-slate-100 mb-6">
      <h2 className="text-2xl font-semibold text-[#1A6B8E] mb-4">
        Data Cleaning Results
      </h2>

      {/* Status and Message */}
      <div className="mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">{cleaningResults.status}</p>
          <p className="text-green-700 text-sm mt-1">{cleaningResults.message}</p>
        </div>
      </div>

      {/* Shape Comparison */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-slate-600 mb-2">Original Shape</h3>
          <p className="text-2xl font-bold text-slate-800">
            {cleaningResults.original_shape[0]} × {cleaningResults.original_shape[1]}
          </p>
          <p className="text-sm text-slate-500">rows × columns</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-600 mb-2">Final Shape</h3>
          <p className="text-2xl font-bold text-blue-800">
            {cleaningResults.final_shape[0]} × {cleaningResults.final_shape[1]}
          </p>
          <p className="text-sm text-blue-500">rows × columns</p>
        </div>
      </div>

      {/* Cleaning Summary */}
      {cleaningResults.cleaning_summary && cleaningResults.cleaning_summary.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-3">Cleaning Operations</h3>
          <div className="bg-slate-50 rounded-lg p-4">
            <ul className="space-y-2">
              {cleaningResults.cleaning_summary.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Key Insights */}
      {cleaningResults.key_insights && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-3">Key Insights</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900">{cleaningResults.key_insights}</p>
          </div>
        </div>
      )}

      {/* Download Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDownloadReport}
          className="px-5 py-3 rounded-lg bg-[#1A6B8E] text-white font-semibold hover:bg-[#155a7a] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Report
        </button>
        <button
          onClick={handleDownloadData}
          className="px-5 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Cleaned Data
        </button>
      </div>
    </div>
  );
}