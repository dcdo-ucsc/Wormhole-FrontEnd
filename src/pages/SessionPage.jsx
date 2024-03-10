import { useState, useEffect, useRef } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import axios from 'axios';

import { createSession } from '../api/sessionApi';
import { UploadForm } from '../components/UploadForm';
import { downloadFile } from '../api/fileApi';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// Utils
import { formatTime } from '../utils/time';

const backend = import.meta.env.VITE_BACKEND;

const SessionPage = () => {
  const { sessionId } = useParams(); 
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [sessionUrl, setSessionUrl] = useState('');
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  // IMPORTANT: timer goes twice as fast when <React.StrictMode> is enabled in main.jsx
  // This won't happen if you build it and serve it in the backend
  useEffect(() => {
    const fetchData = async () => {
      if (!sessionId) {
        console.error('Session ID not found');
        return;
      }
  
      try {
        const response = await axios.get(`${backend}/api/session/data/${sessionId}`, {
          withCredentials: true
        });
  
        const { qrCodeDataURL, deletionTime } = response.data;
        setQrCodeDataUrl(qrCodeDataURL);
        setSessionUrl(`${window.location.origin}/session/${sessionId}`);
        startTimer(deletionTime);
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };
  
    fetchData();
  }, [sessionId]);

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
