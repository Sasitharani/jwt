import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateVotesButton = () => {
    const handleClick = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/updateVotes');
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
