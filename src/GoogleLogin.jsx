import React, { useState } from 'react'; // Import useState
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider, signInWithPopup } from './firebase';
import axios from 'axios';
import Swal from 'sweetalert2';
import { login, loginSuccess } from './store/userSlice'; // Import loginSuccess

const updateVotes = async (username, email, fetchVotesDetails) => {
  try {
    const response = await axios.post('https://jwt-rj8s.onrender.com/api/updateVotes', {
      username,
      email
    });
    await fetchVotesDetails(); // Call fetchVotesDetails after updateVotes
    console.log('Response in updateVotes:', response.data.LikesUsed);
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

const fetchVotesDetails = async (username, email, setVotesData, dispatch) => {
  try {
    const response = await axios.post('https://jwt-rj8s.onrender.com/api/fetchVotesDetails', {
      username,
      email
    });
    setVotesData(response.data);
    console.log('Response in fetchVotesDetails:', response.data);
    const likesUsed = response.data.map(vote => vote.LikesUsed);
    console.log('LikesUsed:', likesUsed);
    dispatch(loginSuccess({ username, email, votesData: response.data }));
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

const GoogleLogin = ({ setLoading, setMessage, dispatch, navigate }) => {
  const [votesData, setVotesData] = useState([]); // Add votesData state

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
    console.log('handleGoogleLogin called');
    try {
      const loginResponse = await axios.post('https://jwt-rj8s.onrender.com/api/google-login', {
        email,
        name: displayName
      });

      if (loginResponse.status === 200) {
        const { token } = loginResponse.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', displayName);
        localStorage.setItem('email', email);
        dispatch(login({ username: displayName, email, token }));
        await updateVotes(displayName, email, () => fetchVotesDetails(displayName, email, setVotesData, dispatch)); // Call updateVotes after login
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
      throw error;
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
