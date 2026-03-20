import { Hono } from "hono";
import { adminDb } from "../db/client.js";

const units = new Hono();

// GET /api/units/search?q=present+tense
// Public — no auth required.
units.get("/search", async (c) => {
  const q = (c.req.query("q") ?? "").trim();

  if (q.length < 2) return c.json({ results: [] });

  const pattern = `%${q}%`;

  const { data, error } = await adminDb
    .from("units")
    .select("id, title, grammar_title, cefr, level, slug")
    .eq("published", true)
    .or(
      `grammar_title.ilike.${pattern},title.ilike.${pattern},cefr.ilike.${pattern},level.ilike.${pattern}`
    )
    .order("level")
    .limit(12);

  if (error) return c.json({ error: error.message }, 500);

  return c.json({ results: data ?? [] });
});

export default units;
