import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css'

const backend = 'http://localhost:9001';

const SessionUploadPage = ({ DOMAIN }) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
    const [sessionUrl, setSessionUrl] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (qrCodeDataUrl && !window.confirm("A QR code is already generated. Do you want to create a new one?")) {
                return;
            }
            
            if (intervalRef.current) clearInterval(intervalRef.current);
        
            const userId = uuidv4();
        
            const response = await fetch(`${backend}/api/session/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    expiry: 60000,
                }),
            });
        
            const data = await response.json();
        
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
                setTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(intervalRef.current); // Clear the interval if timer is 0
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        };
    
        fetchData();
    }, [qrCodeDataUrl]);

    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        console.log(timer);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
          <h1>Wormhole</h1>
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

export default SessionUploadPage