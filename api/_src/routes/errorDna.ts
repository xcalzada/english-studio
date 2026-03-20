import { Hono }        from "hono";
import { adminDb }     from "../db/client.js";
import { requireAuth, AppEnv } from "../middleware/auth.js";

const errorDna = new Hono<AppEnv>();
errorDna.use("*", requireAuth);

// ─── GET /api/error-dna ──────────────────────────────────────────────────────
// Perfil de errores global: precisión, tendencia, por unidad, por tipo, débiles
errorDna.get("/", async (c) => {
  const userId = c.get("userId");

  const { data, error } = await adminDb
    .from("sr_items")
    .select("unit_id, tool_id, exercise_id, correct_streak, total_attempts, total_errors, last_seen")
    .eq("user_id", userId)
    .gt("total_attempts", 0);

  if (error) return c.json({ error: error.message }, 500);

  const items = data ?? [];

  if (items.length === 0) {
    return c.json({
      dna: {
        total_attempts: 0, total_errors: 0, overall_accuracy: 0,
        trend: "no_data", by_unit: [], by_type: [], weak_exercises: [],
      },
    });
  }

  let totalAttempts = 0;
  let totalErrors   = 0;

  const byUnit: Record<string, { attempts: number; errors: number }> = {};
  const byType: Record<string, { attempts: number; errors: number }> = {};
  const weakItems: Array<{ unit_id: string; exercise_id: string; tool_id: string; attempts: number; errors: number }> = [];

  for (const item of items) {
    const attempts = item.total_attempts;
    const errors   = item.total_errors ?? 0;

    totalAttempts += attempts;
    totalErrors   += errors;

    // Por unidad
    if (!byUnit[item.unit_id]) byUnit[item.unit_id] = { attempts: 0, errors: 0 };
    byUnit[item.unit_id].attempts += attempts;
    byUnit[item.unit_id].errors   += errors;

    // Por tipo (tool_id = 'grammar', 'discovery', 'vocab'...)
    const type = item.tool_id ?? "grammar";
    if (!byType[type]) byType[type] = { attempts: 0, errors: 0 };
    byType[type].attempts += attempts;
    byType[type].errors   += errors;

    // Débil = ≥2 errores Y racha actual = 0
    if (errors >= 1 && item.correct_streak === 0) {
      weakItems.push({ unit_id: item.unit_id, exercise_id: item.exercise_id, tool_id: item.tool_id, attempts, errors });
    }
  }

  const byUnitFormatted = Object.entries(byUnit).map(([unit_id, s]) => ({
    unit_id,
    attempts: s.attempts,
    errors:   s.errors,
    accuracy: s.attempts > 0 ? Math.round(((s.attempts - s.errors) / s.attempts) * 100) : 100,
  })).sort((a, b) => a.accuracy - b.accuracy);

  const byTypeFormatted = Object.entries(byType).map(([type, s]) => ({
    type,
    attempts: s.attempts,
    errors:   s.errors,
    accuracy: s.attempts > 0 ? Math.round(((s.attempts - s.errors) / s.attempts) * 100) : 100,
  })).sort((a, b) => a.accuracy - b.accuracy);

  const weakExercises = weakItems.sort((a, b) => b.errors - a.errors).slice(0, 10);

  // Tendencia: últimos 7 días vs global
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const recent = items.filter(i => i.last_seen >= cutoffStr);
  const recentAttempts = recent.reduce((s, i) => s + i.total_attempts, 0);
  const recentErrors   = recent.reduce((s, i) => s + (i.total_errors ?? 0), 0);
  const overallAccuracy = Math.round(((totalAttempts - totalErrors) / totalAttempts) * 100);
  const recentAccuracy  = recentAttempts > 0
    ? Math.round(((recentAttempts - recentErrors) / recentAttempts) * 100) : 0;
  const trend =
    recentAttempts === 0                        ? "no_data"
    : recentAccuracy >= overallAccuracy + 5     ? "improving"
    : recentAccuracy <= overallAccuracy - 5     ? "needs_work"
    : "stable";

  return c.json({
    dna: {
      total_attempts: totalAttempts, total_errors: totalErrors,
      overall_accuracy: overallAccuracy, trend,
      by_unit: byUnitFormatted, by_type: byTypeFormatted,
      weak_exercises: weakExercises,
    },
  });
});

// ─── GET /api/error-dna/history ──────────────────────────────────────────────
// Historial diario completo desde el primer día — para calendario y gráfica
errorDna.get("/history", async (c) => {
  const userId = c.get("userId");

  const { data, error } = await adminDb
    .from("daily_stats")
    .select("stat_date, exercises, correct, errors, xp_earned, streak_end")
    .eq("user_id", userId)
    .order("stat_date", { ascending: true });

  if (error) return c.json({ error: error.message }, 500);

  const rows = data ?? [];

  // Agrupar por semana para la gráfica
  const byWeek: Record<string, { exercises: number; correct: number; errors: number; xp: number }> = {};
  for (const row of rows) {
    const d    = new Date(row.stat_date);
    const day  = d.getDay(); // 0=dom
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // lunes
    const monday = new Date(d.setDate(diff)).toISOString().slice(0, 10);
    if (!byWeek[monday]) byWeek[monday] = { exercises: 0, correct: 0, errors: 0, xp: 0 };
    byWeek[monday].exercises += row.exercises;
    byWeek[monday].correct   += row.correct;
    byWeek[monday].errors    += row.errors;
    byWeek[monday].xp        += row.xp_earned;
  }

  const weekly = Object.entries(byWeek).map(([week, s]) => ({
    week,
    exercises: s.exercises,
    accuracy:  s.exercises > 0 ? Math.round((s.correct / s.exercises) * 100) : 0,
    xp:        s.xp,
  })).sort((a, b) => a.week.localeCompare(b.week));

  return c.json({ history: rows, weekly });
});

export { errorDna };