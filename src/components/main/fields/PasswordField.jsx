const PasswordField = ({ onPasswordChange }) => {
  return (
    <div>
      <div className="flex ml-4 justify-between">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-white-900"
        >
          Password
        </label>
      </div>
      <div className="mt-1 mb-4 flex justify-center">
        <input
          id="password"
          name="password"
          type="password"
          onChange={onPasswordChange}
          autoComplete="current-password"
          required
          className="block w-11/12 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export { PasswordField };
