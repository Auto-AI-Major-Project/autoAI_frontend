import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';

export default function VisualAnalysis() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [file, setFile] = useState(null);
  const [targetColumn, setTargetColumn] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const passedData = location.state;

  const COLORS = ['#1A6B8E', '#2E8BC0', '#0891B2', '#06B6D4', '#22D3EE', '#67E8F9', '#A5F3FC', '#CFFAFE'];

  // Handle file upload for analysis
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Analyze dataset
  const analyzeDataset = async () => {
    if (!file || !targetColumn) {
      alert('Please upload a file and specify target column');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('target_col', targetColumn);

      const response = await fetch('http://localhost:8000/automl/analyze-dataset', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to analyze dataset');

      const data = await response.json();
      setAnalysisData(data);
      
      // Set first numeric feature as default selection
      if (data.numeric_columns && data.numeric_columns.length > 0) {
        setSelectedFeature(data.numeric_columns[0]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error analyzing dataset:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load passed data if available
  useEffect(() => {
    if (passedData?.analysisData) {
      setAnalysisData(passedData.analysisData);
      if (passedData.analysisData.numeric_columns?.length > 0) {
        setSelectedFeature(passedData.analysisData.numeric_columns[0]);
      }
    }
    if (passedData?.targetColumn) {
      setTargetColumn(passedData.targetColumn);
    }
  }, [passedData]);

  // Render upload section
  const renderUploadSection = () => (
    <div className="bg-white rounded-xl p-6 border shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">Upload Dataset for Analysis</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Dataset File (CSV)
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1A6B8E] file:text-white hover:file:bg-[#155a7a]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Target Column
          </label>
          <input
            type="text"
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            placeholder="Enter target column name"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A6B8E]"
          />
        </div>
      </div>
      <button
        onClick={analyzeDataset}
        disabled={!file || !targetColumn || isLoading}
        className="mt-4 px-6 py-2 bg-[#1A6B8E] text-white rounded-lg hover:bg-[#155a7a] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Dataset'}
      </button>
    </div>
  );

  // Render loading state
  if (isLoading) {
    return (
      <div className="rounded-2xl p-6 bg-white border shadow-sm">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A6B8E] mx-auto mb-4"></div>
            <div className="text-slate-600">Analyzing dataset...</div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="rounded-2xl p-6 bg-white border shadow-sm">
        {renderUploadSection()}
        <div className="text-center py-8">
          <div className="text-red-500 text-xl mb-2">⚠️ Error</div>
          <div className="text-slate-600">{error}</div>
        </div>
      </div>
    );
  }

  // Render upload section if no data
  if (!analysisData) {
    return (
      <div className="rounded-2xl p-6 bg-white border shadow-sm">
        <h2 className="text-2xl font-bold text-[#1A6B8E] mb-6">Visual Analysis</h2>
        {renderUploadSection()}
        <div className="text-center py-8 bg-slate-50 rounded-lg">
          <div className="text-slate-500">
            Upload a dataset to see comprehensive visualizations and insights
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for visualizations
  const { dataset_info, numeric_summary, categorical_summary, target_distribution,
          correlation_matrix, feature_distributions, categorical_distributions,
          box_plot_data, scatter_data } = analysisData;

  // Target distribution chart data
  const targetChartData = target_distribution?.values
    ? Object.entries(target_distribution.values).map(([key, value]) => ({
        name: key,
        value: value
      }))
    : [];

  // Missing values chart data
  const missingValuesData = Object.entries(dataset_info.missing_values || {})
    .filter(([_, count]) => count > 0)
    .map(([col, count]) => ({
      column: col,
      missing: count,
      percentage: ((count / dataset_info.shape.rows) * 100).toFixed(1)
    }));

  // Feature distribution data for selected feature
  const getFeatureDistData = () => {
    if (!selectedFeature) return [];
    
    if (feature_distributions[selectedFeature]) {
      const { counts, bins } = feature_distributions[selectedFeature];
      return counts.map((count, idx) => ({
        range: `${bins[idx].toFixed(2)}-${bins[idx + 1].toFixed(2)}`,
        count: count
      }));
    }
    
    if (categorical_distributions[selectedFeature]) {
      const { labels, values } = categorical_distributions[selectedFeature];
      return labels.map((label, idx) => ({
        category: label,
        count: values[idx]
      }));
    }
    
    return [];
  };

  // Correlation heatmap data preparation
  const getTopCorrelations = () => {
    if (!correlation_matrix.data || !correlation_matrix.columns) return [];
    
    const correlations = [];
    const cols = correlation_matrix.columns;
    const data = correlation_matrix.data;
    
    for (let i = 0; i < cols.length; i++) {
      for (let j = i + 1; j < cols.length; j++) {
        correlations.push({
          feature1: cols[i],
          feature2: cols[j],
          correlation: data[i][j]
        });
      }
    }
    
    return correlations
      .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation))
      .slice(0, 10);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1A6B8E]">Visual Analysis</h2>
            <p className="text-slate-500">
              Comprehensive visualization and insights for your dataset
            </p>
          </div>
          <button
            onClick={() => navigate('/results')}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            ← Back to Results
          </button>
        </div>
      </div>

      {/* Dataset Overview */}
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Dataset Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#1A6B8E]">
              {dataset_info.shape.rows.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Total Rows</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {dataset_info.shape.columns}
            </div>
            <div className="text-sm text-slate-600">Total Columns</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">
              {analysisData.numeric_columns?.length || 0}
            </div>
            <div className="text-sm text-slate-600">Numeric Features</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">
              {analysisData.categorical_columns?.length || 0}
            </div>
            <div className="text-sm text-slate-600">Categorical Features</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="flex space-x-1 p-2 bg-gray-100 rounded-t-xl">
          {['overview', 'distributions', 'correlations', 'target'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-[#1A6B8E] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Missing Values */}
              {missingValuesData.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-slate-700 mb-3">Missing Values</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={missingValuesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="column" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="missing" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Numeric Summary Table */}
              {Object.keys(numeric_summary || {}).length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-slate-700 mb-3">Numeric Features Summary</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-slate-200 rounded-lg">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Feature</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Mean</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Median</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Std Dev</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Min</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Max</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {Object.entries(numeric_summary).slice(0, 10).map(([col, stats]) => (
                          <tr key={col}>
                            <td className="px-4 py-2 text-sm font-medium text-slate-900">{col}</td>
                            <td className="px-4 py-2 text-sm text-slate-600">{stats.mean?.toFixed(2) || 'N/A'}</td>
                            <td className="px-4 py-2 text-sm text-slate-600">{stats.median?.toFixed(2) || 'N/A'}</td>
                            <td className="px-4 py-2 text-sm text-slate-600">{stats.std?.toFixed(2) || 'N/A'}</td>
                            <td className="px-4 py-2 text-sm text-slate-600">{stats.min?.toFixed(2) || 'N/A'}</td>
                            <td className="px-4 py-2 text-sm text-slate-600">{stats.max?.toFixed(2) || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Distributions Tab */}
          {activeTab === 'distributions' && (
            <div className="space-y-6">
              {/* Feature Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Feature to Visualize
                </label>
                <select
                  value={selectedFeature || ''}
                  onChange={(e) => setSelectedFeature(e.target.value)}
                  className="w-full md:w-64 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A6B8E]"
                >
                  <option value="">Choose a feature...</option>
                  {analysisData.numeric_columns?.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                  {analysisData.categorical_columns?.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              {/* Feature Distribution Chart */}
              {selectedFeature && getFeatureDistData().length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-slate-700 mb-3">
                    Distribution: {selectedFeature}
                  </h4>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={getFeatureDistData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey={feature_distributions[selectedFeature] ? "range" : "category"} 
                        angle={-45} 
                        textAnchor="end" 
                        height={100}
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#1A6B8E" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Box Plots */}
              {box_plot_data && Object.keys(box_plot_data).length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-slate-700 mb-3">Box Plot Statistics</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(box_plot_data).slice(0, 6).map(([col, stats]) => (
                      <div key={col} className="bg-slate-50 p-4 rounded-lg border">
                        <div className="font-medium text-slate-700 mb-2">{col}</div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Min:</span>
                            <span className="font-medium">{stats.min.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Q1:</span>
                            <span className="font-medium">{stats.q1.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Median:</span>
                            <span className="font-medium">{stats.median.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Q3:</span>
                            <span className="font-medium">{stats.q3.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Max:</span>
                            <span className="font-medium">{stats.max.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Outliers:</span>
                            <span className="font-medium">{stats.outliers.length}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Correlations Tab */}
          {activeTab === 'correlations' && (
            <div className="space-y-6">
              {correlation_matrix && correlation_matrix.data && (
                <>
                  <div>
                    <h4 className="text-md font-semibold text-slate-700 mb-3">Top Feature Correlations</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-slate-200 rounded-lg">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Feature 1</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Feature 2</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Correlation</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Strength</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {getTopCorrelations().map((corr, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-2 text-sm text-slate-900">{corr.feature1}</td>
                              <td className="px-4 py-2 text-sm text-slate-900">{corr.feature2}</td>
                              <td className="px-4 py-2 text-sm">
                                <span className={`font-medium ${
                                  Math.abs(corr.correlation) > 0.7 ? 'text-red-600' :
                                  Math.abs(corr.correlation) > 0.4 ? 'text-orange-600' :
                                  'text-green-600'
                                }`}>
                                  {corr.correlation.toFixed(3)}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-sm text-slate-600">
                                {Math.abs(corr.correlation) > 0.7 ? 'Strong' :
                                 Math.abs(corr.correlation) > 0.4 ? 'Moderate' : 'Weak'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Scatter Plots for Correlations */}
                  {scatter_data && scatter_data.length > 0 && (
                    <div>
                      <h4 className="text-md font-semibold text-slate-700 mb-3">Feature vs Target Scatter Plots</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        {scatter_data.map((data, idx) => (
                          <div key={idx}>
                            <div className="text-sm font-medium text-slate-600 mb-2">
                              {data.feature} vs {targetColumn}
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                              <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" name={data.feature} />
                                <YAxis dataKey="y" name={targetColumn} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter 
                                  data={data.x.map((x, i) => ({ x, y: data.y[i] }))} 
                                  fill="#1A6B8E" 
                                />
                              </ScatterChart>
                            </ResponsiveContainer>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Target Tab */}
          {activeTab === 'target' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold text-slate-700 mb-3">
                  Target Variable: {targetColumn}
                </h4>
                <div className="bg-slate-50 p-4 rounded-lg mb-4">
                  <div className="text-sm text-slate-600">
                    Type: <span className="font-medium text-slate-900">
                      {target_distribution?.type || 'Unknown'}
                    </span>
                  </div>
                </div>

                {/* Target Distribution Chart */}
                {target_distribution?.type === 'classification' && targetChartData.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div>
                      <h5 className="text-sm font-medium text-slate-600 mb-2">Class Distribution (Pie Chart)</h5>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={targetChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {targetChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div>
                      <h5 className="text-sm font-medium text-slate-600 mb-2">Class Distribution (Bar Chart)</h5>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={targetChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#1A6B8E" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Regression Target Stats */}
                {target_distribution?.type === 'regression' && target_distribution?.stats && (
                  <div>
                    <h5 className="text-sm font-medium text-slate-600 mb-3">Target Statistics</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {Object.entries(target_distribution.stats).map(([key, value]) => (
                        <div key={key} className="bg-slate-50 p-3 rounded-lg border">
                          <div className="text-xs text-slate-600 uppercase">{key}</div>
                          <div className="text-lg font-bold text-[#1A6B8E]">
                            {value.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categorical Target */}
                {target_distribution?.type === 'categorical' && targetChartData.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-slate-600 mb-2">Category Distribution</h5>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={targetChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#1A6B8E">
                          {targetChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Class Balance Analysis */}
                {targetChartData.length > 0 && (
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-slate-600 mb-3">Class Balance Analysis</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-slate-200 rounded-lg">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Class</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Count</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Percentage</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Visual</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {targetChartData.map((item, idx) => {
                            const total = targetChartData.reduce((sum, d) => sum + d.value, 0);
                            const percentage = ((item.value / total) * 100).toFixed(1);
                            return (
                              <tr key={idx}>
                                <td className="px-4 py-2 text-sm font-medium text-slate-900">{item.name}</td>
                                <td className="px-4 py-2 text-sm text-slate-600">{item.value.toLocaleString()}</td>
                                <td className="px-4 py-2 text-sm text-slate-600">{percentage}%</td>
                                <td className="px-4 py-2">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-[#1A6B8E] h-2 rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#1A6B8E] text-white rounded-lg hover:bg-[#155a7a] transition-colors"
          >
            Print Report
          </button>
          <button
            onClick={() => {
              const dataStr = JSON.stringify(analysisData, null, 2);
              const dataBlob = new Blob([dataStr], { type: 'application/json' });
              const url = window.URL.createObjectURL(dataBlob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'visual_analysis_data.json';
              a.click();
            }}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Download Analysis Data
          </button>
          <button
            onClick={() => navigate('/results')}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Back to Results
          </button>
        </div>
      </div>
    </div>
  );
}