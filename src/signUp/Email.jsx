import React, { useState } from 'react';
import axios from 'axios';

const EmailAuthentication = ({ email, setEmail, setEmailAvailable, setEmailMessage, validateForm }) => {
    const [loading, setLoading] = useState(false);

    const checkEmailAvailability = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    };

    return (
        <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={checkEmailAvailability}
            />
            {loading && <p>Checking email...</p>}
        </div>
    );
};

export default EmailAuthentication;