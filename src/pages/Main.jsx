import { useEffect, useState } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import { convertToMilliseconds } from "../utils/time";

// Styles
import "../App.css";

// Images
import { qr } from "../assets/images/main";

// Components
import { CreateForm } from "../components/main/session/CreateForm";
import { MainModal } from "../components/main/Modal";
// Pages
import { Session } from "./Session";
// APIs
import { generateUserId } from "../api/userApi";
import { createSession } from "../api/sessionApi";
import { JoinForm } from "../components/main/session/JoinForm";

const Main = () => {
  let navigate = useNavigate();
  const [sessionId, setSessionId] = useState("");
  const [expiry, setExpiry] = useState(1);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Generate user ID if not present
    if (!document.cookie.includes("userId=")) {
      generateUserId();
    }
  }, []);

  const handleSessionCreate = async (event) => {
    // Prevent session Creation if password is enabled, but not provided
    const form = document.getElementById("passwordForm");
    if (form && !form.reportValidity()) {
      event.preventDefault();
      return;
    }

    let res;
    try {
      res = await createSession(
        convertToMilliseconds(timeUnit, expiry),
        password
      );
    } catch (err) {
      return;
    }

    const sessionId = res.sessionId;
    navigate("/session/" + sessionId);
  };

  const expiryOptions = ["Minutes", "Hours"];

  return (
    <>
      <h1 className="font-bold mb-7 text-white">Wormhole</h1>

      <div className="grid grid-cols-2 gap-x-1 gap-y-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <MainModal
          id={"createForm"}
          image={""}
          alt={"Create"}
          text="Create Session"
          content={
            <CreateForm
              onExpiryChange={(e) => setExpiry(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSubmit={handleSessionCreate}
            />
          }
        />
        <MainModal
          id={"joinForm"}
          image={qr}
          alt={"Join"}
          text="Join Session"
          content={
            <JoinForm
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSessionIdChange={(e) => setSessionId(e.target.value)}
            />
          }
        />

        {/* <CardButton image={""} alt={"Create"} text="Create Session" />
        <CardButton image={qr} alt={"Join"} text="Join Session" /> */}
      </div>

      <Routes>
        <Route path="/session/:id" element={<Session />} />
      </Routes>
    </>
  );
};

export { Main };
