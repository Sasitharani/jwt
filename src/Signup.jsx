import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [emailAvailable, setEmailAvailable] = useState(true); // Add email availability state
    const [passwordError, setPasswordError] = useState(''); // Add password error state
    const [isFormValid, setIsFormValid] = useState(false); // Add form validity state
    const [emailMessage, setEmailMessage] = useState(''); // Add email message state
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();
        validateForm(); // Validate form on submit
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/signup', {
                username,
                email,
                password
            });
            setMessage('User registered successfully!');
            navigate('/login'); // Navigate to the login page after successful signup
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const checkEmailAvailability = async () => { // Remove event parameter
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/check-email', { email });
            setEmailAvailable(response.data.available);
            if (!response.data.available) {
                validateForm();
                setEmailMessage('Email is already taken.');
            } else {
               
                setEmailMessage('Email Available');
                validateForm();
            }
        } catch (error) {
            setMessage('Error checking email. Please try again.');
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleEmailChange = (e) => { // New code: Handle email change event
        setEmail(e.target.value);
        setEmailMessage(""); // Clear email message
        validateForm();
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
        } else {
            setPasswordError(false);
            console.log(passwordError)
            validateForm(); // Validate form on password change
        }
       
    };

 const validateForm = () => { // Validate form
    console.log('Validating form');
    if (username && email && emailAvailable && password && !passwordError) {
        console.log('Form is valid');
        setIsFormValid(true);
    } else {
        setIsFormValid(false);
    }
};

    const handleEmailBlur = (e) => { // Handle email blur event
        checkEmailAvailability();
        validateForm();
    };

    const getTooltipMessage = () => { // Get tooltip message
        if (!emailAvailable && passwordError) {
            return 'Check email and password';
        } else if (!emailAvailable) {
            return 'Check email';
        } else if (passwordError) {
            return 'Check password';
        }
        return '';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            {loading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader"></div>
                </div>
            )}
            <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md ${loading ? 'blur-sm' : ''}`}>
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); validateForm(); }} // Validate form on username change
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <div className="flex">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange} // Call handleEmailChange on change
                                onBlur={handleEmailBlur} // Validate email on blur
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            <button
                                type="button"
                                onClick={checkEmailAvailability} // Check email availability on button click
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                            >
                                Check Availability
                            </button>
                        </div>
                        <p className="mt-4 text-center text-red-500">{emailMessage}</p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className={`font-bold py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 text-white'
                                }`}

                            >
                                Sign Up
                            </button>
                  
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Signup;