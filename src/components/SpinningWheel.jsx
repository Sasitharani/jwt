import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const SpinningWheel = () => {
  const numbers = [2, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

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
        window.location.reload(); // Refresh the page after the alert is closed
      });

      // Send result to the server
      axios.post('/api/spinWheelLike', { email: 'user@example.com', result: numbers[randomIndex] })
        .then(response => {
          console.log('Likes updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating likes:', error);
        });
    }, 5000); // Assume 5 seconds for the wheel to stop
  };

  const handleClick = () => {
    if (!spinning) {
      spinWheel();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative', flexDirection: 'column' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <div style={{ width: '15%', height: '100vh', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Advertisement Space</p>
        </div>
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
          <div style={{ marginTop: '20px', width: '100%', maxWidth: '300px', height: '100px', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>Advertisement Space</p>
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
