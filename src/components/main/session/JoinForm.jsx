import { useState } from "react";

import { CustomButton } from "../button";
import { CustomCheckBox } from "../checkBox";
import { PasswordField } from "../fields/PasswordField";
import { TextInput } from "../fields/TextField";

/**
 * Join Form used for joining a session
 *
 * @param {} onPasswordChange
 * @param {} onSessionIdChange
 * @returns JoinForm component
 */
// TODO: remove passwordField and use this component instead
const JoinForm = ({ onPasswordChange, onSessionIdChange, onJoin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <TextInput text={"SessionId"} onChange={onSessionIdChange} />
        {/* <input
        type="text"
        className="block w-full bg-opacity-10 rounded-md border-0 py-1.5 pr-20 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        placeholder="SessionId"
        required
      /> */}
        {/* Password checkbox */}
        <div className="relative flex justify-center gap-x-3 mb-1">
          <CustomCheckBox
            label={"Enable Password"}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* Password Field */}
        {showPassword && <PasswordField onPasswordChange={onPasswordChange} />}
      </div>

      {/* Join btn */}
      <div className="flex justify-center">
        <CustomButton onClick={onJoin} title="Join Session" />
      </div>
    </form>
  );
};
export { JoinForm };
