import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import router from './shared/routes';
import uploadConfig from './config/upload';
import './shared/database';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use('/', router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  throw new Error(err.message);

  // return response.status(500).json({
  //   status: 'error',
  //   message: 'Internal Server Error',
  // });
});

const port = 3333;
app.listen(port, () => {
  console.log(`${port} listening`);
});
