export const superlativesworldrecords = {
  id: 'superlatives-world-records',
  title: 'World Records',
  grammarTitle: 'Superlatives (The -est / The most)',
  description: 'Domina los extremos del mundo: desde lo más rápido hasta lo más peligroso.',

  // --- SECCIÓN DISCOVERY (Reglas Activas) ---
  activeRules: {
    title: "Discovery: Superlative Rules",
    description: "Observa los ejemplos y completa las reglas de los superlativos.",
    steps: [
      { 
        id: 'rule1', 
        text: "For short adjectives (1 syllable), add ______ to the end (e.g., Fast → The fastest).", 
        ans: "-est",
        hint: "Es un sufijo de 3 letras."
      },
      { 
        id: 'rule2', 
        text: "For adjectives ending in CVC (Consonant-Vowel-Consonant), ______ the last letter (e.g., Hot → The hottest).", 
        ans: "double",
        hint: "Escribir la consonante dos veces."
      },
      { 
        id: 'rule3', 
        text: "For adjectives ending in 'Y', change the 'Y' to ______ (e.g., Happy → The happiest).", 
        ans: "i",
        hint: "La 'y' se transforma en esta vocal."
      },
      { 
        id: 'rule4', 
        text: "For long adjectives (2+ syllables), put ______ before the word (e.g., Dangerous).", 
        ans: "the most",
        hint: "Dos palabras antes del adjetivo."
      },
      { 
        id: 'rule5', 
        text: "Irregular adjectives don't follow rules. Good becomes ______ .", 
        ans: "the best",
        hint: "El mejor."
      }
    ]
  },

  // --- QUIZ ACTIVO (MEZCLADO Y NUEVO) ---
  activeQuiz: [
    { id: 'aq1', q: "The cheetah is ______ (fast) animal on land.", ans: "the fastest", explanation: "Short adjective: add -est." },
    { id: 'aq2', q: "This is ______ (expensive) hotel in the city.", ans: "the most expensive", explanation: "Long adjective (3 syllables): use 'the most'." },
    { id: 'aq3', q: "Yesterday was ______ (hot) day of the summer.", ans: "the hottest", explanation: "CVC Rule: double the 't'." },
    { id: 'aq4', q: "Who is ______ (good) singer in the world?", ans: "the best", explanation: "Irregular: Good → The best." },
    { id: 'aq5', q: "That was ______ (sad) movie I have ever seen.", ans: "the saddest", explanation: "CVC Rule: double the 'd'." },
    { id: 'aq6', q: "Physics is ______ (difficult) subject for me.", ans: "the most difficult", explanation: "Long adjective: use 'the most'." },
    { id: 'aq7', q: "The giraffe has ______ (long) neck.", ans: "the longest", explanation: "Short adjective: add -est." },
    { id: 'aq8', q: "He is ______ (funny) guy in the class.", ans: "the funniest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq9', q: "The Burj Khalifa is ______ (tall) building.", ans: "the tallest", explanation: "Short adjective: add -est." },
    { id: 'aq10', q: "This is ______ (bad) pizza I've ever tasted.", ans: "the worst", explanation: "Irregular: Bad → The worst." },
    { id: 'aq11', q: "My dog is ______ (heavy) than yours? No, he is ______ (heavy) in the park.", ans: "the heaviest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq12', q: "Mount Everest is ______ (high) peak on Earth.", ans: "the highest", explanation: "Short adjective: add -est." },
    { id: 'aq13', q: "Is this ______ (safe) way to go?", ans: "the safest", explanation: "Ends in E: just add -st." },
    { id: 'aq14', q: "Russia is ______ (big) country by area.", ans: "the biggest", explanation: "CVC Rule: double the 'g'." },
    { id: 'aq15', q: "Science is ______ (interesting) class.", ans: "the most interesting", explanation: "Long adjective: use 'the most'." },
    { id: 'aq16', q: "What is ______ (dry) place on Earth?", ans: "the driest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq17', q: "The blue whale is ______ (large) mammal.", ans: "the largest", explanation: "Ends in E: just add -st." },
    { id: 'aq18', q: "My grandmother is ______ (old) person in my family.", ans: "the oldest", explanation: "Short adjective: add -est." },
    { id: 'aq19', q: "It was ______ (dangerous) storm in history.", ans: "the most dangerous", explanation: "Long adjective: use 'the most'." },
    { id: 'aq20', q: "Neptune is ______ (far) planet from the Sun.", ans: "the farthest", explanation: "Irregular: Far → The farthest." },
    { id: 'aq21', q: "The mosquito is ______ (deadly) insect.", ans: "the deadliest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq22', q: "Summer is usually ______ (sunny) season.", ans: "the sunniest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq23', q: "He bought ______ (cheap) ticket available.", ans: "the cheapest", explanation: "Short adjective: add -est." },
    { id: 'aq24', q: "This is ______ (comfortable) chair in the house.", ans: "the most comfortable", explanation: "Long adjective: use 'the most'." },
    { id: 'aq25', q: "The Nile is ______ (wide) river at this point.", ans: "the widest", explanation: "Ends in E: just add -st." },
    { id: 'aq26', q: "Monday is ______ (busy) day of the week.", ans: "the busiest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq27', q: "Gold is ______ (popular) metal for jewelry.", ans: "the most popular", explanation: "Long adjective: use 'the most'." },
    { id: 'aq28', q: "I am ______ (lucky) person today!", ans: "the luckiest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq29', q: "That is ______ (thin) phone on the market.", ans: "the thinnest", explanation: "CVC Rule: double the 'n'." },
    { id: 'aq30', q: "She is ______ (intelligent) student in the group.", ans: "the most intelligent", explanation: "Long adjective: use 'the most'." }
  ],

  // --- TEORÍA VISUAL (ESTILO ACTUALIZADO) ---
  theoryBlock: {
    short: {
      title: "A) Short Adjectives (1 Syllable)",
      content: [
        "<span class='text-slate-950 font-black'>Regla General: Añade <span class='underline'>-est</span> (Tall → the tallest)</span>",
        "<span class='text-slate-950 font-black'>Si acaba en -e: Añade <span class='underline'>-st</span> (Nice → the nicest)</span>",
        "<span class='text-slate-950 font-black'>Si acaba en -y: Cambia a <span class='underline'>-iest</span> (Happy → the happiest)</span>"
      ]
    },
    cvc: {
      title: "B) CVC Rule (1 Syllable - Double Consonant)",
      content: [
        "<span class='text-slate-950 font-black'>Para adjetivos cortos de 1 sílaba con Consonante-Vocal-Consonante: <span class='underline'>se dobla la última letra</span>.</span>",
        "<span class='text-slate-950 font-black italic'>Big → the bi<span class='underline'>gg</span>est</span>",
        "<span class='text-slate-950 font-black italic'>Hot → the ho<span class='underline'>tt</span>est</span>"
      ]
    },
    long: {
      title: "C) Long Adjectives (2+ Syllables)",
      content: [
        "<span class='text-slate-950 font-black'>Se usa: <span class='underline'>the most</span> + adjective</span>",
        "<span class='text-slate-950 font-black italic'>Beautiful → the most beautiful</span>",
        "<span class='text-slate-950 font-black italic'>Interesting → the most interesting</span>"
      ]
    },
    irregular: {
      title: "D) Irregular Superlatives",
      content: [
        "<span class='text-slate-950 font-black'>Good → <span class='underline'>the best</span></span>",
        "<span class='text-slate-950 font-black'>Bad → <span class='underline text-rose-700'>the worst</span></span>",
        "<span class='text-slate-950 font-black'>Far → <span class='underline'>the farthest / furthest</span></span>"
      ]
    }
  },

  // --- VOCABULARIO (Mantenido de tu versión actualizada) ---
  vocabulary: [
    { id: 'v1', word: 'Highest', span: 'El más alto (montaña)' }, { id: 'v2', word: 'Tallest', span: 'El más alto (persona/edificio)' },
    { id: 'v3', word: 'Fastest', span: 'El más rápido' }, { id: 'v4', word: 'Slowest', span: 'El más lento' },
    { id: 'v5', word: 'Strongest', span: 'El más fuerte' }, { id: 'v6', word: 'Weakest', span: 'El más débil' },
    { id: 'v7', word: 'Biggest', span: 'El más grande (CVC)' }, { id: 'v8', word: 'Smallest', span: 'El más pequeño' },
    { id: 'v9', word: 'Hottest', span: 'El más caluroso (CVC)' }, { id: 'v10', word: 'Coldest', span: 'El más frío' },
    { id: 'v11', word: 'Wettest', span: 'El más húmedo (CVC)' }, { id: 'v12', word: 'Driest', span: 'El más seco (-y)' },
    { id: 'v13', word: 'Best', span: 'El mejor (Irregular)' }, { id: 'v14', word: 'Worst', span: 'El peor (Irregular)' },
    { id: 'v15', word: 'Most beautiful', span: 'El más hermoso (Largo)' }, { id: 'v16', word: 'Most expensive', span: 'El más caro (Largo)' },
    { id: 'v17', word: 'Least expensive', span: 'El menos caro' }, { id: 'v18', word: 'Farthest', span: 'El más lejano' },
    { id: 'v19', word: 'Happiest', span: 'El más feliz (-y)' }, { id: 'v20', word: 'Funniest', span: 'El más divertido (-y)' },
    { id: 'v21', word: 'Most dangerous', span: 'El más peligroso' }, { id: 'v22', word: 'Deepest', span: 'El más profundo' },
    { id: 'v23', word: 'Shortest', span: 'El más corto/bajo' }, { id: 'v24', word: 'Oldest', span: 'El más viejo' },
    { id: 'v25', word: 'Youngest', span: 'El más joven' }, { id: 'v26', word: 'Widest', span: 'El más ancho' },
    { id: 'v27', word: 'Busiest', span: 'El más concurrido/ocupado' }, { id: 'v28', word: 'Cleanest', span: 'El más limpio' },
    { id: 'v29', word: 'Dirtiest', span: 'El más sucio' }, { id: 'v30', word: 'Smartest', span: 'El más inteligente' }
  ],

  // --- SECCIONES EXTRA (Mantenidas de tu versión actualizada) ---
  theoryQuiz: [
      { id: 'sq1', q: "Mount Everest is the ______ (high) mountain in the world.", ans: "highest", explanation: "Adjetivo corto de 1 sílaba: añadimos '-est'." },
      { id: 'sq2', q: "This is the ______ (good) day of my life!", ans: "best", explanation: "Irregular: el superlativo de 'good' es siempre 'the best'." },
      { id: 'sq3', q: "Russia is the ______ (big) country.", ans: "biggest", explanation: "Regla CVC: Big (consonante-vocal-consonante) dobla la 'g' final." },
      { id: 'sq4', q: "She is the ______ (happy) girl in the class.", ans: "happiest", explanation: "Adjetivo terminado en 'y': cambiamos la 'y' por 'i' y añadimos '-est'." },
      { id: 'sq5', q: "That was the ______ (bad) movie ever.", ans: "worst", explanation: "Irregular: el superlativo de 'bad' es siempre 'the worst'." },
      { id: 'sq6', q: "Physics is the ______ (difficult) subject for me.", ans: "most difficult", explanation: "Adjetivo largo (3 sílabas): usamos 'the most' delante." }
  ],

  listening: {
    text: "Nature is full of incredible records. Mount Everest is the highest mountain. The Pacific is the deepest ocean. The Sahara is the hottest desert in Africa, and the Blue Whale is the biggest mammal in history. These are the best examples of nature's power.",
    correctItems: ['Highest', 'Deepest', 'Hottest', 'Biggest', 'Best'],
    options: ['Highest', 'Deepest', 'Hottest', 'Biggest', 'Best', 'Smallest', 'Coldest', 'Worst']
  },

  reading: {
    text: "Welcome to the World Records Museum. Here we show the tallest buildings and the fastest cars. The Burj Khalifa is currently the highest skyscraper in the world. Many visitors think it is the most beautiful structure ever built. However, the oldest monument in the city is still the most popular place for tourists. It is the best place to learn about history.",
    questions: [
      { id: 'r1', q: "Is the museum about food?", ans: "No, about World Records" },
      { id: 'r2', q: "Which is the highest skyscraper?", ans: "The Burj Khalifa" },
      { id: 'r3', q: "Is the Burj Khalifa ugly?", ans: "No, the most beautiful" },
      { id: 'r4', q: "Is the monument new?", ans: "No, it's the oldest" },
      { id: 'r5', q: "Is the monument popular?", ans: "Yes, the most popular" },
      { id: 'r6', q: "Is it a bad place to learn?", ans: "No, the best place" }
    ]
  }
};