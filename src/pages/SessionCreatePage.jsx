import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure this is imported
import './index.css';
import { createSession } from '../api/sessionApi';

const SessionCreatePage = () => {
  const [password, setPassword] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [expirationDisplay, setExpirationDisplay] = useState('Set Expiry'); // New state for display text
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateSession = async () => {
    try {
      // check if the expiration time is valid
      if (expirationTime === '') {
        setError('Select a valid expiration time');
        throw error;
      }
      const data = await createSession(expirationTime, password);
      navigate(`/session/${data.sessionId}`, { state: { isOwner: true } });
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
      <h1 className='font-bold mb-3'>Wormhole</h1>
      <p className='font-semibold'>Enter session details</p>
      <div className='input-container'>
        <input
          className='session-input rounded-md'
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className='session-select rounded-md'
          value={expirationTime}
          onChange={handleExpirationChange} // Use the new handler
        >
          <option value=''>{expirationDisplay}</option>
          <option value='1'>1 minute</option>
          <option value='5'>5 minutes</option>
          <option value='10'>10 minutes</option>
        </select>

        {error && <div className='text-red-600'>{error}</div>}

        <button
          className='primary-button bg-indigo-600 text-white hover:bg-indigo-500'
          onClick={handleCreateSession}
        >
          Create Session
        </button>
      </div>

      <div className='centerize'>
        <a href='/' className='primary-button font-bold hover:font-semibold'>
          Back to main app
        </a>
      </div>
    </>
  );
};

export default SessionCreatePage;
