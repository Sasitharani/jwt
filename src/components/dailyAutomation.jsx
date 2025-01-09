import React from 'react';
import CreateUserSessionButton from './CreateUserSessionButton'; // Import the CreateUserSessionButton component
import UpdateVotesButton from './updateVotes'; // Import the UpdateVotesButton component

const DailyAutomation = () => {
  return (
    <div>
      <h1>Daily Automation</h1>
      <CreateUserSessionButton /> {/* Call the CreateUserSessionButton component */}
      <UpdateVotesButton /> {/* Call the UpdateVotesButton component */}
    </div>
  );
};

export default DailyAutomation;
