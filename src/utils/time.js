const formatTime = (timer) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export { formatTime };
