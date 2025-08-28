const makeModelCode = (model) => {
const name = model?.name || 'XGBoostClassifier';
let modelImport = "from xgboost import XGBClassifier";
let modelDef = "XGBClassifier(n_estimators=300, learning_rate=0.05, max_depth=6, subsample=0.9, colsample_bytree=0.8, random_state=42)";


if (name.includes('RandomForest')) {
modelImport = 'from sklearn.ensemble import RandomForestClassifier';
modelDef = 'RandomForestClassifier(n_estimators=300, random_state=42)';
} else if (name.includes('LogisticRegression')) {
modelImport = 'from sklearn.linear_model import LogisticRegression';
modelDef = 'LogisticRegression(max_iter=300)';
} else if (name.toLowerCase().includes('svm') || name.includes('SVM')) {
modelImport = 'from sklearn.svm import SVC';
modelDef = "SVC(kernel='rbf', C=2.0, probability=True)";
}


return `# Auto-AI Exported Pipeline\n\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, classification_report\n${modelImport}\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\n\n# Load your preprocessed dataset\ndata = pd.read_csv('preprocessed_dataset.csv')\nX = data.drop('target', axis=1)\ny = data['target']\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nnumeric_features = X.select_dtypes(include=['int64','float64']).columns\npreprocess = ColumnTransformer([('num', StandardScaler(), numeric_features)], remainder='passthrough')\n\nmodel = ${modelDef}\n\npipe = Pipeline([('prep', preprocess), ('model', model)])\n\npipe.fit(X_train, y_train)\n\npreds = pipe.predict(X_test)\nprint('Accuracy:', accuracy_score(y_test, preds))\nprint(classification_report(y_test, preds))\n\nimport joblib\njoblib.dump(pipe, 'auto_ai_model.pkl')\n`;
};


export default makeModelCode;