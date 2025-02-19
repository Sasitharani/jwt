import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlertPage = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('https://contest-nda5.onrender.com/api/logs');
        setAlerts(response.data.filter(log => log.type === 'error'));
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000); // Fetch alerts every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h1>Alerts</h1>
      <ul>
        {alerts && alerts.map(alert => (
          <li key={alert.id}>
            [{new Date(alert.timestamp).toLocaleString()}] [{alert.type}] {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertPage;
