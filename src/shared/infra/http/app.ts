import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import AppError from './../../errors/AppError';
import './../typeorm';
import routes from './routes';

import './../../container';
import '@config/multer';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', '..', '..', 'tmp')),
);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.code,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
    err: err,
    code: '999',
  });
});

export default app;
