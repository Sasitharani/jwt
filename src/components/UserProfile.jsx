import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const { username, email, likesUsed } = useSelector((state) => state.user);
    const votesData = useSelector(state => state.user.votesData); // Get votesData from slice
    console.log('votesData:', votesData); // Log votesData

    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold">Username:</label>
                    <p className="text-gray-900 text-lg">{username}</p>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold">E-Mail:</label>
                    <p className="text-gray-900 text-lg">{email}</p>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold">Votes Used:</label>
                    {Array.isArray(votesData) && votesData.map((vote, index) => (
                        <p key={index} className="text-gray-900 text-lg">{vote.LikesUsed}</p>
                    ))}
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Currently Running Contest</h2>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Image Contest</h3>
                        <div className="space-y-2">
                            <Link to="/uploadImage" className="block text-blue-500 hover:underline">Submit an Image for the Contest</Link>
                            <Link to="/voting/UserVoting1" className="block text-blue-500 hover:underline">Vote for the Image using your Likes</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
