import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, currentUser } from '@lwtickets/common';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';

const app = express();

// Need to trust proxy since running through Ingress proxy
app.set('trust proxy', true);
app.use(json());

// Secure property will only transfer cookies over HTTPS.
// app.use(
//   cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
// );

// need to use secure: false. Testing without https
app.use(cookieSession({ signed: false, secure: false }));

app.use(currentUser);

app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);
app.use(newOrderRouter);

// Any method on any route that is not identified will throw new error
app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
