const CustomCheckBox = ({ label, onClick }) => {
  return (
    <div className="relative mt-2 flex gap-x-3">
      <div className="flex h-6 items-center">
        <input
          id="checkbox"
          name="checkbox"
          type="checkbox"
          onClick={onClick}
          className="h-4 w-4 bg-gray-100 text-gray-400 rounded focus:ring-0 focus:ring-transparent"
        />
      </div>
      <div className="text-sm leading-6">
        <label className="font-medium text-white" htmlFor="checkbox">
          {label}
        </label>
      </div>
    </div>
  );
};

export { CustomCheckBox };
