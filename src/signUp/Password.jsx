import React from 'react';

const PasswordVerification = ({ password, setPassword, passwordError, setPasswordError,setIsPasswordValid,IsPasswordForm }) => {
  const validatePassword = (password) => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter.');
        } else if (!/[a-z]/.test(password)) {
            setPasswordError('Password must contain at least one lowercase letter.');
        } else if (!/[0-9]/.test(password)) {
            setPasswordError('Password must contain at least one digit.');
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setPasswordError('Password must contain at least one special character.');
        } else {
            setPasswordError('');
            
        }
    };

const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        if (!validatePassword(password)) {
            setIsPasswordValid(true);
        } else {
            setPasswordError(false);
            console.log(passwordError)
        }
       
    };
    

    return (
        <div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
                    </div>
        </div>
    );
};

export default PasswordVerification;