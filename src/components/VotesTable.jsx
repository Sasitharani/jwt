import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const VotesTable = () => {
    const [votesData, setVotesData] = useState([]);
    const username = useSelector(state => state.user.username);
    const email = useSelector(state => state.user.email);

    useEffect(() => {
        const fetchVotesDetails = async () => {
            try {
                const response = await axios.get('https://jwt-rj8s.onrender.com/api/fetchVotesDetails');
                setVotesData(response.data);
            } catch (error) {
                console.error('Error fetching votes details:', error);
            }
        };

        fetchVotesDetails();
    }, []);

    return (
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
                            <td className="py-2 px-4 border-b">{username}</td>
                            <td className="py-2 px-4 border-b">{email}</td>
                            <td className="py-2 px-4 border-b">{vote.MaxLikes}</td>
                            <td className="py-2 px-4 border-b">{vote.LikesUsed}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VotesTable;
