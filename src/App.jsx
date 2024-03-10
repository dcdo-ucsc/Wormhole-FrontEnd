import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import SessionPage from './pages/SessionPage.jsx';
import SessionJoinPage from './pages/SessionJoinPage.jsx';
import SessionCreatePage from './pages/SessionCreatePage.jsx';

const DOMAIN = import.meta.env.VITE_DOMAIN;

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage DOMAIN={DOMAIN} />} />
        <Route path='/join' element={<SessionJoinPage DOMAIN={DOMAIN} />} />
        <Route path='/create/' element={<SessionCreatePage DOMAIN={DOMAIN} />} />
        <Route path='/session/:sessionId' element={<SessionPage DOMAIN={DOMAIN} />} /> {/* Updated this line */}
      </Routes>
    </Router>
  );
}

export default App;
