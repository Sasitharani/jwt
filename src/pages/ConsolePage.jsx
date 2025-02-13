import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Import Line from react-chartjs-2
import 'chart.js/auto'; // Import Chart.js

const ConsolePage = () => {
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Logs',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 60000); // Fetch logs every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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

  const deleteLogs = async () => {
    try {
      await axios.delete('https://jwt-rj8s.onrender.com/api/logs');
      setLogs([]);
      setChartData({
        labels: [],
        datasets: [
          {
            label: 'Logs',
            data: [],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1
          }
        ]
      });
    } catch (error) {
      console.error('Error deleting logs:', error);
    }
  };

  // Get current logs
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Console Logs</h1>
      <button onClick={deleteLogs} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">
        Delete All Logs
      </button>
      <Line data={chartData} />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Sr_No</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs && currentLogs.map((log, index) => (
            <tr key={log.Sr_No || index}>
              <td className="border px-4 py-2">{log.Sr_No}</td>
              <td className="border px-4 py-2">{log.Date}</td>
              <td className="border px-4 py-2">{log.Time}</td>
              <td className="border px-4 py-2">{log.Message}</td>
              <td className="border px-4 py-2">{log.Type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        logsPerPage={logsPerPage}
        totalLogs={logs.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ logsPerPage, totalLogs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center mt-4">
        {pageNumbers.map(number => (
          <li key={number} className="page-item mx-1">
            <button onClick={() => paginate(number)} className="page-link px-3 py-1 border rounded">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ConsolePage;
