import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AllUpload.css';

const AllUploads = () => {
  const [images, setImages] = useState([]);
  const [checkedImages, setCheckedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const imagesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://jwt-rj8s.onrender.com/api/images');
        const data = await response.json();
        console.log('All Images from FTP:', data.map(image => ({ name: image.name, url: image.url }))); // Log all images with name and URL
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
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

  const handleDeleteClick = async (imageUrl) => {
    setLoading(true);
    try {
      const response = await fetch('https://jwt-rj8s.onrender.com/api/delete-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: imageUrl }),
      });

      if (response.ok) {
        setImages(prevImages => prevImages.filter(image => image.url !== imageUrl));
        Swal.fire('Success', 'Image deleted successfully.', 'success');
      } else {
        console.error('Error deleting image');
        Swal.fire('Error', 'Error deleting image.', 'error');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      Swal.fire('Error', 'Error deleting image.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVoteClick = () => {
    navigate('/voting/vote', { state: { checkedImages } });
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  console.log('Current Images:', currentImages.map(image => ({ name: image.name, url: image.url }))); // Log current images with name and URL

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="image-gallery relative 10">
      <h2 className='text-6xl m-5 bg-red-200 opacity-35 rounded-2xl border-2 border-red-600 p-4'>All Images from FTP</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentImages.map((image, index) => (
          <div key={index} className="image-row flex flex-col items-center">
            <div className="image-column flex items-center justify-center">
              <img src={`https://contests4all.com/${image.url}`} alt={image.name} className="image object-contain" />
            </div>
            <div className="checkbox-column mt-2">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(image.url)}
              />
            </div>
            <button
              onClick={() => handleDeleteClick(image.url)}
              className="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loader border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin mr-2"></div>
                  Deleting...
                </div>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(images.length / imagesPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      <button onClick={handleVoteClick} className="vote-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">  
       Send to Vote
      </button>
    </div>
  );
};

export default AllUploads;
