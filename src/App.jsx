import { useState, useEffect } from 'react';
import './App.css';
import qr from 'qrcode';

function App() {
  const [count, setCount] = useState(0);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

  useEffect(() => {
    // Generate QR code as a data URL
    qr.toDataURL('Test', (err, url) => {
      if (err) throw err;
      setQrCodeDataUrl(url);
    });
  }, []); // Run the effect only once on component mount

  return (
    <>
      <h1>Wormhole</h1>

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