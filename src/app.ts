import * as express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import  {finished} from 'stream';
import {StatusCodes} from 'http-status-codes';

import {router as userRouter} from './resources/users/user.router';
import {router as taskRouter} from './resources/tasks/tasks.router';
import {router as boardRouter} from './resources/boards/boards.router';
import {logInfo, logError} from './utils/logging'
import { commonRequestErrorHandler } from './utils/errorHandler';

export const app = express.default();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml')) as Record<string, unknown>;

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req: express.Request, res, next) => {
  const {method, url } = req;
  const body  = req.body as Record<string, unknown>;
  const start = Date.now();
  next();

  finished(res, () => {
    const {params, query} = req;
    const ms = Date.now() - start;
    const {statusCode} = res;
    const logMessage = `${method} ${url} parameters: ${JSON.stringify(params)} query string parameters: ${JSON.stringify(query)} request body: ${JSON.stringify(body)} ${statusCode} [${ms}ms]`;
     if (statusCode < StatusCodes.BAD_REQUEST) {
      logInfo(logMessage)
     } else {
      logError(logMessage)
     }
  })
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(commonRequestErrorHandler)