import React, { useEffect } from 'react';
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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        handleClick();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <button onClick={handleClick} className="btn btn-primary">
      Create User Session DB
    </button>
  );
};

export default CreateUserSessionButton;
