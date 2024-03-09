// doesn't work rn
function Popover({ message }) {
  return (
    <div
      data-popover
      id="popover-default"
      role="tooltip"
      className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div className="px-3 py-2">
        <p>{message}</p>
      </div>
      <div data-popper-arrow></div>
    </div>
  );
}

export { Popover };
