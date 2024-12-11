import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UsernameAuthentication from './signUp/Username';
import EmailAuthentication from './signUp/Email';

const Signup = () => {



    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [emailAvailable, setEmailAvailable] = useState(true); // Add email availability state
    const [passwordError, setPasswordError] = useState(''); // Add password error state
    const [isFormValid, setIsFormValid] = useState(false); // Add form validity state
    const[EmailMessage, setEmailMessage] = useState(''); // Add email message state

    const navigate = useNavigate();

    console.log('loading in the begining:-', loading)   

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
            console.log('loading in handleSignup:-', loading)
        }
    };

    // const checkEmailAvailability = async () => { // Remove event parameter
    //     setLoading(true); // Set loading to true
    //     try {
    //         const response = await axios.post('https://jwt-rj8s.onrender.com/check-email', { email });
    //         setEmailAvailable(response.data.available);
    //         if (!response.data.available) {
    //             validateForm();
    //             setEmailMessage('Email is already taken.');
    //         } else {
               
    //             setEmailMessage('Email Available');
    //             validateForm();
    //         }
    //     } catch (error) {
    //         setMessage('Error checking email. Please try again.');
    //     } finally {
    //         setLoading(false); // Set loading to false
    //     }
    // };


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
        // console.log('Form is valid');
        setIsFormValid(true);
    } else {
        setIsFormValid(false);
    }
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
                <UsernameAuthentication username={username} setUsername={setUsername} />
                <EmailAuthentication
                email={email}
                setEmail={setEmail}
                setEmailAvailable={setEmailAvailable}
                setEmailMessage={setEmailMessage}
                emailAvailable={emailAvailable}
                validateForm={validateForm}
                loading={loading}
                setLoading={setLoading}
                />
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