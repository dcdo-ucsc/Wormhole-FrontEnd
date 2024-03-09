const CustomCheckBox = ({ label, onClick }) => {
  return (
    <div className="relative flex gap-x-3">
      <div className="flex h-6 items-center">
        <input
          id="checkbox"
          name="checkbox"
          type="checkbox"
          onClick={onClick}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-6000"
        />
      </div>
      <div className="text-sm leading-6">
        <label className="font-medium text-gray-900" htmlFor="checkbox">
          {label}
        </label>
      </div>
    </div>
  );
};

export { CustomCheckBox };
