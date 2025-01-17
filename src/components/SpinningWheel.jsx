import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

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
      });
    }, 5000); // Assume 5 seconds for the wheel to stop
  };

  const handleClick = () => {
    if (!spinning) {
      spinWheel();
    }
  };

  return (
    <div>
      <div 
        ref={wheelRef} 
        onClick={handleClick} 
        style={{ 
          width: '300px', 
          height: '300px', 
          borderRadius: '50%', 
          border: '5px solid black', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          transition: 'transform 5s ease-out'
        }}
      >
        {numbers.map((number, index) => (
          <div 
            key={index} 
            style={{ 
              position: 'absolute', 
              transform: `rotate(${index * (360 / numbers.length)}deg) translate(130px)`, 
              transformOrigin: 'center'
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
    </div>
  );
};

export default SpinningWheel;
