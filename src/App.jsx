import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Pass from './Pass';
import './index.css'; // Import Tailwind CSS

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pass" element={<Pass />} />
            </Routes>
        </Router>
    );
};

export default App;
