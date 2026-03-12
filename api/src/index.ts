import "dotenv/config";
import { serve }  from "@hono/node-server";
import { Hono }   from "hono";
import { cors }   from "hono/cors";
import { logger } from "hono/logger";
import { rateLimiter } from "hono-rate-limiter";

import auth     from "./routes/auth.js";
import progress from "./routes/progress.js";
import streak   from "./routes/streak.js";
import xp       from "./routes/xp.js";

// ── CORS whitelist ────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.PRODUCTION_URL ?? "",
].filter(Boolean);

const app = new Hono();

// ── Middleware ────────────────────────────────────────────────────
app.use("*", logger());
app.use("*", cors({
  origin: (origin) => ALLOWED_ORIGINS.includes(origin) ? origin : "",
  credentials: true,
}));

// Rate limit: 20 sesiones por IP cada 15 minutos
app.use("/api/auth/*", rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit:    20,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "unknown",
}));

// Rate limit: 200 respuestas por IP por minuto
app.use("/api/progress/*", rateLimiter({
  windowMs: 60 * 1000,
  limit:    200,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "unknown",
}));

// Rate limit: 200 eventos de racha por IP por minuto
app.use("/api/streak/*", rateLimiter({
  windowMs: 60 * 1000,
  limit:    200,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "unknown",
}));

// Rate limit: 200 eventos de XP por IP por minuto
app.use("/api/xp/*", rateLimiter({
  windowMs: 60 * 1000,
  limit:    200,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "unknown",
}));

// ── Routes ────────────────────────────────────────────────────────
app.route("/api/auth",     auth);
app.route("/api/progress", progress);
app.route("/api/streak",   streak);
app.route("/api/xp",       xp);

// ── Health check ─────────────────────────────────────────────────
app.get("/health", c => c.json({ ok: true }));

// ── Start ─────────────────────────────────────────────────────────
const port = Number(process.env.PORT ?? 3001);
console.log(`🚀  GrammarLab API running on http://localhost:${port}`);
serve({ fetch: app.fetch, port });