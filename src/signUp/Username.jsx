import React from 'react';

const UsernameAuthentication = ({ username, setUsername }) => {
    return (
        <div>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
    );
};

export default UsernameAuthentication;