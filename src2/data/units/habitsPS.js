export const habitsPSUnit = {
  id: 'present-simple-mastery',
  title: 'Rutinas y Hábitos',
  grammarTitle: 'Present Simple',
  description: 'Guía completa nivel Cambridge: Rutinas, Adverbios y Errores comunes.',

  // --- TEORÍA (sin cambios) ---
  theoryBlock: {
    block1: {
      title: '1. Oraciones Afirmativas',
      content: [
        "<strong>Fórmula:</strong> Subject + Verb (base / -s) + Complement",
        "• <strong>I / You / We / They:</strong> El verbo no cambia.<br><em>Example: They eat pizza on Fridays.</em>",
        "• <strong>He / She / It:</strong> Añadimos -s al verbo.<br><em>Example: He eats pizza on Fridays.</em>",
        "• <strong>Uso:</strong> Se usa para situaciones que se repiten o que siempre son verdad."
      ]
    },
    block2: {
      title: '2. Reglas de la -S (He/She/It)',
      content: [
        "Cuando el sujeto es 3ª persona, el verbo cambia según su terminación:",
        "• <strong>General:</strong> +s (<em>Work → Works, Live → Lives</em>)",
        "• <strong>-o, -sh, -ch, -ss, -x:</strong> +es (<em>Go → Goes, Finish → Finishes, Fix → Fixes</em>)",
        "• <strong>Consonante + Y:</strong> -ies (<em>Fly → Flies, Copy → Copies</em>)",
        "• <strong>Vocal + Y:</strong> +s (<em>Play → Plays, Say → Says</em>)"
      ]
    },
    block3: {
      title: '3. Oraciones Negativas',
      content: [
        "<strong>Fórmula:</strong> Subject + do/does + NOT + Verb (base form)",
        "• <strong>I / You / We / They:</strong> Usamos <strong>don't</strong> (do not).<br><em>Example: We don't like cold weather.</em>",
        "• <strong>He / She / It:</strong> Usamos <strong>doesn't</strong> (does not).<br><em>Example: She doesn't like cold weather.</em>",
        "⚠️ <strong>Regla Crítica:</strong> Con el auxiliar 'doesn't', el verbo vuelve a su forma normal (pierde la -s).<br>✅ <em>He doesn't work</em> / ❌ <em>He doesn't works</em>"
      ]
    },
    block4: {
      title: '4. Oraciones Interrogativas',
      content: [
        "<strong>Fórmula:</strong> Do / Does + Subject + Verb (base form) + ?",
        "• <strong>Do:</strong> Para I, You, We, They.<br><em>Example: Do you live in London?</em>",
        "• <strong>Does:</strong> Para He, She, It.<br><em>Example: Does he live in London?</em>",
        "• <strong>Respuestas cortas:</strong><br>Yes, I do. / No, I don't.<br>Yes, she does. / No, she doesn't.",
        "⚠️ <strong>Recordatorio:</strong> En preguntas tampoco se pone -s al verbo."
      ]
    },
    block5: {
      title: '5. Adverbios de Frecuencia',
      content: [
        "Indican qué tan seguido hacemos algo: <em>Always, Usually, Often, Sometimes, Never.</em>",
        "<strong>Posición 1 (Verbos normales):</strong> Antes del verbo.<br>• <em>I <strong>always</strong> arrive on time.</em>",
        "<strong>Posición 2 (Verbo To Be):</strong> Después del verbo.<br>• <em>She <strong>is often</strong> tired.</em>",
        "<strong>Posición 3 (Expresiones):</strong> Al final de la frase.<br>• <em>I study English <strong>every day</strong>.</em>"
      ]
    },
    block6: {
      title: '6. Checklist de Errores',
      content: [
        "• <strong>Olvidar la -s:</strong> ❌ <em>He play</em> → ✅ <em>He plays</em>",
        "• <strong>Doble -s:</strong> ❌ <em>Does he plays?</em> → ✅ <em>Does he play?</em>",
        "• <strong>Mal orden con To Be:</strong> ❌ <em>I never am sad</em> → ✅ <em>I am never sad</em>",
        "• <strong>Don't con He/She/It:</strong> ❌ <em>She don't go</em> → ✅ <em>She doesn't go</em>"
      ]
    }
  },

  // --- EJERCICIOS MIXTOS ---
  theoryQuiz: [

    // ── FILL: Regla de la -s básica ──────────────────────────────────────────
    {
      id: 'q1',
      type: 'fill',
      q: "My father ______ (cook) very well.",
      ans: "cooks",
      explanation: "My father = He. Verbo normal → añadimos -s."
    },
    {
      id: 'q2',
      type: 'fill',
      q: "My sister always ______ (study) at night.",
      ans: "studies",
      explanation: "Study termina en consonante + y → cambia a -ies."
    },
    {
      id: 'q3',
      type: 'fill',
      q: "He ______ (watch) TV in the morning.",
      ans: "watches",
      explanation: "Watch termina en -ch → añadimos -es."
    },

    // ── CHOICE: Negativas y afirmativas ──────────────────────────────────────
    {
      id: 'q4',
      type: 'choice',
      q: "Water ______ at 100°C. (hecho científico)",
      options: ["boil", "boils", "is boiling", "boiled"],
      ans: "boils",
      explanation: "Hecho científico → Present Simple. Water = It → boils."
    },
    {
      id: 'q5',
      type: 'choice',
      q: "Which sentence is CORRECT?",
      options: [
        "She don't like cold weather.",
        "She doesn't likes cold weather.",
        "She doesn't like cold weather.",
        "She not like cold weather."
      ],
      ans: "She doesn't like cold weather.",
      explanation: "She → doesn't. Después de doesn't, el verbo va en infinitivo (sin -s)."
    },
    {
      id: 'q6',
      type: 'choice',
      q: "Where does 'always' go? → 'I arrive on time.'",
      options: [
        "I arrive always on time.",
        "I always arrive on time.",
        "Always I arrive on time.",
        "I arrive on always time."
      ],
      ans: "I always arrive on time.",
      explanation: "Los adverbios de frecuencia van ANTES del verbo principal."
    },

    // ── ERROR: Corrige la frase ───────────────────────────────────────────────
    {
      id: 'q7',
      type: 'error',
      q: "He don't work on Sundays.",
      ans: "He doesn't work on Sundays.",
      explanation: "Con He/She/It usamos DOESN'T. El verbo sigue en infinitivo."
    },
    {
      id: 'q8',
      type: 'error',
      q: "Does he plays football every day?",
      ans: "Does he play football every day?",
      explanation: "En preguntas con Does, el verbo NO lleva -s. La -s ya está en Does."
    },
    {
      id: 'q9',
      type: 'error',
      q: "I never am late for school.",
      ans: "I am never late for school.",
      explanation: "Con To Be, el adverbio va DESPUÉS del verbo: I am never..."
    },

    // ── ORDER: Reordena las palabras ──────────────────────────────────────────
    {
      id: 'q10',
      type: 'order',
      words: ["always", "She", "arrives", "time", "on"],
      ans: "She always arrives on time",
      explanation: "Orden: Sujeto + adverbio + verbo + complemento."
    },
    {
      id: 'q11',
      type: 'order',
      words: ["he", "Does", "football", "play", "?"],
      ans: "Does he play football ?",
      explanation: "Preguntas: Does + sujeto + verbo infinitivo + complemento + ?"
    },
    {
      id: 'q12',
      type: 'order',
      words: ["doesn't", "She", "cold", "like", "weather"],
      ans: "She doesn't like cold weather",
      explanation: "Negación: Sujeto + doesn't + verbo infinitivo + complemento."
    },

    // ── FILL: Adverbios y casos especiales ───────────────────────────────────
    {
      id: 'q13',
      type: 'fill',
      q: "She ______ (always / go) to work at 8.",
      ans: "always goes",
      explanation: "Adverbio antes del verbo. She → goes (-es porque termina en -o)."
    },
    {
      id: 'q14',
      type: 'fill',
      q: "He ______ (be / always) late.",
      ans: "is always",
      explanation: "Excepción To Be: el adverbio va DESPUÉS. He is always..."
    },
    {
      id: 'q15',
      type: 'fill',
      q: "Does she ______ (like) tea?",
      ans: "like",
      explanation: "En preguntas con Does, el verbo va en infinitivo sin -s."
    },

  ],

  // --- VOCABULARIO (sin cambios) ---
  vocabulary: [
    { id: 'v1', word: 'Always',    span: 'Siempre'      },
    { id: 'v2', word: 'Usually',   span: 'Normalmente'  },
    { id: 'v3', word: 'Often',     span: 'A menudo'     },
    { id: 'v4', word: 'Sometimes', span: 'A veces'      },
    { id: 'v5', word: 'Never',     span: 'Nunca'        },
    { id: 'v6', word: 'Wake up',   span: 'Despertarse'  },
    { id: 'v7', word: 'Routine',   span: 'Rutina'       },
    { id: 'v8', word: 'Hardly ever', span: 'Casi nunca' },
  ],

  activeRules: null,

  reading: {
    title: "My Sister's Routine",
    text: "My sister is very disciplined. She always wakes up at 6 AM. She never watches TV in the morning because she studies for her exams. She usually drinks coffee, but she sometimes drinks tea.",
    questions: [
      { id: 'r1', q: "Does she watch TV in the morning?", ans: "No" },
      { id: 'r2', q: "What does she usually drink?",      ans: "Coffee" }
    ]
  },

  listening: {
    text: "I usually play football on Saturdays, but my brother never plays because he hates sports.",
    correctItems: ['usually', 'never', 'plays'],
    options: ['always', 'usually', 'never', 'plays', 'cooking']
  }
};

// ─── ÍNDICE DE UNIDADES ───────────────────────────────────────────────────────
// Asegúrate de que tu UNITS_DATA sigue este formato:
export const UNITS_DATA = {
  [habitsPSUnit.id]: habitsPSUnit,
  // añade más unidades aquí...
};