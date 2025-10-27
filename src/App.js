import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DataCleaning from './pages/DataCleaning';
import Preprocessing from './pages/Preprocessing';
import ModelSelection from './pages/ModelSelection';
import Training from './pages/Training';
import Results from './pages/Results';
import Visualizations from './pages/Visualizations';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import AutoML from './pages/AutoML';
import VisualAnalysis from './components/VisualAnalysis';


export default function App() {
return (
<Router>
<div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
<Navbar />
<div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/signin" element={<SignIn />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/datacleaning" element={<DataCleaning />} />
<Route path="/preprocessing" element={<Preprocessing />} />
<Route path="/modelselection" element={<ModelSelection />} />
<Route path="/training" element={<Training />} />
<Route path="/results" element={<Results />} />
<Route path="/visualizations" element={<Visualizations />} />
<Route path="/contact" element={<ContactUs />} />
<Route path="/about" element={<AboutUs />} />
<Route path="/profile" element={<Profile />} />
<Route path="/automl" element={<AutoML />} />
<Route path="/visual-analysis" element={<VisualAnalysis />} />
</Routes>
</div>
<Footer />
</div>
</Router>
);
}