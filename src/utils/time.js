const formatTime = (timer) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const convertToMilliseconds = (timeUnit, time) => {
  let milliseconds;
  if (timeUnit === "Minutes") {
    milliseconds = time * 60 * 1000;
  } else if (timeUnit === "Hours") {
    milliseconds = time * 60 * 60 * 1000;
  }
  return milliseconds;
};

export { formatTime, convertToMilliseconds };
