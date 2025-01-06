import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllUpload.css';

const AllUploads = () => {
  const [images, setImages] = useState([]);
  const [checkedImages, setCheckedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch images from the server
    fetch('https://jwt-rj8s.onrender.com/api/images')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const handleCheckboxChange = (imageUrl) => {
    setCheckedImages(prevCheckedImages => {
      if (prevCheckedImages.includes(imageUrl)) {
        return prevCheckedImages.filter(url => url !== imageUrl);
      } else {
        return [...prevCheckedImages, imageUrl];
      }
    });
  };

  const handleVoteClick = () => {
    navigate('/voting/vote', { state: { checkedImages } });
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  console.log('currentImages', currentImages);  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="image-gallery relative 10">
      <div>Images</div>
      {currentImages.map((image, index) => (
        <div key={index} className="image-row">
          <div className="image-column">
            <img src={`https://contests4all.com/${image.url}`} alt={image.name} className="image" />
          </div>
          <div className="checkbox-column">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(image.url)}
            />
          </div>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: Math.ceil(images.length / imagesPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      <button onClick={handleVoteClick} className="vote-button">
        Vote
      </button>
    </div>
  );
};

export default AllUploads;
