/**
 *
 * @param {options} array of options
 * @returns
 */
const InputGroup = ({ fieldOnChange, dropDownOnChange, options }) => {
  return (
    <div>
      <label
        htmlFor="expiry"
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
      >
        Expiry
      </label>
      {/* Expiry input field */}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="expiry"
          id="expiry"
          className="... peer block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="0"
          defaultValue={1}
          onChange={fieldOnChange}
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
            onChange={dropDownOnChange}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            {options.map((option, index) => {
              <option key={index} value={option}>
                {option}
              </option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export { InputGroup };
