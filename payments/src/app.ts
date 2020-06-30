import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, currentUser } from '@lwtickets/common';
import { createChargeRouter } from './routes/new';

const app = express();

// Need to trust proxy since running through Ingress proxy
app.set('trust proxy', true);
app.use(json());

// Secure property will only transfer cookies over HTTPS.
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
);

app.use(currentUser);
app.use(createChargeRouter);

// Any method on any route that is not identified will throw new error
app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
