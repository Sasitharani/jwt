import React, { useState, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';

function UserVoting1() {
  const [currentImages, setCurrentImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://jwt-rj8s.onrender.com/api/get-images-vote1');
        const data = await response.json();
        setCurrentImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleLikeClick = async (image) => {
    try {
      const response = await fetch('https://jwt-rj8s.onrender.com/api/voting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: image.path }),
      });

      if (response.ok) {
        const updatedImages = currentImages.map((img) =>
          img.path === image.path ? { ...img, votes: img.votes + 1 } : img
        );
        setCurrentImages(updatedImages);
      } else {
        console.error('Error updating votes');
      }
    } catch (error) {
      console.error('Error updating votes:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Voting</h1>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          <span className="ml-2">Loading...</span>
        </div>
      ) : currentImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {currentImages.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg bg-white">
              <img
                src={`https://contests4all.com/${image.path}`}
                alt={`Image ${index}`}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => handleImageClick(image)}
              />
              <div className="p-4 flex justify-between items-center">
                <span className="text-gray-700">Image {index + 1}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">No Of Votes: {image.votes}</span>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleLikeClick(image)}
                  >
                    <FaThumbsUp />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No images available for voting.</p>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <img
              src={`https://contests4all.com/${selectedImage.path}`}
              alt="Selected"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserVoting1;