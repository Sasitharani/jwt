import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const UpdateVotesButton = () => {
    const handleClick = async () => {
        try {
            const response = await axios.post('/api/updateVotes');
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
