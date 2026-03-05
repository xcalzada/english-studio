import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono }  from 'hono';
import { cors }  from 'hono/cors';
import { logger } from 'hono/logger';

import auth     from './routes/auth.js';
import progress from './routes/progress.js';

const app = new Hono();

// ── Middleware ────────────────────────────────────────────────────
app.use('*', logger());
app.use('*', cors({
  origin:      process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  credentials: true,
}));

// ── Routes ────────────────────────────────────────────────────────
app.route('/api/auth',     auth);
app.route('/api/progress', progress);

// ── Health check ─────────────────────────────────────────────────
app.get('/health', c => c.json({ ok: true, ts: new Date().toISOString() }));

// ── Start ─────────────────────────────────────────────────────────
const port = Number(process.env.PORT ?? 3001);
console.log(`🚀  GrammarLab API running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });