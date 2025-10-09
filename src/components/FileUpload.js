// src/components/FileUpload.jsx
import { useApp } from '../context/AppContext';
import Papa from 'papaparse';

export default function FileUpload() {
  const { setDatasetName, setDatasetColumns } = useApp();
  const { uploadedFile, setUploadedFile } = useApp();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.name.endsWith('.csv')) {
        alert('Please upload a valid CSV file.');
        return;
      }
      setUploadedFile(file);

      // Update dataset name
      setDatasetName(file.name);

      // Parse CSV file to extract column names
      Papa.parse(file, {
        header: true, // Treat first row as headers
        skipEmptyLines: true,
        complete: (result) => {
          // Extract column names from the parsed data
          const columns = Object.keys(result.data[0] || {});
          if (columns.length === 0) {
            console.error('No valid columns found in the dataset.');
            alert('No valid columns found in the dataset. Please ensure the CSV has a header row.');
            setDatasetColumns([]);
          } else {
            console.log('Extracted columns:', columns);
            setDatasetColumns(columns); // Update context with column names
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          alert('Error parsing CSV file. Please check the file format.');
          setDatasetColumns([]);
        },
      });
    }
  };

  return (
    <div>
      <label
        htmlFor="fileUpload"
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        Upload Dataset (CSV)
      </label>
      <input
        id="fileUpload"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A6B8E] focus:border-transparent"
      />
    </div>
  );
}