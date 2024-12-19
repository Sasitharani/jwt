import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './store/userSlice';
import { auth, googleProvider, signInWithPopup } from './firebase';
import Swal from 'sweetalert2';
import axios from 'axios';
import GoogleButton from 'react-google-button';

const GoogleLoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            Swal.fire({
                title: 'Google Login Failed',
                text: 'Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <GoogleButton
                onClick={handleGoogleLogin}
            />
        </div>
    );
};

export default GoogleLoginPage;
