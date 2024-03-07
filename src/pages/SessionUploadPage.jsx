import { useState, useEffect, useRef } from 'react';
import './index.css';

import { createSession } from '../api/sessionApi';

const SessionUploadPage = () => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [sessionUrl, setSessionUrl] = useState('');
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  // IMPORTANT: timer goes twice as fast when <React.StrictMode> is enabled in main.jsx
  // This won't happen if you build it and serve it in the backend
  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (intervalRef.current) clearInterval(intervalRef.current);
      //   if (
      //     qrCodeDataUrl &&
      //     !window.confirm(
      //       'A QR code is already generated. Do you want to create a new one?'
      //     )
      //   ) {
      //     return;
      //   }

      // FIXME: change the inputs, test values
      try {
        data = await createSession(60000, '');
      } catch (err) {
        console.error('Error creating session:', err);
        return;
      }

      setQrCodeDataUrl(data.qrCodeDataURL);
      const generatedSessionUrl = `${window.location.origin}/session/?sessionId=${data.sessionId}`;
      setSessionUrl(generatedSessionUrl);

      // Update URL with session ID
      //window.history.pushState(null, '', `?sessionId=${data.sessionId}`);

      // Start the timer
      const expiresAt = data.deletionTime; // Use the timestamp directly
      const now = new Date().getTime();
      const diff = expiresAt - now; // Correct calculation
      setTimer(Math.floor(diff / 1000)); // Convert to seconds

      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalRef.current); // Clear the interval if timer is 0
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    };

    fetchData();
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <h1>Wormhole</h1>
      {qrCodeDataUrl && (
        <div className='qr-code-container'>
          <img src={qrCodeDataUrl} alt='QR Code' />
          <p>
            Session URL:{' '}
            <a href={sessionUrl} target='_blank' rel='noopener noreferrer'>
              {sessionUrl}
            </a>
          </p>
          <p>Expires in {formatTime()}</p>
        </div>
      )}
      <p className='read-the-docs'>Scan QR Code to transfer files!</p>

      <div className='centerize'>
        <a href='/' className='primary-button button-imposter'>
          Back to main app
        </a>
      </div>
    </>
  );
};

export default SessionUploadPage;
