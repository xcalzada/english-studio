export const comparativesUnit = {
  id: 'comparatives-mastery',
  title: 'Comparando el Mundo',
  grammarTitle: 'Comparatives',
  description: 'Domina las formas comparativas: -er, more, than, irregulares y modificadores.',

  // ═══════════════════════════════════════════════════════════════════════════
  // TEORÍA — fiel al libro Murphy + poster de apuntes
  // ═══════════════════════════════════════════════════════════════════════════
  theoryBlock: {

    // ── BLOQUE 1: Qué es un comparativo ──────────────────────────────────────
    block1: {
      title: '¿Qué es un comparativo?',
      content: [
        { type: 'text', text: 'Usamos los comparativos para decir que algo es <strong>MÁS [adjetivo/adverbio]</strong> que otra cosa. En inglés hay dos formas de construirlos: con <strong>-er</strong> o con <strong>more</strong>.' },
        { type: 'table',
          headers: ['Base', '→', 'Comparativo', 'Significa'],
          rows: [
            ['old',       '→', '<strong>older</strong>',          'más viejo'],
            ['heavy',     '→', '<strong>heavier</strong>',        'más pesado'],
            ['expensive', '→', '<strong>more expensive</strong>', 'más caro'],
          ]
        },
        { type: 'tip', emoji: '🔑', text: 'La palabra <strong>than</strong> (= "que") une las dos cosas que comparamos. Siempre va después del comparativo.' },
        { type: 'example', en: 'She\'s <strong>taller than</strong> him.', es: 'Ella es más alta que él.' },
        { type: 'example', en: 'The Europa Hotel is <strong>more expensive than</strong> the Grand.', es: 'El Hotel Europa es más caro que el Grand.' },
        { type: 'rule', warn: true, text: '❌ <em>Athens is older <u>that</u> Rome.</em> — incorrecto.<br>✅ El conector siempre es <strong>than</strong>, nunca "that".' },
      ]
    },

    // ── BLOQUE 2: Regla -er (1 sílaba) ───────────────────────────────────────
    block2: {
      title: 'Regla 1 — Palabras cortas (1 sílaba) → añadimos -er',
      content: [
        { type: 'text', text: 'Los adjetivos y adverbios de <strong>una sílaba</strong> forman el comparativo añadiendo <strong>-er</strong> al final.' },
        { type: 'grid', items: [
          { base: 'old',   comp: 'older',   emoji: '👴' },
          { base: 'slow',  comp: 'slower',  emoji: '🐢' },
          { base: 'cheap', comp: 'cheaper', emoji: '💰' },
          { base: 'nice',  comp: 'nicer',   emoji: '😊' },
          { base: 'late',  comp: 'later',   emoji: '🕐' },
          { base: 'fast',  comp: 'faster',  emoji: '⚡' },
          { base: 'tall',  comp: 'taller',  emoji: '📏' },
          { base: 'large', comp: 'larger',  emoji: '🌍' },
        ]},
        { type: 'subtitle', text: '✏️ Ortografía — casos especiales' },
        { type: 'table',
          headers: ['Regla de ortografía', 'Ejemplos'],
          rows: [
            ['Termina en <strong>-e</strong> → solo añade <strong>-r</strong>',                                    'nic<strong>e</strong> → nic<strong>er</strong> &nbsp;/&nbsp; larg<strong>e</strong> → larg<strong>er</strong>'],
            ['Termina en <strong>consonante-vocal-consonante</strong> → dobla la última letra', 'bi<strong>g</strong> → bi<strong>gg</strong>er &nbsp;/&nbsp; ho<strong>t</strong> → ho<strong>tt</strong>er &nbsp;/&nbsp; thi<strong>n</strong> → thi<strong>nn</strong>er'],
          ]
        },
        { type: 'example', en: 'Rome is <strong>old</strong>, but Athens is <strong>older</strong>. <em>(no "more old")</em>', es: 'Roma es vieja, pero Atenas es más vieja.' },
        { type: 'example', en: 'Is it <strong>cheaper</strong> to go by car or by train? <em>(no "more cheap")</em>', es: '¿Es más barato ir en coche o en tren?' },
        { type: 'example', en: 'Helen wants a <strong>bigger</strong> car. <em>(no "more big")</em>', es: 'Helen quiere un coche más grande.' },
        { type: 'example', en: 'This coat is OK, but I think the other one is <strong>nicer</strong>. <em>(no "more nice")</em>', es: 'Este abrigo está bien, pero creo que el otro es más bonito.' },
      ]
    },

    // ── BLOQUE 3: Regla -ier (palabras en -y) ────────────────────────────────
    block3: {
      title: 'Regla 2 — Palabras con -y → cambia a -ier',
      content: [
        { type: 'tip', emoji: '🎪', text: 'Los adjetivos que terminan en <strong>-y</strong> hacen un truco: la <strong>-y</strong> desaparece y ponemos <strong>-ier</strong>.' },
        { type: 'grid', items: [
          { base: 'easy',  comp: 'easier',  emoji: '✅' },
          { base: 'heavy', comp: 'heavier', emoji: '🏋️' },
          { base: 'early', comp: 'earlier', emoji: '⏰' },
          { base: 'happy', comp: 'happier', emoji: '😄' },
          { base: 'busy',  comp: 'busier',  emoji: '📅' },
          { base: 'noisy', comp: 'noisier', emoji: '🔊' },
          { base: 'funny', comp: 'funnier', emoji: '😂' },
        ]},
        { type: 'example', en: 'Don\'t take the bus. It\'s <strong>easier</strong> to take a taxi. <em>(no "more easy")</em>', es: 'No cojas el autobús. Es más fácil coger un taxi.' },
        { type: 'rule', warn: true, text: '❌ <em>more easy / more heavy / more noisy</em> — incorrecto.<br>✅ Con palabras en <strong>-y</strong>, siempre usamos <strong>-ier</strong>.' },
      ]
    },

    // ── BLOQUE 4: Regla more (2+ sílabas) ────────────────────────────────────
    block4: {
      title: 'Regla 3 — Palabras largas (2+ sílabas) → more ...',
      content: [
        { type: 'text', text: 'Los adjetivos y adverbios de <strong>dos o más sílabas</strong> (que no terminan en -y) forman el comparativo poniendo <strong>more</strong> delante. No se modifica la palabra.' },
        { type: 'grid', items: [
          { base: 'careful',     comp: 'more careful',     emoji: '🧐' },
          { base: 'expensive',   comp: 'more expensive',   emoji: '💸' },
          { base: 'polite',      comp: 'more polite',      emoji: '🤝' },
          { base: 'interesting', comp: 'more interesting', emoji: '🤔' },
          { base: 'comfortable', comp: 'more comfortable', emoji: '🛋️' },
          { base: 'beautiful',   comp: 'more beautiful',   emoji: '🌸' },
          { base: 'difficult',   comp: 'more difficult',   emoji: '🧩' },
          { base: 'dangerous',   comp: 'more dangerous',   emoji: '⚠️' },
        ]},
        { type: 'subtitle', text: 'Adverbios en -ly → también usan more' },
        { type: 'grid', items: [
          { base: 'slowly',    comp: 'more slowly',    emoji: '🐢' },
          { base: 'carefully', comp: 'more carefully', emoji: '🎯' },
          { base: 'fluently',  comp: 'more fluently',  emoji: '🗣️' },
        ]},
        { type: 'example', en: 'You must be <strong>more careful</strong>.', es: 'Debes ser más cuidadoso.' },
        { type: 'example', en: 'I want to do something <strong>more interesting</strong>.', es: 'Quiero hacer algo más interesante.' },
        { type: 'example', en: 'Is it <strong>more expensive</strong> to go by car or by train?', es: '¿Es más caro ir en coche o en tren?' },
        { type: 'teacher', text: '💡 <strong>Palabras con doble opción</strong> como <em>clever, quiet, narrow, simple, common</em> pueden usar <em>-er</em> o <em>more</em>. Ambas son correctas: <em>quieter</em> = <em>more quiet</em> ✅' },
      ]
    },

    // ── BLOQUE 5: Irregulares ─────────────────────────────────────────────────
    block5: {
      title: 'Regla 4 — Irregulares (¡hay que memorizar!)',
      content: [
        { type: 'tip', emoji: '⭐', text: 'Estas palabras no siguen ninguna regla. Tienen su propia forma comparativa. ¡A memorizarlas!' },
        { type: 'table',
          headers: ['Adjetivo / Adverbio', '→', 'Comparativo', 'Ejemplo del libro'],
          rows: [
            ['<strong>good</strong> / well',  '→', '<strong>better</strong>',         'The weather wasn\'t good yesterday, but it\'s <strong>better</strong> today.'],
            ['<strong>bad</strong> / badly',   '→', '<strong>worse</strong>',          '"Do you feel better?" — "No, I feel <strong>worse</strong>."'],
            ['<strong>far</strong>',            '→', '<strong>further / farther</strong>', '"How far is it?" — "It\'s <strong>further</strong> than I thought."'],
            ['<strong>much / many</strong>',   '→', '<strong>more</strong>',           'They\'ve got <strong>more</strong> money than they need.'],
            ['<strong>little</strong>',        '→', '<strong>less</strong>',           'The film was <strong>less</strong> than an hour long.'],
          ]
        },
        { type: 'rule', warn: true, text: '❌ Nunca: <em>more good, more bad, gooder, badder</em>.<br>✅ Siempre: <strong>better</strong> y <strong>worse</strong>.' },
        { type: 'example', en: 'Which is <strong>worse</strong> — a headache or a toothache?', es: '¿Qué es peor — un dolor de cabeza o un dolor de muelas?' },
      ]
    },

    // ── BLOQUE 6: than + pronombres ───────────────────────────────────────────
    block6: {
      title: 'Usar than — pronombres y estructura',
      content: [
        { type: 'text', text: 'Después de <strong>than</strong> normalmente usamos pronombres objeto (<em>me, him, her, us, them</em>), aunque también se puede usar el sujeto con verbo.' },
        { type: 'table',
          headers: ['Forma informal (más común)', 'Forma formal (también correcta)'],
          rows: [
            ['I can run faster than <strong>him</strong>.', 'I can run faster than <strong>he can</strong>.'],
            ['You are a better singer than <strong>me</strong>.', 'You are a better singer than <strong>I am</strong>.'],
            ['I got up earlier than <strong>her</strong>.', 'I got up earlier than <strong>she did</strong>.'],
          ]
        },
        { type: 'example', en: 'Athens is <strong>older than</strong> Rome.', es: 'Atenas es más antigua que Roma.' },
        { type: 'example', en: 'Are oranges <strong>more expensive than</strong> bananas?', es: '¿Son las naranjas más caras que los plátanos?' },
        { type: 'example', en: 'The restaurant is <strong>more crowded than</strong> usual.', es: 'El restaurante está más lleno de gente que de costumbre.' },
      ]
    },

    // ── BLOQUE 7: more than / less than ──────────────────────────────────────
    block7: {
      title: 'More than / Less than — cantidad',
      content: [
        { type: 'text', text: '<strong>More than</strong> = más que / más de &nbsp;&nbsp; | &nbsp;&nbsp; <strong>Less than</strong> = menos que / menos de' },
        { type: 'example', en: 'A: How much did your shoes cost? £30?<br>B: No, <strong>more than</strong> that.', es: '¿Cuánto costaron tus zapatos? ¿30 libras? — No, más que eso.' },
        { type: 'example', en: 'The film was very short — <strong>less than</strong> an hour.', es: 'La película fue muy corta — menos de una hora.' },
        { type: 'example', en: 'They\'ve got <strong>more</strong> money <strong>than</strong> they need.', es: 'Tienen más dinero del que necesitan.' },
        { type: 'example', en: 'You go out <strong>more than</strong> me.', es: 'Sales más que yo.' },
      ]
    },

    // ── BLOQUE 8: a bit / much + comparativo ─────────────────────────────────
    block8: {
      title: 'A bit / Much — intensificar el comparativo',
      content: [
        { type: 'text', text: 'Podemos añadir palabras delante del comparativo para decir <strong>cuánto más</strong> es algo:' },
        { type: 'table',
          headers: ['Modificador', 'Significado', 'Ejemplo'],
          rows: [
            ['<strong>a bit</strong>',  'un poco más',   'Sue is <strong>a bit older</strong> than Gary — she\'s 25 and he\'s 24.'],
            ['<strong>much</strong>',   'mucho más',     'Canada is <strong>much bigger</strong> than France.'],
            ['<strong>a lot</strong>',  'mucho más',     'This hotel was <strong>a lot more expensive</strong> than I expected.'],
            ['<strong>far</strong>',    'muchísimo más', 'It\'s <strong>far more difficult</strong> than I thought.'],
          ]
        },
        { type: 'example', en: 'Box A is <strong>a bit bigger</strong> than Box B.', es: 'La caja A es un poco más grande que la caja B.' },
        { type: 'example', en: 'Box C is <strong>much bigger</strong> than Box D.', es: 'La caja C es mucho más grande que la caja D.' },
        { type: 'example', en: 'The hotel was <strong>much more expensive</strong> than I expected.', es: 'El hotel era mucho más caro de lo que esperaba.' },
      ]
    },

    // ── BLOQUE 9: Resumen visual ──────────────────────────────────────────────
    block9: {
      title: '🧠 Resumen — ¿qué regla uso?',
      content: [
        { type: 'tip', emoji: '🤔', text: 'Hazte estas preguntas <strong>en orden</strong> cada vez que necesites un comparativo:' },
        { type: 'rule', text: '1️⃣ ¿Es <em>good/well, bad/badly, far, much, little</em>? → Forma irregular: <strong>better / worse / further / more / less</strong>' },
        { type: 'rule', text: '2️⃣ ¿Termina en <strong>-y</strong>? → Cambia a <strong>-ier</strong>: <em>happy → happier</em>' },
        { type: 'rule', text: '3️⃣ ¿Es una palabra corta (1 sílaba)? → Añade <strong>-er</strong>: <em>fast → faster</em>' },
        { type: 'rule', text: '4️⃣ ¿Es larga (2+ sílabas) o adverbio en -ly? → Pon <strong>more</strong> delante: <em>more careful</em>' },
        { type: 'teacher', text: '🏆 Y recuerda: usa siempre <strong>than</strong> (no "that") para unir lo que comparas. Puedes añadir <strong>a bit</strong> o <strong>much</strong> delante para decir cuánto más.' },
      ]
    },

  }, // fin theoryBlock

  // ═══════════════════════════════════════════════════════════════════════════
  // EJERCICIOS — 20 ejercicios mixtos, fieles al contenido del libro
  // ═══════════════════════════════════════════════════════════════════════════
  theoryQuiz: [

    // ── FILL ─────────────────────────────────────────────────────────────────

    {
      id: 'c01',
      type: 'fill',
      q: 'Rome is old, but Athens is ______ (old).',
      ans: 'older',
      explanation: 'Old = 1 sílaba → añadimos -er: older. (no "more old")'
    },
    {
      id: 'c02',
      type: 'fill',
      q: 'The train is ______ (fast) than the bus.',
      ans: 'faster',
      explanation: 'Fast = 1 sílaba → faster. Consonante-vocal-consonante pero termina en consonante sola: simplemente añadimos -er.'
    },
    {
      id: 'c03',
      type: 'fill',
      q: 'Don\'t take the bus — it\'s ______ (easy) to take a taxi.',
      ans: 'easier',
      explanation: 'Easy termina en -y → cambia a -i y añadimos -er: easier. (no "more easy")'
    },
    {
      id: 'c04',
      type: 'fill',
      q: 'You must be ______ (careful) when you drive at night.',
      ans: 'more careful',
      explanation: 'Careful = 2 sílabas, no termina en -y → usamos more: more careful.'
    },
    {
      id: 'c05',
      type: 'fill',
      q: 'The weather wasn\'t good yesterday, but it\'s ______ (good) today.',
      ans: 'better',
      explanation: 'Good es irregular → comparativo: better. (nunca "more good" o "gooder")'
    },
    {
      id: 'c06',
      type: 'fill',
      q: 'My headache is ______ (bad) than this morning.',
      ans: 'worse',
      explanation: 'Bad es irregular → comparativo: worse. (nunca "more bad" o "badder")'
    },
    {
      id: 'c07',
      type: 'fill',
      q: '"How far is it to the station?" — "About two miles. It\'s ______ (far) than I thought."',
      ans: 'further',
      explanation: 'Far es irregular → comparativo: further (o farther). Ambas formas son correctas.'
    },
    {
      id: 'c08',
      type: 'fill',
      q: 'Canada is ______ (big) than France.',
      ans: 'bigger',
      explanation: 'Big = 1 sílaba y termina en consonante-vocal-consonante (b-i-g) → doblamos la g: bigger.'
    },
    {
      id: 'c09',
      type: 'fill',
      q: 'This job is ______ (stressful) than my last one.',
      ans: 'more stressful',
      explanation: 'Stressful = 2 sílabas, no termina en -y → more stressful.'
    },
    {
      id: 'c10',
      type: 'fill',
      q: 'Sue is ______ (a bit / old) than Gary — she\'s 25 and he\'s 24.',
      ans: 'a bit older',
      explanation: '"A bit" intensifica el comparativo: a bit older = un poco más vieja.'
    },

    // ── CHOICE ───────────────────────────────────────────────────────────────

    {
      id: 'c11',
      type: 'choice',
      q: 'Which is the correct comparative of "heavy"?',
      options: ['more heavy', 'heavier', 'heavyer', 'heavierer'],
      ans: 'heavier',
      explanation: 'Heavy termina en -y → cambia la y por i y añadimos -er: heavier.'
    },
    {
      id: 'c12',
      type: 'choice',
      q: 'The Europa Hotel is ______ than the Grand Hotel.',
      options: ['more expensive', 'expensiver', 'more expensiver', 'expensiveer'],
      ans: 'more expensive',
      explanation: 'Expensive = 3 sílabas → usamos more. Nunca añadimos -er a palabras largas.'
    },
    {
      id: 'c13',
      type: 'choice',
      q: '"Do you feel better today?" — "No, I feel ______."',
      options: ['more bad', 'worse', 'badder', 'worser'],
      ans: 'worse',
      explanation: 'Bad es irregular. Su único comparativo es worse.'
    },
    {
      id: 'c14',
      type: 'choice',
      q: 'She speaks English ______ than her brother.',
      options: ['more fluently', 'fluentlier', 'fluenter', 'fluentlyer'],
      ans: 'more fluently',
      explanation: 'Fluently es un adverbio en -ly → siempre usamos more.'
    },
    {
      id: 'c15',
      type: 'choice',
      q: 'The film was very short — ______ an hour.',
      options: ['less than', 'fewer than', 'lower than', 'lesser than'],
      ans: 'less than',
      explanation: 'Para cantidad (tiempo, dinero, etc.) usamos less than = menos de.'
    },

    // ── ERROR ─────────────────────────────────────────────────────────────────

    {
      id: 'c16',
      type: 'error',
      q: 'This phone is more cheap than that one.',
      ans: 'This phone is cheaper than that one.',
      explanation: 'Cheap = 1 sílaba → usa -er. Nunca "more cheap" con palabras cortas.'
    },
    {
      id: 'c17',
      type: 'error',
      q: 'London is bigger that Paris.',
      ans: 'London is bigger than Paris.',
      explanation: 'El conector en comparaciones es THAN, nunca "that".'
    },
    {
      id: 'c18',
      type: 'error',
      q: 'I want to do something more interesting that my current job.',
      ans: 'I want to do something more interesting than my current job.',
      explanation: 'Recuerda: siempre "than" (no "that") después del comparativo.'
    },

    // ── ORDER ─────────────────────────────────────────────────────────────────

    {
      id: 'c19',
      type: 'order',
      words: ['is', 'more', 'expensive', 'The', 'Europa', 'Hotel', 'than', 'the', 'Grand'],
      ans: 'The Europa Hotel is more expensive than the Grand',
      explanation: 'Estructura: [Sujeto] + is + comparativo + than + [lo que comparamos].'
    },
    {
      id: 'c20',
      type: 'order',
      words: ['much', 'bigger', 'Canada', 'than', 'is', 'France'],
      ans: 'Canada is much bigger than France',
      explanation: '"Much" intensifica el comparativo: mucho más grande. Canada is much bigger than France.'
    },

  ], // fin theoryQuiz

  // ═══════════════════════════════════════════════════════════════════════════
  // VOCABULARIO
  // ═══════════════════════════════════════════════════════════════════════════
  vocabulary: [
    { id: 'v1',  word: 'Older',             span: 'Más viejo/a'         },
    { id: 'v2',  word: 'Cheaper',           span: 'Más barato/a'        },
    { id: 'v3',  word: 'Bigger',            span: 'Más grande'          },
    { id: 'v4',  word: 'Heavier',           span: 'Más pesado/a'        },
    { id: 'v5',  word: 'Easier',            span: 'Más fácil'           },
    { id: 'v6',  word: 'Earlier',           span: 'Más temprano'        },
    { id: 'v7',  word: 'Better',            span: 'Mejor'               },
    { id: 'v8',  word: 'Worse',             span: 'Peor'                },
    { id: 'v9',  word: 'Further',           span: 'Más lejos'           },
    { id: 'v10', word: 'More expensive',    span: 'Más caro/a'          },
    { id: 'v11', word: 'More comfortable',  span: 'Más cómodo/a'        },
    { id: 'v12', word: 'More interesting',  span: 'Más interesante'     },
    { id: 'v13', word: 'More careful',      span: 'Más cuidadoso/a'     },
    { id: 'v14', word: 'Than',              span: 'Que (comparación)'   },
    { id: 'v15', word: 'A bit',             span: 'Un poco (más)'       },
    { id: 'v16', word: 'Much',              span: 'Mucho (más)'         },
    { id: 'v17', word: 'Less than',         span: 'Menos que / menos de'},
    { id: 'v18', word: 'More than',         span: 'Más que / más de'    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // READING
  // ═══════════════════════════════════════════════════════════════════════════
  reading: {
    title: 'City Life vs Countryside',
    text: 'Many people think that living in the city is better than living in the countryside. Life in the city is faster and more exciting, but it is also more expensive and more stressful. The countryside is quieter and the air is cleaner, but finding a job is harder. Some people say the quality of life is better in the countryside because it is safer for children and the houses are much bigger. In the end, the best place to live depends on what is more important to you.',
    questions: [
      { id: 'r1', q: 'Is city life more expensive than country life?',      ans: 'Yes'     },
      { id: 'r2', q: 'What is harder to find in the countryside?',          ans: 'A job'   },
      { id: 'r3', q: 'What is cleaner in the countryside?',                 ans: 'The air' },
      { id: 'r4', q: 'Are houses bigger in the city or the countryside?',   ans: 'The countryside' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LISTENING
  // ═══════════════════════════════════════════════════════════════════════════
  listening: {
    text: "The new sports centre is much bigger and better than the old one. It's more modern and more comfortable, but it's also a bit more expensive. The changing rooms are cleaner and the equipment is newer.",
    correctItems: ['much bigger', 'better', 'more expensive'],
    options: ['much bigger', 'better', 'faster', 'more expensive', 'cheaper', 'older', 'more modern', 'cleaner']
  }

}; // fin comparativesUnit