import { useState } from "react";
import { InputGroup } from "../fields/InputGroup";
import { CustomButton } from "../button";
import { CustomCheckBox } from "../checkBox";
import { PasswordField } from "../fields/PasswordField";

const CreateForm = ({ onExpiryChange, onPasswordChange, onSubmit }) => {
  const [timeUnit, setTimeUnit] = useState("Minutes");
  const [showPassword, setShowPassword] = useState(false);
  const expiryOptions = ["Minutes", "Hours"];

  return (
    <form id="passwordForm" className="space-y-2" method="POST">
      {/* Expiry field input */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <InputGroup
          fieldOnChange={onExpiryChange}
          dropDownOnChange={(e) => setTimeUnit(e.target.value)}
          dropDownValue={timeUnit}
          options={expiryOptions}
          errorMessage={"Please enter a valid number"}
        />
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

      {/* Submit btn */}
      <div className="flex justify-center">
        <CustomButton onClick={onSubmit} title="Create Session" />
      </div>
    </form>
  );
};

export { CreateForm };
