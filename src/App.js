import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Signup from './Signup';
import Logout from './Logout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// ...existing code...

const App = () => (
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
                {/* ...other routes... */}
            </Routes>
        </Router>
    </Provider>
);

export default App;
