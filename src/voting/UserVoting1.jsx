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

  // Find the image with the highest number of votes
  const highestVotedImage = currentImages.reduce((max, image) => (image.votes > max.votes ? image : max), currentImages[0]);
  console.log('Highest Voted Image:', highestVotedImage); // Log the highest voted image

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/12 bg-gray-200 p-4 h-screen order-2 lg:order-1">
        <h2 className="text-xl font-bold mb-4">Ads</h2>
        {/* Add your ad content here */}
      </div>
      <div className="lg:w-10/12 p-4 order-1 lg:order-2">
     
<h1 className="text-6xl my-10 font-bold mb-4 text-center font-montserrat">
  Vote for the best image. The image with the highest votes will win Rs 100.
</h1>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            <span className="ml-2">Loading...</span>
          </div>
        ) : currentImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {highestVotedImage && (
              <div className="rounded-lg overflow-hidden shadow-lg bg-white border-4 border-double border-green-500">
                <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://contests4all.com/${highestVotedImage.path}`}
                    alt="Highest Voted"
                    className="object-contain h-full w-full cursor-pointer"
                    onClick={() => handleImageClick(highestVotedImage)}
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-gray-700">Highest Voted Image</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">No Of Votes: {highestVotedImage.votes}</span>
                    <span className="text-green-500 animate-pulse">Current Winner</span>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleLikeClick(highestVotedImage)}
                    >
                      <FaThumbsUp />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {currentImages.map((image, index) => (
              image !== highestVotedImage && (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg bg-white">
                  <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://contests4all.com/${image.path}`}
                      alt={`Image ${index}`}
                      className="object-contain h-full w-full cursor-pointer"
                      onClick={() => handleImageClick(image)}
                    />
                  </div>
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
              )
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
      <div className="lg:w-1/12 bg-gray-200 p-4 h-screen order-3 lg:order-3">
        <h2 className="text-xl font-bold mb-4">Ads</h2>
        {/* Add your ad content here */}
      </div>
    </div>
  );
}

export default UserVoting1;