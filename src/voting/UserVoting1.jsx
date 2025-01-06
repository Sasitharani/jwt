import React, { useState, useEffect } from 'react';

function UserVoting1() {
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://jwt-rj8s.onrender.com/api/get-images-vote1');
        const data = await response.json();
        setCurrentImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>User Voting</h1>
      {currentImages.length > 0 ? (
        <ul>
          {currentImages.map((image, index) => (
            <li key={index}>
              <img src={`https://contests4all.com/${image.path}`} alt={`Image ${index}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No images available for voting.</p>
      )}
    </div>
  );
}

export default UserVoting1;