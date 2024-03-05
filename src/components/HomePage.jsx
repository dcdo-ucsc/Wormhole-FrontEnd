import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

const HomePage = ({DOMAIN}) => {
    const backend = DOMAIN
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${backend}/home`)
          .then(response => response.json())
          .then(data => {
            setWelcomeMessage(data.message);
          })
          .catch(error => console.error('Error fetching welcome message:', error));
        }, []);

    // Function to navigate to the Create Session page
    const handleCreateSession = () => {
        navigate('/session/');
    };

    // Function to navigate to the Join Session page
    const handleJoinSession = () => {
        navigate('/join');
    };

    return (
        <>
            <h1>Wormhole</h1>
            <p>{welcomeMessage}</p>
            <button onClick={handleCreateSession}>Create Session</button>
            <button onClick={handleJoinSession}>Join Session</button>
        </>
    );
    }


export default HomePage;