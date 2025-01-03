import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ImageGallery.css';

const AllUploads = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;

  useEffect(() => {
    // Fetch images from the server
    fetch('/api/images')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const handleCheckboxChange = (imageName) => {
    // Redirect to Vote page with the image name
    window.location.href = `/voting/vote?image=${imageName}`;
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="image-gallery">
      {currentImages.map((image, index) => (
        <div key={index} className="image-row">
          <div className="image-column">
            <img src={image.url} alt={image.name} className="image" />
          </div>
          <div className="checkbox-column">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(image.name)}
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
    </div>
  );
};

export default AllUploads;
