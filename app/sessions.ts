import { createCookieSessionStorage, redirect } from 'remix';

// const sessionSecret = process.env.SESSION_SECRET;
// if (!sessionSecret) {
//   throw new Error(`SESSION_SECRET must be set`);
// }

const storage = createCookieSessionStorage({
  cookie: {
    name: 'OF_session',
    // secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  const cookie = storage.getSession(request.headers.get('Cookie')) || undefined;
  return cookie;
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export default storage;
