import React, { useState } from 'react';
import '../index.css'; // Import Tailwind CSS

const BuyVotes = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col lg:flex-row relative z-10">
        <div id="10" className="flex-1 bg-gray-200 p-4 m-2 rounded-lg h-auto">
          <h2 className="text-xl font-bold mb-4">Buy 100 Votes for Rs 10</h2>
          <p>When you pay Rs 10, you will receive 100 votes.</p>
          <button 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" 
            onClick={() => handleOpenModal('10')}
          >
            Buy Now
          </button>
        </div>
        <div id="50" className="flex-1 bg-gray-200 p-4 m-2 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Buy 500 Votes for Rs 50</h2>
          <p>When you pay Rs 50, you will receive 500 votes.</p>
          <button 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" 
            onClick={() => handleOpenModal('50')}
          >
            Buy Now
          </button>
        </div>
        <div id="100" className="flex-1 bg-gray-200 p-4 m-2 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Buy 1000 Votes for Rs 100</h2>
          <p>When you pay Rs 100, you will receive 1000 votes.</p>
          <button 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" 
            onClick={() => handleOpenModal('100')}
          >
            Buy Now
          </button>
        </div>
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative z-60">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" 
              onClick={handleCloseModal}
            >
              Close
            </button>
            <h2 className="text-xl font-bold mb-4">Scan the QR Code to Pay</h2>
            <div className="flex items-center justify-center">
              {/* Placeholder for QR code */}
              <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
                <span>QR Code</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyVotes;
