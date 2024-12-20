import React from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const { username, email, amount } = location.state;

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Page</h2>
      <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
        <p className="mb-4">Username: {username}</p>
        <p className="mb-4">Email: {email}</p>
        <p className="mb-4">Amount: Rs {amount}</p>
        <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Payment;
