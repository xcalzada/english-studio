import { Hono } from "hono";
import { z } from "zod";
import { adminDb } from "../db/client.js";
import { requireAuth } from "../middleware/auth.js";

const progress = new Hono();

progress.use("*", requireAuth);

// GET /api/progress?unit_id=&tool_id=
progress.get("/", async (c) => {
  const userId = c.get("userId");
  const unitId = c.req.query("unit_id");
  const toolId = c.req.query("tool_id");

  let query = adminDb.from("progress").select("*").eq("user_id", userId);
  if (unitId) query = query.eq("unit_id", unitId);
  if (toolId) query = query.eq("tool_id", toolId);

  const { data, error } = await query;
  if (error) return c.json({ error: error.message }, 500);

  return c.json({ progress: data ?? [] });
});

const EventSchema = z.object({
  unit_id:     z.string(),
  tool_id:     z.enum(["grammar", "vocab", "listening", "reading", "writing", "discovery"]),
  exercise_id: z.string(),
  correct:     z.boolean(),
  revealed:    z.boolean().default(false),
  phase:       z.enum(["study", "check", "practice"]).default("practice"),
});

// POST /api/progress — usa función SQL atómica (sin N+1)
progress.post("/", async (c) => {
  const body   = await c.req.json().catch(() => null);
  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const userId = c.get("userId");
  const { unit_id, tool_id, exercise_id, correct } = parsed.data;

  const { data, error } = await adminDb.rpc("upsert_progress", {
    p_user_id:     userId,
    p_unit_id:     unit_id,
    p_tool_id:     tool_id,
    p_exercise_id: exercise_id,
    p_correct:     correct,
  });

  if (error) return c.json({ error: error.message }, 500);

  return c.json({ progress: data });
});

export default progress;  