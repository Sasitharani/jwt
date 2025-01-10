import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const { username, email, likesUsed } = useSelector((state) => state.user);
    const votesData = useSelector(state => state.user.votesData); // Get votesData from slice
    console.log('votesData:', votesData); // Log votesData

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                <div className="mb-4">
                    <label className="block text-gray-700">Username:</label>
                    <p className="text-gray-900">{username}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">E-Mail:</label>
                    <p className="text-gray-900">{email}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Votes Data:</label>
                    {Array.isArray(votesData) && votesData.map((vote, index) => (
                        <p key={index} className="text-gray-900">{`Votes Used: ${vote.LikesUsed}`}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
