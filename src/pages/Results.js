// import { useApp } from '../context/AppContext';
// import { useState } from 'react';

// export default function Results() {
//   const {
//     datasetName,
//     downloadCleaned,
//     downloadPreprocessed,
//     downloadModelCode,
//     selectedModel,
//     modelResults
//   } = useApp();

//   const [activeTab, setActiveTab] = useState('overview');

//   // If we have model results from the API, show them
//   if (modelResults) {
//     return (
//       <div className="rounded-2xl p-6 bg-white border shadow-sm">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-[#1A6B8E]">AutoML Results</h2>
//             <p className="text-slate-500">
//               Model training completed for "{datasetName}"
//             </p>
//           </div>
//           <div className={`px-3 py-1 rounded-full text-sm ${
//             modelResults.status === 'success' 
//               ? 'bg-green-100 text-green-800' 
//               : 'bg-yellow-100 text-yellow-800'
//           }`}>
//             {modelResults.status === 'success' ? '✓ Success' : '⚠ Partial Success'}
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
//           <button
//             onClick={() => setActiveTab('overview')}
//             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               activeTab === 'overview'
//                 ? 'bg-white text-[#1A6B8E] shadow-sm'
//                 : 'text-gray-600 hover:text-gray-900'
//             }`}
//           >
//             Overview
//           </button>
//           <button
//             onClick={() => setActiveTab('models')}
//             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               activeTab === 'models'
//                 ? 'bg-white text-[#1A6B8E] shadow-sm'
//                 : 'text-gray-600 hover:text-gray-900'
//             }`}
//           >
//             Model Comparison
//           </button>
//           <button
//             onClick={() => setActiveTab('details')}
//             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               activeTab === 'details'
//                 ? 'bg-white text-[#1A6B8E] shadow-sm'
//                 : 'text-gray-600 hover:text-gray-900'
//             }`}
//           >
//             Technical Details
//           </button>
//         </div>

//         {/* Tab Content */}
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             {/* Best Model Card */}
//             <div className="bg-gradient-to-r from-[#1A6B8E] to-[#155a7a] text-white p-6 rounded-xl">
//               <h3 className="text-lg font-semibold mb-2">🏆 Best Performing Model</h3>
//               <div className="text-3xl font-bold">{modelResults.top_model}</div>
//               <div className="text-sm opacity-90 mt-2">
//                 Processing Time: {modelResults.processing_time}
//               </div>
//               {modelResults.run_id && (
//                 <div className="text-sm opacity-90">
//                   Run ID: #{modelResults.run_id}
//                 </div>
//               )}
//             </div>

//             {/* Quick Stats */}
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="bg-white border rounded-xl p-4">
//                 <div className="text-2xl font-bold text-[#1A6B8E]">
//                   {modelResults.recommendations?.length || 0}
//                 </div>
//                 <div className="text-sm text-slate-500">Models Tested</div>
//               </div>
//               <div className="bg-white border rounded-xl p-4">
//                 <div className="text-2xl font-bold text-green-600">
//                   {modelResults.recommendations?.[0]?.Accuracy 
//                     ? (modelResults.recommendations[0].Accuracy * 100).toFixed(1) + '%'
//                     : 'N/A'
//                   }
//                 </div>
//                 <div className="text-sm text-slate-500">Best Accuracy</div>
//               </div>
//               <div className="bg-white border rounded-xl p-4">
//                 <div className="text-2xl font-bold text-blue-600">
//                   {modelResults.processing_time || 'N/A'}
//                 </div>
//                 <div className="text-sm text-slate-500">Total Time</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'models' && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-slate-700">Model Performance Comparison</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border border-slate-200 rounded-lg">
//                 <thead className="bg-slate-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       Model
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       Accuracy
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       AUC
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       F1 Score
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       Rank
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-200">
//                   {modelResults.recommendations?.map((model, index) => (
//                     <tr key={index} className={index === 0 ? 'bg-green-50' : ''}>
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <div className="flex items-center">
//                           {index === 0 && <span className="mr-2">🏆</span>}
//                           <span className="font-medium text-slate-900">{model.name}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
//                         {(model.Accuracy * 100).toFixed(2)}%
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
//                         {model.AUC ? (model.AUC * 100).toFixed(2) + '%' : 'N/A'}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
//                         {model.F1 ? (model.F1 * 100).toFixed(2) + '%' : 'N/A'}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
//                         #{index + 1}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {activeTab === 'details' && (
//           <div className="space-y-6">
//             <div className="bg-slate-50 p-4 rounded-lg">
//               <h3 className="font-semibold mb-2">Model Information</h3>
//               <div className="space-y-2 text-sm">
//                 <div><span className="font-medium">Model Path:</span> {modelResults.model_path}</div>
//                 <div><span className="font-medium">Status:</span> {modelResults.status}</div>
//                 {modelResults.message && (
//                   <div><span className="font-medium">Message:</span> {modelResults.message}</div>
//                 )}
//               </div>
//             </div>

//             <div className="bg-slate-50 p-4 rounded-lg">
//               <h3 className="font-semibold mb-2">Raw API Response</h3>
//               <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-64">
//                 {JSON.stringify(modelResults, null, 2)}
//               </pre>
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="mt-8 flex gap-3">
//           <button className="px-4 py-2 bg-[#1A6B8E] text-white rounded-lg hover:bg-[#155a7a] transition-colors">
//             Download Best Model
//           </button>
//           <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
//             Export Results
//           </button>
//           <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
//             Go to Visual Analysis
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Default view when no model results are available
//   return (
//     <div className="rounded-2xl p-6 bg-white border shadow-sm">
//       <h2 className="text-2xl font-bold text-[#1A6B8E]">Results</h2>
//       <p className="text-slate-500">
//         View and download your outputs
//         {datasetName ? ` for "${datasetName}"` : ''}.
//       </p>

//       <div className="grid md:grid-cols-2 gap-4 mt-4">
//         {/* Cleaned Dataset */}
//         <div className="p-4 border rounded-xl bg-white">
//           <div className="font-semibold">Cleaned Dataset</div>
//           <div className="text-xs text-slate-500 my-2">Preview</div>
//           <pre className="bg-slate-50 p-3 rounded text-xs">
//             id,feature,target{`\n`}1,0.54,0{`\n`}2,0.78,1{`\n`}3,0.12,0
//           </pre>
//           <button
//             onClick={downloadCleaned}
//             className="mt-3 px-3 py-2 rounded-xl bg-[#1A6B8E] text-white"
//           >
//             Download Cleaned CSV
//           </button>
//         </div>

//         {/* Preprocessed Dataset */}
//         <div className="p-4 border rounded-xl bg-white">
//           <div className="font-semibold">Preprocessed Dataset</div>
//           <div className="text-xs text-slate-500 my-2">Preview</div>
//           <pre className="bg-slate-50 p-3 rounded text-xs">
//             id,f1,f2,f3,target{`\n`}1,0.23,0.10,0.91,0{`\n`}2,0.44,0.78,0.11,1
//           </pre>
//           <button
//             onClick={downloadPreprocessed}
//             className="mt-3 px-3 py-2 rounded-xl bg-[#1A6B8E] text-white"
//           >
//             Download Preprocessed CSV
//           </button>
//         </div>

//         {/* Model Code */}
//         <div className="md:col-span-2 p-4 border rounded-xl bg-white">
//           <div className="font-semibold mb-2">Trained ML Model Code</div>
//           <pre className="bg-slate-50 p-3 rounded text-xs max-h-56 overflow-auto">
//             {selectedModel && typeof selectedModel === 'object'
//               ? `# Selected: ${selectedModel.name}\n\n...`
//               : '# No model selected'}
//           </pre>
//           <div className="flex gap-3 mt-3">
//             <button
//               onClick={downloadModelCode}
//               className="px-3 py-2 rounded-xl bg-[#1A6B8E] text-white"
//             >
//               Download Model Code (PY)
//             </button>
//             <button className="px-3 py-2 rounded-xl border">
//               Go to Visual Analysis
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





















import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 


export default function Results() {
  const {
    datasetName,
    downloadCleaned,
    downloadPreprocessed,
    downloadModelCode,
    selectedModel,
    modelResults
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');
  const [fetchedResults, setFetchedResults] = useState(null);
  const [allRuns, setAllRuns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate(); 
  const runId = location.state?.runId; // Get runId if passed via navigation

  const getAuthToken = () => {
  return localStorage.getItem('token'); // Adjust based on your auth setup
};

  // Function to fetch all runs
  const fetchAllRuns = async () => {
    try {
      const token = getAuthToken();
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/automl/runs');
      if (!response.ok) throw new Error('Failed to fetch runs');
      const data = await response.json();
      setAllRuns(data.runs || []);
      
      // If no specific runId and we have runs, use the latest one
      if (!runId && data.runs && data.runs.length > 0) {
        const latestRun = data.runs[data.runs.length - 1];
        await fetchRunDetails(latestRun.id);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching runs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch specific run details
  const fetchRunDetails = async (id) => {
    try {
      const token = getAuthToken();
      setIsLoading(true);
      const response = await fetch(`http://localhost:8000/automl/runs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch run details');
      const data = await response.json();
      
      // Transform the data to match the expected format
      const transformedData = {
        run_id: data.run.id,
        top_model: data.run.top_model,
        model_path: data.run.model_path,
        processing_time: `${data.run.processing_time}s`,
        recommendations: data.run.recommendations || [],
        status: 'success',
        message: 'Data loaded from database',
        created_at: data.run.created_at,
        filename: data.run.filename,
        target_column: data.run.target_column,
        metrics: data.metrics || []
      };
      
      setFetchedResults(transformedData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching run details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to load data on component mount
  useEffect(() => {
    if (runId) {
      // If specific runId provided, fetch that run
      fetchRunDetails(runId);
    } else if (!modelResults) {
      // If no current results and no specific runId, fetch latest run
      fetchAllRuns();
    }
  }, [runId, modelResults]);

  const handleDownloadModel = async () => {
  if (!displayResults || !displayResults.run_id) {
    alert('No model available to download');
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8000/automl/download-model/${displayResults.run_id}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to download model');
    }

    // Get the filename from the response headers
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'model.pkl';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    // Create blob and download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading model:', error);
    alert('Failed to download model. Please try again.');
  }
};

const handleExportResults = async () => {
  if (!displayResults || !displayResults.run_id) {
    alert('No results available to export');
    return;
  }

  try {
    setIsLoading(true);
    
    const response = await fetch(
      `http://localhost:8000/automl/export-results/${displayResults.run_id}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to export results');
    }

    // Get the filename from the response headers
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = `AutoML_Results_Run${displayResults.run_id}.xlsx`;
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    // Create blob and download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Optional: Show success message
    alert('Results exported successfully!');
    
  } catch (error) {
    console.error('Error exporting results:', error);
    alert('Failed to export results. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  // Determine which results to display
  const displayResults = modelResults || fetchedResults;

  // Loading state
  if (isLoading) {
    return (
      <div className="rounded-2xl p-6 bg-white border shadow-sm">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A6B8E] mx-auto mb-4"></div>
            <div className="text-slate-600">Loading results...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !displayResults) {
    return (
      <div className="rounded-2xl p-6 bg-white border shadow-sm">
        <div className="text-center py-8">
          <div className="text-red-500 text-xl mb-2">⚠️ Error</div>
          <div className="text-slate-600 mb-4">{error}</div>
          <button 
            onClick={() => {
              setError(null);
              fetchAllRuns();
            }}
            className="px-4 py-2 bg-[#1A6B8E] text-white rounded-lg hover:bg-[#155a7a] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If we have model results from the API or database, show them
  if (displayResults) {
    return (
      <div className="rounded-2xl p-6 bg-white border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1A6B8E]">AutoML Results</h2>
            <p className="text-slate-500">
              Model training completed for "{displayResults.filename || datasetName}"
            </p>
            {displayResults.created_at && (
              <p className="text-xs text-slate-400">
                Created: {new Date(displayResults.created_at).toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {/* Run Selector */}
            {allRuns.length > 1 && (
              <select
                value={displayResults.run_id || ''}
                onChange={(e) => fetchRunDetails(parseInt(e.target.value))}
                className="px-3 py-1 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6B8E]"
              >
                <option value="">Select Run</option>
                {allRuns.map(run => (
                  <option key={run.id} value={run.id}>
                    Run #{run.id} - {run.top_model} ({new Date(run.created_at).toLocaleDateString()})
                  </option>
                ))}
              </select>
            )}
            <div className={`px-3 py-1 rounded-full text-sm ${
              displayResults.status === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {displayResults.status === 'success' ? '✓ Success' : '⚠ Partial Success'}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-[#1A6B8E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'models'
                ? 'bg-white text-[#1A6B8E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Model Comparison
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'details'
                ? 'bg-white text-[#1A6B8E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Technical Details
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Best Model Card */}
            <div className="bg-gradient-to-r from-[#1A6B8E] to-[#155a7a] text-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">🏆 Best Performing Model</h3>
              <div className="text-3xl font-bold">{displayResults.top_model}</div>
              <div className="text-sm opacity-90 mt-2">
                Processing Time: {displayResults.processing_time}
              </div>
              {displayResults.run_id && (
                <div className="text-sm opacity-90">
                  Run ID: #{displayResults.run_id}
                </div>
              )}
              {displayResults.target_column && (
                <div className="text-sm opacity-90">
                  Target Column: {displayResults.target_column}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border rounded-xl p-4">
                <div className="text-2xl font-bold text-[#1A6B8E]">
                  {displayResults.recommendations?.length || 0}
                </div>
                <div className="text-sm text-slate-500">Models Tested</div>
              </div>
              <div className="bg-white border rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">
                  {displayResults.recommendations?.[0]?.Accuracy 
                    ? (displayResults.recommendations[0].Accuracy * 100).toFixed(1) + '%'
                    : 'N/A'
                  }
                </div>
                <div className="text-sm text-slate-500">Best Accuracy</div>
              </div>
              <div className="bg-white border rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {displayResults.processing_time || 'N/A'}
                </div>
                <div className="text-sm text-slate-500">Total Time</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">Model Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      AUC
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      F1 Score
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Rank
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {displayResults.recommendations?.map((model, index) => (
                    <tr key={index} className={index === 0 ? 'bg-green-50' : ''}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          {index === 0 && <span className="mr-2">🏆</span>}
                          <span className="font-medium text-slate-900">{model.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {(model.Accuracy * 100).toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {model.AUC ? (model.AUC * 100).toFixed(2) + '%' : 'N/A'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {model.F1 ? (model.F1 * 100).toFixed(2) + '%' : 'N/A'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                        #{index + 1}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Model Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Model Path:</span> {displayResults.model_path}</div>
                <div><span className="font-medium">Status:</span> {displayResults.status}</div>
                <div><span className="font-medium">Target Column:</span> {displayResults.target_column}</div>
                <div><span className="font-medium">Dataset:</span> {displayResults.filename}</div>
                {displayResults.message && (
                  <div><span className="font-medium">Message:</span> {displayResults.message}</div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Raw API Response</h3>
              <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-64">
                {JSON.stringify(displayResults, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3 flex-wrap">
          <button
          onClick={handleDownloadModel}
          disabled={!displayResults?.run_id}
          className="px-4 py-2 bg-[#1A6B8E] text-white rounded-lg hover:bg-[#155a7a] transition-colors">
            Download Best Model
          </button>
          <button 
            onClick={handleExportResults}
            disabled={!displayResults?.run_id || isLoading}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Exporting...' : 'Export Results'}
          </button>
          <button
          onClick={() => navigate('/visual-analysis', { 
            state: { 
              targetColumn: displayResults.target_column,
              filename: displayResults.filename 
            } 
          })}
          className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            Go to Visual Analysis
          </button>
          <button 
            onClick={fetchAllRuns}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
    );
  }

  // Default view when no model results are available
  return (
    <div className="rounded-2xl p-6 bg-white border shadow-sm">
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-[#1A6B8E] mb-2">No Results Found</h2>
        <p className="text-slate-500 mb-6">
          No AutoML results available. Run a model training session first.
        </p>
        <button 
          onClick={fetchAllRuns}
          className="px-4 py-2 bg-[#1A6B8E] text-white rounded-lg hover:bg-[#155a7a] transition-colors mr-3"
        >
          Check for Results
        </button>
        <a 
          href="/"
          className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors inline-block"
        >
          Go Back to Home
        </a>
      </div>
      
      {/* Show traditional results if no AutoML data */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Alternative Results</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Cleaned Dataset */}
          <div className="p-4 border rounded-xl bg-white">
            <div className="font-semibold">Cleaned Dataset</div>
            <div className="text-xs text-slate-500 my-2">Preview</div>
            <pre className="bg-slate-50 p-3 rounded text-xs">
              id,feature,target{`\n`}1,0.54,0{`\n`}2,0.78,1{`\n`}3,0.12,0
            </pre>
            <button
              onClick={downloadCleaned}
              className="mt-3 px-3 py-2 rounded-xl bg-[#1A6B8E] text-white"
            >
              Download Cleaned CSV
            </button>
          </div>

          {/* Preprocessed Dataset */}
          <div className="p-4 border rounded-xl bg-white">
            <div className="font-semibold">Preprocessed Dataset</div>
            <div className="text-xs text-slate-500 my-2">Preview</div>
            <pre className="bg-slate-50 p-3 rounded text-xs">
              id,f1,f2,f3,target{`\n`}1,0.23,0.10,0.91,0{`\n`}2,0.44,0.78,0.11,1
            </pre>
            <button
              onClick={downloadPreprocessed}
              className="mt-3 px-3 py-2 rounded-xl bg-[#1A6B8E] text-white"
            >
              Download Preprocessed CSV
            </button>
          </div>

          {/* Model Code */}
          <div className="md:col-span-2 p-4 border rounded-xl bg-white">
            <div className="font-semibold mb-2">Trained ML Model Code</div>
            <pre className="bg-slate-50 p-3 rounded text-xs max-h-56 overflow-auto">
              {selectedModel && typeof selectedModel === 'object'
                ? `# Selected: ${selectedModel.name}\n\n...`
                : '# No model selected'}
            </pre>
            <div className="flex gap-3 mt-3">
              <button
                onClick={downloadModelCode}
                className="px-3 py-2 rounded-xl bg-[#1A6B8E] text-white"
              >
                Download Model Code (PY)
              </button>
              <button className="px-3 py-2 rounded-xl border">
                Go to Visual Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}