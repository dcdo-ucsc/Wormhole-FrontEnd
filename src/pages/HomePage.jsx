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
      <button onClick={handleCreateSession}>Create Session</button>
      <button onClick={handleJoinSession}>Join Session</button>
    </>
  );
};

export default HomePage;
