import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import './index.css';

const SessionJoinPage = ({ DOMAIN }) => {
  //  Should generate a random value
  const [sessionJoinerValue, setSessionJoinerValue] = useState(null);
  const [sessionId, setSessionId] = useState('');

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

  const GoToSession = () => {
    // TODO: add endpoint in backend to check if session exists
    // if not, show error message
    window.location.assign(`${DOMAIN}/session/${sessionId}`);
  };

  return (
    <div>
      <h1 className='leading-10'>Wormhole</h1>
      <h2 className='text-indigo-500'>The Seamless File Transfer Web App</h2>
      <div className='py-12'/>

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
      
      <p className='session-text py-4'>Type in the session id below to join</p>
      <div>
        <input
          className='rounded-md'
          placeholder='Session Id'
          type='text'
          onChange={(e) => setSessionId(e.target.value)}
        />
      </div>

      <div className='py-1'/>

      <input
        className='rounded-md'
        placeholder='Password(Empty if None)'
        type='text'

        //password doesnt do anything yet
        onChange={(e) => setSessionId(e.target.value)}
      />
      <div className='py-1'/>

      <div className='centerize' style={{ marginBottom: 50 }}>
        <button className='primary-button bg-indigo-600 text-white hover:font-bold' onClick={GoToSession}>
          Go To Session
        </button>
      </div>

      <div className='centerize'>
        <a href='/' className='primary-button button-imposter font-bold hover:font-semibold'>
          Back to main app
        </a>
      </div>
    </div>
  );
};

export default SessionJoinPage;
