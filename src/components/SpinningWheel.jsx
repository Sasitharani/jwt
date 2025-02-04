import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector

const SpinningWheel = () => {
  const numbers = [0, 2, 4, 30, 10, 20, 4, 6, 50, 1, 100]; // Updated values
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);
  const email = localStorage.getItem('email'); // Ensure email is defined
  const [lastSpinTime, setLastSpinTime] = useState(null);
  const [countdown, setCountdown] = useState('');
  const role = useSelector((state) => state.user.role); // Get role from Redux store
  const votesBefore = useSelector((state) => state.user.votesAvailable); // Get votes from Redux store
  const [votesAfter, setVotesAfter] = useState(votesBefore);

  useEffect(() => {
    const storedLastSpinTime = localStorage.getItem('lastSpinTime');
    if (storedLastSpinTime) {
      setLastSpinTime(new Date(storedLastSpinTime));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSpinTime && role !== 'admin') {
        const now = new Date();
        const timeDiff = (lastSpinTime.getTime() + 30 * 60 * 1000) - now.getTime(); // 30 minutes
        if (timeDiff > 0) {
          const minutes = Math.floor(timeDiff / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setCountdown(`${minutes}m ${seconds}s`);
        } else {
          setCountdown('');
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSpinTime, role]);

  const canSpin = () => {
    if (role === 'admin') return true;
    if (!lastSpinTime) return true;
    const now = new Date();
    const minutesSinceLastSpin = (now - lastSpinTime) / (1000 * 60);
    return minutesSinceLastSpin >= 30; // 30 minutes
  };

  const spinWheel = () => {
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const degree = (randomIndex * (360 / numbers.length)) + 3600; // Spin multiple times
    wheelRef.current.style.transform = `rotate(${degree}deg)`;
    setTimeout(() => {
      setSpinning(false);
      setResult(numbers[randomIndex]);
      Swal.fire({
        title: 'Result',
        text: `You got ${numbers[randomIndex]}`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload(); // Reload the page
      });

      // Send result to the server
      console.log('Sending result to the server:', numbers[randomIndex]);
      console.log('Before axios.post request');
      console.log('Email:', email); // Log email to ensure it is defined

      try { axios.post('https://jwt-rj8s.onrender.com/api/spinWheel', { email: email, result: numbers[randomIndex], lastSpinTime: lastSpinTime })
       
          .then(response => {
            console.log('spinWheel result updated successfully:', response.data);
            console.log('Response data:', response.data);
            setVotesAfter(response.data.maxLikes); // Update votes after spin
          })
          .catch(error => {
            console.error('Error updating result:', error);
          });
      } catch (error) {
        console.error('Error before axios.post request:', error);
      }

      console.log('After axios.post request');
      localStorage.setItem('lastSpinTime', new Date().toISOString());
      setLastSpinTime(new Date());
    }, 5000); // Assume 5 seconds for the wheel to stop
  };

  const handleClick = () => {
    if (!spinning && canSpin()) {
      spinWheel();
    } else if (!canSpin()) {
      Swal.fire({
        title: 'Wait',
        text: 'You can spin the wheel only once every half an hour.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative', flexDirection: 'column' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <div style={{ width: '15%', height: '100vh', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Advertisement Space</p>
        </div>
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div>
            <h3>Votes Available: {votesBefore && votesBefore.length > 0 ? votesBefore[0] : 0}</h3>
          </div>
        <div 
            ref={wheelRef} 
            onClick={handleClick} 
            style={{ 
              width: '100%', 
              maxWidth: '300px', 
              height: '100%', 
              maxHeight: '300px', 
              borderRadius: '50%', 
              border: '5px solid black', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              transition: 'transform 5s ease-out',
              position: 'relative',
              background: 'conic-gradient(from 0deg, #ff9999 0deg 32.73deg, #ffcc99 32.73deg 65.45deg, #ffff99 65.45deg 98.18deg, #ccff99 98.18deg 130.91deg, #99ff99 130.91deg 163.64deg, #99ffcc 163.64deg 196.36deg, #99ffff 196.36deg 229.09deg, #99ccff 229.09deg 261.82deg, #9999ff 261.82deg 294.55deg, #cc99ff 294.55deg 327.27deg, #ff99ff 327.27deg 360deg)' // 11 colors
            }}
          >
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: 'red', 
              borderRadius: '50%', 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)' 
            }}></div>
            {numbers.map((number, index) => (
              <div 
                key={index} 
                style={{ 
                  position: 'absolute', 
                  transform: `rotate(${index * (360 / numbers.length)}deg) translate(130px)`, 
                  transformOrigin: 'center',
                  color: '#333', // Darker color for better contrast
                  fontWeight: 'bold'
                }}
              >
                {number}
              </div>
            ))}
          </div>
          {result !== null && (
            <div style={{ marginTop: '20px', fontSize: '24px' }}>
              Result: {result}
            </div>
          )}
          {countdown && (
            <div style={{ marginTop: '20px', fontSize: '18px', color: 'red' }}>
              Next spin available in: {countdown}
            </div>
          )}
          <div style={{ marginTop: '20px', width: '100%', maxWidth: '300px', height: '100px', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>Advertisement Space</p>
          </div>
          <div>
            {/* <h3>Votes After Spin: {votesAfter}</h3> */}
          </div>
        </div>
        <div style={{ width: '15%', height: '100vh', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Advertisement Space</p>
        </div>
      </div>
    </div>
  );
};

export default SpinningWheel;
