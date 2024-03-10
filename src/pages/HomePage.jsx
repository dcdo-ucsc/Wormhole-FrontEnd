import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

import { getWelcomeMessage } from '../api/homeApi';
import { generateUserId } from '../api/userApi';

const HomePage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  const fetchWelcomeMessage = async () => {
    const message = await getWelcomeMessage();
    setWelcomeMessage(message);
  };

  useEffect(() => {
    // Generate user ID if not present
    if (!document.cookie.includes('userId=')) {
      generateUserId();
    }

    fetchWelcomeMessage();
  }, []);

  // Function to navigate to the Create Session page
  const handleCreateSession = () => {
    navigate('/create/');
  };

  // Function to navigate to the Join Session page
  const handleJoinSession = () => {
    navigate('/join');
  };

  return (
    <>
      <h1>Wormhole</h1>
      <p>{welcomeMessage}</p>
      <div className='centerize' style={{ marginBottom: -1 }}>
        <button className='primary-button bg-indigo-600 text-white hover:bg-indigo-500' onClick={handleCreateSession}>
          Create a New Session
        </button>
      </div>

      <button onClick={handleJoinSession}>Join Existing Session</button>
    </>
  );
};

export default HomePage;
