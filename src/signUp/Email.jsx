import React from 'react';
import axios from 'axios';


const EmailAuthentication = ({ email, emailAvailable, setEmail, setEmailAvailable, setEmailMessage, emailMessage, setLoading, loading,isEmailValid,setIsEmailValid }) => {
    const checkEmailAvailability = async () => {
        setLoading(true);
        console.log('Step1: coming to checkEmailAvailability, the value of Loading is :- Now Api will fetch data.the value of loading is ', loading);
        setEmailMessage(""); // Clear email message
        try {
            const response = await axios.post('https://contest-nda5.onrender.com/api/check-email', { email });
            setEmailAvailable(response.data.available);
            console.log("Api worked data received from server: Email check(True/False); Next: Msg in client :-", response.data.available);
            if (!response.data.available) {
                console.log("Msg should be -Email is already taken:-", response.data.available);
                setEmailMessage('Email is already taken.');
            } else {
                console.log("Msg should be -Email Available:-", response.data.available);
                setEmailMessage('Email Available');
                setIsEmailValid(true);
            }

        } catch (error) {
            setEmailMessage('Error checking email.');
        } finally {
            setLoading(false);
           console.log("The value of Loading (True/False) is:-", loading);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailMessage('');
    };

    return (
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={checkEmailAvailability}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
              <button
                type="button"
                onClick={checkEmailAvailability}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Check Email Availability
            </button>
            {loading && <p>Checking email...</p>}
            <p className="text-red-600 font-semibold blink text-center">{emailMessage}</p>
        </div>
    );
};

export default EmailAuthentication;