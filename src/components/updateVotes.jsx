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
        <button onClick={handleClick}>
            Update Votes
        </button>
    );
};

export default UpdateVotesButton;
