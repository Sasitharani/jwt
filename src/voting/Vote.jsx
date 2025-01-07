import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Vote = () => {
  const location = useLocation();
  const { checkedImages } = location.state || { checkedImages: [] };
  const [loading, setLoading] = useState(false);
  console.log('Checked Images:', checkedImages);

  const handleConfirmClick = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jwt-rj8s.onrender.com/api/img-for-vote1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkedImages }),
      });

      if (response.ok) {
        Swal.fire('Success', 'Votes saved successfully.', 'success');
      } else {
        Swal.fire('Error', 'Error saving votes.', 'error');
      }
    } catch (error) {
      console.error('Error saving votes:', error);
      Swal.fire('Error', 'Error saving votes.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <h1>Vote for Images</h1>
      {checkedImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {checkedImages.map((image, index) => (
            <div key={index} className="flex items-center justify-center">
              <img src={`https://contests4all.com/${image}`} alt={`Checked ${index}`} className="object-contain" />
            </div>
          ))}
        </div>
      ) : (
        <p>No images selected for voting.</p>
      )}
      <button
        onClick={handleConfirmClick}
        className="confirm-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="loader border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin mr-2"></div>
            Loading...
          </div>
        ) : (
          'Submit for Voting'
        )}
      </button>
    </div>
  );
};

export default Vote;
