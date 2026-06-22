import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGODB_URI } from './utils/config.js';
import { logInfo, logError } from './utils/logger.js';
import notesRouter from './controllers/notes.js';
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './utils/middleware.js';

const app = express();

logInfo('Connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => logInfo('Connected to MongoDB'))
  .catch((error) => logError('Error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger);

app.use('/api/notes', notesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
