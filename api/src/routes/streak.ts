import { Hono } from "hono";
import { z }    from "zod";
import { adminDb }    from "../db/client.js";
import { requireAuth, AppEnv } from "../middleware/auth.js";

const streak = new Hono<AppEnv>();

streak.use("*", requireAuth);

// GET /api/streak
// Devuelve la racha actual del usuario autenticado.
streak.get("/", async (c) => {
  const userId = c.get("userId");

  const { data, error } = await adminDb
    .from("streaks")
    .select("current_streak, max_streak, last_active_day, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) return c.json({ error: error.message }, 500);

  // Si aún no tiene fila devolvemos valores neutros
  return c.json({
    streak: data ?? {
      current_streak:  0,
      max_streak:      0,
      last_active_day: null,
      updated_at:      null,
    },
  });
});

// POST /api/streak
// Registra una respuesta y actualiza la racha via función SQL atómica.
const EventSchema = z.object({
  correct: z.boolean(),
});

streak.post("/", async (c) => {
  const body   = await c.req.json().catch(() => null);
  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const userId = c.get("userId");

  const { data, error } = await adminDb.rpc("upsert_streak", {
    p_user_id: userId,
    p_correct:  parsed.data.correct,
  });

  if (error) return c.json({ error: error.message }, 500);

  return c.json({ streak: data });
});

export default streak;