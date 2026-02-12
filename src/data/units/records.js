export const recordsUnit = {
  id: 'superlatives-world-records',
  title: 'World Records',
  grammarTitle: 'Superlatives (The -est / The most)',
  description: 'Domina los extremos del mundo usando adjetivos superlativos.',

  // --- SECCIÓN DISCOVERY ---
  activeRules: {
    title: "Discovery: Superlative Rules",
    description: "Analiza cómo formamos los extremos en inglés.",
    steps: [
      { 
        id: 'rule1', 
        text: "For short adjectives (1 syllable), we add ______ to the end (e.g., fast → fastest).", 
        ans: "-est",
        hint: "Suffix for short words."
      },
      { 
        id: 'rule2', 
        text: "For short adjectives ending in CVC (Consonant-Vowel-Consonant), we ______ the final consonant (e.g., big → biggest).", 
        ans: "double",
        hint: "Example: Hot → Hottest (T is doubled)."
      },
      { 
        id: 'rule3', 
        text: "For long adjectives (2+ syllables), we use ______ before the adjective (e.g., expensive).", 
        ans: "the most",
        hint: "Two words used for long adjectives."
      },
      { 
        id: 'rule4', 
        text: "Irregular adjectives change completely. Good becomes ______ .", 
        ans: "the best",
        hint: "It includes the article 'the'."
      }
    ]
  },

  // --- QUIZ ACTIVO (AHORA INCLUYE 'THE' EN LA RESPUESTA) ---
  activeQuiz: [
    // SHORT ADJECTIVES
    { id: 'aq1', q: "The Nile is ______ (long) river in the world.", ans: "the longest", explanation: "Don't forget 'the' + -est." },
    { id: 'aq2', q: "Everest is ______ (high) mountain on Earth.", ans: "the highest", explanation: "Superlative requires 'the'." },
    { id: 'aq3', q: "The cheetah is ______ (fast) land animal.", ans: "the fastest", explanation: "Article 'the' + fast + est." },
    { id: 'aq4', q: "Winter is usually ______ (cold) season.", ans: "the coldest", explanation: "Don't forget the article." },
    { id: 'aq5', q: "My grandfather is ______ (old) person in the family.", ans: "the oldest", explanation: "The + old + est." },
    
    // CVC RULES (Double Consonant)
    { id: 'aq6', q: "Russia is ______ (big) country by area.", ans: "the biggest", explanation: "Double G + the." },
    { id: 'aq7', q: "Summer is ______ (hot) time of the year.", ans: "the hottest", explanation: "Double T + the." },
    { id: 'aq8', q: "This is ______ (sad) movie I have ever seen.", ans: "the saddest", explanation: "Double D + the." },
    { id: 'aq9', q: "Yesterday was ______ (wet) day of the month.", ans: "the wettest", explanation: "Double T + the." },
    { id: 'aq10', q: "The blue whale is ______ (fat) animal.", ans: "the fattest", explanation: "Double T + the." },

    // ADJECTIVES ENDING IN 'Y' (y -> iest)
    { id: 'aq11', q: "The Atacama Desert is ______ (dry) place.", ans: "the driest", explanation: "The + y becomes iest." },
    { id: 'aq12', q: "This is ______ (heavy) box in the room.", ans: "the heaviest", explanation: "The + y becomes iest." },
    { id: 'aq13', q: "He is ______ (happy) baby in the world.", ans: "the happiest", explanation: "The + y becomes iest." },
    { id: 'aq14', q: "That was ______ (easy) exam ever.", ans: "the easiest", explanation: "The + y becomes iest." },
    { id: 'aq15', q: "Who is ______ (funny) actor?", ans: "the funniest", explanation: "The + y becomes iest." },

    // LONG ADJECTIVES (The most)
    { id: 'aq16', q: "Diamonds are ______ (expensive) gems.", ans: "the most expensive", explanation: "Long adjective: use 'the most'." },
    { id: 'aq17', q: "This puzzle is ______ (difficult) one.", ans: "the most difficult", explanation: "Long adjective." },
    { id: 'aq18', q: "She is ______ (intelligent) student.", ans: "the most intelligent", explanation: "Long adjective." },
    { id: 'aq19', q: "Football is ______ (popular) sport.", ans: "the most popular", explanation: "Long adjective." },
    { id: 'aq20', q: "Paris is ______ (beautiful) city.", ans: "the most beautiful", explanation: "Long adjective." },
    { id: 'aq21', q: "This is ______ (dangerous) road.", ans: "the most dangerous", explanation: "Long adjective." },
    { id: 'aq22', q: "It is ______ (interesting) book.", ans: "the most interesting", explanation: "Long adjective." },
    { id: 'aq23', q: "Technology is ______ (important) tool.", ans: "the most important", explanation: "Long adjective." },

    // IRREGULARS (Good/Bad/Far)
    { id: 'aq24', q: "This pizza is ______ (good) in town!", ans: "the best", explanation: "Irregular: Good -> The best." },
    { id: 'aq25', q: "That was ______ (bad) mistake of my life.", ans: "the worst", explanation: "Irregular: Bad -> The worst." },
    { id: 'aq26', q: "Neptune is ______ (far) planet from the Sun.", ans: "the farthest", explanation: "Irregular: Far -> The farthest." },
    { id: 'aq27', q: "Messi is ______ (good) player in history.", ans: "the best", explanation: "Irregular." },
    { id: 'aq28', q: "Monday is ______ (bad) day for me.", ans: "the worst", explanation: "Irregular." },

    // MIXED BAG
    { id: 'aq29', q: "The giraffe has ______ (long) neck.", ans: "the longest", explanation: "Short adjective." },
    { id: 'aq30', q: "This is ______ (exciting) game!", ans: "the most exciting", explanation: "Long adjective." }
  ],

  // --- SECCIONES CLÁSICAS (NO TOCAR) ---
  theoryBlock: {
    sectionA: { title: "A) Short Adjectives", content: ["1 Syllable: Adj + <span class='font-black underline text-emerald-700'>-est</span>", "Example: Tall → The <span class='font-black'>tallest</span>"] },
    sectionB: { title: "B) CVC Rules", content: ["Double consonant: Big → The <span class='font-black underline text-sky-700'>biggest</span>", "Hot → The <span class='font-black'>hottest</span>"] },
    sectionC: { title: "C) Long Adjectives", content: ["2+ Syllables: <span class='font-black underline text-rose-700'>The most</span> + Adj", "Example: Expensive → <span class='font-black'>The most</span> expensive"] },
    sectionD: { title: "D) Irregulars", content: ["Good → <span class='font-black underline text-amber-700'>The best</span>", "Bad → <span class='font-black underline text-amber-700'>The worst</span>"] }
  },
  theoryQuiz: [
    { id: 's1', q: "Mount Everest is the ______ (high) mountain.", ans: "highest", explanation: "Short adjective: add -est." },
    { id: 's2', q: "Russia is the ______ (big) country.", ans: "biggest", explanation: "CVC Rule: double the G." },
    { id: 's3', q: "This is the ______ (good) day of my life!", ans: "best", explanation: "Irregular form." }
  ],
  vocabulary: [
    { id: 's101', word: 'Highest', span: 'El más alto' }, { id: 's102', word: 'Deepest', span: 'El más profundo' },
    { id: 's103', word: 'Fastest', span: 'El más rápido' }, { id: 's104', word: 'Hottest', span: 'El más caliente' }
  ],
  listening: { text: "Nature is full of records. The Pacific is the deepest ocean...", correctItems: ['Pacific', 'Deepest'], options: ['Pacific', 'Deepest', 'Atlantic', 'Highest'] },
  reading: { text: "Tokyo is the most populated city...", questions: [{ id: 'rs1', q: "Is Tokyo a small city?", ans: "No, it is the most populated" }] }
};