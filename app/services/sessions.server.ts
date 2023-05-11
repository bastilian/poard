import { createCookieSessionStorage } from '@remix-run/node'; // or cloudflare/deno
import { DOMAIN, SESSION_SECRET } from '../../config';

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__' + DOMAIN + '__poard_session',
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    // httpOnly: true, for security reasons, make this cookie http only
    secrets: [SESSION_SECRET], // replace this with an actual secret
    secure: process.env.NODE_ENV === 'production', // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;
