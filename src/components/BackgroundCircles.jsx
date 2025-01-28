import React from 'react';
import './BackgroundCircles.css'; // Import the CSS file
const BackgroundCircles = () => {
    return (
        <div className="absolute inset-0 z-0 background-circles" >
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ filter: 'blur(4px)' }}>
                <path fill="#BBDFDF" fillOpacity="1" d="M0,64L48,74.7C96,85,192,107,288,106.7C384,107,480,85,576,101.3C672,117,768,171,864,186.7C960,203,1056,181,1152,154.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <div className="absolute w-44 h-44 bg-gradient-to-b from-greenPastel to-pinkPastel rounded-full border-t-4 border-white shadow-lg shadow-black mt-24 ml-96 opacity-100" style={{ filter: 'blur(2px)' }}></div>
            <div className="absolute w-52 h-52 bg-gradient-to-r from-orangePastel2 to-greenPastel rounded-full border-t-4 border-white shadow-lg shadow-black mt-40 ml-[900px] opacity-100" style={{ filter: 'blur(4px)' }}></div>
            <div className="absolute w-24 h-24 bg-gradient-to-b from-greenPastel to-pinkPastel rounded-full border-t-4 border-white shadow-lg shadow-black mt-96 ml-96 opacity-100" style={{ filter: 'blur(5px)', background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 70%), linear-gradient(to bottom left, greenPastel 10%, pinkPastel 40%, greenPastel 50%)' }}></div>
        </div>
    );
};

export default BackgroundCircles;
