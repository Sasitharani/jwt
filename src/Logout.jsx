import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Logout = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>Welcome, you are logged in!</h1>
            <LogoutButton />
            {/* ...other component code... */}
        </div>
    );
};

export default Logout;
