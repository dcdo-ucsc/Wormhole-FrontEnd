import { useEffect, useState } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import { convertToMilliseconds } from "../utils/time";
import { Popover } from "../components/main/popover";

// Styles
import "../App.css";

// Components
import { CustomButton } from "../components/main/button";
import { CustomCheckBox } from "../components/main/checkBox";
// Pages
import { Session } from "./Session";
// APIs
import { generateUserId } from "../api/userApi";
import { createSession } from "../api/sessionApi";

const Main = () => {
  let navigate = useNavigate();
  const [timeUnit, setTimeUnit] = useState("Minutes"); // ["Minutes", "Hours"]
  const [expiry, setExpiry] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
      setError("Error creating session");
      setIsPopoverOpen(true);
      return;
    }

    const sessionId = res.sessionId;
    navigate("/session/" + sessionId);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <h1 className="font-bold mb-7 text-black">Wormhole</h1>

      {/* Expiry field */}
      <form id="passwordForm" className="space-y-2" method="POST">
        <div>
          <label
            htmlFor="expiry"
            className="block text-sm font-medium leading-6 text-gray-900 text-left"
          >
            Expiry
          </label>
          {/* Expiry input */}
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="expiry"
              id="expiry"
              className="... peer block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0"
              defaultValue={1}
              onChange={(e) => setExpiry(e.target.value)}
              required
              pattern="^\d+$"
            />
            {/* Time format drop-down */}
            <div className="absolute top-2 right-0 flex items-center">
              <label htmlFor="time" className="sr-only">
                Expiry
              </label>
              <select
                id="time"
                name="time"
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>Minutes</option>
                <option>Hours</option>
              </select>
            </div>
            {/* Validation message */}
            <span className="mt-1 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Please enter a valid expiry time
            </span>
          </div>
        </div>

        {/* Password checkbox */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-1">
          <div className="relative flex gap-x-3 mb-1">
            <CustomCheckBox
              label={"Enable Password"}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Password Field */}
          {showPassword && (
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-500 hover:text-indigo-400"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-1 mb-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}
        </div>

        {/* Create session btn */}
        <div>
          <CustomButton onClick={handleSessionCreate} title="Create Session" />
        </div>
      </form>

      {/* Display error if session creation fails */}

      <Routes>
        <Route path="/session/:id" element={<Session />} />
      </Routes>
    </>
  );
};

export { Main };
