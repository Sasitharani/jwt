import React from 'react';
import CreateUserSessionButton from './CreateUserSessionButton'; // Import the CreateUserSessionButton component
import VotesTable from './VotesTable'; // Import the VotesTable component
import VotesManager, { updateVotes } from './VotesManager'; // Correct the import path for VotesManager and updateVotes
import { useSelector } from 'react-redux'; // Import useSelector

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const DailyAutomation = () => {
  const username = useSelector(state => state.user.username);
  const email = useSelector(state => state.user.email);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Automation</h1>
      <div className="mb-4 inline-block bg-red-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-xl">
        <CreateUserSessionButton /> {/* Call the CreateUserSessionButton component */}
      </div>
      <div className="mb-4">
        <ErrorBoundary>
          <VotesManager/> {/* Call the VotesManager component */}
        </ErrorBoundary>
      </div>
      <div className="mb-4">
   
      </div>
   
    </div>
  );
};

export default DailyAutomation;
