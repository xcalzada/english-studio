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

// --- QUIZ ACTIVO (MEZCLADO + IRREGULARES COMPLETOS) ---
  activeQuiz: [
    { id: 'aq1', q: "The cheetah is ______ (fast) animal on land.", ans: "the fastest", explanation: "Short adjective: add -est." },
    { id: 'aq2', q: "This is ______ (good) pizza I have ever tasted!", ans: "the best", explanation: "Irregular: Good → The best." },
    { id: 'aq3', q: "Physics is ______ (difficult) subject for me.", ans: "the most difficult", explanation: "Long adjective: use 'the most'." },
    { id: 'aq4', q: "Don't worry, this is ______ (little) of our problems.", ans: "the least", explanation: "Irregular: Little → The least." },
    { id: 'aq5', q: "Russia is ______ (big) country by area.", ans: "the biggest", explanation: "CVC Rule: double the 'g'." },
    { id: 'aq6', q: "That was ______ (bad) movie in history.", ans: "the worst", explanation: "Irregular: Bad → The worst." },
    { id: 'aq7', q: "She has ______ (many) followers on Instagram.", ans: "the most", explanation: "Irregular: Many/Much → The most." },
    { id: 'aq8', q: "Today is ______ (happy) day of my life.", ans: "the happiest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq9', q: "Neptune is ______ (far) planet from the Sun.", ans: "the farthest", explanation: "Irregular: Far → The farthest." },
    { id: 'aq10', q: "Mount Everest is ______ (high) mountain.", ans: "the highest", explanation: "Short adjective: add -est." },
    { id: 'aq11', q: "Who is ______ (popular) singer right now?", ans: "the most popular", explanation: "Long adjective: use 'the most'." },
    { id: 'aq12', q: "This soup has ______ (much) salt of all.", ans: "the most", explanation: "Irregular: Much → The most." },
    { id: 'aq13', q: "Summer is ______ (hot) season.", ans: "the hottest", explanation: "CVC Rule: double the 't'." },
    { id: 'aq14', q: "My result was ______ (bad) than yours? No, it was ______ (bad) in the class.", ans: "the worst", explanation: "Irregular: Bad → The worst." },
    { id: 'aq15', q: "This is ______ (interesting) book in the library.", ans: "the most interesting", explanation: "Long adjective: use 'the most'." },
    { id: 'aq16', q: "Which house is ______ (far) from the school?", ans: "the farthest", explanation: "Irregular: Far → The farthest (or furthest)." },
    { id: 'aq17', q: "The Atacama is ______ (dry) place on Earth.", ans: "the driest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq18', q: "Messi is ______ (good) player in the world.", ans: "the best", explanation: "Irregular: Good → The best." },
    { id: 'aq19', q: "This option costs ______ (little) money.", ans: "the least", explanation: "Irregular: Little → The least." },
    { id: 'aq20', q: "The blue whale is ______ (heavy) animal.", ans: "the heaviest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq21', q: "Yesterday was ______ (sad) day for the team.", ans: "the saddest", explanation: "CVC Rule: double the 'd'." },
    { id: 'aq22', q: "Diamonds are ______ (expensive) gems.", ans: "the most expensive", explanation: "Long adjective: use 'the most'." },
    { id: 'aq23', q: "Who drinks ______ (little) water here?", ans: "the least", explanation: "Irregular: Little → The least." },
    { id: 'aq24', q: "It is ______ (safe) way to travel.", ans: "the safest", explanation: "Ends in E: just add -st." },
    { id: 'aq25', q: "Which country has ______ (many) people?", ans: "the most", explanation: "Irregular: Many → The most." },
    { id: 'aq26', q: "This is ______ (far) I have ever traveled.", ans: "the farthest", explanation: "Irregular: Far → The farthest." },
    { id: 'aq27', q: "He is ______ (funny) comedian.", ans: "the funniest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq28', q: "That is ______ (ugly) building in the city.", ans: "the ugliest", explanation: "Ends in Y: change to -iest." },
    { id: 'aq29', q: "Winter is ______ (cold) time of year.", ans: "the coldest", explanation: "Short adjective: add -est." },
    { id: 'aq30', q: "This is ______ (dangerous) road in the country.", ans: "the most dangerous", explanation: "Long adjective: use 'the most'." }
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