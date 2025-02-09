import React, { useState, useEffect } from 'react';

const TestCountdown = () => {
  const [countdown, setCountdown] = useState(0); // Countdown in seconds
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown > 0 ? prevCountdown - 1 : 0);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleStart = () => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    setStartTime(now);
  };

  const handleEnd = () => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    setEndTime(now);
    if (startTime) {
      const diff = now - startTime;
      setCountdown(diff);
    }
  };

  return (
    <div className="relative z-50 flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-2xl font-bold mb-4">Countdown Timer</h1>
      <p className="text-xl mb-4">{formatTime(countdown)}</p>
      <div className="space-x-4">
        <button 
          onClick={handleStart} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Start
        </button>
        <button 
          onClick={handleEnd} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          End
        </button>
      </div>
    </div>
  );
};

export default TestCountdown;
