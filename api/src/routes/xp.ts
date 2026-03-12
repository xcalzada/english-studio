import { Hono } from "hono";
import { z }    from "zod";
import { adminDb }     from "../db/client.js";
import { requireAuth } from "../middleware/auth.js";

const xp = new Hono();

xp.use("*", requireAuth);

// GET /api/xp — devuelve XP total y nivel del usuario
xp.get("/", async (c) => {
  const userId = c.get("userId");

  const { data, error } = await adminDb
    .from("xp")
    .select("total_xp, level, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) return c.json({ error: error.message }, 500);

  return c.json({
    xp: data ?? { total_xp: 0, level: 1, updated_at: null },
  });
});

// POST /api/xp — registra una respuesta y devuelve XP ganado
const EventSchema = z.object({
  correct: z.boolean(),
  streak:  z.number().int().min(0).default(0),  // racha actual de la sesión
  is_new:  z.boolean().default(true),            // true si el ejercicio no estaba completado antes
});

xp.post("/", async (c) => {
  const body   = await c.req.json().catch(() => null);
  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const userId = c.get("userId");
  const { correct, streak, is_new } = parsed.data;

  const { data, error } = await adminDb.rpc("award_xp", {
    p_user_id: userId,
    p_correct: correct,
    p_streak:  streak,
    p_is_new:  is_new,
  });

  if (error) return c.json({ error: error.message }, 500);

  return c.json({ xp: data });
});

export default xp;