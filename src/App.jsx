import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import Signup from './Signup';
import Login from './Login';
import Pass from './Pass';
import User from './User';
import './index.css'; // Import Tailwind CSS
import './tailwind.css';
import GoogleLoginPage from './GoogleLoginPage';
import Header from './components/Header';
import Subscription from './components/Subscription';
import Payment from './components/Payment';

const PrivateRoute = ({ element, ...rest }) => {
  const user = useSelector(state => state.user);
  return user.isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header /> {/* Include the Header component */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Set GoogleLoginPage as the home page */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<PrivateRoute element={<User />} />} />
          <Route path="/subscription" element={<PrivateRoute element={<Subscription />} />} />
          <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
