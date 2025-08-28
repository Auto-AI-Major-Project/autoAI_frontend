import React, { createContext, useContext, useState, useMemo } from 'react';
import makeModelCode from '../utils/makeModelCode';


const AppContext = createContext(null);


export function AppProvider({ children }) {
const [datasetName, setDatasetName] = useState('');
const [cleanedReady, setCleanedReady] = useState(false);
const [preprocessedReady, setPreprocessedReady] = useState(false);
const [trainingLog, setTrainingLog] = useState([]);
const [selectedModel, setSelectedModel] = useState(null);
const recommendations = useMemo(() => [
{ name: 'XGBoostClassifier', score: 0.92, time: '2m 10s' },
{ name: 'RandomForest', score: 0.9, time: '1m 25s' },
{ name: 'LogisticRegression', score: 0.86, time: '20s' },
{ name: 'SVM (RBF)', score: 0.88, time: '1m 50s' },
], []);


const [profile, setProfile] = useState({
username: 'virendra',
email: 'virendra@example.com',
password: '',
profession: 'Student – AI & DS',
company: 'MIT College, Chh. Sambhajinagar',
});


const downloadFile = (filename, content, mime = 'text/plain') => {
const blob = new Blob([content], { type: mime });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = filename;
document.body.appendChild(a);
a.click();
a.remove();
URL.revokeObjectURL(url);
};


const downloadCleaned = () => {
const name = `cleaned_${datasetName || 'dataset'}.csv`;
const content = 'id,feature,target\n1,0.54,0\n2,0.78,1\n3,0.12,0\n';
downloadFile(name, content, 'text/csv');
};


const downloadPreprocessed = () => {
const name = `preprocessed_${datasetName || 'dataset'}.csv`;
const content = 'id,f1,f2,f3,target\n1,0.23,0.10,0.91,0\n2,0.44,0.78,0.11,1\n';
downloadFile(name, content, 'text/csv');
};


const downloadModelCode = () => {
const modelName = (selectedModel?.name || 'AutoML').toLowerCase();
const filename = `trained_model_${modelName}.py`;
const content = makeModelCode(selectedModel);
downloadFile(filename, content, 'text/x-python');
};


return (
<AppContext.Provider value={{
datasetName,
setDatasetName,
cleanedReady,
setCleanedReady,
preprocessedReady,
setPreprocessedReady,
trainingLog,
setTrainingLog,
selectedModel,
setSelectedModel,
recommendations,
profile,
setProfile,
downloadCleaned,
downloadPreprocessed,
downloadModelCode,
}}>
{children}
</AppContext.Provider>
);
}


export function useApp() {
return useContext(AppContext);
}