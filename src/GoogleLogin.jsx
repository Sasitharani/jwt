import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider, signInWithPopup } from './firebase';
import axios from 'axios';
import Swal from 'sweetalert2';
import { login } from './store/userSlice';

const GoogleLogin = ({ setLoading, setMessage, dispatch, navigate }) => {
  const handleGoogleLogin = async () => {
    setLoading(true); // Set loading to true
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User:', user);
      const { displayName, email } = user;

      await handleDatabaseLogin(email, displayName); // Call the new async function
    } catch (error) {
      console.error('Google login error:', error);
      setMessage('Google login failed. Please try again.');
      Swal.fire({
        title: 'Google Login Failed',
        text: 'Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleDatabaseLogin = async (email, displayName) => {
    try {
      const loginResponse = await axios.post('https://jwt-rj8s.onrender.com/api/google-login', {
        email,
        name: displayName // This is where the username is obtained
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
      console.error('Database login error:', error);
      throw error; // Rethrow the error to be caught in the outer try-catch
    }
  };

  return (
    <button
      type="button"
      className="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-green-600 h-12"
      onClick={handleGoogleLogin} // Ensure this is directly called on button click
    >
      <FcGoogle /> Login with Google
    </button>
  );
};

export default GoogleLogin;
