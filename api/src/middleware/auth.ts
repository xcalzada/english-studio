// api/src/middleware/auth.ts
// Valida el Bearer JWT de Supabase en cada request y añade userId + userJwt al contexto.
// Usa adminDb.auth.getUser() — funciona con RS256 y HS256 sin necesitar el secreto.
// El userId NUNCA viene del body — siempre del token verificado.

import { createMiddleware } from 'hono/factory';
import { adminDb } from '../db/client.js';

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
  const { data: { user }, error } = await adminDb.auth.getUser(token);
  if (error || !user) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  c.set('userId', user.id);
  c.set('userJwt', token);
  await next();
});