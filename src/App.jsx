import { useState, useEffect, useRef } from 'react';
import './App.css';
import qr from 'qrcode';

const backend = 'http://localhost:3000'

function App() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [sessionUrl, setSessionUrl] = useState('');
  const [timer, setTimer] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (sessionUrl) {
      // Generate QR code when sessionUrl changes
      qr.toDataURL(sessionUrl, { errorCorrectionLevel: 'H' }, (err, url) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return;
        }
        setQrCodeDataUrl(url);
        setTimer(600); // 10 minutes in seconds

        // Set a timeout to clear the QR code and session URL after 10 minutes
        clearTimeout(timeoutRef.current); // Clear any existing timeout
        timeoutRef.current = setTimeout(() => {
          setQrCodeDataUrl('');
          setSessionUrl('');
          setTimer(0);
        }, 600000); // 10 minutes
      });
    }
  }, [sessionUrl]);

  const createSessionAndGenerateQR = async () => {
    if (qrCodeDataUrl && !window.confirm("A QR code is already generated. Do you want to create a new one?")) {
      return;
    }

    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);

    // Make a request to the backend to create a new session
    const response = await fetch(backend + '/session', { method: 'GET', redirect: 'manual' });
    const data = await response.json();
    const sessionId = data.sessionId;

    // Set the session URL state, triggering the useEffect to generate the QR code
    const generatedSessionUrl = `${window.location.origin}/session/${sessionId}`;
    setSessionUrl(generatedSessionUrl);
  };

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timer]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <h1>Wormhole</h1>
      <button onClick={createSessionAndGenerateQR}>Generate QR Code</button>
      {qrCodeDataUrl && (
        <div className="qr-code-container">
          <img src={qrCodeDataUrl} alt="QR Code" />
          <p>Session URL: <a href={sessionUrl} target="_blank" rel="noopener noreferrer">{sessionUrl}</a></p>
          <p>Expires in {formatTime()}</p>
        </div>
      )}

      <p className="read-the-docs">
        Scan QR Code to transfer files!
      </p>
    </>
  );
}

export default App;
