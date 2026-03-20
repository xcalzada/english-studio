import { Hono } from "hono";
import { z }    from "zod";
import { adminDb }     from "../db/client.js";
import { requireAuth } from "../middleware/auth.js";

const users = new Hono();

users.use("*", requireAuth);

// POST /api/users/guest-merge
// Merges guest cookie progress into the authenticated user's DB records.
// - XP:     adds guest.xp to the user's current total_xp.
// - Streak: sets current_streak to max(db.current_streak, guest.streak).
// - Achievements: stored client-side only for now (no DB table yet).
const MergeSchema = z.object({
  xp:           z.number().int().min(0).max(50_000),
  streak:       z.number().int().min(0).max(3650),
  achievements: z.array(z.string().max(64)).max(60),
});

users.post("/guest-merge", async (c) => {
  const body   = await c.req.json().catch(() => null);
  const parsed = MergeSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const userId = c.get("userId");
  const { xp: guestXp, streak: guestStreak } = parsed.data;

  // ── XP ───────────────────────────────────────────────────────────────────
  if (guestXp > 0) {
    // Read current total, then upsert with sum
    const { data: xpRow } = await adminDb
      .from("xp")
      .select("total_xp")
      .eq("user_id", userId)
      .maybeSingle();

    const currentXp = (xpRow?.total_xp as number) ?? 0;

    const { error: xpErr } = await adminDb
      .from("xp")
      .upsert(
        { user_id: userId, total_xp: currentXp + guestXp, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );

    if (xpErr) return c.json({ error: xpErr.message }, 500);
  }

  // ── Streak ───────────────────────────────────────────────────────────────
  if (guestStreak > 0) {
    const { data: streakRow } = await adminDb
      .from("streaks")
      .select("current_streak, max_streak")
      .eq("user_id", userId)
      .maybeSingle();

    const dbCurrent = (streakRow?.current_streak as number) ?? 0;
    const dbMax     = (streakRow?.max_streak     as number) ?? 0;
    const merged    = Math.max(dbCurrent, guestStreak);
    const newMax    = Math.max(dbMax, merged);

    if (merged > dbCurrent) {
      const { error: streakErr } = await adminDb
        .from("streaks")
        .upsert(
          {
            user_id:        userId,
            current_streak: merged,
            max_streak:     newMax,
            updated_at:     new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

      if (streakErr) return c.json({ error: streakErr.message }, 500);
    }
  }

  return c.json({ ok: true });
});

export default users;
