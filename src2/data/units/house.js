/**
 * UNIDAD 1: The House & Ownership
 * Gramática: Present Simple del verbo 'Have'
 * Formato compatible con el componente ComparisonTheorySection (soporta multi-box).
 */

export const houseUnit = {
  id: 'house-verb-have',
  title: 'The House & Ownership',
  grammarTitle: 'Verb Have (Present Simple)',
  description: 'Aprende a expresar posesión, relaciones y características físicas usando Have y Has.',
  activeRules: {
    title: "Discovery: Build the Rules",
    description: "Completa las reglas gramaticales antes de empezar.",
    steps: [
      { 
        id: 'rule1', 
        text: "For I / You / We / They, we use the verb ______ (base form).", 
        ans: "have",
        hint: "It's the title of the unit!"
      },
      { 
        id: 'rule2', 
        text: "For He / She / It (3rd Person), the form changes to ______ .", 
        ans: "has",
        hint: "Starts with h, ends with s."
      },
      { 
        id: 'rule3', 
        text: "To make a negative sentence for 'She', we use: She ______ have.", 
        ans: "doesn't",
        hint: "Auxiliary verb for negative."
      }
    ]
  },
  activeQuiz: [
    { id: 'aq1', q: "He ______ (have) a very expensive watch.", ans: "has", explanation: "3rd Person (He)." },
    { id: 'aq2', q: "______ you ______ (have) a moment?", ans: "Do, have", explanation: "Question form (You)." },
    { id: 'aq3', q: "The apartment ______ (not / have) a garage.", ans: "doesn't have", explanation: "Negative form (It)." },
    { id: 'aq4', q: "My sisters ______ (have) long hair.", ans: "have", explanation: "Plural subject (They)." },
    { id: 'aq5', q: "Does the car have a radio? Yes, it ______ .", ans: "does", explanation: "Short answer (It)." }
  ],
  theoryBlock: {
    affirmative: {
      title: "A) Affirmative Form",
      content: [
        "<span class='text-slate-950 font-black'>I / You / We / They → <span class='underline'>have</span></span>",
        "<span class='text-slate-950 font-black'>He / She / It → <span class='underline text-indigo-700 font-serif'>has</span> (3ª Persona Singular)</span>",
        "<span class='text-slate-950 font-black italic underline decoration-indigo-300'>Ejemplo: She has a big garden.</span>"
      ]
    },
    negative: {
      title: "B) Negative Form",
      content: [
        "<span class='text-slate-950 font-black'>I / You / We / They → <span class='underline text-rose-700 font-black'>don't have</span></span>",
        "<span class='text-slate-950 font-black'>He / She / It → <span class='underline text-rose-700 font-black'>doesn't have</span></span>",
        "<span class='text-slate-950 font-black italic underline decoration-rose-300'>⚠️ ¡Ojo! Con 'doesn't' usamos siempre 'have'.</span>"
      ]
    },
    question: {
      title: "C) Questions (Do / Does)",
      content: [
        "<span class='text-slate-950 font-black'><span class='underline'>Do</span> I/you/we/they <span class='font-black'>have</span>...?</span>",
        "<span class='text-slate-950 font-black'><span class='underline text-indigo-700'>Does</span> he/she/it <span class='font-black'>have</span>...?</span>"
      ]
    },
    shortAnswer: {
      title: "D) Short Answers",
      content: [
        "<span class='text-slate-950 font-black'>Yes, I <span class='underline font-black'>do</span>. / No, I <span class='underline font-black'>don't</span>.</span>",
        "<span class='text-slate-950 font-black'>Yes, she <span class='underline text-indigo-700 font-black'>does</span>. / No, she <span class='underline text-rose-700 font-black'>doesn't</span>.</span>",
        "<span class='text-slate-950 font-black italic underline decoration-amber-500 font-bold'>Never say: 'Yes, I have' ❌</span>"
      ]
    }
  },

  vocabulary: [
    { id: 'v1', word: 'bed', span: 'cama' }, { id: 'v2', word: 'wardrobe', span: 'armario' },
    { id: 'v3', word: 'desk', span: 'escritorio' }, { id: 'v4', word: 'shelf', span: 'estante' },
    { id: 'v5', word: 'lamp', span: 'lámpara' }, { id: 'v6', word: 'window', span: 'ventana' },
    { id: 'v7', word: 'mirror', span: 'espejo' }, { id: 'v8', word: 'chair', span: 'silla' },
    { id: 'v9', word: 'curtains', span: 'cortinas' }, { id: 'v10', word: 'rug', span: 'alfombra' },
    { id: 'v11', word: 'sofa', span: 'sofá' }, { id: 'v12', word: 'armchair', span: 'sillón' },
    { id: 'v13', word: 'table', span: 'mesa' }, { id: 'v14', word: 'fridge', span: 'nevera' },
    { id: 'v15', word: 'oven', span: 'horno' }, { id: 'v16', word: 'sink', span: 'fregadero' },
    { id: 'v17', word: 'bathtub', span: 'bañera' }, { id: 'v18', word: 'shower', span: 'ducha' },
    { id: 'v19', word: 'pillow', span: 'almohada' }, { id: 'v20', word: 'blanket', span: 'manta' },
    { id: 'v21', word: 'clock', span: 'reloj' }, { id: 'v22', word: 'door', span: 'puerta' },
    { id: 'v23', word: 'floor', span: 'suelo' }, { id: 'v24', word: 'wall', span: 'pared' },
    { id: 'v25', word: 'painting', span: 'cuadro' }
  ],

  theoryQuiz: [
    { id: 'h1', q: "I ______ (have) a secret to tell you.", ans: "have", explanation: "Afirmativa con 'I': usamos 'have'." },
    { id: 'h2', q: "The old house ______ (have) a very large balcony.", ans: "has", explanation: "The house (It) usa la 3ª persona singular: 'has'." },
    { id: 'h3', q: "We ______ (not / have) enough milk in the fridge.", ans: "don't have", explanation: "Negativa con 'We': usamos el auxiliar 'don't' + 'have'." },
    { id: 'h4', q: "______ your brother ______ (have) a driver's license?", ans: "Does, have", explanation: "Pregunta para 'He': usamos 'Does' al principio y el verbo en infinitivo 'have'." },
    { id: 'h5', q: "My parents ______ (have) three cousins in London.", ans: "have", explanation: "My parents (They) es plural: usamos 'have'." },
    { id: 'h6', q: "Does Sarah have a sister? Yes, she ______ .", ans: "does", explanation: "Respuesta corta afirmativa para 'she': 'Yes, she does'." },
    { id: 'h7', q: "The dog ______ (have) beautiful green eyes.", ans: "has", explanation: "The dog (It) usa la forma 'has' en afirmativa." },
    { id: 'h8', q: "I ______ (not / have) any money left in my wallet.", ans: "don't have", explanation: "Negativa con 'I': usamos 'don't have'." },
    { id: 'h9', q: "Do they have a dog? No, they ______ .", ans: "don't", explanation: "Respuesta corta negativa para 'they': 'No, they don't'." },
    { id: 'h10', q: "Everything in this room ______ (have) a story.", ans: "has", explanation: "'Everything' es singular (It): usamos 'has'." },
    { id: 'h11', q: "______ you ______ (have) a minute to talk?", ans: "Do, have", explanation: "Pregunta con 'You': usamos el auxiliar 'Do' y el verbo 'have'." },
    { id: 'h12', q: "She ______ (not / have) a job at the moment.", ans: "doesn't have", explanation: "Negativa con 'She': usamos 'doesn't have'." },
    { id: 'h13', q: "Our new apartment ______ (have) a modern kitchen.", ans: "has", explanation: "Our apartment (It) usa 'has'." },
    { id: 'h14', q: "Do we have a meeting today? Yes, we ______ .", ans: "do", explanation: "Respuesta corta afirmativa para 'we': 'Yes, we do'." },
    { id: 'h15', q: "This computer ______ (not / have) a virus.", ans: "doesn't have", explanation: "Negativa para 'Computer' (It): 'doesn't have'." },
    { id: 'h16', q: "The manager of the company ______ (have) a lot of experience.", ans: "has", explanation: "The manager (He/She) es 3ª persona singular: 'has'." },
    { id: 'h17', q: "______ he ______ (have) a middle name?", ans: "Does, have", explanation: "Pregunta con 'He': usamos 'Does' y el verbo 'have'." },
    { id: 'h18', q: "You ______ (have) a very kind heart.", ans: "have", explanation: "Afirmativa con 'You': usamos 'have'." },
    { id: 'h19', q: "Does the hotel have a pool? No, it ______ .", ans: "doesn't", explanation: "Respuesta corta negativa para 'it': 'No, it doesn't'." },
    { id: 'h20', q: "Many people in this city ______ (have) bicycles.", ans: "have", explanation: "'Many people' (They) es plural." },
    { id: 'h21', q: "______ I ______ (have) your phone number?", ans: "Do, have", explanation: "Pregunta con 'I': usamos 'Do' y el verbo 'have'." },
    { id: 'h22', q: "My car ______ (not / have) air conditioning.", ans: "doesn't have", explanation: "Car (It) usa 'doesn't have'." },
    { id: 'h23', q: "Does your phone have a good camera? Yes, it ______ .", ans: "does", explanation: "Respuesta corta afirmativa para 'it'." },
    { id: 'h24', q: "We ______ (have) a reservation for tonight.", ans: "have", explanation: "Afirmativa con 'We': usamos 'have'." },
    { id: 'h25', q: "The students ______ (not / have) their books today.", ans: "don't have", explanation: "Students (They) es plural: 'don't have'." },
    { id: 'h26', q: "______ the book ______ (have) a happy ending?", ans: "Does, have", explanation: "Pregunta para 'Book' (It): usamos 'Does' y 'have'." },
    { id: 'h27', q: "She ______ (have) a terrible headache.", ans: "has", explanation: "3ª persona singular: 'has'." },
    { id: 'h28', q: "Do you have any idea? No, I ______ .", ans: "don't", explanation: "Respuesta corta negativa para 'I'." },
    { id: 'h29', q: "This room ______ (not / have) much light.", ans: "doesn't have", explanation: "Room (It) usa 'doesn't have'." },
    { id: 'h30', q: "The team ______ (have) a new coach.", ans: "has", explanation: "Team suele considerarse singular (It)." }
  ],

  listening: {
    text: "My brother has a new house. It has three bedrooms and a small garden. He has a cat, but he doesn't have a dog. In the living room, he has a big sofa. Does he have a garage? Yes, he does. It is a very nice place.",
    correctItems: ['Three Bedrooms', 'Garden', 'Cat', 'Sofa', 'Garage'],
    options: ['Three Bedrooms', 'Garden', 'Cat', 'Dog', 'Sofa', 'Garage', 'Balcony', 'Pool']
  },

  reading: {
    text: "Welcome to my office. I have a very busy job. My office doesn't have a lot of space, but it has everything I need. I have a large desk and a comfortable chair. On the desk, I have a computer and many pens. Does the building have a cafeteria? Yes, it does. My coworkers have their desks near the window, but I have my desk in the corner.",
    questions: [
      { id: 'r1', q: "Does the office have a lot of space?", ans: "No, it doesn't" },
      { id: 'r2', q: "What does the building have?", ans: "A cafeteria" },
      { id: 'r3', q: "Does the writer have a computer?", ans: "Yes, he/she does" },
      { id: 'r4', q: "Where are the coworkers' desks?", ans: "Near the window" },
      { id: 'r5', q: "What is on the desk?", ans: "Computer and pens" },
      { id: 'r6', q: "Is the chair comfortable?", ans: "Yes, it is" }
    ]
  }
};