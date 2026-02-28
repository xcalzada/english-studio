// src/units/comparatives.js
// Quiz rediseñado:
//   · Progresión estricta de dificultad (Nivel 1 → 5)
//   · Bloques 87, 88 y 90 mezclados en cada nivel
//   · hint: pista visible antes de responder
//   · explanation: motivo de la respuesta — siempre se muestra (acierto y fallo)
//   · Superlativos: el alumno siempre escribe "the" — nunca viene dado

const quiz = [

  // ── 10 COMPARATIVOS ──────────────────────────────────────────────

  { id:'q01', type:'fill',
    q:'My phone is old, but your phone is ______.',
    ans:'older',
    hint:'old = 1 sílaba → añade -er.',
    explanation:'"old" (1 sílaba) → <strong>older</strong>. Comparamos dos móviles, por eso comparativo. El superlativo sería "the oldest".' },

  { id:'q02', type:'fill',
    q:"I don't like this flat. I want something ______ comfortable.",
    ans:'more',
    hint:'comfortable = 4 sílabas → usa "more" delante. El adjetivo no cambia.',
    explanation:'"comfortable" (4 sílabas) → <strong>more</strong> comfortable. Nunca "comfortabler". Para palabras de 2+ sílabas: more + adjetivo sin cambiar.' },

  { id:'q03', type:'fill',
    q:'The red car is fast, but the blue car is ______ faster.',
    ans:'much',
    hint:'Diferencia grande → "much". Diferencia pequeña → "a bit".',
    explanation:'"<strong>much</strong> faster" = mucho más rápido (diferencia grande). "a bit faster" sería diferencia pequeña. "very faster" es incorrecto — "very" nunca va con comparativos.' },

  { id:'q04', type:'fill',
    q:'Yesterday was bad. Today is even ______.',
    ans:'worse',
    hint:'bad es irregular → bad → ???',
    explanation:'"bad" → <strong>worse</strong> (irregular). "even worse" = todavía peor. "even" refuerza el comparativo igual que "much" o "a bit".' },

  { id:'q05', type:'error',
    q:'My sister is more tall than me.',
    ans:'My sister is taller than me.',
    hint:'tall = 1 sílaba → usa -er, nunca "more".',
    explanation:'"tall" (1 sílaba) → <strong>taller</strong>. "More tall" es incorrecto. Regla: palabras cortas usan -er; palabras largas usan more. Nunca mezcles los dos.' },

  { id:'q06', type:'choice',
    q:'Spain is ______ than England. (temperatura)',
    options:['hottest', 'more hot', 'hotter', 'hotest'],
    ans:'hotter',
    hint:'hot = 1 sílaba, CVC (h-o-t) → dobla la t antes de -er.',
    explanation:'"hot" termina en consonante-vocal-consonante (h-o-t) → dobla la t: <strong>hotter</strong>. Sin doblar quedaría "hoter" — pronunciación distinta. Mismo patrón: big→bigger, thin→thinner.' },

  { id:'q07', type:'fill',
    q:'I have done three tests. The first was easy, the second was difficult, but the third was ______. (difficult)',
    ans:'the most difficult',
    hint:'difficult = 3 sílabas → superlativo: the most + adjetivo. Comparamos con todos los exámenes → superlativo, no comparativo.',
    explanation:'"difficult" (3 sílabas) → <strong>the most difficult</strong>. Comparamos el tercer examen con todos los que ha hecho (grupo de tres) → superlativo. Si comparáramos solo dos diríamos "more difficult than the second".' },


  // ── 10 SUPERLATIVOS ──────────────────────────────────────────────

  { id:'q08', type:'fill',
    q:'Mount Everest is ______ mountain in the world. (high)',
    ans:'the highest',
    hint:'high = 1 sílaba → superlativo: the + -est. Escribe las dos palabras.',
    explanation:'"high" (1 sílaba) → <strong>the highest</strong>. Los superlativos SIEMPRE llevan "the": sin él la frase es incorrecta. "In the world" delimita el grupo.' },

  { id:'q09', type:'fill',
    q:'It was ______ day of my life. (bad)',
    ans:'the worst',
    hint:'bad es irregular → bad → worse → ??? Escribe las dos palabras.',
    explanation:'"bad" es irregular: bad → worse → <strong>the worst</strong>. "Of my life" confirma superlativo: hablamos del extremo de todos los días de su vida.' },

  { id:'q10', type:'fill',
    q:'She is ______ student in the class. (talented)',
    ans:'the most talented',
    hint:'talented = 3 sílabas → superlativo: the most + adjetivo. Escribe las tres palabras.',
    explanation:'"talented" (3 sílabas) → <strong>the most talented</strong>. Para palabras largas el superlativo es "the most + adjetivo sin cambiar". "The" es obligatorio.' },

  { id:'q11', type:'error',
    q:'That is most beautiful sunset I have ever seen.',
    ans:'That is the most beautiful sunset I have ever seen.',
    hint:'Superlativo → SIEMPRE necesita "the" delante.',
    explanation:'Sin "the" el superlativo es incorrecto en inglés. Correcto: "<strong>the</strong> most beautiful sunset I have ever seen". "I have ever seen" confirma superlativo.' },

  { id:'q12', type:'choice',
    q:'Which is correct?',
    options:[
      'Tokyo is the most big city in Japan.',
      'Tokyo is the bigger city in Japan.',
      'Tokyo is the biggest city in Japan.',
      'Tokyo is most biggest city in Japan.',
    ],
    ans:'Tokyo is the biggest city in Japan.',
    hint:'big = 1 sílaba, CVC → superlativo: the + dobla g + -est.',
    explanation:'"big" (CVC: b-i-g) → superlativo: <strong>the biggest</strong>. "The most big" es incorrecto (palabras cortas usan -est). "Most biggest" es doble superlativo. "The bigger" es comparativo, no superlativo.' },

  { id:'q13', type:'fill',
    q:'This is ______ day of my life. (happy)',
    ans:'the happiest',
    hint:'happy termina en -y → superlativo: the + -iest. Escribe las dos palabras.',
    explanation:'"happy" termina en -y → quita la y, añade -iest: <strong>the happiest</strong>. Mismo patrón: easy→the easiest, heavy→the heaviest. "The" es obligatorio.' },


  // ── EJERCICIO TIPO PÁRRAFO ────────────────────────────────────────

  { id:'q14', type:'fill',
    q:'Complete the paragraph. Write the full form in each gap.\n\nLondon and Tokyo are two of ______ (1·exciting) cities in the world. London is ______ (2·old) than Tokyo — it was founded by the Romans — but Tokyo is ______ (3·populated) city in the world, with over 37 million people. The Tokyo metro is ______ (4·efficient) than the London Underground: it is almost never late. However, London has ______ (5·international) atmosphere — people from more than 180 countries live there. Both cities are ______ (6·expensive) than most other cities, but Tokyo has slightly cheaper daily costs.',
    ans:'the most exciting, older, the most populated, more efficient, the most international, more expensive',
    hint:'(1) superlativo largo → the most + adj · (2) comparativo 1 sílaba → -er · (3) superlativo largo → the most + adj · (4) comparativo largo → more + adj · (5) superlativo largo → the most + adj · (6) comparativo largo → more + adj.',
    explanation:'(1) <strong>the most exciting</strong> — 3 sílabas, superlativo. (2) <strong>older</strong> — old, 1 sílaba, -er. (3) <strong>the most populated</strong> — 3 sílabas, superlativo. (4) <strong>more efficient</strong> — 3 sílabas, comparativo. (5) <strong>the most international</strong> — 5 sílabas, superlativo. (6) <strong>more expensive</strong> — 3 sílabas, comparativo.' },

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