import { useState, useRef } from 'react';
import './App.css';
import qr from 'qrcode';

function App() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const timeoutRef = useRef(null);

  //Random string generation for testing purposes
  const generateRandomString = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const generateQRCode = () => {
    const randomString = generateRandomString();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    qr.toDataURL(randomString, (err, url) => {
      if (err) throw err;
      setQrCodeDataUrl(url);

      timeoutRef.current = setTimeout(() => {
        setQrCodeDataUrl('');
        timeoutRef.current = null;
      }, 1000);
    });
  };

  return (
    <>
      <h1>Wormhole</h1>

      <button onClick={generateQRCode}>Generate QR Code</button>

      {qrCodeDataUrl && (
        <div className="qr-code-container">
          <img src={qrCodeDataUrl} alt="QR Code" />
        </div>
      )}

      <p className="read-the-docs">
        Scan QR Code to transfer Files!
      </p>
    </>
  );
}

export default App;