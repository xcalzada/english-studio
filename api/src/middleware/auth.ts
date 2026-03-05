// api/src/middleware/auth.ts
// Valida el Bearer JWT en cada request y añade userId + userJwt al contexto.
// El userId NUNCA viene del body — siempre del token verificado.

import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be set and at least 32 characters');
}

type AuthVars = {
  userId: string;
  userJwt: string;
};

export const requireAuth = createMiddleware<{ Variables: AuthVars }>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.slice(7);
  try {
    const payload = await verify(token, JWT_SECRET, 'HS256') as { sub: string };
    c.set('userId', payload.sub);
    c.set('userJwt', token);
    await next();
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
});