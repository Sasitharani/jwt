import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Import Line from react-chartjs-2

const ConsolePage = () => {
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('https://jwt-rj8s.onrender.com/api/logs');
        setLogs(response.data);
        const timestamps = response.data.map(log => new Date(log.timestamp).toLocaleTimeString());
        const dataPoints = response.data.map((_, index) => index + 1);
        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: 'Logs',
              data: dataPoints,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 60000); // Fetch logs every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h1>Console Logs</h1>
      <Line data={chartData} />
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            [{new Date(log.timestamp).toLocaleString()}] [{log.type}] {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsolePage;
