import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import InitialCallPage from './pages/InitialCallPage';
import AmbulancePage from './pages/AmbulancePage';
import HospitalPage from './pages/HospitalPage';

const App = () => {
  return (
    <Router>
        <div className="app">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/initialcall" element={<InitialCallPage />} />
                <Route path="/ambulance/:id" element={<AmbulancePage />} />
                <Route path="/hospital/:id" element={<HospitalPage />} />
            </Routes>
        </div>
    </Router>
);
};

export default App;
