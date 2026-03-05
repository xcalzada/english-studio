import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { adminDb } from '../db/client.js';

const auth = new Hono();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be set and at least 32 characters');
}

auth.post('/session', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const payload = await verify(token, JWT_SECRET, 'HS256') as { sub: string };
        await adminDb.from('users')
          .update({ last_seen_at: new Date().toISOString() })
          .eq('id', payload.sub);
        return c.json({ user_id: payload.sub, token, is_new: false });
      } catch {
        // token invalido, crear nuevo usuario
      }
    }

    const { data: newUser, error } = await adminDb
      .from('users')
      .insert({ settings: {} })
      .select('id')
      .single();

    console.log('insert result:', { newUser, error });

    if (error || !newUser) {
      console.error('insert error:', error);
      return c.json({ error: 'Could not create user' }, 500);
    }

    const token = await sign(
      { sub: newUser.id, iat: Math.floor(Date.now() / 1000) },
      JWT_SECRET,
      'HS256'
    );

    return c.json({ user_id: newUser.id, token, is_new: true }, 201);

  } catch (err) {
    console.error('auth/session error:', err);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// DELETE /api/auth/session — cliente descarta el token
auth.delete('/session', (c) => c.body(null, 204));

export default auth;