import { Hono } from "hono";
import { z }    from "zod";
import { adminDb }     from "../db/client.js";
import { requireAuth } from "../middleware/auth.js";

const sr = new Hono();
sr.use("*", requireAuth);

// GET /api/sr?unit_id=&tool_id=
sr.get("/", async (c) => {
  const userId = c.get("userId");
  const unitId = c.req.query("unit_id");
  const toolId = c.req.query("tool_id");

  if (!unitId || !toolId) return c.json({ error: "unit_id and tool_id required" }, 400);

  const { data, error } = await adminDb
    .from("sr_items")
    .select("exercise_id, correct_streak, total_attempts, next_review, last_seen")
    .eq("user_id", userId)
    .eq("unit_id", unitId)
    .eq("tool_id", toolId);

  if (error) return c.json({ error: error.message }, 500);

  const today = new Date().toISOString().slice(0, 10);
  const items: Record<string, {
    correct_streak: number;
    total_attempts: number;
    next_review:    string;
    due_today:      boolean;
  }> = {};

  for (const row of data ?? []) {
    items[row.exercise_id] = {
      correct_streak: row.correct_streak,
      total_attempts: row.total_attempts,
      next_review:    row.next_review,
      due_today:      row.next_review <= today,
    };
  }

  return c.json({ items, today });
});

// POST /api/sr — registrar respuesta, actualizar SR e incrementar daily_stats
const SrEventSchema = z.object({
  unit_id:     z.string(),
  tool_id:     z.string(),
  exercise_id: z.string(),
  correct:     z.boolean(),
  xp:          z.number().int().min(0).default(0),
  streak:      z.number().int().min(0).default(0),
});

sr.post("/", async (c) => {
  const body   = await c.req.json().catch(() => null);
  const parsed = SrEventSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const userId = c.get("userId");
  const { unit_id, tool_id, exercise_id, correct, xp, streak } = parsed.data;

  // 1. Actualizar SR
  const { data, error } = await adminDb.rpc("upsert_sr_item", {
    p_user_id:     userId,
    p_unit_id:     unit_id,
    p_tool_id:     tool_id,
    p_exercise_id: exercise_id,
    p_correct:     correct,
  });

  if (error) return c.json({ error: error.message }, 500);

  // 2. Acumular en daily_stats (fire & forget)
  adminDb.rpc("upsert_daily_stat", {
    p_user_id: userId,
    p_correct: correct,
    p_xp:      xp,
    p_streak:  streak,
  }).then(({ error: e }) => {
    if (e) console.error("[SR] upsert_daily_stat error:", e.message);
  });

  return c.json({ sr: data?.[0] ?? null });
});

export default sr;