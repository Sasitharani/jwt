import React, { useState } from 'react';
import axios from 'axios';



const EmailAuthentication = ({ email,emailAvailable, setEmail, setEmailAvailable, setEmailMessage, validateForm,emailMessage,setLoading,loading }) => {
  

    const checkEmailAvailability = async () => {
        setLoading(true);
        console.log('loading in email component:-', loading)   
        setEmailMessage(""); // Clear email message
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
            setEmailMessage('Error checking email.');
        } finally {
            //setLoading(false);
        }
    };

    
    const handleEmailChange = (e) => { // New code: Handle email change event
        setEmail(e.target.value);
        setEmailMessage(""); // Clear email message
        validateForm();
    };

    const handleEmailBlur = (e) => { // Handle email blur event
        checkEmailAvailability();
        validateForm();
    };

    return (
        <div>
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
        </div>
    );
};

export default EmailAuthentication;