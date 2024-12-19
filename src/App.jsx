import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Signup from './Signup';
import Login from './Login';
import Pass from './Pass';
import User from './User';
import Logout from './Logout';
import './index.css'; // Import Tailwind CSS
import './tailwind.css';
import GoogleLoginPage from './GoogleLoginPage';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<GoogleLoginPage />} /> {/* Set GoogleLoginPage as the home page */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/pass" element={<Pass />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
