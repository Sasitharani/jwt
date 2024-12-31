import React from 'react';
import { Link } from 'react-router-dom';

const User = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">User Page</h2>
                <p>Welcome to the user page!</p>
                <Link to="/upload-img">Upload Image</Link>
            </div>
        </div>
    );
};

export default User;