// src/units/comparatives.js
// Quiz rediseñado:
//   · Progresión estricta de dificultad (Nivel 1 → 5)
//   · Bloques 87, 88 y 90 mezclados en cada nivel
//   · hint: pista visible antes de responder
//   · explanation: motivo de la respuesta — siempre se muestra (acierto y fallo)
//   · Superlativos: el alumno siempre escribe "the" — nunca viene dado

const quiz = [

  // ════════════════════════════════════════════════════════
  // NIVEL 1 — RECONOCIMIENTO (q01–q10)
  // Solo choice. Reglas básicas. Una sola decisión por ejercicio.
  // Bloque 87 + 88 + 90 mezclados desde el primer nivel.
  // ════════════════════════════════════════════════════════

  { id:'q01', type:'choice', block:'forming',
    q:'Elige el comparativo correcto de <strong>old</strong>.',
    options:['more old', 'older', 'oldest', 'olded'],
    ans:'older',
    hint:'old = 1 sílaba',
    explanation:'"old" tiene 1 sílaba → old + er = <strong>older</strong>. La regla "more" es solo para palabras largas (2+ sílabas). "More old" es un error muy frecuente.' },

  { id:'q02', type:'choice', block:'using',
    q:'Elige la palabra que falta: Athens is older ______ Rome.',
    options:['that', 'then', 'than', 'as'],
    ans:'than',
    hint:'older, bigger, faster… ¿qué palabra sigue siempre después?',
    explanation:'"<strong>than</strong>" siempre sigue al comparativo. Truco: comparaTIVE → tHAN. Nunca "that" (=que/ese) ni "then" (=entonces).' },

  { id:'q03', type:'choice', block:'superlatives',
    q:'Elige el superlativo correcto de <strong>old</strong>.',
    options:['most old', 'more old', 'oldest', 'olded'],
    ans:'oldest',
    hint:'old = 1 sílaba · superlativo · lleva artículo delante',
    explanation:'"old" (1 sílaba) → superlativo: oldest. Siempre va precedido de <strong>the</strong>: the oldest. "Most old" es incorrecto para palabras cortas.' },

  { id:'q04', type:'choice', block:'forming',
    q:'Elige el comparativo correcto de <strong>good</strong>.',
    options:['gooder', 'more good', 'better', 'best'],
    ans:'better',
    hint:'good es irregular 🧠',
    explanation:'"good" es completamente irregular: good → <strong>better</strong> → the best. No existe "gooder" ni "more good". Su pareja irregular: bad → worse → the worst.' },

  { id:'q05', type:'choice', block:'forming',
    q:'Elige el comparativo correcto de <strong>expensive</strong>.',
    options:['expensiver', 'more expensive', 'expensiveer', 'most expensive'],
    ans:'more expensive',
    hint:'expensive = ex-pen-sive · cuenta las sílabas',
    explanation:'"expensive" tiene 3 sílabas → <strong>more expensive</strong>. Nunca "expensiver". Para palabras de 2+ sílabas el adjetivo no cambia — solo añades "more" delante.' },

  { id:'q06', type:'choice', block:'forming',
    q:'Elige el comparativo correcto de <strong>bad</strong>.',
    options:['badder', 'more bad', 'worst', 'worse'],
    ans:'worse',
    hint:'bad es irregular 🧠',
    explanation:'"bad" es irregular: bad → <strong>worse</strong> → the worst. No existe "badder" ni "more bad". Su pareja: good → better → the best.' },

  { id:'q07', type:'choice', block:'forming',
    q:'Elige el comparativo correcto de <strong>happy</strong>.',
    options:['more happy', 'happyer', 'happier', 'hapier'],
    ans:'happier',
    hint:'happy termina en -y',
    explanation:'"happy" termina en -y → quita la y, añade -ier: happ + ier = <strong>happier</strong>. Mismo patrón: easy→easier, heavy→heavier, early→earlier. Nunca "more happy".' },

  { id:'q08', type:'choice', block:'superlatives',
    q:'Elige el superlativo correcto de <strong>good</strong>.',
    options:['the goodest', 'the most good', 'the better', 'the best'],
    ans:'the best',
    hint:'good es irregular. good → better → ???',
    explanation:'"good" es irregular: good → better → <strong>the best</strong>. Ninguna regla normal aplica. Hay que memorizarlo junto con: bad → worse → the worst.' },

  { id:'q09', type:'choice', block:'using',
    q:'Elige el modificador correcto: Box A is ______ bigger than Box B. (diferencia pequeña)',
    options:['much', 'very', 'a bit', 'most'],
    ans:'a bit',
    hint:'¿Es una diferencia grande o pequeña?',
    explanation:'"<strong>a bit</strong> bigger" = un poco más grande. "much bigger" = mucho más grande. Importante: "very" nunca modifica comparativos — es un error muy común. Se dice "very big" pero "much bigger".' },

  { id:'q10', type:'choice', block:'superlatives',
    q:'Elige el superlativo correcto de <strong>bad</strong>.',
    options:['the baddest', 'the most bad', 'the worst', 'the worser'],
    ans:'the worst',
    hint:'bad es irregular. bad → worse → ???',
    explanation:'"bad" es irregular: bad → worse → <strong>the worst</strong>. Ninguna regla aplica. Memorizar junto con su pareja: good → better → the best.' },

  // ════════════════════════════════════════════════════════
  // NIVEL 2 — PRODUCCIÓN BÁSICA (q11–q22)
  // Fill de 1 hueco. Reglas directas. Mezcla 87 + 88 + 90.
  // El alumno escribe la respuesta completa.
  // En superlativos, el alumno escribe "the + forma".
  // ════════════════════════════════════════════════════════

  { id:'q11', type:'fill',
    q:'Rome is old, but Athens is ______.',
    ans:'older',
    hint:'old = 1 sílaba',
    explanation:'"old" (1 sílaba) → <strong>older</strong>. Comparamos DOS ciudades → comparativo. Si comparáramos Athens con todas las ciudades del mundo diríamos "the oldest".' },

  { id:'q12', type:'fill',
    q:"The weather wasn't very good yesterday, but it's ______ today.",
    ans:'better',
    hint:'good es irregular → ???',
    explanation:'"good" → <strong>better</strong> (irregular). Comparamos dos momentos (ayer y hoy) → comparativo. El superlativo sería "the best".' },

  { id:'q13', type:'fill',
    q:"'Do you feel better today?' 'No, I feel ______.'",
    ans:'worse',
    hint:'bad es irregular → ???',
    explanation:'"bad" → <strong>worse</strong> (irregular). Si "better" es lo contrario de "worse", "worse" es lo contrario de "better". El superlativo sería "the worst".' },

  { id:'q14', type:'fill',
    q:'Canada is much bigger ______ France.',
    ans:'than',
    hint:'bigger, older… ¿qué palabra viene siempre después?',
    explanation:'"<strong>than</strong>" sigue siempre al comparativo. "much bigger than" = mucho más grande que. "much" indica diferencia grande; "a bit" indicaría diferencia pequeña.' },

  { id:'q15', type:'fill',
    q:'This job is boring. I want something ______ interesting.',
    ans:'more',
    hint:'interesting = in-ter-est-ing · cuenta las sílabas',
    explanation:'"interesting" (4 sílabas) → <strong>more</strong> interesting. Nunca "interestinger". Para palabras de 2+ sílabas: more + adjetivo sin cambiar.' },

  { id:'q16', type:'fill',
    q:"The church is very old. It's ______ oldest building in the town.",
    ans:'the',
    hint:'Es un superlativo · ¿qué artículo lleva?',
    explanation:'Los superlativos SIEMPRE necesitan "<strong>the</strong>": <strong>the</strong> oldest. Sin "the" la frase es incorrecta. El artículo no es opcional.' },

  { id:'q17', type:'fill',
    q:"My bag isn't very heavy. Your bag is ______.",
    ans:'heavier',
    hint:'heavy termina en -y',
    explanation:'"heavy" termina en -y → <strong>heavier</strong>. Regla -y: quita la y, añade -ier. Mismo patrón: easy→easier, happy→happier, early→earlier.' },

  { id:'q18', type:'fill',
    q:"What is ______ longest river in the world?",
    ans:'the',
    hint:'Es un superlativo · ¿qué artículo lleva?',
    explanation:'"<strong>the</strong> longest" — superlativo siempre con "the". "Longest" es el superlativo de "long" (1 sílaba → añade -est). "In the world" delimita el grupo de comparación.' },

  { id:'q19', type:'fill',
    q:"Don't take the bus. It's ______ to take a taxi.",
    ans:'easier',
    hint:'easy termina en -y',
    explanation:'"easy" termina en -y → <strong>easier</strong>. Aquí no hay "than" porque no se menciona explícitamente qué se compara — está implícito (easier than taking the bus).' },

  { id:'q20', type:'fill',
    q:'Kate is 26, Ben is 24. Kate is ______ than Ben.',
    ans:'older',
    hint:'old = 1 sílaba · comparamos 2 personas',
    explanation:'"old" → <strong>older</strong> than. Comparamos dos personas → comparativo. Si comparáramos Kate con todas las personas de su grupo diríamos "the oldest".' },

  { id:'q21', type:'fill',
    q:"It was a very happy day. It was ______ happiest day of my life.",
    ans:'the',
    hint:'Es un superlativo · ¿qué artículo lleva?',
    explanation:'"<strong>the</strong> happiest" — superlativo siempre con "the". "Of my life" confirma que hablamos del extremo de un grupo (todos los días de su vida), no de dos cosas.' },

  { id:'q22', type:'fill',
    q:'The film was very short — less ______ an hour.',
    ans:'than',
    hint:'less ___ = menos de · igual que "more ___"',
    explanation:'"less <strong>than</strong>" (menos de) es lo opuesto de "more than" (más de). Ambos necesitan "than": less than an hour, more than £60.' },

  // ════════════════════════════════════════════════════════
  // NIVEL 3 — PRODUCCIÓN MEDIA (q23–q34)
  // Fill con reglas de ortografía, CVC, pronombres.
  // Corrección de errores sencillos. Mezcla 87 + 88 + 90.
  // ════════════════════════════════════════════════════════

  { id:'q23', type:'fill',
    q:"Helen's car isn't very big. She wants a ______ one.",
    ans:'bigger',
    hint:'big = consonante-vocal-consonante (b-i-g)',
    explanation:'"big" termina en consonante-vocal-consonante (b-i-g) → dobla la última consonante: <strong>bigger</strong>. Sin doblar quedaría "biger" — pronunciación diferente. Mismo patrón: hot→hotter, thin→thinner.' },

  { id:'q24', type:'fill',
    q:'The Europa Hotel costs £150. The Grand costs £130. The Europa is ______ expensive than the Grand.',
    ans:'more',
    hint:'expensive = 3 sílabas · comparamos 2 hoteles',
    explanation:'"expensive" (3 sílabas) → <strong>more</strong> expensive than. Comparamos dos hoteles → comparativo. Si comparáramos con todos los hoteles de la ciudad: the most expensive.' },

  { id:'q25', type:'fill',
    q:"Ben is a very good swimmer. Kate isn't. Ben is a ______ swimmer than Kate.",
    ans:'better',
    hint:'good → ??? · comparamos 2 personas',
    explanation:'"good" → <strong>better</strong> (irregular). Comparamos dos personas → comparativo "better than". El superlativo sería "the best swimmer in the team".' },

  { id:'q26', type:'fill',
    q:"He isn't very tall. You're taller ______ him.",
    ans:'than',
    hint:'"than" + pronombre: him, her, me, us, them…',
    explanation:'"taller <strong>than</strong> him" — después de "than" usamos pronombre OBJETO: him (no he), her (no she), me (no I). Es más natural en inglés hablado.' },

  { id:'q27', type:'fill',
    q:"Money is important, but it isn't ______ most important thing in life.",
    ans:'the',
    hint:'Es un superlativo · ¿qué artículo lleva?',
    explanation:'"<strong>the</strong> most important" — "important" (3 sílabas) → superlativo con "the most". "The" es obligatorio incluso cuando el superlativo va después de "isn\'t".' },

  { id:'q28', type:'fill',
    q:'Jack is 23. His father is 69. His father is ______ older than Jack.',
    ans:'much',
    hint:'46 años de diferencia — ¿grande o pequeña?',
    explanation:'46 años de diferencia → diferencia grande → "<strong>much</strong> older". "a bit older" sería para diferencias de 1-2 años. "very older" es incorrecto — "very" no va con comparativos.' },

  { id:'q29', type:'fill',
    q:"Luke is a good player, but he isn't ______ best in the team.",
    ans:'the',
    hint:'Superlativo sin sustantivo · ¿qué artículo lleva?',
    explanation:'"<strong>the</strong> best" = the best player — el sustantivo no se repite pero "the" es OBLIGATORIO. Los superlativos siempre llevan "the", con o sin sustantivo.' },

  { id:'q30', type:'fill',
    q:"It's a very good film. It's ______ best film I've ever seen.",
    ans:'the',
    hint:'Es un superlativo · ¿qué artículo lleva?',
    explanation:'"<strong>the</strong> best" — good → the best (irregular). Estructura "the best … I\'ve ever seen" = superlativo + ever. "Ever" en este contexto significa "en toda mi vida".' },

  { id:'q31', type:'fill',
    q:'Emma is 25. Joe is 24½. Emma is a bit ______ than Joe.',
    ans:'older',
    hint:'old = 1 sílaba · medio año = ¿qué tipo de diferencia?',
    explanation:'"a bit <strong>older</strong> than" — diferencia pequeña (medio año) → "a bit". old → older (1 sílaba, -er). "A bit" siempre precede al comparativo.' },

  { id:'q32', type:'fill',
    q:"Yesterday I felt terrible. Today I feel ______ better.",
    ans:'much|a lot',
    hint:'de "terrible" a sentirse bien — ¿grande o pequeña la mejora?',
    explanation:'De "terrible" a "OK" es una mejora grande → "<strong>much</strong> better". "A bit better" sería para mejoras pequeñas. "much" + comparativo indica diferencia significativa.' },

  { id:'q33', type:'error',
    q:'She is the most tall student in the class.',
    ans:'She is the tallest student in the class.',
    hint:'tall = 1 sílaba',
    explanation:'"tall" (1 sílaba) → <strong>the tallest</strong>. "The most tall" es incorrecto. Regla: palabras cortas → -er/-est; palabras largas → more/the most. Nunca mezcles los dos sistemas.' },

  { id:'q34', type:'error',
    q:'London is more beautiful that Paris.',
    ans:'London is more beautiful than Paris.',
    hint:'¿"that" o "than" después de un comparativo?',
    explanation:'"<strong>than</strong>" (no "that") — error muy frecuente en español porque "que" puede ser "that" o "than". Después de un comparativo SIEMPRE es "than". Truco: comparaTIVE → tHAN.' },

  // ════════════════════════════════════════════════════════
  // NIVEL 4 — PRODUCCIÓN AVANZADA (q35–q44)
  // Errores complejos, ordenar frases, superlativos sin sustantivo,
  // doble comparativo y doble superlativo incorrectos.
  // ════════════════════════════════════════════════════════

  { id:'q35', type:'error',
    q:'Jack is more strong than his brother.',
    ans:'Jack is stronger than his brother.',
    hint:'strong = 1 sílaba',
    explanation:'"strong" (1 sílaba) → <strong>stronger</strong>. "More strong" es incorrecto para palabras cortas. Regla: 1 sílaba → -er. Solo usas "more" con palabras de 2+ sílabas.' },

  { id:'q36', type:'error',
    q:'She is a bit more taller than me.',
    ans:'She is a bit taller than me.',
    hint:'"taller" ya es comparativo — ¿qué sobra?',
    explanation:'"more taller" = doble comparativo — el error más frecuente en inglés. "Taller" ya ES la forma comparativa. Correcto: <strong>a bit taller than me</strong>.' },

  { id:'q37', type:'error',
    q:"It's the more expensive restaurant in the city.",
    ans:"It's the most expensive restaurant in the city.",
    hint:'"the more + adjetivo" — ¿qué palabra es incorrecta?',
    explanation:'"<strong>the most expensive</strong>" es el superlativo. "The more expensive" es incorrecto — "more" es comparativo, "the most" es superlativo. Nunca: "the more + adjetivo".' },

  { id:'q38', type:'error',
    q:'What is the most longest river in the world?',
    ans:'What is the longest river in the world?',
    hint:'"longest" ya es superlativo — ¿qué sobra?',
    explanation:'"most longest" = doble superlativo. "Longest" ya ES la forma superlativa de "long". Correcto: <strong>the longest</strong>. Mismo error que "more taller" para comparativos.' },

  { id:'q39', type:'order',
    words:['Athens', 'is', 'older', 'than', 'Rome', '.'],
    ans:'Athens is older than Rome.',
    hint:'sujeto · verbo · comparativo · ??? · ...',
    explanation:'Orden: sujeto (Athens) + verbo (is) + comparativo (older) + than + segundo elemento (Rome). El comparativo siempre va después del verbo copulativo.' },

  { id:'q40', type:'order',
    words:['Canada', 'is', 'much', 'bigger', 'than', 'France', '.'],
    ans:'Canada is much bigger than France.',
    hint:'¿dónde va "much"?',
    explanation:'"<strong>much</strong> bigger than" — "much" siempre precede al comparativo. Orden: sujeto + verbo + much/a bit + comparativo + than + segundo elemento.' },

  { id:'q41', type:'order',
    words:['The', 'church', 'is', 'the', 'oldest', 'building', 'in', 'the', 'town', '.'],
    ans:'The church is the oldest building in the town.',
    hint:'the + ??? + building + in + lugar',
    explanation:'Estructura: the oldest building in the town. "<strong>in</strong> the town" delimita el grupo. Podría ser también "of all the buildings in the town".' },

  { id:'q42', type:'order',
    words:["It's", 'the', 'worst', 'film', "I've", 'ever', 'seen', '.'],
    ans:"It's the worst film I've ever seen.",
    hint:'bad es irregular · I\'ve ever + participio',
    explanation:'"the worst film I\'ve ever seen" — bad → the worst (irregular). Superlativo + ever = el extremo de toda la experiencia acumulada. "Ever" siempre va después del superlativo.' },

  { id:'q43', type:'order',
    words:['His', 'father', 'is', 'much', 'older', 'than', 'his', 'mother', '.'],
    ans:'His father is much older than his mother.',
    hint:'"much" + ??? + than',
    explanation:'"much older than" — diferencia grande. old → older (1 sílaba, -er). "Much" va entre el verbo y el comparativo. Si la diferencia fuera pequeña: "a bit older than".' },

  { id:'q44', type:'order',
    words:['Jupiter', 'is', 'the', 'largest', 'planet', 'in', 'the', 'solar', 'system', '.'],
    ans:'Jupiter is the largest planet in the solar system.',
    hint:'large = 1 sílaba · the + ??? + planet',
    explanation:'"the largest planet in the solar system" — large → the largest (1 sílaba, termina en -e → añade solo -st). "In the solar system" delimita el grupo de comparación.' },

  // ════════════════════════════════════════════════════════
  // NIVEL 5 — TRADUCCIÓN Y SÍNTESIS (q45–q50)
  // El alumno produce la frase completa en inglés.
  // Combina las tres estructuras. Máxima dificultad.
  // ════════════════════════════════════════════════════════

  { id:'q45', type:'translate',
    q:'Atenas es más antigua que Roma.',
    ans:'Athens is older than Rome.',
    hint:'antiguo → old · 1 sílaba · dos ciudades',
    explanation:'"old" (1 sílaba) → <strong>older than</strong>. En español "más antigua que" → en inglés "older than". No existe "more old than". Dos ciudades → comparativo.' },

  { id:'q46', type:'translate',
    q:'Es la peor película que he visto nunca.',
    ans:"It's the worst film I've ever seen.|It's the worst movie I've ever seen.",
    hint:'bad es irregular · nunca → ever',
    explanation:'"bad" → worse → <strong>the worst</strong> (irregular). Estructura: the worst + sustantivo + I\'ve ever + participio. "Ever" = en toda mi vida. "The" es obligatorio.' },

  { id:'q47', type:'translate',
    q:'Canadá es mucho más grande que Francia.',
    ans:'Canada is much bigger than France.|Canada is much larger than France.',
    hint:'big = CVC · mucho más → much + ???',
    explanation:'"big" (CVC) → <strong>bigger</strong> (dobla la g). "much bigger than" = mucho más grande que. "Very bigger" es incorrecto — con comparativos: "much" o "a bit", nunca "very".' },

  { id:'q48', type:'translate',
    q:'¿Cuál es el río más largo del mundo?',
    ans:'What is the longest river in the world?|Which is the longest river in the world?',
    hint:'long = 1 sílaba · del mundo → in the ???',
    explanation:'"long" (1 sílaba) → <strong>the longest</strong>. "Del mundo" → "in the world" (en inglés se usa "in" con lugares, no "of"). "The" es obligatorio en el superlativo.' },

  { id:'q49', type:'translate',
    q:'El hotel fue un poco más caro de lo que esperaba.',
    ans:'The hotel was a bit more expensive than I expected.',
    hint:'expensive = 3 sílabas · un poco → ???',
    explanation:'"expensive" (3 sílabas) → <strong>more expensive</strong>. "a bit" = un poco (diferencia pequeña). "De lo que esperaba" → "than I expected". Estructura: a bit more expensive than I expected.' },

  { id:'q50', type:'translate',
    q:'Júpiter es el planeta más grande del sistema solar y es mucho más grande que la Tierra.',
    ans:'Jupiter is the largest planet in the solar system and it is much larger than the Earth.|Jupiter is the largest planet in the solar system and it is much bigger than the Earth.',
    hint:'large = 1 sílaba (-e final) · mucho más → ??? + comparativo',
    explanation:'"large" (1 sílaba, termina en -e) → <strong>larger</strong> / <strong>the largest</strong> (solo añade -r/-st). "the largest planet in the solar system" → superlativo. "much larger than the Earth" → comparativo. Mismo adjetivo, las dos formas en una frase.' },

];

export const comparativesUnit = {
  id: 'comparatives',
  grammarTitle: 'Comparative & Superlative',
  title: 'old/older · older than · the oldest',
  description: 'Units 87 · 88 · 90 — Cómo comparar personas, lugares y cosas en inglés',

  theoryBlock: {

    unit87: {
      title: 'Forming comparatives: old → older / expensive → more expensive',
      content: [
        { type:'text',
          text:'Un <strong>adjetivo comparativo</strong> se usa para mostrar que una persona o cosa tiene <em>más</em> de una cualidad que otra. Hay dos formas: <strong>-er</strong> (palabras cortas) o <strong>more</strong> (palabras largas).' },
        { type:'compare', label:'',
          left:  { emoji:'👴', label:'old',   sub:"I'm 92", size:'sm' },
          right: { emoji:'👴', label:'older',  sub:"I'm 93 → he is older", size:'lg' } },
        { type:'compare', label:'',
          left:  { emoji:'👟', label:'expensive', sub:'£105', size:'sm' },
          right: { emoji:'👠', label:'more expensive', sub:'£120 → it is more expensive', size:'lg' } },
        { type:'subtitle', text:'B · 1 sílaba → añade -er' },
        { type:'table',
          headers:['Adjetivo', '→', 'Comparativo', 'Adjetivo', '→', 'Comparativo'],
          rows:[
            ['old',  '→', '<strong>older</strong>',   'slow', '→', '<strong>slower</strong>'],
            ['nice', '→', '<strong>nicer</strong>',   'big',  '→', '<strong>bigger</strong>'],
            ['late', '→', '<strong>later</strong>',   'hot',  '→', '<strong>hotter</strong>'],
            ['thin', '→', '<strong>thinner</strong>', 'fast', '→', '<strong>faster</strong>'],
          ] },
        { type:'rule',
          text:'⚠️ <strong>Regla CVC (consonante–vocal–consonante):</strong> big (b-i-g) → bi<strong>gg</strong>er · hot (h-o-t) → ho<strong>tt</strong>er · thin (t-h-i-n) → thi<strong>nn</strong>er<br>Si el adjetivo termina en dos consonantes NO se dobla: fast → faster · small → smaller.' },
        { type:'text', text:'Adjetivos que terminan en <strong>-y</strong> → cambia y por i + er:' },
        { type:'table',
          headers:['Adjetivo', '→', 'Comparativo'],
          rows:[
            ['easy',  '→', '<strong>easier</strong>'],
            ['heavy', '→', '<strong>heavier</strong>'],
            ['happy', '→', '<strong>happier</strong>'],
          ] },
        { type:'subtitle', text:'C · 2+ sílabas → more + adjetivo (sin cambiar)' },
        { type:'table',
          headers:['Adjetivo', '(sílabas)', '→', 'Comparativo'],
          rows:[
            ['care·ful',       '(2)', '→', '<strong>more careful</strong>'],
            ['ex·pen·sive',    '(3)', '→', '<strong>more expensive</strong>'],
            ['in·ter·est·ing', '(4)', '→', '<strong>more interesting</strong>'],
          ] },
        { type:'subtitle', text:'D · Irregulares — memorizarlos' },
        { type:'table',
          headers:['Adjetivo', 'Comparativo', 'Superlativo'],
          rows:[
            ['good / well', '<strong>better</strong>', '<strong>the best</strong>'],
            ['bad',         '<strong>worse</strong>',  '<strong>the worst</strong>'],
            ['far',         '<strong>further</strong>','<strong>the furthest</strong>'],
          ] },
        { type:'rule', warn:true,
          text:'❌ NUNCA: more old · more cheap · more easy · more good · more bad · gooder · badder<br>✅ SIEMPRE: older · cheaper · easier · better · worse' },
      ],
    },

    unit88: {
      title: 'Using comparatives: older than … / much bigger than …',
      content: [
        { type:'text',
          text:'Cuando comparamos dos cosas usamos el comparativo seguido de <strong>than</strong>.' },
        { type:'rule',
          text:'comparativo + <strong>than</strong> + segundo elemento' },
        { type:'example', en:'Athens is <strong>older than</strong> Rome.', es:'Atenas es más antigua que Roma.' },
        { type:'example', en:'Are oranges <strong>more expensive than</strong> bananas?', es:'' },
        { type:'example', en:"It's <strong>easier</strong> to take a taxi <strong>than</strong> the bus.", es:'' },
        { type:'subtitle', text:'B · than me / him / her (pronombre objeto)' },
        { type:'table',
          headers:['Natural (hablado)', 'Formal'],
          rows:[
            ["faster <strong>than him</strong>",  "faster than <em>he can</em>"],
            ["better <strong>than me</strong>",   "better than <em>I am</em>"],
            ["earlier <strong>than her</strong>", "earlier than <em>she did</em>"],
          ] },
        { type:'subtitle', text:'C · a bit / much — grado de diferencia' },
        { type:'table',
          headers:['Palabra', 'Uso', 'Ejemplo'],
          rows:[
            ['<strong>a bit</strong>', 'diferencia pequeña', '"Sue is <strong>a bit older</strong> than Joe." (1 año)'],
            ['<strong>much</strong>',  'diferencia grande',  '"Canada is <strong>much bigger</strong> than France."'],
          ] },
        { type:'rule', warn:true,
          text:'❌ NUNCA: "very bigger" · "very more expensive"<br>✅ SIEMPRE: "much bigger" · "a bit more expensive"<br>"very" es para el grado positivo (very big), no para comparativos.' },
      ],
    },

    unit90: {
      title: 'Superlatives: the oldest / the most expensive',
      content: [
        { type:'text',
          text:'Usamos el <strong>superlativo</strong> para comparar una cosa con todo un grupo. SIEMPRE lleva <strong>the</strong> delante.' },
        { type:'table',
          headers:['Comparativo (dos cosas)', 'Superlativo (todo el grupo)'],
          rows:[
            ["The Europa is <strong>more expensive than</strong> the Grand.", "The Europa is <strong>the most expensive</strong>. (de todos los hoteles)"],
          ] },
        { type:'subtitle', text:'B · Cómo se forma' },
        { type:'table',
          headers:['Tipo', 'Regla', 'Ejemplos'],
          rows:[
            ['1 sílaba',      'the + -est',      'old → <strong>the oldest</strong> · big → <strong>the biggest</strong>'],
            ['Termina en -y', 'the + -iest',      'easy → <strong>the easiest</strong> · happy → <strong>the happiest</strong>'],
            ['2+ sílabas',    'the most + adj.',  'interesting → <strong>the most interesting</strong>'],
            ['Irregular',     '—',                'good → <strong>the best</strong> · bad → <strong>the worst</strong>'],
          ] },
        { type:'rule',
          text:'<strong>SIEMPRE "the":</strong> the oldest · the best · the most expensive. Sin "the" el superlativo es incorrecto.' },
        { type:'example', en:"It's <strong>the oldest</strong> building in the town.", es:'' },
        { type:'example', en:"He isn't <strong>the best</strong> in the team.", es:'(= the best player — sin repetir el sustantivo)' },
        { type:'example', en:"It's <strong>the worst</strong> film I've <strong>ever</strong> seen.", es:'"Ever" + superlativo = el extremo de toda la experiencia.' },
        { type:'rule', warn:true,
          text:'❌ NUNCA: "the most tall" · "the most big" · "the most old"<br>✅ SIEMPRE: "the tallest" · "the biggest" · "the oldest"<br>❌ NUNCA: "the more expensive" (doble error: "the more" no existe)<br>✅ SIEMPRE: "the most expensive"' },
      ],
    },
  },

  theoryQuiz: quiz,
  activeQuiz:  quiz,

  vocabulary: [
    { id:'v01', word:'older',                span:'más viejo/a' },
    { id:'v02', word:'bigger',               span:'más grande' },
    { id:'v03', word:'heavier',              span:'más pesado/a' },
    { id:'v04', word:'more expensive',       span:'más caro/a' },
    { id:'v05', word:'easier',               span:'más fácil' },
    { id:'v06', word:'better',               span:'mejor' },
    { id:'v07', word:'worse',                span:'peor' },
    { id:'v08', word:'further',              span:'más lejos' },
    { id:'v09', word:'taller than',          span:'más alto/a que' },
    { id:'v10', word:'much bigger',          span:'mucho más grande' },
    { id:'v11', word:'a bit older',          span:'un poco mayor' },
    { id:'v12', word:'more than',            span:'más de / más que' },
    { id:'v13', word:'less than',            span:'menos de / menos que' },
    { id:'v14', word:'the oldest',           span:'el/la más viejo/a' },
    { id:'v15', word:'the most expensive',   span:'el/la más caro/a' },
    { id:'v16', word:'the best',             span:'el/la mejor' },
    { id:'v17', word:'the worst',            span:'el/la peor' },
    { id:'v18', word:'the longest',          span:'el/la más largo/a' },
    { id:'v19', word:'the tallest',          span:'el/la más alto/a' },
    { id:'v20', word:"the most … I've ever", span:"el/la más … que he … nunca" },
  ],

  listening: {
    text: "Last summer I visited two amazing cities: Rome and Athens. Rome is beautiful and very old, but Athens is actually older. The Colosseum in Rome is one of the most impressive buildings in the world, but the Parthenon in Athens is more ancient. Greek food is generally cheaper than Italian food, but some people think Italian food is better. The streets in Rome are busier and more crowded than in Athens. However, Athens has the most interesting history of any city I have visited. My sister says it is the most beautiful city she has ever seen. I think both cities are much more exciting than staying at home.",
    options:[
      'older','more impressive','cheaper','better',
      'the most interesting','the most beautiful','more expensive','the newest',
    ],
    correctItems:['older','cheaper','better','the most interesting','the most beautiful'],
  },

  reading: {
    title: 'Faster, Higher, Stronger',
    source: 'English Studio · Level A2–B1',
    passage: `The Olympic motto is "Citius, Altius, Fortius" — in English, "Faster, Higher, Stronger." These three words are all comparative adjectives, and they perfectly describe what the Olympic Games are about: athletes trying to perform better than they did before, and better than their competitors.

In the 100-metre sprint, the winner is simply the runner who is faster than all the others. But in sports like gymnastics or diving, judges decide who is more graceful, more controlled, and more precise. The best athlete is not always the strongest — sometimes, the most flexible or the most creative wins.

Modern athletes are generally bigger, faster, and stronger than athletes from 100 years ago. A sprinter today is significantly faster than the world record holder from 1924. Training methods are more scientific, nutrition is more carefully planned, and equipment is more advanced than ever before.

However, some experts argue that natural talent is still more important than technology. The greatest athletes are not just faster or stronger — they are also more mentally resilient, more disciplined, and more passionate about their sport.`,
    questions: [
      { id:'r01', type:'mc',
        q:'What does the Olympic motto describe?',
        options:['Athletes trying to perform better than before','The history of the Olympic Games','Different types of sport','The rules of competitions'],
        ans:'Athletes trying to perform better than before',
        explanation:'The text says athletes try to "perform better than they did before, and better than their competitors".' },
      { id:'r02', type:'mc',
        q:'In which sports do judges decide the winner based on grace and control?',
        options:['100-metre sprint and swimming','Gymnastics and diving','All Olympic sports','Swimming and cycling'],
        ans:'Gymnastics and diving',
        explanation:'"in sports like gymnastics or diving, judges decide who is more graceful, more controlled…"' },
      { id:'r03', type:'mc',
        q:'According to the text, why are modern athletes better than those from 100 years ago?',
        options:['They are naturally more talented','The Olympics are more popular','Training, nutrition and equipment are more advanced','They train more hours per day'],
        ans:'Training, nutrition and equipment are more advanced',
        explanation:'"Training methods are more scientific, nutrition is more carefully planned, and equipment is more advanced."' },
      { id:'r04', type:'sa',
        q:'Find TWO comparative adjectives from the final paragraph that describe what makes the greatest athletes special beyond physical ability.',
        ans:'more mentally resilient|more disciplined|more passionate' },
      { id:'r05', type:'mc',
        q:'Which sentence correctly uses a comparative adverb?',
        options:['Swimmers today swim more quick than in 1924.','Swimmers today swim more quickly than in 1924.','Swimmers today swim quicklier than in 1924.','Swimmers today swim most quickly than in 1924.'],
        ans:'Swimmers today swim more quickly than in 1924.',
        explanation:'Adverbs ending in -ly use "more" for the comparative: more quickly (never "quicklier").' },
    ],
  },
};

export const comparativesReadingPatch = {};