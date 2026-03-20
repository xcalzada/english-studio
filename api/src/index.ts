import "dotenv/config";
import { serve }  from "@hono/node-server";
import { Hono }   from "hono";
import { cors }   from "hono/cors";
import { logger } from "hono/logger";
import { rateLimiter } from "hono-rate-limiter";

import progress       from "./routes/progress.js";
import streak         from "./routes/streak.js";
import xp             from "./routes/xp.js";
import { dailyChallenge } from "./routes/dailyChallenge.js";
import sr               from "./routes/sr.js";
import { errorDna }     from "./routes/errorDna.js";
import units            from "./routes/units.js";
import users            from "./routes/users.js";

// ── CORS whitelist ────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "http://localhost:3000",  // Next.js dev
  "http://localhost:5173",  // Vite legacy
  "http://localhost:4173",  // Vite preview
  process.env.PRODUCTION_URL ?? "",
].filter(Boolean);

const app = new Hono();

// ── Middleware ────────────────────────────────────────────────────
app.use("*", logger());
app.use("*", cors({
  origin: (origin) => ALLOWED_ORIGINS.includes(origin) ? origin : "",
  credentials: true,
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

// Rate limit: 200 sr por IP por minuto
app.use("/api/sr/*", rateLimiter({
  windowMs: 60 * 1000,
  limit:    200,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "unknown",
}));

// Rate limit: 60 error-dna por IP por minuto
app.use("/api/error-dna/*", rateLimiter({
  windowMs: 60 * 1000,
  limit:    60,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "unknown",
}));

// Rate limit: 60 daily challenge por IP por minuto
app.use("/api/daily-challenge/*", rateLimiter({
  windowMs: 60 * 1000,
  limit:    60,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "unknown",
}));

// ── Routes ────────────────────────────────────────────────────────
app.route("/api/progress",         progress);
app.route("/api/streak",           streak);
app.route("/api/xp",               xp);
app.route("/api/daily-challenge",  dailyChallenge);
app.route("/api/sr",               sr);
app.route("/api/error-dna",        errorDna);
app.route("/api/units",            units);
app.route("/api/users",            users);

// ── Health check ─────────────────────────────────────────────────
app.get("/",       c => c.json({ ok: true, service: "English Studio API" }));
app.get("/health", c => c.json({ ok: true }));

// ── Start ─────────────────────────────────────────────────────────
const port = Number(process.env.PORT ?? 3001);
console.log(`🚀  GrammarLab API running on http://localhost:${port}`);
serve({ fetch: app.fetch, port });