import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure this is imported
import './index.css';
import { createSession } from '../api/sessionApi';

const SessionCreatePage = () => {
  const [password, setPassword] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [expirationDisplay, setExpirationDisplay] = useState('Set Expiry'); // New state for display text
  const navigate = useNavigate();

  const handleCreateSession = async () => {
    try {
      const data = await createSession(expirationTime, password);
      navigate(`/session/${data.sessionId}`);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };
  const handleExpirationChange = (e) => {
    const minutes = e.target.value;
    setExpirationTime(minutes * 60 * 1000); // Convert minutes to milliseconds and set expirationTime
    setExpirationDisplay(minutes ? `${minutes} minute(s)` : ''); // Update display text based on selection
  };

  return (
    <>
      <h1>Wormhole</h1>
      <p>Enter session details</p>
      <div className="input-container">
        <input
          className="session-input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="session-select"
          value={expirationTime}
          onChange={handleExpirationChange} // Use the new handler
        >
          <option value="">{expirationDisplay}</option>
          <option value="1">1 minute</option>
          <option value="5">5 minutes</option>
          <option value="10">10 minutes</option>
        </select>
        <button onClick={handleCreateSession}>Create Session</button>
      </div>
    </>
  );
};

export default SessionCreatePage;