import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

const Pass = () => {
    const [password, setPassword] = useState('');
    const [userInput, setUserInput] = useState('');
    const [hashedPassword, setHashedPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleHashPassword = async () => {
        const saltRounds = 8;
        const hash =  bcrypt.hashSync(password, saltRounds);
        setHashedPassword(hash);
        setMessage('Password hashed successfully!');
    };

    const handleComparePassword = async () => {
        const isMatch = bcrypt.compareSync(userInput, hashedPassword);
        setMessage(isMatch ? 'Passwords match!' : 'Passwords do not match.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Bcrypt Demo</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Enter Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                        onClick={handleHashPassword}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    >
                        Hash Password
                    </button>
                </div>
                {hashedPassword && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userInput">
                            Enter Password to Compare
                        </label>
                        <input
                            type="password"
                            id="userInput"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button
                            onClick={handleComparePassword}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                        >
                            Compare Password
                        </button>
                    </div>
                )}
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Pass;