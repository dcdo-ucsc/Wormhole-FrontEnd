import { useState, useEffect, useRef } from 'react';
import './index.css';
import Cookies from 'js-cookie';

import { createSession } from '../api/sessionApi';
import { UploadForm } from '../components/UploadForm';
import { downloadFile } from '../api/fileApi';
import { useLocation } from 'react-router-dom';

// Utils
import { formatTime } from '../utils/time';

const SessionPage = () => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [sessionUrl, setSessionUrl] = useState('');
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const sessionId = useRef(null);

  // IMPORTANT: timer goes twice as fast when <React.StrictMode> is enabled in main.jsx
  // This won't happen if you build it and serve it in the backend
  useEffect(() => {
    const fetchData = async () => {
      let data;
      try {
        data = await createSession(60000, '');
      } catch (err) {
        console.error('Error creating session:', err);
        return;
      }

      // Set the QR code and session URL
      setQrCodeDataUrl(data.qrCodeDataURL);
      const generatedSessionUrl = `${window.location.origin}/session/?sessionId=${data.sessionId}`;
      setSessionUrl(generatedSessionUrl);

      // Update URL with session ID
      window.history.pushState(null, '', `?sessionId=${data.sessionId}`);

      const urlParams = new URLSearchParams(window.location.search);
      // Get session ID from the URL
      sessionId.current = urlParams.get('sessionId');
      console.log('Session ID:', sessionId.current);
      if (!sessionId.current) {
        console.error('Session ID not found');
        return;
      }

      startTimer(data.deletionTime);
    };

    fetchData();
  }, []);

  // Start the timer
  const startTimer = (deletionTime) => {
    const now = new Date().getTime();
    const diff = deletionTime - now; // Correct calculation
    setTimer(Math.floor(diff / 1000)); // Convert to seconds

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          handleTimerExpiration();
          return;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Go back to the home page when timer expires
  const handleTimerExpiration = () => {
    clearInterval(intervalRef.current); // Clear the interval if timer is 0
    window.history.pushState(null, '', `${window.location.origin}`);
    window.location.reload();
  };

  const handleDownloadFiles = async () => {

    const sessionToken = Cookies.get(`token_${sessionId.current}`);

    console.log(sessionToken);

    try {
      const response = await downloadFile(sessionId.current, sessionToken);
      console.log("Download Success:", response);
    } catch (error) {
      console.error("Download Error:", error);
    }
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
          <p>Expires in {formatTime(timer)}</p>
        </div>
      )}
      <p className='read-the-docs'>Scan QR Code to transfer files!</p>

      <div className='centerize'>
        <a href='/' className='primary-button button-imposter'>
          Back to main app
        </a>
      </div>
      <div className='upload-container'>
        <div style={{ textAlign: 'left' }}>
          <label>Upload files</label>
        </div>
        <UploadForm sessionId={sessionId.current} />
      </div>
      <button onClick={handleDownloadFiles}>
        Download Files
      </button>
    </>
  );
};

export default SessionPage;
