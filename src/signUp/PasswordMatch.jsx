import React from 'react';

const PasswordMatch = ({ password, matchPassword, setMatchPassword, passwordError, setPasswordError, isPasswordValid, setMatchPasswordVerified }) => {
    const handleMatchPasswordChange = (e) => {
        const matchPassword = e.target.value;
        setMatchPassword(matchPassword);
        if (isPasswordValid) {
            if (matchPassword === password) {
                setPasswordError('Passwords matched');
                setMatchPasswordVerified(true);
            } else {
                setPasswordError('Passwords not matching');
                setMatchPasswordVerified(false);
            }
        } else {
            setPasswordError('Please enter a valid password');
        }
    };

    return (
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="matchPassword">
                Confirm Password
            </label>
            <input
                type="password"
                id="matchPassword"
                value={matchPassword}
                onChange={handleMatchPasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!isPasswordValid}
                required
            />
            {passwordError && <p className="text-red-500 text-xs italic"></p>}
        </div>
    );
};

export default PasswordMatch;