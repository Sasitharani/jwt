import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AllUpload.css';

const AllUploads = () => {
  const [images, setImages] = useState([]);
  const [checkedImages, setCheckedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [filteredImages, setFilteredImages] = useState([]); // State for filtered images
  const imagesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://jwt-rj8s.onrender.com/api/images');
        const data = await response.json();
        const groupedImages = data.map(image => {
          const [time, date, email, ...rest] = image.name.split(/(\d{6})(\d{8})(.*)/).filter(Boolean);
          return { date, name: image.name, url: image.url };
        });

        const formatDate = (date) => {
          const [year, month, day] = date.split('-');
          return `${month}${day}${year}`;
        };

        const today = formatDate(new Date().toISOString().split('T')[0]);
        const yesterday = formatDate(new Date(Date.now() - 86400000).toISOString().split('T')[0]);

        const todayImages = groupedImages.filter(image => image.date === today);
        const yesterdayImages = groupedImages.filter(image => image.date === yesterday);

        
        console.group('Grouped Images');
        console.group('Today');
        console.log(todayImages.map(image => image.name));
        console.groupEnd();
        console.group('Yesterday');
        console.log(yesterdayImages.map(image => image.name));
        console.groupEnd();
        console.group('All');
        console.log(groupedImages.map(image => image.name));
        console.groupEnd();
        console.groupEnd();

        setImages(groupedImages);
        setFilteredImages(groupedImages); // Set initial filtered images to all images
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false); // Set loading to false after images are fetched
      }
    };

    fetchImages();
  }, []);

  const handleFilterClick = (filter) => {
    const formatDate = (date) => {
      const [year, month, day] = date.split('-');
      return `${day}${month}${year}`;
    };

    const today = formatDate(new Date().toISOString().split('T')[0]);
    const yesterday = formatDate(new Date(Date.now() - 86400000).toISOString().split('T')[0]);
    console.log('Today:', today);
    console.log('Yesterday:', yesterday);

    if (filter === 'today') {
      const todayImages = images.filter(image => image.date === today);
      setFilteredImages(todayImages);
      console.log('Today Images:', todayImages.map(image => image.name)); // Log today images
    } else if (filter === 'yesterday') {
      const yesterdayImages = images.filter(image => image.date === yesterday);
      setFilteredImages(yesterdayImages);
      console.log('Yesterday Images:', yesterdayImages.map(image => image.name)); // Log yesterday images
    } else {
      setFilteredImages(images);
      console.log('All Images:', images.map(image => image.name)); // Log all images
    }
  };

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
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);
  console.log('Current Images:', currentImages.map(image => image.name)); // Log current image names

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="image-gallery relative 10">
      {loading && (
        <div className="loading-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="text-white text-lg">
            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 mb-4 animate-spin"></div>
            Loading images, please wait...
          </div>
        </div>
      )}
      <h2 className='text-6xl m-5 bg-red-200 opacity-35 rounded-2xl border-2 border-red-600 p-4'>All Images from FTP</h2>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => handleFilterClick('yesterday')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Yesterday
        </button>
        <button
          onClick={() => handleFilterClick('today')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Today
        </button>
        <button
          onClick={() => handleFilterClick('all')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentImages.map((image, index) => (
          <div key={index} className="image-row flex flex-col items-center">
            <div className="image-column flex items-center justify-center">
              <img src={`https://contests4all.com/${image.url}`} alt={image.name} className="image object-contain" />
            </div>
            <div className="mt-2 text-gray-600">Uploaded Date: {image.date}</div> {/* Show uploaded date */}
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
        {Array.from({ length: Math.ceil(filteredImages.length / imagesPerPage) }, (_, i) => (
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
