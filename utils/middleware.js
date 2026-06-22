import { logInfo } from './logger.js';

const requestLogger = (request, response, next) => {
  logInfo('Method:', request.method);
  logInfo('Path:  ', request.path);
  logInfo('Body:  ', request.body);
  logInfo('---');
  next();
};

const unknownEndpoint = (request, response) =>
  response.status(404).json({ error: 'Unknown endpoint' });

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({
      error: 'malformatted id',
    });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    });
  }

  next(error);
};

export { requestLogger, unknownEndpoint, errorHandler };
