import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from './components/HomePage.jsx';
import SessionUploadPage from './components/SessionUploadPage.jsx';
import SessionJoinPage from './components/SessionJoinPage.jsx';

const DOMAIN  = process.env?.DOMAIN || window.location.hostname;

function App() {
    return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage  DOMAIN={DOMAIN} />}/>
          <Route path="/join" element={<SessionJoinPage  DOMAIN={DOMAIN} />}/>
          <Route path="/session/:sessionId" element={<SessionUploadPage  DOMAIN={DOMAIN} />}/>
        </Routes>
      </Router>
    );
  }

export default App;