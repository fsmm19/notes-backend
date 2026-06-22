const logInfo = (...params) => {
  if (process.env.NODE_ENV !== 'test') console.log(...params);
};

const logError = (...params) => {
  if (process.env.NODE_ENV !== 'test') console.error(...params);
};

export { logInfo, logError };
