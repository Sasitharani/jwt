import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './signUp/ForgotPassword';
import Pass from './Pass';
import User from './User';
import UploadImg from './UploadImg'; // Import the UploadImg component
import './index.css'; // Import Tailwind CSS
import './tailwind.css';
import GoogleLoginPage from './GoogleLoginPage';
import Header from './components/Header';
import Subscription from './components/Subscription';
import Payment from './components/Payment';
import ImageGallery from './upload/AllUploads';
import Vote from './voting/Vote';
import AllUploads from './upload/AllUploads';
import UploadImage from './UploadImg'; // Import the UploadImage component
import UserVoting1 from './voting/UserVoting1'; // Import the UserVoting1 component
import CompressImage from './components/CompressImage'; // Import the CompressImage component
import Test from './components/Test';
import DailyAutomation from './components/dailyAutomation'; // Import the DailyAutomation component

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
          <Route path="/" element={<Navigate to="/signup" />} /> {/* Set GoogleLoginPage as the home page */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user" element={<PrivateRoute element={<User />} />} />
          <Route path="/subscription" element={<PrivateRoute element={<Subscription />} />} />
          <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />
          <Route path="/upload-img" element={<UploadImg />} /> {/* Add the UploadImg route */}
          <Route path="/voting/vote" element={<Vote />} /> {/* Add the Vote route */}
          <Route path="/image-gallery" element={<ImageGallery />} /> {/* Add the ImageGallery route */}
          <Route path="/upload/AllUploads" element={<AllUploads />} /> {/* Add the AllUploads route */}
          <Route path="/uploadImage" element={<UploadImage />} /> {/* Add the UploadImage route */}
          <Route path="/voting/UserVoting1" element={<UserVoting1 />} /> {/* Add the UserVoting1 route */}
          <Route path="/compress-image" element={<CompressImage />} /> {/* Add the CompressImage route */}
          <Route path="/test" element={<Test />} />
          <Route path="/dailyAutomation" element={<DailyAutomation />} /> {/* Add the DailyAutomation route */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
