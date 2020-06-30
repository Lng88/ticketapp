import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  const cookie = await global.signup();

  // Supertest does not manage cookies, so response.body will be null.
  // We need to grab cookie from first request 'authResponse' and get cookie from that.
  // Then we can set cookie in response below
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
