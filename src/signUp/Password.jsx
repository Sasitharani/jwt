import React from 'react';

const PasswordVerification = ({ password, setPassword, passwordError, setPasswordError }) => {
    const validatePassword = (password) => {
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
        } else {
            setPasswordError('');
        }
    };

    return (
        <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                }}
            />
            {passwordError && <p>{passwordError}</p>}
        </div>
    );
};

export default PasswordVerification;