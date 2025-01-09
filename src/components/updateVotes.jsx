import React from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

const UpdateVotesButton = () => {
    const handleClick = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/updateVotes');
            swal('Success', response.data, 'success');
        } catch (error) {
            swal('Error', error.response.data, 'error');
        }
    };

    return (
        <button onClick={handleClick}>
            Update Votes
        </button>
    );
};

export default UpdateVotesButton;
