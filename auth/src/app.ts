import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@lwtickets/common';

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Any method on any route that is not identified will throw new error
app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
