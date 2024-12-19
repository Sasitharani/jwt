import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Signup from './Signup';
import Logout from './Logout';
import GoogleLoginPage from './GoogleLoginPage';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// ...existing code...

const App = () => (
    <Provider store={store}>
        <Router>
            <Header /> {/* Include the Header component */}
            <Routes>
                <Route path="/" element={<GoogleLoginPage />} /> {/* Set GoogleLoginPage as the home page */}
                <Route path="/signup" element={<Signup />} />

                {/* ...other routes... */}
            </Routes>
        </Router>
    </Provider>
);

export default App;
