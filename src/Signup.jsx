import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UsernameAuthentication from './signUp/Username';
import EmailAuthentication from './signUp/Email';
import PasswordVerification from './signUp/Password';
import Swal from 'sweetalert2';
import PasswordMatch from './signUp/PasswordMatch';
import LogoutButton from './LogoutButton'; // Import LogoutButton
import { useDispatch } from 'react-redux';
import { login, logout } from './store/userSlice';
import { auth, googleProvider, signInWithPopup } from './firebase';
import GoogleButton from 'react-google-button';
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [emailAvailable, setEmailAvailable] = useState(true); // Add email availability state
    const [passwordError, setPasswordError] = useState(' Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'); // Add password error state
    const [isPasswordValid, setIsPaswordValid] = useState(false); // Add form validity state
    const [isEmailValid, setIsEmailValid] = useState(false); // Add form validity state
    const[EmailMessage, setEmailMessage] = useState(''); // Add email message state
    const [passwordMatch, setPasswordMatch] = useState('');
    const [matchPasswordVerified, setMatchPasswordVerified] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        if (isEmailValid && isPasswordValid && matchPasswordVerified) {
            console.log('Password while submiting', password)
            try {
                const response = await axios.post('https://jwt-rj8s.onrender.com/signup', {
                    username,
                    email,
                    password
                });
                console.log('Response Status:-', response.status);
                // Wait for the database operation to complete
                if (response.status === 200) {
                    setMessage('User registered successfully!');
                    // Automatically log the user in
                    const loginResponse = await axios.post('https://jwt-rj8s.onrender.com/login', {
                        email,
                        password
                    });

                    if (loginResponse.status === 200) {
                        const { token } = loginResponse.data;
                        localStorage.setItem('token', token); // Store token in local storage
                        localStorage.setItem('username', username); // Store username in local storage
                        localStorage.setItem('email', email); // Store email in local storage
                        dispatch(login({ username, email, token })); // Dispatch login action
                        Swal.fire({
                            title: 'Successfully Registered and Logged In!',
                            icon: 'success',
                            confirmButtonText: 'Continue',
                            preConfirm: () => {
                                navigate('/user'); // After successfully login it will navigate to user page; // Redirect to dashboard or desired page
                            }
                        });
                    } else {
                        throw new Error('Login failed after signup');
                    }
                } else {
                    throw new Error('Signup failed');
                }
            } catch (error) {
                setMessage('Signup failed. Please try again.');
                Swal.fire({
                    title: 'Signup Failed',
                    text: 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } finally {
                setLoading(false); // Set loading to false
            }
        }
    };

    const validateForm = () => { // Validate form
        console.log('Validity of Email:-', isEmailValid + 'Validity of Password:-', isPasswordValid);
        if (isEmailValid && isPasswordValid) {
            console.log('Form is valid');
            setIsFormValid(true);
        } else {
            console.log('Form is not valid');
            setIsFormValid(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/login');
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('User:', user);
            const { displayName, email } = user;

            const loginResponse = await axios.post('https://jwt-rj8s.onrender.com/google-login', {
                email,
                name: displayName
            });

            if (loginResponse.status === 200) {
                const { token } = loginResponse.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', displayName);
                localStorage.setItem('email', email);
                dispatch(login({ username: displayName, email, token })); // Dispatch login action
                Swal.fire({
                    title: 'Successfully Logged In with Google!',
                    icon: 'success',
                    confirmButtonText: 'Continue',
                    preConfirm: () => {
                        navigate('/user');
                    }
                });
            } else {
                throw new Error('Google login failed');
            }
        } catch (error) {
            console.error('Google login error:', error);
            setMessage('Google login failed. Please try again.');
            Swal.fire({
                title: 'Google Login Failed',
                text: 'Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            {loading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader text-gray-400"></div>
                    <div className=" text-gray-400">Please wait while we Confirm</div>
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
                        emailMessage={EmailMessage}
                        emailAvailable={emailAvailable}
                        loading={loading}
                        setLoading={setLoading}
                        setIsEmailValid={setIsEmailValid}
                        isEmailValid={isEmailValid}
                    />
                    <PasswordVerification
                        password={password}
                        setPassword={setPassword}
                        passwordError={passwordError}
                        setPasswordError={setPasswordError}
                        setIsPasswordValid={setIsPaswordValid}
                        isPasswordValid={isPasswordValid}
                    />
                    <PasswordMatch
                        password={password}
                        matchPassword={passwordMatch}
                        setMatchPassword={setPasswordMatch}
                        passwordError={passwordError}
                        setPasswordError={setPasswordError}
                        isPasswordValid={isPasswordValid}
                        setMatchPasswordVerified={setMatchPasswordVerified}
                    />
                    <div className="flex items-center justify-between mt-4">
                        <button
                            type="submit"
                            className="font-bold py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 h-12"
                        >
                            Sign Up
                        </button>
                        <div className='font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-green-600 h-12 '>
                        <FcGoogle onClick={handleGoogleLogin} className=''/> Login with Google
                        </div>
                        
                        <div className="flex items-center justify-between m-1 h-12">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 h-12 rounded focus:outline-none focus:shadow-outline"
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