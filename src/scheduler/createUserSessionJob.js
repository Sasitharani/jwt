import axios from 'axios';
import cron from 'node-cron';

const createUserSession = async () => {
  try {
    const response = await axios.post('https://contest-nda5.onrender.com/api/create-user-session-db');
    console.log('User session DB created:', response.data.message);
  } catch (error) {
    console.error('Error creating user session DB:', error);
  }
};

// Schedule the job to run at midnight every day
cron.schedule('0 0 * * *', () => {
  console.log('Running createUserSession job at midnight');
  createUserSession();
});
