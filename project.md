# English Studio — Proyecto.md
> Documento vivo. Actualizar al final de cada sesión de trabajo.

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend actual | React + Vite |
| Frontend Fase 5 | Next.js 14 (App Router) |
| Backend | Hono (Node.js) |
| Base de datos | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email + Google OAuth) |
| Deploy frontend | Vercel |
| Deploy backend | (pendiente confirmar) |
| Email | Resend (SMTP) |
| Blog | MDX + Contentlayer |
| SEO | next-seo + next-sitemap |
| Estilos | Tailwind CSS |

---

## URLs del proyecto

- **Frontend**: https://english-studio-eight.vercel.app
- **Supabase proyecto**: https://umflqyeosuyyiuknainp.supabase.co
- **Repo**: (añadir)

---

## Estado actual — Fases completadas

### ✅ Fase 0 — Mejoras sin dependencias
- Shuffle interleaving, badges de dificultad, atajos de teclado, audio, modo timed

### ✅ Fase 1-SEC — Seguridad
- JWT Bearer token auth, RLS en Supabase, adminDb vs userDb, SEC-4 a SEC-8

### ✅ Fase 1 Backend — Streak + XP
- Tablas: `streaks`, `xp`
- Rutas: `/api/streak`, `/api/xp`
- Hooks: `useStreak.js`, `useXp.js`
- LLM proxy: aparcado

### ✅ Fase 2 — Dashboard + Gamificación
- Daily Challenge (+15 XP bonus)
- Spaced Repetition (tabla `sr_items`, función `upsert_sr_item`)
- Progress Dashboard
- Hooks: `useSR.js`, `useDailyChallenge.js`, `useProgress.js`

### ✅ Fase 3 — Labs
- GrammarLab (Practice Zone)
- DiscoveryLab (Study → QuickCheck → Practice)
- VocabLab (3 modos)
- AudioLab (Web Speech API, 3 modos)
- ReadingLab (timer, MC + SA)
- WritingLab (prompt libre + corrección por frases clave)

### ✅ Fase 3 cont. — Mejoras
- SavedResult restore en TranslateItem, OrderItem, ErrorItem
- Block tags en presentSimple para QuickCheck
- +15 XP daily challenge conectado a BD
- Back navigation en PracticeSection (← Anterior)

### ✅ Fase 4 — Error DNA avanzado + Auth
- Error DNA v2: calendario, gráfica semanal, por tipo, modal repaso
- Tabla `daily_stats` + función `upsert_daily_stat`
- Login/registro: email + contraseña + verificación OTP + Google OAuth
- AuthScreen con modal en nav
- Acceso libre sin login (progreso no se guarda sin cuenta)

---

## Fase 5 — Roadmap (PENDIENTE)

### 5A — Migración Next.js + SEO base
**Objetivo**: páginas indexables, Home con 3 estrategias UX
**Trabajo**:
- [ ] Crear proyecto Next.js 14 (App Router)
- [ ] Migrar componentes React actuales
- [ ] Adaptar auth (Supabase + Next.js)
- [ ] Añadir `slug`, `level`, `category`, `unit_number` al schema de unidades
- [ ] Páginas estáticas: `/grammar/[level]/[slug]/`
- [ ] Home: Roadmap + Niveles + Categorías temáticas
- [ ] Páginas legales: `/about`, `/contact`, `/privacy`, `/cookies`, `/legal`
- [ ] next-seo: meta tags por página
- [ ] next-sitemap: sitemap automático

**URLs target**:
```
/                              → Home
/grammar/                      → Índice
/grammar/survival/             → Nivel básico
/grammar/survival/[slug]/      → Lección
/grammar/building/[slug]/      → Lección
/grammar/refining/[slug]/      → Lección
/about/ /contact/ /privacy/ /cookies/ /legal/
```

### 5B — BD de ejercicios + KPIs por unidad
**Objetivo**: cero hardcode, progreso por unidad/módulo, modos de repaso
**Trabajo**:
- [ ] Crear tablas: `modules`, `units`, `exercises`
- [ ] Crear tablas: `user_unit_progress`, `user_exercise_results`
- [ ] Trigger `notify_new_exercise` (has_new flag)
- [ ] Script seed: migrar `presentSimple.js` → BD
- [ ] Nuevos endpoints: `/api/units`, `/api/units/:slug/exercises`, `/api/exercises/:id/result`
- [ ] KPIs por unidad en Dashboard
- [ ] Símbolos de estado: ✅ completed / 🔄 in_progress / 🆕 has_new / ⭕ not_started
- [ ] Modos de repaso: por unidad, por módulo, modo kaos

### 5C — Blog + Schema.org
**Objetivo**: tráfico orgánico, artículos SEO
**Trabajo**:
- [ ] Tabla `blog_posts`
- [ ] MDX + Contentlayer setup
- [ ] URLs: `/blog/`, `/blog/[slug]/`
- [ ] Schema.org: Course, Article, BreadcrumbList
- [ ] Sitemap dividido: grammar + vocab + blog + static
- [ ] 5 primeros artículos (keywords objetivo)

**Keywords objetivo iniciales**:
| Artículo | Keyword |
|---|---|
| Present Simple vs Continuous | present simple exercises |
| How to use Past Simple | past simple grammar |
| English conditionals | if clauses english |
| Phrasal verbs list | common phrasal verbs |
| Present Perfect explained | present perfect english |

### 5D — Vocabulario
**Objetivo**: módulo independiente de vocabulario por temáticas
**Trabajo**:
- [ ] Tablas: `vocab_topics`, `vocab_words`, `user_vocab_progress`
- [ ] URLs: `/vocabulary/`, `/vocabulary/[topic]/`
- [ ] Vocab por unidad: `/grammar/[level]/[slug]/vocabulary/`
- [ ] SR propio para vocabulario
- [ ] Flashcards + modos de práctica

---

## Arquitectura de URLs — Fase 5

```
/                                    → Home
/grammar/                            → Hub gramática
/grammar/survival/                   → Nivel básico (A1/A2)
/grammar/building/                   → Nivel intermedio (A2/B1)
/grammar/refining/                   → Nivel avanzado (B1/B2)
/grammar/[level]/[slug]/             → Página de lección
/vocabulary/                         → Hub vocabulario
/vocabulary/[topic]/                 → Vocabulario por temática
/blog/                               → Blog
/blog/[slug]/                        → Artículo
/dashboard/                          → Panel usuario (requiere login)
/about/                              → Sobre nosotros
/contact/                            → Contacto
/privacy/                            → Política de privacidad
/cookies/                            → Política de cookies
/legal/                              → Aviso legal
/sitemap.xml                         → Generado automáticamente
```

---

## Categorías temáticas (menú nav)

| Categoría | Unidades |
|---|---|
| Tiempos Verbales | 1-14, 15-20, 23-28 |
| Estructuras de Frase | 21-22, 40-50, 93-96 |
| Palabras Conectoras | 97-113 |
| Vocabulario Gramatical | 59-84, 85-92 |
| Verbos Especiales | 29-36, 51-58, 114-115 |

---

## Niveles de dificultad

| Nivel | CEFR | Unidades clave |
|---|---|---|
| Survival | A1/A2 | 1,2,3,4,5,6,7,8,9, 37-39, 44-49, 59-66 |
| Building | A2/B1 | 10-14, 23-28, 29-36, 55-58, 70-96 |
| Refining | B1/B2 | 15-22, 50-54, 97-115 |

---

## Roadmap ¿Por dónde empiezo? (Home)

| Paso | Título | Unidades |
|---|---|---|
| 1 | Fundamentos | 1, 5, 44, 59 |
| 2 | Hablar del ayer | 10, 11 |
| 3 | Hablar del mañana | 25, 26 |
| 4 | Describir cosas | 85, 87, 106 |

---

## Schema de unidades (Fase 5)

```js
{
  id:           'present-simple',    // slug URL
  unit:         5,                   // número del libro
  level:        'survival',          // survival | building | refining
  category:     'tenses',            // categoría menú
  cefr:         'A1',                // A1 | A2 | B1 | B2
  slug:         'present-simple',    // URL
  grammarTitle: 'Present Simple',    // H1 de la página
  title:        'I do/work/like etc', // subtítulo
  published:    true,                // false = pending
  // ... resto igual que ahora
}
```

---

## Tablas Supabase — estado

| Tabla | Estado | Notas |
|---|---|---|
| `users` | ✅ | auth.users |
| `progress` | ✅ | progreso por ejercicio |
| `sr_items` | ✅ | spaced repetition |
| `streaks` | ✅ | racha diaria |
| `xp` | ✅ | puntos experiencia |
| `daily_challenge_completions` | ✅ | reto diario |
| `daily_stats` | ✅ | historial diario para calendario |
| `modules` | ⏳ Fase 5B | agrupación de unidades |
| `units` | ⏳ Fase 5B | unidades individuales |
| `exercises` | ⏳ Fase 5B | ejercicios en BD |
| `user_unit_progress` | ⏳ Fase 5B | estado por unidad |
| `user_exercise_results` | ⏳ Fase 5B | historial completo |
| `vocab_topics` | ⏳ Fase 5D | temáticas vocabulario |
| `vocab_words` | ⏳ Fase 5D | palabras |
| `user_vocab_progress` | ⏳ Fase 5D | progreso vocab SR |
| `blog_posts` | ⏳ Fase 5C | artículos blog |
| `static_pages` | ⏳ Fase 5C | páginas legales |

---

## Bugs conocidos / deuda técnica

- [ ] `ActiveGrammarLab.jsx` — borrar (reemplazado por DiscoveryLab)
- [ ] `useProgress.ts` y `useProgress.js` coexisten — limpiar
- [ ] `useSession.ts` y `useSession.js` coexisten — limpiar
- [ ] Token JWT no tiene refresh handler — si expira falla en silencio
- [ ] `daily_stats` solo se alimenta desde Grammar/Discovery — otros labs no registran
- [ ] GuestGate.jsx — ya no se usa, borrar

---

## Contenido — unidades

| # | Título | Estado |
|---|---|---|
| 5 | Present Simple | ✅ Completo |
| 1 | am/is/are | ⏳ Pending |
| 2 | am/is/are questions | ⏳ Pending |
| 3 | Present Continuous | ⏳ Pending |
| 4 | Present Continuous questions | ⏳ Pending |
| 6 | Present Simple negative | ⏳ Pending |
| 7 | Present Simple questions | ⏳ Pending |
| 8 | Present Continuous vs Simple | ⏳ Pending |
| 9 | have/have got | ⏳ Pending |
| 10 | was/were | ⏳ Pending |
| 11 | Past Simple | ⏳ Pending |
| 12 | Past Simple negative/questions | ⏳ Pending |
| 13 | Past Continuous | ⏳ Pending |
| 14 | Past Continuous vs Simple | ⏳ Pending |
| 15 | Present Perfect 1 | ⏳ Pending |
| 16 | Present Perfect 2 | ⏳ Pending |
| 17 | Present Perfect 3 | ⏳ Pending |
| 18 | Present Perfect 4 | ⏳ Pending |
| 19 | for/since/ago | ⏳ Pending |
| 20 | Present Perfect vs Past | ⏳ Pending |
| 21 | Passive 1 | ⏳ Pending |
| 22 | Passive 2 | ⏳ Pending |
| 23 | be/have/do | ⏳ Pending |
| 24 | Regular/Irregular verbs | ⏳ Pending |
| 25 | Future: going | ⏳ Pending |
| 26 | going to | ⏳ Pending |
| 27 | will/shall 1 | ⏳ Pending |
| 28 | will/shall 2 | ⏳ Pending |
| 29 | might | ⏳ Pending |
| 30 | can/could | ⏳ Pending |
| 31 | must/mustn't | ⏳ Pending |
| 32 | should | ⏳ Pending |
| 33 | have to | ⏳ Pending |
| 34 | Would you like | ⏳ Pending |
| 35 | Imperatives | ⏳ Pending |
| 36 | used to | ⏳ Pending |
| 37 | there is/are | ⏳ Pending |
| 38 | there was/were | ⏳ Pending |
| 39 | It... | ⏳ Pending |
| 40-115 | ... | ⏳ Pending |

---

## Notas de sesión

### 2026-03-15
- Completada Fase 4: Error DNA avanzado, Auth (email + contraseña), acceso libre sin login
- Login funciona ✅ — registro sin confirmación email (Confirm email desactivado temporalmente)
- SMTP Resend configurado pero dominio resend.dev solo envía al email del propietario
- Pendiente: comprar dominio → verificar en Resend → activar Confirm email
- Pendiente: configurar Google OAuth
- Pendiente: ejecutar supabase_daily_stats.sql y supabase_fix_daily_stats_fk.sql
- Diseñada arquitectura completa Fase 5 (5A → 5D) con 115 unidades, vocabulario, blog, páginas legales
- Creado proyecto.md como documento de referencia
- Próximo: crear contenido de nuevas unidades → empezar Fase 5A con 5+ unidades listas
- Deuda técnica: borrar ActiveGrammarLab.jsx, GuestGate.jsx, limpiar .ts/.js duplicados en hooks