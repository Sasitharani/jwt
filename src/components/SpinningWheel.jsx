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
  const [countdown, setCountdown] = useState(''); // Define countdown state
  const role = useSelector((state) => state.user.role); // Get role from Redux store
  const votesBefore = useSelector((state) => state.user.votesAvailable); // Get votes from Redux store
  const [votesAfter, setVotesAfter] = useState(votesBefore);

  // Fetch lastSpinTime from the server
  useEffect(() => {
    const fetchLastSpinTime = async () => {
      try {
        const response = await axios.post('https://contest-nda5.onrender.com/api/fetchVotesDetails', {
          email
        });
        console.log('lastSpinTime fetched from the database: ',response.data[0].lastSpinTime); 

        if (response.data[0].lastSpinTime) {
          const dbLastSpinTime = response.data[0].lastSpinTime;
          const dbLastSpinTimeInt = dbLastSpinTime.getTime();
          setLastSpinTime(dbLastSpinTimeInt); // Set lastSpinTime from database
        }
      } catch (error) {
        console.error('Error fetching last spin time:', error);
      }
    };
    fetchLastSpinTime();
  }, [email]);

  // This useEffect will only work when the wheel is spun
  useEffect(() => {
    console.log('This useEffect will only work when the wheel is spun');
    console.log('Last Spin time in useEffect when lastSpinTime is set:', lastSpinTime);

    const now = new Date();
    const nowInt = now.getTime(); // Convert now to an integer
    const timeDiff1 = localStorage.getItem('timeDiff');

    console.log('Current Time (int):', nowInt);
    console.log('Stored timeDiff:', timeDiff1); // Console log timeDiff
    let timeDiff;
    if (lastSpinTime) {
      const lastSpinTimeInt = new Date(lastSpinTime).getTime(); // Convert lastSpinTime to an integer
      console.log('Last Spin Time (int):', lastSpinTimeInt);
      timeDiff = nowInt - lastSpinTimeInt;
      console.log('Time Difference:', timeDiff);
      setLastSpinTime(lastSpinTimeInt); // Save lastSpinTime as an integer in the state
    } else {
      timeDiff = 0;
    }
    localStorage.setItem('timeDiff', timeDiff); // Save timeDiff to local storage

    const remainingTime = nowInt - (lastSpinTime ? new Date(lastSpinTime).getTime() : 0);
    if (remainingTime > 0) {
      const minutes = Math.floor(remainingTime / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      setCountdown(`${minutes}m ${seconds}s`);
    } else {
      setCountdown('');
    }
  }, [lastSpinTime]);

  // Set up interval to calculate countdown
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSpinTime && role !== 'admin') {
        console.log('Last spin time in useeffect of countdown:', lastSpinTime);
        console.log('Current time seeffect of countdown::', now.getTime());
        const now = new Date();
        const timeDiff = (lastSpinTime.getTime() + 30 * 60 * 1000) - now.getTime(); // 30 minutes
        if (timeDiff > 0) {
          const minutes = Math.floor(timeDiff / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setCountdown(`${minutes}m ${seconds}s`); // Update countdown
          console.log('countdown:', `${minutes}m ${seconds}s`);

        } else {
          setCountdown(''); // Reset countdown when time is up
          console.log('countdown reset to empty');
          localStorage.removeItem('timeDiff'); // Remove timeDiff from local storage
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSpinTime, role]);

  // Check if the user can spin the wheel
  const canSpin = () => {
    if (role === 'admin') return true; // Admins can always spin the wheel
    if (!lastSpinTime || countdown === '') return true; // Allow spinning if lastSpinTime is not set or countdown is empty
    const now = new Date();
    const minutesSinceLastSpin = (now - lastSpinTime) / (1000 * 60);
    return minutesSinceLastSpin >= 30; // 30 minutes
  };

  // Spin the wheel
  const spinWheel = () => {
    setSpinning(true); // Set spinning state to true
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const degree = (randomIndex * (360 / numbers.length)) + 3600; // Spin multiple times
    wheelRef.current.style.transform = `rotate(${degree}deg)`;
    setTimeout(() => {
      setSpinning(false); // Set spinning state to false
      setResult(numbers[randomIndex]); // Set result

      Swal.fire({
        title: 'Result',
        text: `You got ${numbers[randomIndex]}`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload(); // Reload the page
      });

      // Send result to the server
      try {
        const storedTimeDiff = localStorage.getItem('timeDiff');
        console.log('Stored timeDiff before axios.post:', storedTimeDiff);
        const timeDiff = storedTimeDiff ? parseInt(storedTimeDiff, 10) : null;
        if (!isNaN(timeDiff)) {
          axios.post('https://contest-nda5.onrender.com/api/spinWheel', { email: email, timeDiff: storedTimeDiff, result: numbers[randomIndex], lastSpinTime: new Date().toISOString() })
            .then(response => {
              setVotesAfter(response.data.maxLikes); // Update votes after spin
              localStorage.setItem('timeDiff', response.data.timeDiff); // Save timeDiff to local storage
            })
            .catch(error => {
              console.error('Error updating result:', error);
            });
        } else {
          console.error('Invalid timeDiff:', timeDiff);
        }
      } catch (error) {
        console.error('Error before axios.post request:', error);
      }

      setLastSpinTime(new Date());
    }, 5000); // Assume 5 seconds for the wheel to stop
  };

  // Handle click event
  const handleClick = () => {
    if (!spinning && canSpin()) {
      spinWheel();
    } else if (!canSpin()) {
      Swal.fire({
        title: 'Wait',
        text: `You can spin the wheel only once every half an hour. Next spin available in: ${countdown}`,
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
