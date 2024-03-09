import { Route, Routes, Navigate } from "react-router-dom";
// Pages
import { Main } from "./pages/Main";
import { Session } from "./pages/Session";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/session/:sessionId" element={<Session />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
