import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Subscription = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleSelect = (amount) => {
    if (amount === 0) {
      navigate('/');
    } else {
      navigate('/payment', { state: { username: user.username, email: user.email, amount } });
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Subscription Model</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="subscription-tier bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">1. Free</h3>
          <ul className="list-disc list-inside">
            <li>Photos upload for Contest: 1</li>
            <li>No of Votes per day: 3</li>
          </ul>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleSelect(0)}>Select</button>
        </div>
        <div className="subscription-tier bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">2. Gold (Rs 10)</h3>
          <ul className="list-disc list-inside">
            <li>Photos upload for Contest per Day: 5</li>
            <li>No of Votes per day: 10</li>
          </ul>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleSelect(10)}>Select</button>
        </div>
        <div className="subscription-tier bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">3. Diamond (Rs 20)</h3>
          <ul className="list-disc list-inside">
            <li>Photos upload for Contest: 10</li>
            <li>No of Votes per day: 15</li>
          </ul>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleSelect(20)}>Select</button>
        </div>
        <div className="subscription-tier bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">4. Platinum (Rs 50)</h3>
          <ul className="list-disc list-inside">
            <li>Photos upload for Contest: 10</li>
            <li>No of Votes per day: Unlimited</li>
          </ul>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleSelect(50)}>Select</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
