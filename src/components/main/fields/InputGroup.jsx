/**
 * @param {options} array of options for drop-down
 * @param {fieldOnChange} function to handle input field change
 * @param {dropDownOnChange} function to handle drop-down change
 * @param {dropDownValue} value of the drop-down
 * @param {errorMessage} error message to display
 */
const InputGroup = ({
  fieldOnChange,
  dropDownOnChange,
  dropDownValue,
  options,
  errorMessage,
}) => {
  return (
    <div>
      <label
        htmlFor="expiry"
        className="ml-4 block text-sm font-medium leading-6 text-white text-left"
      >
        Expiry
      </label>
      {/* Expiry input field */}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="expiry"
          id="expiry"
          className="peer block w-11/12 rounded-md border-0 py-1.5 pr-12 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="0"
          defaultValue={1}
          onChange={fieldOnChange}
          required
          pattern="^\d+$"
        />
        {/* Time format drop-down */}
        <div className="absolute top-2 right-0 flex items-center">
          <select
            id="time"
            name="time"
            value={dropDownValue}
            onChange={dropDownOnChange}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-white font-semibold focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
          >
            {options.map((option, index) => (
              <option key={index} className="text-white bg-black">
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* Validation message */}
        <span className="mt-1 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export { InputGroup };
