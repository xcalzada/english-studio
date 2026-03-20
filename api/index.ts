// api/index.ts — Single Vercel serverless function entry point
// All /api/* requests are rewritten here via vercel.json

import { handle } from '@hono/node-server/vercel';
import { Hono }   from 'hono';
import { cors }   from 'hono/cors';
import { rateLimiter } from 'hono-rate-limiter';

import progress           from './_src/routes/progress.js';
import streak             from './_src/routes/streak.js';
import xp                 from './_src/routes/xp.js';
import { dailyChallenge } from './_src/routes/dailyChallenge.js';
import sr                 from './_src/routes/sr.js';
import { errorDna }       from './_src/routes/errorDna.js';
import units              from './_src/routes/units.js';
import users              from './_src/routes/users.js';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.PRODUCTION_URL ?? '',
].filter(Boolean);

const app = new Hono();

app.use('*', cors({
  origin: (origin) => ALLOWED_ORIGINS.includes(origin) ? origin : '',
  credentials: true,
}));

const rl = (limit: number) => rateLimiter({
  windowMs: 60 * 1000,
  limit,
  keyGenerator: (c) => c.req.header('x-forwarded-for') ?? 'unknown',
});

app.use('/api/progress/*',        rl(200));
app.use('/api/streak/*',          rl(200));
app.use('/api/xp/*',              rl(200));
app.use('/api/sr/*',              rl(200));
app.use('/api/error-dna/*',       rl(60));
app.use('/api/daily-challenge/*', rl(60));

app.route('/api/progress',        progress);
app.route('/api/streak',          streak);
app.route('/api/xp',              xp);
app.route('/api/daily-challenge', dailyChallenge);
app.route('/api/sr',              sr);
app.route('/api/error-dna',       errorDna);
app.route('/api/units',           units);
app.route('/api/users',           users);

app.get('/',       (c) => c.json({ ok: true, service: 'English Studio API' }));
app.get('/health', (c) => c.json({ ok: true }));

export default handle(app);
