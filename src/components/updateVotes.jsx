import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { logout, loginSuccess, login } from '../store/userSlice'; // Import logout and loginSuccess actions

const VotesManager = () => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const email = useSelector(state => state.user.email);
    const [votesData, setVotesData] = useState([]);

    const fetchVotesDetails = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/fetchVotesDetails', {
                username,
                email
            });
            setVotesData(response.data);
            console.log('Response:', response.data);
            dispatch(loginSuccess({ votesData: response.data })); // Save votesData to Redux store
        } catch (error) {
            Swal.fire('Error', error.response.data, 'error');
        }
    };

    const updateVotes = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/updateVotes', {
                username,
                email
            });
            await fetchVotesDetails(); // Call fetchVotesDetails after updateVotes
        } catch (error) {
            Swal.fire('Error', error.response.data, 'error');
        }
    };

    useEffect(() => {
        fetchVotesDetails(); // Fetch votes details initially
    }, [username, email]);

    const totalLikesUsed = votesData.reduce((total, vote) => total + vote.LikesUsed, 0);

    return (
        <div>
            <button className='bg-green-400 text-white rounded-xl border border-gray-900 px-4 py-2' onClick={updateVotes}>
                Cast a Vote  (Likes Used: {totalLikesUsed})
            </button>

            <div className="container mx-auto mt-8">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Sr. No</th>
                            <th className="py-2 px-4 border-b">Username</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Votes Available</th>
                            <th className="py-2 px-4 border-b">Votes Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votesData.map((vote, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{vote.username}</td>
                                <td className="py-2 px-4 border-b">{vote.email}</td>
                                <td className="py-2 px-4 border-b">{vote.MaxLikes}</td>
                                <td className="py-2 px-4 border-b">{vote.LikesUsed}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VotesManager;
