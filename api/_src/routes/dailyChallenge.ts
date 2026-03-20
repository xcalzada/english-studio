import { Hono } from "hono";
import { z }    from "zod";
import { adminDb }     from "../db/client.js";
import { requireAuth, AppEnv } from "../middleware/auth.js";

const dailyChallenge = new Hono<AppEnv>();

dailyChallenge.use("*", requireAuth);

const DAILY_XP_BONUS = 15;

// Seed determinista por fecha — mismo ejercicio para todos los usuarios ese día
function dailySeed(date: string, pool: string[]): string {
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = (hash * 31 + date.charCodeAt(i)) & 0xffffffff;
  }
  return pool[Math.abs(hash) % pool.length];
}

// GET /api/daily-challenge
dailyChallenge.get("/", async (c) => {
  const userId = c.get("userId");
  const today  = new Date().toISOString().slice(0, 10);

  const poolParam = c.req.query("pool");

  let unitId: string;
  let exerciseId: string;
  let unitSlug: string | null = null;
  let exerciseData: Record<string, unknown> | null = null;
  let exerciseType: string | null = null;

  if (poolParam && poolParam.trim().length > 0) {
    // Legacy: pool enviado por el cliente (React/Vite)
    const pool = poolParam.split(",").map(s => s.trim()).filter(Boolean);
    const exerciseKey = dailySeed(today, pool);
    [unitId, exerciseId] = exerciseKey.split(":");
  } else {
    // Next.js: seleccionar del servidor via Supabase
    const { data: exercises, error } = await adminDb
      .from("exercises")
      .select("id, unit_id, type, data, units(slug)")
      .in("type", ["fill", "choice", "error"])
      .limit(200);

    if (error || !exercises || exercises.length === 0) {
      return c.json({ error: "no exercises available" }, 500);
    }

    const keys = exercises.map((e: Record<string, unknown>) => `${e.unit_id}:${e.id}`);
    const key  = dailySeed(today, keys);
    [unitId, exerciseId] = key.split(":");

    const found = exercises.find((e: Record<string, unknown>) => e.id === exerciseId);
    if (found) {
      const units = found.units as { slug: string } | null;
      unitSlug     = units?.slug ?? null;
      exerciseData = found.data as Record<string, unknown> ?? null;
      exerciseType = found.type as string ?? null;
    }
  }

  // Comprobar si ya completado
  const { data: existing } = await adminDb
    .from("daily_challenge_completions")
    .select("completed_at, correct, xp_awarded")
    .eq("user_id", userId)
    .eq("challenge_date", today)
    .maybeSingle();

  return c.json({
    challenge: {
      date:         today,
      unitId,
      exerciseId,
      unitSlug,
      exerciseType,
      exerciseData,
      completed:    !!existing,
      correct:      existing?.correct    ?? null,
      xp_awarded:   existing?.xp_awarded ?? null,
    },
  });
});

const CompleteSchema = z.object({
  correct:     z.boolean(),
  exercise_id: z.string().default("unknown"),
});

// POST /api/daily-challenge — marcar como completado y otorgar XP bonus si correcto
dailyChallenge.post("/", async (c) => {
  const body   = await c.req.json().catch(() => null);
  const parsed = CompleteSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const userId     = c.get("userId");
  const today      = new Date().toISOString().slice(0, 10);
  const { correct, exercise_id: exerciseId } = parsed.data;

  // 1. Comprobar que no esté ya completado
  const { data: existing } = await adminDb
    .from("daily_challenge_completions")
    .select("id")
    .eq("user_id", userId)
    .eq("challenge_date", today)
    .maybeSingle();

  if (existing) {
    return c.json({ ok: false, reason: "already_completed" }, 200);
  }

  // 2. Otorgar XP (solo si correcto, con bonus de daily)
  let xpResult = null;
  if (correct) {
    const { data, error: xpError } = await adminDb.rpc("award_xp", {
      p_user_id: userId,
      p_correct: true,
      p_streak:  0,
      p_is_new:  true,
      p_bonus:   DAILY_XP_BONUS,
    });
    if (xpError) console.error("daily challenge award_xp error:", xpError);
    else xpResult = data;
  }

  // 3. Guardar completion
  const { error } = await adminDb
    .from("daily_challenge_completions")
    .insert({
      user_id:        userId,
      challenge_date: today,
      exercise_id:    exerciseId,
      correct,
      xp_awarded:     xpResult?.xp_gained ?? 0,
      completed_at:   new Date().toISOString(),
    });

  if (error) return c.json({ error: error.message }, 500);

  return c.json({
    ok:         true,
    correct,
    xp_awarded: xpResult?.xp_gained  ?? 0,
    total_xp:   xpResult?.total_xp   ?? null,
    level:      xpResult?.level      ?? null,
    level_up:   xpResult?.level_up   ?? false,
  });
});

export { dailyChallenge };
