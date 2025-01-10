import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const UpdateVotesButton = () => {
    const username = useSelector(state => state.user.username);
    const email = useSelector(state => state.user.email);

    const handleClick = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/updateVotes', {
                username,
                email
            });
            Swal.fire('Success', response.data, 'success');
        } catch (error) {
            Swal.fire('Error', error.response.data, 'error');
        }
    };

    return (
        <button className='bg-green-400 text-white rounded-xl border border-gray-900 px-4 py-2' onClick={handleClick}>
            Update Votes and insert first date when table is empty
        </button>
    );
};

const FetchVotesButton = () => {
    const username = useSelector(state => state.user.username);
    const email = useSelector(state => state.user.email);

    const handleClick = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/fetchVotesDetails', {
                username,
                email
            });
            Swal.fire('Success', 'Votes details fetched successfully', 'success');
            console.log('Response:', response.data);
        } catch (error) {
            Swal.fire('Error', error.response.data, 'error');
        }
    };

    return (
        <button className='bg-blue-400 text-white rounded-xl border border-gray-900 px-4 py-2' onClick={handleClick}>
            Fetch Votes Details
        </button>
    );
};

export { UpdateVotesButton, FetchVotesButton };
