import React from 'react';

const UsernameAuthentication = ({ username, setUsername, validateForm }) => {
    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); validateForm(); }} // Validate form on username change
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
        </div>
    );
};

export default UsernameAuthentication;