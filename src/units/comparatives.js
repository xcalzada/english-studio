// src/units/comparatives.js
// Quiz rediseñado (v2):
//   · Progresión estricta de dificultad (Nivel 1 → 5)
//   · TODOS los ejercicios tienen etiqueta block: para el QuickCheck
//   · matchpairs intercalados en L2 y L3 para romper la monotonía
//   · Ejercicios contrastivos comparativo vs. superlativo
//   · Redundancia "fill the" reducida de 6 a 2
//   · Dos ejercicios order sustituidos por fills de producción libre
//   · hint: pista visible antes de responder
//   · explanation: motivo — se muestra en acierto y fallo

const quiz = [

  // ════════════════════════════════════════════════════════
  // NIVEL 1 — RECONOCIMIENTO (q01–q12)
  // choice puro + 2 matchpairs para activar los paradigmas
  // desde el primer nivel. Todos los bloques representados.
  // ════════════════════════════════════════════════════════

  { id:'q01', type:'choice', block:'forming',
    q:'Elige el comparativo correcto de <strong>old</strong>.',
    options:['more old', 'older', 'oldest', 'olded'],
    ans:'older',
    hint:'old = 1 sílaba → regla -er',
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
    hint:'old = 1 sílaba · superlativo → the + ???',
    explanation:'"old" (1 sílaba) → superlativo: <strong>the oldest</strong>. Siempre con <strong>the</strong>. "Most old" es incorrecto para palabras cortas.' },

  { id:'q04', type:'choice', block:'forming',
    q:'Elige el comparativo correcto de <strong>good</strong>.',
    options:['gooder', 'more good', 'better', 'best'],
    ans:'better',
    hint:'good es irregular 🧠',
    explanation:'"good" es completamente irregular: good → <strong>better</strong> → the best. No existe "gooder" ni "more good". Su pareja: bad → worse → the worst.' },

  { id:'q05', type:'choice', block:'forming',
    q:'Elige el comparativo correcto de <strong>expensive</strong>.',
    options:['expensiver', 'more expensive', 'expensiveer', 'most expensive'],
    ans:'more expensive',
    hint:'expensive = ex-pen-sive · cuenta las sílabas',
    explanation:'"expensive" tiene 3 sílabas → <strong>more expensive</strong>. Nunca "expensiver". Para palabras de 2+ sílabas el adjetivo no cambia — solo añades "more" delante.' },

  { id:'q06', type:'choice', block:'forming',
    q:'Elige el comparativo correcto de <strong>happy</strong>.',
    options:['more happy', 'happyer', 'happier', 'hapier'],
    ans:'happier',
    hint:'happy termina en -y',
    explanation:'"happy" termina en -y → quita la y, añade -ier: happ + ier = <strong>happier</strong>. Mismo patrón: easy→easier, heavy→heavier. Nunca "more happy".' },

  { id:'q07', type:'choice', block:'using',
    q:'Elige el modificador correcto: Box A is ______ bigger than Box B. (diferencia pequeña)',
    options:['much', 'very', 'a bit', 'most'],
    ans:'a bit',
    hint:'¿Es una diferencia grande o pequeña?',
    explanation:'"<strong>a bit</strong> bigger" = un poco más grande. "much bigger" = mucho más grande. "very" nunca modifica comparativos — es un error muy común. Se dice "very big" pero "much bigger".' },

  { id:'q08', type:'choice', block:'superlatives',
    q:'Elige el superlativo correcto de <strong>bad</strong>.',
    options:['the baddest', 'the most bad', 'the worst', 'the worser'],
    ans:'the worst',
    hint:'bad es irregular. bad → worse → ???',
    explanation:'"bad" es irregular: bad → worse → <strong>the worst</strong>. Memorizar junto con: good → better → the best.' },

  // Ejercicio contrastivo: ¿comparativo o superlativo?
  { id:'q09', type:'choice', block:'superlatives',
    q:'Spain has three big cities. Madrid is ______ city. (big)',
    options:['bigger', 'the biggest', 'most big', 'more bigger'],
    ans:'the biggest',
    hint:'¿Dos cosas o todo el grupo? Hay 3 ciudades.',
    explanation:'Cuando comparamos con <em>todo el grupo</em> (3 ciudades) → superlativo: <strong>the biggest</strong>. Si solo comparásemos Madrid con Barcelona diríamos "Madrid is bigger than Barcelona".' },

  // Ejercicio contrastivo inverso
  { id:'q10', type:'choice', block:'superlatives',
    q:'I have two brothers. Carlos is ______ than Miguel. (tall)',
    options:['the tallest', 'tallest', 'taller', 'most tall'],
    ans:'taller',
    hint:'¿Cuántas personas comparamos?',
    explanation:'Comparamos dos personas (Carlos y Miguel) → comparativo: <strong>taller than</strong>. Si comparásemos Carlos con todos sus compañeros de clase: "Carlos is the tallest in the class".' },

  // matchpairs: irregulares completos
  { id:'q11', type:'matchpairs', block:'forming',
    q:'Empareja cada adjetivo con su comparativo irregular.',
    leftLabel:'Adjetivo base',
    rightLabel:'Comparativo',
    pairs:[
      { left:'good',  right:'better' },
      { left:'bad',   right:'worse'  },
      { left:'far',   right:'further'},
      { left:'little',right:'less'   },
    ],
    explanation:'Los irregulares no siguen ninguna regla — hay que memorizarlos: good→better, bad→worse, far→further, little→less. Sus superlativos: the best, the worst, the furthest, the least.' },

  // matchpairs: comparativo ↔ superlativo
  { id:'q12', type:'matchpairs', block:'superlatives',
    q:'Empareja cada comparativo con su superlativo correspondiente.',
    leftLabel:'Comparativo',
    rightLabel:'Superlativo',
    pairs:[
      { left:'older',           right:'the oldest'          },
      { left:'more expensive',  right:'the most expensive'  },
      { left:'better',          right:'the best'            },
      { left:'worse',           right:'the worst'           },
    ],
    explanation:'La misma regla de formación aplica al superlativo: si el comparativo usa -er, el superlativo usa the + -est. Si usa "more", el superlativo usa "the most".' },


  // ════════════════════════════════════════════════════════
  // NIVEL 2 — PRODUCCIÓN BÁSICA (q13–q26)
  // Fills de 1 hueco con reglas directas + matchpairs intercalados.
  // El alumno escribe la respuesta completa.
  // ════════════════════════════════════════════════════════

  { id:'q13', type:'fill', block:'forming',
    q:'Rome is old, but Athens is ______.',
    ans:'older',
    hint:'old = 1 sílaba',
    explanation:'"old" (1 sílaba) → <strong>older</strong>. Comparamos DOS ciudades → comparativo. Superlativo: "the oldest city in the world".' },

  { id:'q14', type:'fill', block:'forming',
    q:"The weather wasn't very good yesterday, but it's ______ today.",
    ans:'better',
    hint:'good es irregular → ???',
    explanation:'"good" → <strong>better</strong> (irregular). Dos momentos (ayer y hoy) → comparativo. Superlativo sería "the best".' },

  { id:'q15', type:'fill', block:'forming',
    q:"'Do you feel better today?' 'No, I feel ______.'",
    ans:'worse',
    hint:'bad es irregular → ???',
    explanation:'"bad" → <strong>worse</strong> (irregular). Lo contrario de "better" es "worse". Superlativo: "the worst".' },

  { id:'q16', type:'fill', block:'using',
    q:'Canada is much bigger ______ France.',
    ans:'than',
    hint:'bigger, older… ¿qué palabra viene siempre después?',
    explanation:'"<strong>than</strong>" sigue siempre al comparativo. "much bigger than" = mucho más grande que.' },

  { id:'q17', type:'fill', block:'forming',
    q:'This job is boring. I want something ______ interesting.',
    ans:'more',
    hint:'interesting = in-ter-est-ing · cuenta las sílabas',
    explanation:'"interesting" (4 sílabas) → <strong>more</strong> interesting. Para palabras de 2+ sílabas: more + adjetivo sin cambiar.' },

  { id:'q18', type:'fill', block:'forming',
    q:"My bag isn't very heavy. Your bag is ______.",
    ans:'heavier',
    hint:'heavy termina en -y',
    explanation:'"heavy" termina en -y → <strong>heavier</strong>. Regla: quita la y, añade -ier. Igual que: easy→easier, happy→happier.' },

  // matchpairs: regla CVC (consonante-vocal-consonante)
  { id:'q19', type:'matchpairs', block:'forming',
    q:'Empareja cada adjetivo con su comparativo correcto. Atención a la ortografía.',
    leftLabel:'Adjetivo',
    rightLabel:'Comparativo',
    pairs:[
      { left:'big',  right:'bigger'  },
      { left:'hot',  right:'hotter'  },
      { left:'thin', right:'thinner' },
      { left:'fast', right:'faster'  },
    ],
    explanation:'Regla CVC: big (b-i-g), hot (h-o-t), thin (t-h-i-n) → terminan en consonante-vocal-consonante → dobla la última consonante. "fast" termina en dos consonantes (s-t) → NO se dobla.' },

  { id:'q20', type:'fill', block:'using',
    q:"He isn't very tall. You're taller ______ him.",
    ans:'than',
    hint:'"than" + pronombre: him, her, me, us, them…',
    explanation:'"taller <strong>than</strong> him" — después de "than" usamos pronombre OBJETO: him (no he), her (no she), me (no I).' },

  { id:'q21', type:'fill', block:'using',
    q:'Jack is 23. His father is 69. His father is ______ older than Jack.',
    ans:'much',
    hint:'46 años de diferencia — ¿grande o pequeña?',
    explanation:'46 años → diferencia grande → "<strong>much</strong> older". "a bit older" sería para 1-2 años. "very older" es incorrecto — "very" no modifica comparativos.' },

  { id:'q22', type:'fill', block:'superlatives',
    q:"The church is very old. It's ______ oldest building in the town.",
    ans:'the',
    hint:'Superlativo: ¿qué artículo lleva SIEMPRE?',
    explanation:'Los superlativos SIEMPRE necesitan "<strong>the</strong>": <strong>the</strong> oldest. Sin "the" la frase es incorrecta — no es opcional.' },

  { id:'q23', type:'fill', block:'forming',
    q:'Kate is 26, Ben is 24. Kate is ______ than Ben.',
    ans:'older',
    hint:'old = 1 sílaba · comparamos 2 personas',
    explanation:'"old" → <strong>older than</strong>. Dos personas → comparativo. Si comparásemos Kate con todo su grupo: "Kate is the oldest".' },

  { id:'q24', type:'fill', block:'using',
    q:'The film was very short — less ______ an hour.',
    ans:'than',
    hint:'less ___ = menos de · igual que "more ___"',
    explanation:'"less <strong>than</strong>" (menos de) es lo opuesto de "more than". Ambos necesitan "than".' },

  // matchpairs: adjetivo base ↔ superlativo completo (con "the")
  { id:'q25', type:'matchpairs', block:'superlatives',
    q:'Empareja cada adjetivo con su superlativo completo (incluye "the").',
    leftLabel:'Adjetivo',
    rightLabel:'Superlativo',
    pairs:[
      { left:'easy',      right:'the easiest'        },
      { left:'beautiful', right:'the most beautiful'  },
      { left:'good',      right:'the best'            },
      { left:'bad',       right:'the worst'           },
    ],
    explanation:'"easy" (-y) → the easiest. "beautiful" (3+ sílabas) → the most beautiful. Los irregulares (good/bad) no siguen ninguna regla de formación.' },

  { id:'q26', type:'fill', block:'superlatives',
    q:"Luke is a good player, but he isn't ______ best in the team.",
    ans:'the',
    hint:'Superlativo sin sustantivo · ¿qué artículo lleva?',
    explanation:'"<strong>the</strong> best" — el sustantivo no se repite pero "the" es OBLIGATORIO. Los superlativos siempre llevan "the", con o sin sustantivo.' },


  // ════════════════════════════════════════════════════════
  // NIVEL 3 — PRODUCCIÓN MEDIA (q27–q38)
  // Fills con ortografía y contexto · corrección de errores.
  // Los ejercicios de error ya incluyen errores complejos.
  // ════════════════════════════════════════════════════════

  { id:'q27', type:'fill', block:'forming',
    q:"Helen's car isn't very big. She wants a ______ one.",
    ans:'bigger',
    hint:'big = consonante-vocal-consonante (b-i-g)',
    explanation:'"big" (b-i-g) → dobla la g: <strong>bigger</strong>. Sin doblar quedaría "biger" — pronunciación diferente. Mismo patrón: hot→hotter, thin→thinner.' },

  { id:'q28', type:'fill', block:'forming',
    q:'The Europa Hotel costs £150. The Grand costs £130. The Europa is ______ expensive than the Grand.',
    ans:'more',
    hint:'expensive = 3 sílabas · comparamos 2 hoteles',
    explanation:'"expensive" (3 sílabas) → <strong>more</strong> expensive than. Superlativo: the most expensive (de todos los hoteles).' },

  { id:'q29', type:'fill', block:'forming',
    q:"Ben is a very good swimmer. Kate isn't. Ben is a ______ swimmer than Kate.",
    ans:'better',
    hint:'good → ??? · comparamos 2 personas',
    explanation:'"good" → <strong>better</strong> (irregular). Dos personas → comparativo. Superlativo: "the best swimmer in the team".' },

  { id:'q30', type:'fill', block:'superlatives',
    q:"It's a very good film. It's ______ best film I've ever seen.",
    ans:'the',
    hint:'Superlativo + ever · ¿qué artículo lleva?',
    explanation:'"<strong>the</strong> best" — good → the best (irregular). "the best … I\'ve ever seen" = superlativo + ever. "Ever" aquí significa "en toda mi vida".' },

  { id:'q31', type:'fill', block:'using',
    q:'Emma is 25. Joe is 24½. Emma is a bit ______ than Joe.',
    ans:'older',
    hint:'old = 1 sílaba · medio año = diferencia pequeña',
    explanation:'"a bit <strong>older</strong> than" — medio año → diferencia pequeña → "a bit". old → older (1 sílaba, -er).' },

  { id:'q32', type:'fill', block:'using',
    q:'Yesterday I felt terrible. Today I feel ______ better.',
    ans:'much|a lot',
    hint:'de "terrible" a sentirse bien — ¿grande o pequeña?',
    explanation:'Mejora de "terrible" a "OK" → diferencia grande → "<strong>much</strong> better". "a bit better" sería para mejoras pequeñas.' },

  { id:'q33', type:'error', block:'forming',
    q:'She is the most tall student in the class.',
    ans:'She is the tallest student in the class.',
    hint:'tall = 1 sílaba',
    explanation:'"tall" (1 sílaba) → <strong>the tallest</strong>. "The most tall" es incorrecto. Regla: palabras cortas → -er/-est; palabras largas → more/the most.' },

  { id:'q34', type:'error', block:'using',
    q:'London is more beautiful that Paris.',
    ans:'London is more beautiful than Paris.',
    hint:'¿"that" o "than" después de un comparativo?',
    explanation:'"<strong>than</strong>" (no "that") — error frecuente en español porque "que" puede ser "that" o "than". Después de comparativo SIEMPRE "than".' },

  { id:'q35', type:'error', block:'forming',
    q:'Jack is more strong than his brother.',
    ans:'Jack is stronger than his brother.',
    hint:'strong = 1 sílaba',
    explanation:'"strong" (1 sílaba) → <strong>stronger</strong>. "More strong" es incorrecto para palabras cortas. Regla: 1 sílaba → -er.' },

  { id:'q36', type:'error', block:'using',
    q:'She is a bit more taller than me.',
    ans:'She is a bit taller than me.',
    hint:'"taller" ya es comparativo — ¿qué sobra?',
    explanation:'"more taller" = doble comparativo. "Taller" ya ES la forma comparativa. Correcto: <strong>a bit taller than me</strong>.' },

  { id:'q37', type:'error', block:'superlatives',
    q:"It's the more expensive restaurant in the city.",
    ans:"It's the most expensive restaurant in the city.",
    hint:'"the more + adjetivo" — ¿qué palabra es incorrecta?',
    explanation:'"<strong>the most expensive</strong>" es el superlativo. "The more expensive" es incorrecto — "more" es comparativo, "the most" es superlativo.' },

  { id:'q38', type:'error', block:'superlatives',
    q:'What is the most longest river in the world?',
    ans:'What is the longest river in the world?',
    hint:'"longest" ya es superlativo — ¿qué sobra?',
    explanation:'"most longest" = doble superlativo. "Longest" ya ES la forma superlativa. Correcto: <strong>the longest</strong>.' },


  // ════════════════════════════════════════════════════════
  // NIVEL 4 — PRODUCCIÓN AVANZADA (q39–q48)
  // Ordenar frases, fills de producción libre (adjetivo dado,
  // alumno escribe la forma completa en contexto).
  // ════════════════════════════════════════════════════════

  { id:'q39', type:'order', block:'using',
    words:['Athens', 'is', 'older', 'than', 'Rome', '.'],
    ans:'Athens is older than Rome.',
    hint:'sujeto · verbo · comparativo · than · ...',
    explanation:'Orden: sujeto (Athens) + verbo (is) + comparativo (older) + than + segundo elemento (Rome).' },

  { id:'q40', type:'order', block:'using',
    words:['Canada', 'is', 'much', 'bigger', 'than', 'France', '.'],
    ans:'Canada is much bigger than France.',
    hint:'¿dónde va "much"?',
    explanation:'"<strong>much</strong> bigger than" — "much" siempre precede al comparativo. Orden: sujeto + verbo + much/a bit + comparativo + than + segundo elemento.' },

  { id:'q41', type:'order', block:'superlatives',
    words:['The', 'church', 'is', 'the', 'oldest', 'building', 'in', 'the', 'town', '.'],
    ans:'The church is the oldest building in the town.',
    hint:'the + ??? + building + in + lugar',
    explanation:'"the oldest building in the town". "<strong>in</strong> the town" delimita el grupo de comparación.' },

  { id:'q42', type:'order', block:'superlatives',
    words:["It's", 'the', 'worst', 'film', "I've", 'ever', 'seen', '.'],
    ans:"It's the worst film I've ever seen.",
    hint:"bad es irregular · I've ever + participio",
    explanation:'"the worst film I\'ve ever seen" — bad → the worst (irregular). "ever" siempre va después del superlativo.' },

  // Fill de producción libre: adjetivo dado, alumno forma comparativo en contexto
  { id:'q43', type:'fill', block:'forming',
    q:'The new office is ______ the old one. (modern — 3 sílabas, comparativo)',
    ans:'more modern than',
    hint:'modern = 3 sílabas · comparamos 2 cosas → ???  + than',
    explanation:'"modern" (3 sílabas) → <strong>more modern than</strong>. El adjetivo no cambia: solo añades "more" delante y "than" después del segundo elemento.' },

  // Fill de producción libre: superlativo en contexto
  { id:'q44', type:'fill', block:'superlatives',
    q:"Of all my friends, Sarah is ______. (funny — -y ending, superlativo)",
    ans:'the funniest',
    hint:'funny termina en -y · superlativo · ¿artículo?',
    explanation:'"funny" termina en -y → superlativo: the funn<strong>iest</strong> (y → iest). SIEMPRE con "the". Mismo patrón que: happy→the happiest, easy→the easiest.' },

  { id:'q45', type:'order', block:'forming',
    words:['His', 'father', 'is', 'much', 'older', 'than', 'his', 'mother', '.'],
    ans:'His father is much older than his mother.',
    hint:'"much" + ??? + than',
    explanation:'"much older than" — diferencia grande. old → older (1 sílaba, -er). "Much" va entre el verbo y el comparativo.' },

  { id:'q46', type:'order', block:'superlatives',
    words:['Jupiter', 'is', 'the', 'largest', 'planet', 'in', 'the', 'solar', 'system', '.'],
    ans:'Jupiter is the largest planet in the solar system.',
    hint:'large = 1 sílaba · the + ??? + planet',
    explanation:'"the largest planet in the solar system" — large → the largest (1 sílaba, termina en -e → solo añade -st).' },

  // Fill de producción libre: comparativo con modificador
  { id:'q47', type:'fill', block:'using',
    q:"The new phone is ______ the old model, but not by much. (fast — usa 'a bit')",
    ans:'a bit faster than',
    hint:'1 sílaba · diferencia pequeña · comparativo + than',
    explanation:'"<strong>a bit faster than</strong>" — fast → faster (1 sílaba, -er). "a bit" indica diferencia pequeña. Orden: a bit + comparativo + than.' },

  // Fill de producción libre: superlativo irregular
  { id:'q48', type:'fill', block:'superlatives',
    q:"Of all the options, this is ______. (bad — irregular, superlativo)",
    ans:'the worst',
    hint:'bad es irregular · bad → worse → ???',
    explanation:'"bad" es irregular: bad → worse → <strong>the worst</strong>. No existe "the most bad" ni "the baddest". Siempre con "the".' },


  // ════════════════════════════════════════════════════════
  // NIVEL 5 — TRADUCCIÓN Y SÍNTESIS (q49–q54)
  // El alumno produce la frase completa en inglés.
  // Combina las tres estructuras. Máxima dificultad.
  // ════════════════════════════════════════════════════════

  { id:'q49', type:'translate', block:'forming',
    q:'Atenas es más antigua que Roma.',
    ans:'Athens is older than Rome.',
    hint:'antiguo → old · 1 sílaba · dos ciudades',
    explanation:'"old" (1 sílaba) → <strong>older than</strong>. En español "más antigua que" → en inglés "older than". No existe "more old than".' },

  { id:'q50', type:'translate', block:'superlatives',
    q:'Es la peor película que he visto nunca.',
    ans:"It's the worst film I've ever seen.|It's the worst movie I've ever seen.",
    hint:'bad es irregular · nunca → ever',
    explanation:'"bad" → <strong>the worst</strong> (irregular). Estructura: the worst + sustantivo + I\'ve ever + participio. "Ever" = en toda mi vida.' },

  { id:'q51', type:'translate', block:'using',
    q:'Canadá es mucho más grande que Francia.',
    ans:'Canada is much bigger than France.|Canada is much larger than France.',
    hint:'big = CVC · mucho más → much + comparativo',
    explanation:'"big" (b-i-g) → <strong>bigger</strong> (dobla la g). "much bigger than" = mucho más grande que. "Very bigger" es incorrecto — con comparativos: "much" o "a bit", nunca "very".' },

  { id:'q52', type:'translate', block:'superlatives',
    q:'¿Cuál es el río más largo del mundo?',
    ans:'What is the longest river in the world?|Which is the longest river in the world?',
    hint:'long = 1 sílaba · del mundo → in the ???',
    explanation:'"long" (1 sílaba) → <strong>the longest</strong>. "Del mundo" → "in the world" (en inglés "in" con lugares). "The" es obligatorio.' },

  { id:'q53', type:'translate', block:'using',
    q:'El hotel fue un poco más caro de lo que esperaba.',
    ans:'The hotel was a bit more expensive than I expected.',
    hint:'expensive = 3 sílabas · un poco → ???',
    explanation:'"expensive" (3 sílabas) → <strong>more expensive</strong>. "a bit" = un poco (diferencia pequeña). "De lo que esperaba" → "than I expected".' },

  { id:'q54', type:'translate', block:'superlatives',
    q:'Júpiter es el planeta más grande del sistema solar y es mucho más grande que la Tierra.',
    ans:'Jupiter is the largest planet in the solar system and it is much larger than the Earth.|Jupiter is the largest planet in the solar system and it is much bigger than the Earth.',
    hint:'large = 1 sílaba (-e final) · mucho más → much + comparativo',
    explanation:'"large" → <strong>the largest</strong> (superlativo) y <strong>much larger than</strong> (comparativo). Mismo adjetivo, las dos formas en una frase — el ejercicio más completo de la unidad.' },

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
        { type:'tip', emoji:'🔑',
          text:'<strong>¿Comparativo o superlativo?</strong> Compara DOS cosas → comparativo (older than). Compara con TODO el grupo (3 o más) → superlativo (the oldest).' },
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