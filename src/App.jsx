import { useState, useRef } from 'react';
import './App.css';
import qr from 'qrcode';

function App() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const timeoutRef = useRef(null);

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

    const randomString = generateRandomString();
    qr.toDataURL(randomString, (err, url) => {
      if (err) throw err;
      setQrCodeDataUrl(url);

      timeoutRef.current = setTimeout(() => {
        setQrCodeDataUrl('');
        timeoutRef.current = null;
      }, 600000);
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