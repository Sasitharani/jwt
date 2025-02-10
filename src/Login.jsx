import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, login, logout } from './store/userSlice'; // Import actions
import BackgroundCircles from './components/BackgroundCircles'; // Import BackgroundCircles
import Swal from 'sweetalert2';

const fetchVotesDetails = async (username, email, dispatch) => {
  try {
    const response = await axios.post('https://jwt-rj8s.onrender.com/api/fetchVotesDetails', {
      username,
      email
    });
    const LikesAvailable = response.data.map(vote => vote.LikesAvailable);
    const firstLikeUsed = response.data.length > 0 ? response.data[0].LikesUsed : null;

    dispatch(loginSuccess({ 
      username, 
      email, 
      votesData: response.data, 
      votesUsed: firstLikeUsed,
      votesAvailable: LikesAvailable // Include LikesAvailable in the payload
    })); // Save firstLikeUsed to Redux store
  } catch (error) {
    console.error('Error in fetchVotesDetails:', error);
    Swal.fire('Error', error.response.data, 'error');
  }
};

const updateVotes = async (username, email, dispatch) => {
  try {
    const response = await axios.post('https://jwt-rj8s.onrender.com/api/updateVotes', {
      username,
      email
    });
    await fetchVotesDetails(username, email, dispatch); // Call fetchVotesDetails after updateVotes
    console.log('Response in updateVotes:', response.data.LikesUsed);
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn); // Get isLoggedIn from slice

    useEffect(() => {
        console.log('Login use effect');
        console.log('isLoggedIn from slice displayed from login.jsx:', isLoggedIn); // Log isLoggedIn value
    }, [isLoggedIn]); // Add useEffect hook;

    const handleLogin1 = async (e) => {
        e.preventDefault();
        console.log("Login form submitted");
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/login', { // Ensure the correct URL and port
                email,
                password
            });
            console.log('Server response:', response.data);
            const hashedPassword = response.data.hashedPassword;
            const username = response.data.username; // Extract username from response
            console.log('Entered email:', email);
            console.log('Entered username:', username);
            console.log('Entered password:', password);
            console.log('Hashed password from server:', hashedPassword);
            const passwordIsValid = await bcrypt.compare(password, hashedPassword);
            console.log('Password match:', passwordIsValid);
            if (passwordIsValid) {
                console.log('Email & Username', email, username);
                setMessage('Login Successfully');
                
                dispatch(login({ email, username })); // Dispatch login success with email and username
                localStorage.setItem('user', JSON.stringify({ email })); // Update local storage
                //await updateVotes(username, email, dispatch); // Call updateVotes after login
                navigate('/user-profile'); // Redirect to UserProfile page
            } else {
                setMessage('Password did not match.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(`Login failed: ${error.response.data.message}`);
            } else {
                setMessage('Login failed. Please try again.');
            }
        } finally {
            setLoading(false); // Set loading to false
        }
    };
    const dispatch = useDispatch();                 

    const handleLogout = () => {
        console.log('Dispatching logout action from Login.jsx');
        dispatch(logout({ meta: { fileName: 'Login.jsx' } })); // Dispatch logout action
        localStorage.removeItem('user'); // Remove user from local storage
        localStorage.removeItem('lastSpinTime'); // Reset last spin time
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orangePastel to-pinkPastel relative">
            <BackgroundCircles />
            {loading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader"></div>
                </div>
            )}
            <div className={`bg-white p-8 shadow-2xl rounded-3xl w-full max-w-md relative ${loading ? 'blur-sm' : ''}`}>
                <h2 className="text-2xl font-bold mb-6 text-center z-20">Login</h2>
                <form onSubmit={handleLogin1}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Please enter your Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                        <GoogleLogin
                            setLoading={setLoading}
                            setMessage={setMessage}
                            dispatch={dispatch}
                            navigate={navigate}
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign Up
                        </button>
                    </div>
                    <Link to="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Forgot Password?
                    </Link>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Login;