export const superlativesworldrecords = {
    id: 'superlatives-world-records',
    title: 'World Records',
    grammarTitle: 'Superlatives (The -est / The most)',
    description: 'Domina las reglas completas de los superlativos, incluyendo adjetivos cortos, CVC, largos e irregulares.',
    
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
          "<span class='text-slate-950 font-black'>Far → <span class='underline'>the farthest / furthest</span></span>",
          "<span class='text-slate-950 font-black'>Much / Many → <span class='underline'>the most</span></span>",
          "<span class='text-slate-950 font-black'>Little → <span class='underline'>the least</span></span>"
        ]
      }
    },

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

    theoryQuiz: [
      { id: 'sq1', q: "Mount Everest is the ______ (high) mountain in the world.", ans: "highest", explanation: "Adjetivo corto de 1 sílaba: añadimos '-est'." },
      { id: 'sq2', q: "This is the ______ (good) day of my life!", ans: "best", explanation: "Irregular: el superlativo de 'good' es siempre 'the best'." },
      { id: 'sq3', q: "Russia is the ______ (big) country.", ans: "biggest", explanation: "Regla CVC: Big (consonante-vocal-consonante) dobla la 'g' final." },
      { id: 'sq4', q: "She is the ______ (happy) girl in the class.", ans: "happiest", explanation: "Adjetivo terminado en 'y': cambiamos la 'y' por 'i' y añadimos '-est'." },
      { id: 'sq5', q: "That was the ______ (bad) movie ever.", ans: "worst", explanation: "Irregular: el superlativo de 'bad' es siempre 'the worst'." },
      { id: 'sq6', q: "Physics is the ______ (difficult) subject for me.", ans: "most difficult", explanation: "Adjetivo largo (3 sílabas): usamos 'the most' delante." },
      { id: 'sq7', q: "The Nile is the ______ (long) river.", ans: "longest", explanation: "Adjetivo corto de 1 sílaba: añadimos '-est'." },
      { id: 'sq8', q: "It is the ______ (hot) month of the year.", ans: "hottest", explanation: "Regla CVC: Hot dobla la 't' final antes de añadir '-est'." },
      { id: 'sq9', q: "This car is the ______ (expensive) in the shop.", ans: "most expensive", explanation: "Adjetivo largo: requiere 'the most' antes del adjetivo." },
      { id: 'sq10', q: "He is the ______ (smart) student in the school.", ans: "smartest", explanation: "Adjetivo corto: añadimos '-est' al final." },
      { id: 'sq11', q: "The Cheetah is the ______ (fast) animal.", ans: "fastest", explanation: "Una sola sílaba: añadimos '-est'." },
      { id: 'sq12', q: "This is the ______ (small) of the three houses.", ans: "smallest", explanation: "Adjetivo corto: añadimos '-est'." },
      { id: 'sq13', q: "Which is the ______ (far) planet?", ans: "farthest", explanation: "Irregular: Far se convierte en 'the farthest' o 'the furthest'." },
      { id: 'sq14', q: "The Atacama is the ______ (dry) place on Earth.", ans: "driest", explanation: "Dry termina en consonante + 'y', cambiamos la 'y' por 'i' + 'est'." },
      { id: 'sq15', q: "This is the ______ (little) of my worries.", ans: "least", explanation: "Irregular: el superlativo de 'little' es 'the least'." },
      { id: 'sq16', q: "She has the ______ (many) books of her friends.", ans: "most", explanation: "Irregular: Much/Many se convierte en 'the most'." },
      { id: 'sq17', q: "The blue whale is the ______ (heavy) mammal.", ans: "heaviest", explanation: "Termina en 'y': cambiamos a '-iest'." },
      { id: 'sq18', q: "This is the ______ (nice) room in the hotel.", ans: "nicest", explanation: "Si ya acaba en 'e', solo añadimos '-st'." },
      { id: 'sq19', q: "It was the ______ (sad) story I ever heard.", ans: "saddest", explanation: "Regla CVC: Sad dobla la 'd' final." },
      { id: 'sq20', q: "Health is the ______ (important) thing.", ans: "most important", explanation: "Adjetivo largo: usamos siempre 'the most'." },
      { id: 'sq21', q: "Is he the tallest? Yes, he ______ .", ans: "is", explanation: "Respuesta corta con el verbo 'to be'." },
      { id: 'sq22', q: "This is the ______ (thin) laptop in the store.", ans: "thinnest", explanation: "Regla CVC (Thin): doblamos la 'n' final." },
      { id: 'sq23', q: "He is the ______ (funny) guy I know.", ans: "funniest", explanation: "Termina en 'y': cambiamos a '-iest'." },
      { id: 'sq24', q: "The ______ (large) city in Japan is Tokyo.", ans: "largest", explanation: "Acaba en 'e': añadimos '-st'." },
      { id: 'sq25', q: "My brother is the ______ (tall) of my siblings.", ans: "tallest", explanation: "Adjetivo corto: añadimos '-est'." },
      { id: 'sq26', q: "This is the ______ (popular) song now.", ans: "most popular", explanation: "Adjetivo largo: usamos 'the most'." },
      { id: 'sq27', q: "The ______ (bad) part of the trip was the rain.", ans: "worst", explanation: "Irregular: Bad se convierte en 'the worst'." },
      { id: 'sq28', q: "It is the ______ (cheap) watch here.", ans: "cheapest", explanation: "Adjetivo de una sílaba: añadimos '-est'." },
      { id: 'sq29', q: "She is the ______ (busy) person I know.", ans: "busiest", explanation: "Termina en 'y': cambiamos a '-iest'." },
      { id: 'sq30', q: "This is the ______ (interesting) book in the library.", ans: "most interesting", explanation: "Adjetivo largo: usamos 'the most'." }
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