import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResetForm, setShowResetForm] = useState(false);
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/check-email', { email });
            console.log('response:', response.data.available);
            if (!response.data.available) {
                const code = generateRandomCode();
                setResetCode(code);
                await sendResetEmail(email, code);
                setMessage('Reset link sent to your email.');
                setShowResetForm(true);
            } else {
                setMessage('This email is not registered with us. Please sign in');
            }
        } catch (error) {
            console.log(error.response);
            setMessage('Error checking email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            setMessage('Password must be at least 8 characters long.');
            return;
        } else if (!/[A-Z]/.test(newPassword)) {
            setMessage('Password must contain at least one uppercase letter.');
            return;
        } else if (!/[a-z]/.test(newPassword)) {
            setMessage('Password must contain at least one lowercase letter.');
            return;
        } else if (!/[0-9]/.test(newPassword)) {
            setMessage('Password must contain at least one digit.');
            return;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            setMessage('Password must contain at least one special character.');
            return;
        } else {
            setMessage('');
        }
    
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        } else {
            setMessage('Passwords matched.');
        }
    
        setLoading(true);
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/reset-password', {
                email,
                newPassword
            });
            console.log('response.status:', response.status);
            console.log('response.data:', response.data);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Password changed successfully!',
                    icon: 'success',
                    confirmButtonText: 'Login',
                    preConfirm: () => {
                        navigate('/login');
                    }
                });
            } else {
                setMessage('Error resetting password. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error resetting password. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const generateRandomCode = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        let code = '';
        for (let i = 0; i < 3; i++) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 2; i++) {
            code += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return code;
    };

    const sendResetEmail = async (email, code) => {
        await axios.post('https://jwt-rj8s.onrender.com/send-reset-email', { email, code });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            {loading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader"></div>
                </div>
            )}
            <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md ${loading ? 'blur-sm' : ''}`}>
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                {!showResetForm ? (
                    <form onSubmit={handleForgotPassword}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Please enter your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                )}
                {message && <p className="mt-4 text-center text-red-500 italic">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;