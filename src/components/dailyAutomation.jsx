import React from 'react';
import CreateUserSessionButton from './CreateUserSessionButton'; // Import the CreateUserSessionButton component
import UpdateVotesButton from './updateVotes'; // Import the UpdateVotesButton component
import VotesTable from './VotesTable'; // Import the VotesTable component

const DailyAutomation = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Automation</h1>
      <div className="mb-4">
        <CreateUserSessionButton /> {/* Call the CreateUserSessionButton component */}
      </div>
      <div className="mb-4">
        <UpdateVotesButton /> {/* Call the UpdateVotesButton component */}
      </div>
      <VotesTable /> {/* Call the VotesTable component */}
    </div>
  );
};

export default DailyAutomation;
