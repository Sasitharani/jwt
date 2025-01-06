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
    <div>
      <h1>Vote for Images</h1>
      {checkedImages.length > 0 ? (
        <ul>
          {checkedImages.map((image, index) => (
            <li key={index}>
              <img src={`https://contests4all.com/${image}`} alt={`Checked ${index}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No images selected for voting.</p>
      )}
      <button onClick={handleConfirmClick} className="confirm-button" disabled={loading}>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-6 h-6 animate-spin mr-2"></div>
            Loading...
          </div>
        ) : (
          'Confirm'
        )}
      </button>
    </div>
  );
};

export default Vote;
