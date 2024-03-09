import { useState, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { formatTime } from "../utils/time";
import qr from "qrcode";

const Session = () => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [sessionUrl, setSessionUrl] = useState("");
  const [timer, setTimer] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Read session ID from URL when component mounts
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");
    if (sessionId) {
      const generatedSessionUrl = `${window.location.origin}/session/${sessionId}`;
      setSessionUrl(generatedSessionUrl);
    }
  }, []);

  useEffect(() => {
    if (sessionUrl) {
      qr.toDataURL(sessionUrl, { errorCorrectionLevel: "H" }, (err, url) => {
        if (err) {
          console.error("Error generating QR code:", err);
          return;
        }
        setQrCodeDataUrl(url);
        setTimer(expiry / 1000); // convert to seconds

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setQrCodeDataUrl("");
          setSessionUrl("");
          setTimer(0);
        }, expiry);
      });
    }
  }, [sessionUrl]);

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

  return (
    <>
      {qrCodeDataUrl && (
        <div className="qr-code-container">
          <img src={qrCodeDataUrl} alt="QR Code" />
          <p>
            Session URL:{" "}
            <a href={sessionUrl} target="_blank" rel="noopener noreferrer">
              {sessionUrl}
            </a>
          </p>
          <p>Expires in {formatTime()}</p>
        </div>
      )}

      <p className="read-the-docs">Scan QR Code to transfer files!</p>
    </>
  );
};

export { Session };
