// Datos específicos de la lección "The House"
export const houseVerbHave = {
  id: 'house-verb-have',
  title: 'The House',
  grammarTitle: 'Verb Have (Present Simple)',
  description: 'Usa "Have", "Don\'t have" y "Do you have?" para describir la casa.',
  
  theoryBlock: {
    affirmative: {
      title: "Affirmative",
      content: [
        "I / You / We / They → <span class='text-emerald-100 italic'>have</span>",
        "He / She / It → <span class='text-orange-200 underline'>has</span>"
      ]
    },
    negative: {
      title: "Negative",
      content: [
        "I / You / We / They → <span class='text-red-100 italic'>don't have</span>",
        "He / She / It → <span class='text-orange-200 underline'>doesn't have</span>"
      ]
    },
    question: {
      title: "Questions",
      content: [
        "<span class='text-blue-100 underline'>Do</span> I/you... <span class='text-blue-100 font-black'>have</span>?",
        "<span class='text-orange-200 underline'>Does</span> he/she... <span class='text-orange-200 font-black italic'>have</span>?"
      ]
    },
    shortAnswer: {
      title: "Short Answers",
      content: [
        "Yes, I <span class='font-black'>do</span>. / No, I <span class='font-black'>don't</span>.",
        "Yes, she <span class='text-orange-200 font-black'>does</span>. / No, she <span class='text-orange-200 font-black'>doesn't</span>."
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
    { id: 'q1', q: "I ______ a big bedroom.", ans: "have" },
    { id: 'q2', q: "She ______ a blue lamp.", ans: "has" },
    { id: 'q3', q: "They ______ a garage. (Negative)", ans: "don't have" },
    { id: 'q4', q: "______ he have a computer? (Question)", ans: "Does" },
    { id: 'q5', q: "My cat ______ a small bed.", ans: "has" },
    { id: 'q6', q: "We ______ any chairs. (Negative)", ans: "don't have" },
    { id: 'q7', q: "______ you have a brother? (Question)", ans: "Do" },
    { id: 'q8', q: "The house ______ a red door.", ans: "has" },
    { id: 'q9', q: "Sarah ______ a TV. (Negative)", ans: "doesn't have" },
    { id: 'q10', q: "______ it have a balcony? (Question)", ans: "Does" },
    { id: 'q11', q: "Do you have a garden? (Yes) ______ .", ans: "Yes, I do" },
    { id: 'q12', q: "Does Tom have a bike? (No) ______ .", ans: "No, he doesn't" },
    { id: 'q13', q: "Do they have a cat? (No) ______ .", ans: "No, they don't" },
    { id: 'q14', q: "Does the house have a pool? (Yes) ______ .", ans: "Yes, it does" },
  ],

  listening: {
    text: "Welcome to the new apartment. In the living room, it has a modern grey sofa and a flat-screen TV. It doesn't have a fireplace. The kitchen is small, but it has a fridge and a dishwasher. It doesn't have a microwave. Upstairs, the bedroom has a balcony with a nice view.",
    correctItems: ['Grey Sofa', 'TV', 'Fridge', 'Dishwasher', 'Balcony'],
    options: ['Grey Sofa', 'TV', 'Fireplace', 'Fridge', 'Microwave', 'Balcony', 'Dishwasher', 'Desk']
  },

  reading: {
    text: "Hello! I am a designer. This is my studio. It is a small space but it is perfect. The studio has a large wooden desk and an ergonomic chair. I have many pens and papers on the desk. Behind the chair, it has a big shelf for my architecture books. It doesn't have a sofa because the room is small, but it has a small coffee machine for my breaks. It has a very big window with views of the park.",
    questions: [
      { id: 'r1', q: "Is the studio big or small?", ans: "Small" },
      { id: 'r2', q: "What does the studio have for books?", ans: "A big shelf" },
      { id: 'r3', q: "Does it have a sofa?", ans: "No, it doesn't" },
      { id: 'r4', q: "Where are the pens and papers?", ans: "On the desk" },
      { id: 'r5', q: "What is behind the chair?", ans: "The shelf" },
      { id: 'r6', q: "What can you see from the window?", ans: "The park" }
    ]
  }
};