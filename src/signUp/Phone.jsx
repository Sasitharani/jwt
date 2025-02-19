import React, { useState } from 'react';
import axios from 'axios';

const PhoneNumberVerification = ({ phoneNumber, setPhoneNumber, setPhoneNumberAvailable, setPhoneNumberMessage, validateForm }) => {
    const [loading, setLoading] = useState(false);

    const checkPhoneNumberAvailability = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://contest-nda5.onrender.com/check-phone', { phoneNumber });
            setPhoneNumberAvailable(response.data.available);
            if (!response.data.available) {
                validateForm();
                setPhoneNumberMessage('Phone number is already taken.');
            } else {
                setPhoneNumberMessage('Phone number available');
                validateForm();
            }
        } catch (error) {
            setPhoneNumberMessage('Error checking phone number.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <label>Phone Number:</label>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={checkPhoneNumberAvailability}
            />
            {loading && <p>Checking phone number...</p>}
        </div>
    );
};

export default PhoneNumberVerification;