import * as express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import  {finished} from 'stream';

import {router as userRouter} from './resources/users/user.router';
import {router as taskRouter} from './resources/tasks/tasks.router';
import {router as boardRouter} from './resources/boards/boards.router';
import {logInfo} from './utils/logging'

export const app = express.default();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  const {method, url, body} = req;
  const start = Date.now();
  next();

  finished(res, () => {
    const {params, query} = req;
    const ms = Date.now() - start;
    const {statusCode} = res;

    logInfo(`${method} ${url} parameters: ${JSON.stringify(params)} query string parameters: ${JSON.stringify(query)} request body: ${JSON.stringify(body)} ${statusCode} [${ms}ms]`)
  })
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
