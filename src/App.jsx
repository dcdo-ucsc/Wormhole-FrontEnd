import { useState, useEffect, useRef } from 'react';
import './App.css';
import qr from 'qrcode';

function App() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [timer, setTimer] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const generateRandomString = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const generateQRCode = () => {
    if (qrCodeDataUrl && !window.confirm("A QR code is already generated. Do you want to create a new one?")) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const randomString = generateRandomString();
    qr.toDataURL(randomString, (err, url) => {
      if (err) throw err;
      setQrCodeDataUrl(url);
      setTimer(600); // 10 minutes in seconds

      timeoutRef.current = setTimeout(() => {
        setQrCodeDataUrl('');
        setTimer(0);
        timeoutRef.current = null;
      }, 600000); // 10 minutes
    });
  };

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (intervalRef.current) {
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

      <button onClick={generateQRCode}>Generate QR Code</button>

      {qrCodeDataUrl && (
        <div className="qr-code-container">
          <img src={qrCodeDataUrl} alt="QR Code" />
          <p>Expires in {formatTime()}</p>
        </div>
      )}

      <p className="read-the-docs">
        Scan QR Code to transfer Files!
      </p>
    </>
  );
}

export default App;