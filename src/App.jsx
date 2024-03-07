import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import SessionUploadPage from './pages/SessionUploadPage.jsx';
import SessionJoinPage from './pages/SessionJoinPage.jsx';

const DOMAIN = import.meta.env.VITE_DOMAIN;

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage DOMAIN={DOMAIN} />} />
        <Route path='/join' element={<SessionJoinPage DOMAIN={DOMAIN} />} />
        <Route
          path='/session/'
          element={<SessionUploadPage DOMAIN={DOMAIN} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
