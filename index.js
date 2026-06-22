import app from './app.js';
import { logInfo } from './utils/logger.js';
import { PORT } from './utils/config.js';

app.listen(PORT, () => logInfo('Server running on port', PORT));
