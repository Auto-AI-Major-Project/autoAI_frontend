// import FileUpload from '../components/FileUpload';
// import { Link } from 'react-router-dom';
// import { useApp } from '../context/AppContext';
// import { useState } from 'react';

// export default function Home() {
//   const { datasetName, datasetColumns } = useApp();
//   const [targetColumn, setTargetColumn] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState({
//     dataCleaning: false,
//     modelTraining: false,
//     visualizations: false,
//   });

//   // Debugging: Log datasetColumns to verify
//   console.log('datasetColumns:', datasetColumns);

//   const handleCheckboxChange = (option) => {
//     setSelectedOptions((prev) => ({
//       ...prev,
//       [option]: !prev[option],
//     }));
//   };

//   return (
//     <div>
//       <div className="text-center mb-8">
//         <h1 className="text-5xl font-extrabold text-[#1A6B8E]">Auto-AI</h1>
//         <p className="text-slate-500">Changing the way AutoML works</p>
//       </div>

//       <div className="rounded-2xl p-6 bg-white shadow-sm border border-slate-100 mb-6">
//         <h2 className="text-2xl font-semibold text-[#1A6B8E]">
//           Select and train AI Models tailored to your specific needs
//         </h2>

//         <div className="mt-4 grid md:grid-cols-2 gap-6">
//           {/* File Upload Section */}
//           <div>
//             <FileUpload />
//             {datasetName && (
//               <div className="mt-3 text-sm text-slate-600">
//                 Selected: <span className="font-semibold">{datasetName}</span>
//               </div>
//             )}
//           </div>

//           {/* Target Column Dropdown */}
//           <div>
//             <label htmlFor="targetColumn" className="block text-sm font-medium text-slate-700 mb-2">
//               Choose Target Column
//             </label>
//             <select
//               id="targetColumn"
//               value={targetColumn}
//               onChange={(e) => setTargetColumn(e.target.value)}
//               className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A6B8E] focus:border-transparent"
//               disabled={!datasetColumns || datasetColumns.length === 0}
//             >
//               <option value="">Select a column</option>
//               {datasetColumns && datasetColumns.length > 0 ? (
//                 datasetColumns.map((column, index) => (
//                   <option key={index} value={column}>
//                     {column}
//                   </option>
//                 ))
//               ) : (
//                 <option value="" disabled>
//                   No columns available
//                 </option>
//               )}
//             </select>
//             {(!datasetColumns || datasetColumns.length === 0) && (
//               <p className="mt-2 text-sm text-slate-500">Please upload a dataset first</p>
//             )}
//           </div>
//         </div>

//         {/* Checkboxes Section */}
//         <div className="mt-8">
//           <h3 className="text-lg font-medium text-slate-700 mb-4">Select Processing Options</h3>
//           <div className="space-y-3">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={selectedOptions.dataCleaning}
//                 onChange={() => handleCheckboxChange('dataCleaning')}
//                 className="h-4 w-4 text-[#1A6B8E] focus:ring-[#1A6B8E] border-slate-300 rounded"
//               />
//               <span className="ml-3 text-slate-700">Data Cleaning and Preprocessing</span>
//             </label>

//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={selectedOptions.modelTraining}
//                 onChange={() => handleCheckboxChange('modelTraining')}
//                 className="h-4 w-4 text-[#1A6B8E] focus:ring-[#1A6B8E] border-slate-300 rounded"
//               />
//               <span className="ml-3 text-slate-700">Model Training</span>
//             </label>

//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={selectedOptions.visualizations}
//                 onChange={() => handleCheckboxChange('visualizations')}
//                 className="h-4 w-4 text-[#1A6B8E] focus:ring-[#1A6B8E] border-slate-300 rounded"
//               />
//               <span className="ml-3 text-slate-700">Visualizations</span>
//             </label>
//           </div>
//         </div>

//         {/* Results Button */}
//         <div className="mt-8 flex justify-end">
//           <Link
//             to="/results"
//             className="px-5 py-3 rounded-2xl bg-[#1A6B8E] text-white font-semibold hover:bg-[#155a7a] transition-colors"
//           >
//             See your results
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }






















// src/components/Home.jsx
import FileUpload from '../components/FileUpload';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Home() {
  const { datasetName, datasetColumns, uploadedFile, setModelResults } = useApp();
  const [targetColumn, setTargetColumn] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    dataCleaning: false,
    modelTraining: false,
    visualizations: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Debugging: Log datasetColumns to verify
  console.log('datasetColumns:', datasetColumns);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSeeResults = async () => {
    // If model training is not selected, just navigate to results
    if (!selectedOptions.modelTraining) {
      navigate('/results');
      return;
    }

    // Validate required fields
    if (!uploadedFile) {
      alert('Please upload a dataset first');
      return;
    }
    
    if (!targetColumn) {
      alert('Please select a target column');
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData for the API call
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('target_col', targetColumn);

      // Call FastAPI endpoint
      const response = await fetch('http://localhost:8000/automl', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Store results in context
      setModelResults(result);
      
      // Navigate to results page
      navigate('/results');
      
    } catch (error) {
      console.error('Error calling AutoML API:', error);
      alert('Failed to process your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-[#1A6B8E]">Auto-AI</h1>
        <p className="text-slate-500">Changing the way AutoML works</p>
      </div>

      <div className="rounded-2xl p-6 bg-white shadow-sm border border-slate-100 mb-6">
        <h2 className="text-2xl font-semibold text-[#1A6B8E]">
          Select and train AI Models tailored to your specific needs
        </h2>

        <div className="mt-4 grid md:grid-cols-2 gap-6">
          {/* File Upload Section */}
          <div>
            <FileUpload />
            {datasetName && (
              <div className="mt-3 text-sm text-slate-600">
                Selected: <span className="font-semibold">{datasetName}</span>
              </div>
            )}
          </div>

          {/* Target Column Dropdown */}
          <div>
            <label htmlFor="targetColumn" className="block text-sm font-medium text-slate-700 mb-2">
              Choose Target Column
            </label>
            <select
              id="targetColumn"
              value={targetColumn}
              onChange={(e) => setTargetColumn(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A6B8E] focus:border-transparent"
              disabled={!datasetColumns || datasetColumns.length === 0}
            >
              <option value="">Select a column</option>
              {datasetColumns && datasetColumns.length > 0 ? (
                datasetColumns.map((column, index) => (
                  <option key={index} value={column}>
                    {column}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No columns available
                </option>
              )}
            </select>
            {(!datasetColumns || datasetColumns.length === 0) && (
              <p className="mt-2 text-sm text-slate-500">Please upload a dataset first</p>
            )}
          </div>
        </div>

        {/* Checkboxes Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-slate-700 mb-4">Select Processing Options</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedOptions.dataCleaning}
                onChange={() => handleCheckboxChange('dataCleaning')}
                className="h-4 w-4 text-[#1A6B8E] focus:ring-[#1A6B8E] border-slate-300 rounded"
              />
              <span className="ml-3 text-slate-700">Data Cleaning and Preprocessing</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedOptions.modelTraining}
                onChange={() => handleCheckboxChange('modelTraining')}
                className="h-4 w-4 text-[#1A6B8E] focus:ring-[#1A6B8E] border-slate-300 rounded"
              />
              <span className="ml-3 text-slate-700">Model Training</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedOptions.visualizations}
                onChange={() => handleCheckboxChange('visualizations')}
                className="h-4 w-4 text-[#1A6B8E] focus:ring-[#1A6B8E] border-slate-300 rounded"
              />
              <span className="ml-3 text-slate-700">Visualizations</span>
            </label>
          </div>
        </div>

        {/* Results Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSeeResults}
            disabled={isLoading}
            className={`px-5 py-3 rounded-2xl font-semibold transition-colors ${
              isLoading 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-[#1A6B8E] text-white hover:bg-[#155a7a]'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'See your results'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}