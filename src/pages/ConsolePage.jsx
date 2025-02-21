import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Import Bar from react-chartjs-2
import 'chart.js/auto'; // Import Chart.js
import Swal from 'sweetalert2'; // Import SweetAlert2

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
        backgroundColor: 'rgba(75,192,192,0.2)', // Add background color for bars
        tension: 0.1
      }
    ]
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const [filter, setFilter] = useState('all');
  const [customFilter, setCustomFilter] = useState({ startDate: '', startTime: '', endDate: '', endTime: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 60000); // Fetch logs every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [filter, customFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://contest-nda5.onrender.com/api/logs');
      let filteredLogs = response.data;

      if (filter !== 'all') {
        const now = new Date();
        let startTime;
        let endTime;

        switch (filter) {
          case 'yesterday':
            startTime = new Date(now);
            startTime.setDate(startTime.getDate() - 1);
            startTime.setHours(0, 0, 0, 0);
            endTime = new Date(startTime);
            endTime.setHours(23, 59, 59, 999);
            break;
          case 'today':
            startTime = new Date(now);
            startTime.setHours(0, 0, 0, 0);
            endTime = new Date(now);
            endTime.setHours(23, 59, 59, 999);
            break;
          case '1hour':
            startTime = new Date(now);
            startTime.setHours(startTime.getHours() - 1);
            endTime = now;
            break;
          case '2hours':
            startTime = new Date(now);
            startTime.setHours(startTime.getHours() - 2);
            endTime = now;
            break;
          case '5mins':
            startTime = new Date(now);
            startTime.setMinutes(startTime.getMinutes() - 5);
            endTime = now;
            break;
          case '10mins':
            startTime = new Date(now);
            startTime.setMinutes(startTime.getMinutes() - 10);
            endTime = now;
            break;
          case '30mins':
            startTime = new Date(now);
            startTime.setMinutes(startTime.getMinutes() - 30);
            endTime = now;
            break;
          case 'custom':
            startTime = customFilter.startDate ? new Date(`${customFilter.startDate}T${customFilter.startTime}`) : null;
            endTime = customFilter.endDate ? new Date(`${customFilter.endDate}T${customFilter.endTime}`) : null;
            if (startTime && !endTime) {
              endTime = new Date(startTime);
              endTime.setHours(23, 59, 59, 999);
            } else if (!startTime && endTime) {
              startTime = new Date(endTime);
              startTime.setHours(0, 0, 0, 0);
            }
            filteredLogs = filteredLogs.filter(log => {
              const logTimestamp = new Date(log.timestamp);
              console.log('Log Timestamp:', logTimestamp);
              return (!startTime || logTimestamp >= startTime) && (!endTime || logTimestamp <= endTime);
            });
            break;
          default:
            startTime = new Date();
        }

        if (filter !== 'custom') {
          filteredLogs = filteredLogs.filter(log => {
            const logTimestamp = new Date(log.timestamp);
            console.log('Log Timestamp:', logTimestamp);
            return logTimestamp >= startTime && logTimestamp <= endTime;
          });
        }
      }

      setLogs(filteredLogs);
      const timestamps = filteredLogs.map(log => new Date(log.timestamp).toLocaleTimeString());
      const dataPoints = filteredLogs.map((_, index) => index + 1);
      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: 'Logs',
            data: dataPoints,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)', // Add background color for bars
            tension: 0.1
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLogs = async () => {
    try {
      await axios.delete('https://contest-nda5.onrender.com/api/logs');
      setLogs([]);
      setChartData({
        labels: [],
        datasets: [
          {
            label: 'Logs',
            data: [],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)', // Add background color for bars
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

  const handleBarClick = (elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const log = logs[index];
      Swal.fire({
        title: 'Log Message',
        text: log.Message,
        icon: 'info',
        confirmButtonText: 'Close'
      });
    }
  };

  return (
    <div>
      <h1>Console Logs</h1>
      <button
        onClick={deleteLogs}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 z-50 relative"
        style={{ position: 'relative', zIndex: 50 }}
      >
        Delete All Logs
      </button>
      <div className="mb-4 relative z-50" style={{ position: 'relative', zIndex: 50 }}>
        <label htmlFor="filter" className="mr-2">Filter:</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="mr-2">
          <option value="all">All</option>
          <option value="yesterday">Yesterday</option>
          <option value="today">Today</option>
          <option value="1hour">Last 1 Hour</option>
          <option value="2hours">Last 2 Hours</option>
          <option value="5mins">Last 5 Minutes</option>
          <option value="10mins">Last 10 Minutes</option>
          <option value="30mins">Last 30 Minutes</option>
          <option value="custom">Custom</option>
        </select>
        {filter === 'custom' && (
          <div className="inline-block">
            <label htmlFor="startDate" className="mr-2">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={customFilter.startDate}
              onChange={(e) => setCustomFilter({ ...customFilter, startDate: e.target.value })}
              className="mr-2"
            />
            <label htmlFor="startTime" className="mr-2">Start Time:</label>
            <input
              type="time"
              id="startTime"
              value={customFilter.startTime}
              onChange={(e) => setCustomFilter({ ...customFilter, startTime: e.target.value })}
              className="mr-2"
            />
            <label htmlFor="endDate" className="mr-2">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={customFilter.endDate}
              onChange={(e) => setCustomFilter({ ...customFilter, endDate: e.target.value })}
              className="mr-2"
            />
            <label htmlFor="endTime" className="mr-2">End Time:</label>
            <input
              type="time"
              id="endTime"
              value={customFilter.endTime}
              onChange={(e) => setCustomFilter({ ...customFilter, endTime: e.target.value })}
            />
          </div>
        )}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <Bar data={chartData} options={{ onClick: (e, elements) => handleBarClick(elements) }} />
      </div>
      {loading ? (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled>
          Loading...
        </button>
      ) : (
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
      )}
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
