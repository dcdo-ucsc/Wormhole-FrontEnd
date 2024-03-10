import { useState, useEffect, useRef } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import axios from 'axios';

import { downloadFile } from '../api/fileApi';
import { UploadForm } from '../components/UploadForm';
import { useLocation, useParams } from 'react-router-dom';

// Utils
import { formatTime } from '../utils/time';

const backend = import.meta.env.VITE_BACKEND;

const SessionPage = () => {
  const { sessionId } = useParams(); 
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [sessionUrl, setSessionUrl] = useState('');
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

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
        const deletionDate = new Date(deletionTime); // Ensure deletionTime is interpreted as a Date
        startTimer(deletionDate);
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchData();
  }, [sessionId, backend]);

  const startTimer = (deletionDate) => {
    const now = new Date();
    const diff = deletionDate - now; // Calculate the difference in milliseconds
    setTimer(Math.floor(diff / 1000)); // Convert to seconds

    if (intervalRef.current) clearInterval(intervalRef.current); // Clear existing interval

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          handleTimerExpiration();
          return 0; // Ensure the timer doesn't go into negative
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleTimerExpiration = () => {
    clearInterval(intervalRef.current); // Clear the interval if timer is 0
    // Consider using a more React-friendly way to navigate, such as useHistory from react-router-dom
    window.history.pushState(null, '', `${window.location.origin}`);
    window.location.reload();
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleDownloadFiles = async () => {
    const sessionToken = Cookies.get(`token_${sessionId}`);

    console.log('token: ', sessionToken);

    let response;

    try {
      response = await downloadFile(sessionId, sessionToken);
      console.log('Download Success:', response);
    } catch (error) {
      console.error('Download Error:', error);
    }
    const fileNameHeader = response.headers['content-disposition'];
    const fileType = response.headers['Content-Type'];
    const fileNameStart = fileNameHeader.indexOf('"') + 1;
    const fileNameEnd = fileNameHeader.lastIndexOf('"');
    const fileName = fileNameHeader.substring(fileNameStart, fileNameEnd);
    // Create blob with file binary data
    const blob = new Blob([response.data], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    // set file attributes
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <h1>Wormhole</h1>
      {qrCodeDataUrl && (
        <div className='qr-code-container'>
          <img src={qrCodeDataUrl} alt='QR Code' />
          <p>Session URL: <a href={sessionUrl} target='_blank' rel='noopener noreferrer'>{sessionUrl}</a></p>
          <p>Expires in {formatTime(timer)}</p>
        </div>
      )}
      <p className='read-the-docs'>Scan QR Code to transfer files!</p>

      <div className='centerize'>
        <a href='/' className='primary-button button-imposter'>Back to main app</a>
      </div>
      <div className='upload-container'>
        <UploadForm sessionId={sessionId} />
      </div>
      <button onClick={handleDownloadFiles}>Download Files</button>
    </>
  );
};

export default SessionPage;
