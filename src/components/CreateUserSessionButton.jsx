import React from 'react';
import axios from 'axios';

const CreateUserSessionButton = () => {
  const handleClick = async () => {
    try {
      const response = await axios.post('https://jwt-rj8s.onrender.com/api/create-user-session-db');
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating user session DB:', error);
      alert('Failed to create user session DB');
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-primary">
      Create User Session DB
    </button>
  );
};

export default CreateUserSessionButton;
