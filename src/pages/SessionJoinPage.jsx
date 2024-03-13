import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure this is imported
import './index.css';

import { authSession } from '../api/sessionApi';

const SessionJoinPage = ({ DOMAIN }) => {
  const navigate = useNavigate();
  //  Should generate a random value
  const [sessionJoinerValue, setSessionJoinerValue] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(
      `${DOMAIN.split('://')[0] === 'http' ? 'ws' : 'wss'}://${
        DOMAIN.split('://')[1]
      }`
    );

    socket.onopen = function (event) {
      socket.send('hello');
    };

    socket.onmessage = function (event) {
      let [code, message] = event.data.split(':');
      console.log(code, message);
      if (code === '1') {
        setSessionJoinerValue(message);
      } else if (code === '2') {
        window.location.assign(`${DOMAIN}/session/${message}`);
      }
    };
  }, []);

  const GoToSession = async () => {
    // TODO: add endpoint in backend to check if session exists
    // if not, show error message
    // try {
    await authSession(sessionId, password).catch((err) => {
      console.log(err.response.data.error);
      setError(err.response.data.error);
      throw error;
    });

    // window.location.assign(`${DOMAIN}/session/${sessionId}`);
    navigate(`/session/${sessionId}`, { state: { isOwner: false } });


    // } catch (error) {
    //   setError('Unable to Join session');
    // }
  };

  return (
    <div>
      <h1 className='font-bold mb-1'>Wormhole</h1>
      <h2 className='font-semibold text-indigo-500'>
        The Seamless File Transfer Web App
      </h2>
      {/* <div className='py-12'/> */}

      {/* <p className='session-text'>Scan the QR Code from an active session</p>
      {sessionJoinerValue ? (
        <div className='qrcode-container'>
          <QRCode value={sessionJoinerValue} />
        </div>
      ) : null} */}

      {/* <p className='session-text'>Or enter in the code below</p>
      <h2 className='session-title'>
        {sessionJoinerValue || 'Awaiting join Id'}
      </h2> */}

      <p className='font-semibold my-1'>Enter session details</p>
      <div>
        <div>
          <input
            className='join-input rounded-md'
            placeholder='Session Id'
            type='text'
            onChange={(e) => setSessionId(e.target.value)}
          />
        </div>

        <input
          className='join-input rounded-md'
          placeholder='Password (Empty if None)'
          type='password'
          //password doesnt do anything yet
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className='py-1'>
        <button
          className='primary-button bg-indigo-600 text-white hover:font-bold'
          onClick={GoToSession}
        >
          Go To Session
        </button>
      </div>

      {error && <div className='error-message font-semibold'>{error}</div>}

      {/* Back to main page btn */}
      <div className='centerize'>
        <a
          href='/'
          className='primary-button button-imposter font-bold hover:font-semibold'
        >
          Back to main app
        </a>
      </div>
    </div>
  );
};

export default SessionJoinPage;
