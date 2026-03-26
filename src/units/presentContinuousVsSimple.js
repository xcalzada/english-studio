// src/units/unit8.js
// Unit 8 — Present Simple vs Present Continuous · niños hispanohablantes 9-10 años (A1-A2)
// Contraste I do / I am doing · Stative verbs
// ans con "|" = acepta forma completa O contracción

const quiz = [

  // ── BLOQUE 1: CONTRASTE SIMPLE / CONTINUOUS — 15 ejercicios ─────

  { id:'u8_01', type:'choice', block:'contrastSimpleContinuous',
    q:'🏃 Look! Tom ______ in the park right now.',
    options:['runs', 'is running', 'run', 'are running'],
    ans:'is running',
    hint:'"Right now" + "Look!" → acción que pasa en este momento → Present Continuous.',
    explanation:'"Right now" y "Look!" son señales del <strong>Present Continuous</strong>. Tom <strong>is running</strong> — algo que pasa en este momento.' },

  { id:'u8_02', type:'choice', block:'contrastSimpleContinuous',
    q:'🗓️ Tom ______ in the park every morning.',
    options:['is running', 'are running', 'runs', 'run'],
    ans:'runs',
    hint:'"Every morning" → hábito → Present Simple.',
    explanation:'"Every morning" es señal del <strong>Present Simple</strong>. Tom <strong>runs</strong> — es una rutina.' },

  { id:'u8_03', type:'choice', block:'contrastSimpleContinuous',
    q:'📺 Shh! My baby sister ______ . Please be quiet!',
    options:['sleeps', 'is sleep', 'is sleeping', 'are sleeping'],
    ans:'is sleeping',
    hint:'"Shh! Please be quiet!" → acción en este momento → Present Continuous.',
    explanation:'La situación ocurre <strong>ahora mismo</strong>. My baby sister <strong>is sleeping</strong>.' },

  { id:'u8_04', type:'choice', block:'contrastSimpleContinuous',
    q:'🌙 My baby sister ______ twelve hours every night.',
    options:['is sleeping', 'are sleeping', 'sleeps', 'sleep'],
    ans:'sleeps',
    hint:'"Every night" → hábito → Present Simple.',
    explanation:'"Every night" indica una <strong>rutina</strong>. My baby sister <strong>sleeps</strong> twelve hours.' },

  { id:'u8_05', type:'fill', block:'contrastSimpleContinuous',
    q:"☕ My dad ______ coffee every morning. (drink)",
    ans:'drinks',
    hint:'"Every morning" → hábito → Present Simple. "My dad" = él → verbo + s.',
    explanation:'"Every morning" = rutina → <strong>Present Simple</strong>. My dad <strong>drinks</strong> coffee.' },

  { id:'u8_06', type:'fill', block:'contrastSimpleContinuous',
    q:"☕ My dad ______ coffee right now. (drink)",
    ans:"is drinking | 's drinking",
    hint:'"Right now" → acción en este momento → Present Continuous.',
    explanation:'"Right now" = este momento → <strong>Present Continuous</strong>. My dad <strong>is drinking</strong> coffee.' },

  { id:'u8_07', type:'choice', block:'contrastSimpleContinuous',
    q:"🚗 I usually ______ to school by bus.",
    options:['am going', 'goes', 'go', 'is going'],
    ans:'go',
    hint:'"Usually" → hábito → Present Simple. "I" → verbo base.',
    explanation:'"Usually" = señal del <strong>Present Simple</strong>. I <strong>go</strong> — con "I" el verbo no cambia.' },

  { id:'u8_08', type:'choice', block:'contrastSimpleContinuous',
    q:"🚌 Today I ______ by bus because my bike is broken.",
    options:['go', 'goes', 'am going', 'is going'],
    ans:'am going',
    hint:'"Today" + situación temporal → Present Continuous.',
    explanation:'"Today" + situación especial temporal → <strong>Present Continuous</strong>. I <strong>am going</strong> by bus.' },

  { id:'u8_11', type:'error', block:'contrastSimpleContinuous',
    q:"🎸 Jack plays the guitar right now.",
    ans:"Jack is playing the guitar right now. | Jack's playing the guitar right now.",
    hint:'"Right now" → Present Continuous → is + verb-ing.',
    explanation:'"Right now" indica acción en este momento → necesitamos <strong>Present Continuous</strong>: Jack <strong>is playing</strong> the guitar right now.' },

  { id:'u8_12', type:'error', block:'contrastSimpleContinuous',
    q:"📖 She is reading a book every evening.",
    ans:"She reads a book every evening.",
    hint:'"Every evening" → rutina → Present Simple.',
    explanation:'"Every evening" indica hábito → <strong>Present Simple</strong>: She <strong>reads</strong> a book every evening.' },

  { id:'u8_20', type:'error', block:'contrastSimpleContinuous',
    q:"🚿 She has a shower every morning, but right now she is have lunch.",
    ans:"She has a shower every morning, but right now she is having lunch. | She has a shower every morning, but right now she's having lunch.",
    hint:'Right now → Present Continuous → is + having.',
    explanation:'La segunda parte usa "right now" → <strong>Present Continuous</strong>: she <strong>is having</strong> lunch.' },

  { id:'u8_21', type:'choice', block:'contrastSimpleContinuous',
    q:"🌧️ It ______ a lot in autumn here. But today the sun ______ .",
    options:[
      "rains / is shining",
      "is raining / shines",
      "rains / shines",
      "is raining / is shining"
    ],
    ans:"rains / is shining",
    hint:'Primera frase = hábito (Present Simple). Segunda frase = hoy, ahora (Present Continuous).',
    explanation:'<strong>Rains</strong> = rutina estacional → Present Simple. <strong>Is shining</strong> = lo que pasa hoy → Present Continuous.' },

  { id:'u8_22', type:'fill', block:'contrastSimpleContinuous',
    q:"📚 My brother usually ______ after dinner, but today he ______ TV. (read / watch)",
    ans:"reads / is watching | reads / 's watching",
    hint:'Usually → Present Simple. Today → Present Continuous.',
    explanation:'<strong>Usually</strong> → Present Simple: <strong>reads</strong>. <strong>Today</strong> → Present Continuous: <strong>is watching</strong>.' },

  { id:'u8_23', type:'choice', block:'contrastSimpleContinuous',
    q:'⚽ Look! The children ______ football in the garden.',
    options:['play', 'plays', 'are playing', 'is playing'],
    ans:'are playing',
    hint:'"Look!" → acción en este momento → Present Continuous. "The children" = they → are.',
    explanation:'"Look!" indica que algo pasa <strong>ahora mismo</strong>. The children <strong>are playing</strong> — usamos are porque son varios (they).' },

  { id:'u8_24', type:'choice', block:'contrastSimpleContinuous',
    q:'⚽ The children ______ football in the garden every afternoon.',
    options:['are playing', 'is playing', 'play', 'plays'],
    ans:'play',
    hint:'"Every afternoon" → rutina → Present Simple. "The children" = they → verbo base sin -s.',
    explanation:'"Every afternoon" indica una <strong>rutina</strong> → Present Simple. The children <strong>play</strong> — con they no se añade -s.' },

  { id:'u8_25', type:'fill', block:'contrastSimpleContinuous',
    q:'🎶 Listen! She ______ a beautiful song. (sing)',
    ans:"is singing | 's singing",
    hint:'"Listen!" → acción en este momento → Present Continuous. "She" → is + verb-ing.',
    explanation:'"Listen!" es señal del <strong>Present Continuous</strong>. She <strong>is singing</strong> — algo que ocurre ahora mismo.' },

  { id:'u8_26', type:'fill', block:'contrastSimpleContinuous',
    q:'📚 We ______ English at school every Monday. (study)',
    ans:'study',
    hint:'"Every Monday" → rutina → Present Simple. "We" → verbo base.',
    explanation:'"Every Monday" indica una <strong>rutina</strong> → Present Simple. We <strong>study</strong> — con we el verbo no cambia.' },

  { id:'u8_27', type:'error', block:'contrastSimpleContinuous',
    q:'📱 He is sending messages to his friends every night.',
    ans:'He sends messages to his friends every night.',
    hint:'"Every night" → rutina → Present Simple.',
    explanation:'"Every night" indica un <strong>hábito</strong> → Present Simple: He <strong>sends</strong> messages every night.' },

  { id:'u8_28', type:'choice', block:'contrastSimpleContinuous',
    q:"🌨️ It usually ______ in November here, but today the sun ______ .",
    options:[
      "snows / is shining",
      "is snowing / shines",
      "snows / shines",
      "is snowing / is shining"
    ],
    ans:"snows / is shining",
    hint:'Usually → hábito → Present Simple. Today (situación temporal) → Present Continuous.',
    explanation:'<strong>Snows</strong> = rutina estacional → Present Simple. <strong>Is shining</strong> = situación especial de hoy → Present Continuous.' },

  { id:'u8_29', type:'fill', block:'contrastSimpleContinuous',
    q:"🎧 She ______ to music every evening, but right now she ______ her homework. (listen / do)",
    ans:"listens / is doing | listens / 's doing",
    hint:'"Every evening" → Present Simple. "Right now" → Present Continuous.',
    explanation:'<strong>Every evening</strong> → Present Simple: <strong>listens</strong>. <strong>Right now</strong> → Present Continuous: <strong>is doing</strong>.' },

  { id:'u8_40', type:'error', block:'contrastSimpleContinuous',
    q:"🎬 They watches a film right now.",
    ans:"They are watching a film right now. | They're watching a film right now.",
    hint:'"Right now" → Present Continuous. "They" → are + verb-ing.',
    explanation:'Dos errores: "right now" exige <strong>Present Continuous</strong>, y con "they" se usa <em>are</em>. → They <strong>are watching</strong> a film right now.' },

  { id:'u8_41', type:'choice', block:'contrastSimpleContinuous',
    q:"🏊 My sister ______ twice a week, but today she ______ because she has a cold.",
    options:[
      "swims / isn't swimming",
      "is swimming / doesn't swim",
      "swims / doesn't swim",
      "is swimming / isn't swimming"
    ],
    ans:"swims / isn't swimming",
    hint:'Twice a week → rutina → Present Simple. Today + excepción → Present Continuous negativo.',
    explanation:'<strong>Twice a week</strong> → Present Simple: <strong>swims</strong>. <strong>Today</strong> + excepción temporal → Present Continuous: <strong>isn\'t swimming</strong>.' },


  // ── BLOQUE 2: SEÑALES DE TIEMPO — 7 ejercicios ───────────────────

  { id:'u8_09', type:'choice', block:'signalWords',
    q:"⏱️ Which time expression goes with the Present Continuous?",
    options:['every day', 'never', 'at the moment', 'usually'],
    ans:'at the moment',
    hint:'"At the moment" = ahora mismo → Present Continuous.',
    explanation:'<strong>At the moment</strong> indica que algo ocurre ahora → Present Continuous. "Every day", "never" y "usually" son señales del Present Simple.' },

  { id:'u8_10', type:'choice', block:'signalWords',
    q:"📅 Which time expression goes with the Present Simple?",
    options:['right now', 'Look!', 'Listen!', 'on Sundays'],
    ans:'on Sundays',
    hint:'"On Sundays" = rutina semanal → Present Simple.',
    explanation:'<strong>On Sundays</strong> es una rutina → Present Simple. "Right now", "Look!" y "Listen!" son señales del Present Continuous.' },

  { id:'u8_13', type:'fill', block:'signalWords',
    q:"🔇 Please be quiet — I ______ to study for my test! (try)",
    ans:"am trying | 'm trying",
    hint:'Situación que ocurre ahora → Present Continuous. "I" → am + trying.',
    explanation:'La situación ocurre <strong>ahora mismo</strong> → Present Continuous. I<strong>\'m trying</strong> to study.' },

  { id:'u8_30', type:'choice', block:'signalWords',
    q:"⏱️ ______ my mum is cooking in the kitchen. Don't disturb her!",
    options:['Every evening', 'Never', 'At the moment', 'Always'],
    ans:'At the moment',
    hint:'La frase usa Present Continuous (is cooking) → la señal de tiempo debe indicar "ahora".',
    explanation:'La frase usa Present Continuous, así que la señal de tiempo correcta es <strong>at the moment</strong>.' },

  { id:'u8_31', type:'choice', block:'signalWords',
    q:"📅 Which time expression does NOT go with the Present Continuous?",
    options:['right now', 'at the moment', 'on Fridays', 'Look!'],
    ans:'on Fridays',
    hint:'"On Fridays" = rutina semanal → Present Simple.',
    explanation:'<strong>On Fridays</strong> indica una rutina → Present Simple. "Right now", "at the moment" y "Look!" son señales del Present Continuous.' },

  { id:'u8_32', type:'error', block:'signalWords',
    q:"🐱 Look! The cat chase the mouse!",
    ans:"Look! The cat is chasing the mouse! | Look! The cat's chasing the mouse!",
    hint:'"Look!" → Present Continuous. "The cat" (= it) → is + verb-ing.',
    explanation:'"Look!" exige <strong>Present Continuous</strong>. The cat <strong>is chasing</strong> the mouse — is + verb-ing.' },

  { id:'u8_33', type:'fill', block:'signalWords',
    q:"⛅ At the moment, they ______ football in the park. (play)",
    ans:"are playing | 're playing",
    hint:'"At the moment" → Present Continuous. "They" → are + verb-ing.',
    explanation:'"At the moment" indica acción en curso → <strong>Present Continuous</strong>. They <strong>are playing</strong>.' },


  // ── BLOQUE 3: STATIVE VERBS — 10 ejercicios ──────────────────────

  { id:'u8_14', type:'choice', block:'stativeVerbs',
    q:"💛 I ______ pizza. It's my favourite food!",
    options:["'m loving", 'love', 'am loving', 'loves'],
    ans:'love',
    hint:'"Love" es un stative verb → nunca en -ing.',
    explanation:'<strong>Love</strong> es un verbo de estado (stative verb) → nunca usamos el continuous. I <strong>love</strong> pizza.' },

  { id:'u8_15', type:'choice', block:'stativeVerbs',
    q:"🧠 Do you ______ the answer to this question?",
    options:['knowing', 'are knowing', 'know', 'knows'],
    ans:'know',
    hint:'"Know" es un stative verb → solo Present Simple.',
    explanation:'<strong>Know</strong> es un verbo de estado → solo usamos el Present Simple. Do you <strong>know</strong> the answer?' },

  { id:'u8_16', type:'error', block:'stativeVerbs',
    q:"🍦 She is wanting an ice cream.",
    ans:"She wants an ice cream.",
    hint:'"Want" es un stative verb → nunca en -ing.',
    explanation:'<strong>Want</strong> es un verbo de estado → nunca va en continuous. She <strong>wants</strong> an ice cream.' },

  { id:'u8_17', type:'error', block:'stativeVerbs',
    q:"📝 I am not understanding this exercise.",
    ans:"I don't understand this exercise. | I do not understand this exercise.",
    hint:'"Understand" es un stative verb → Present Simple con don\'t.',
    explanation:'<strong>Understand</strong> es un verbo de estado → siempre Present Simple. I <strong>don\'t understand</strong> this exercise.' },

  { id:'u8_18', type:'choice', block:'stativeVerbs',
    q:"🎵 She ______ this song — she always listens to it!",
    options:["is liking", "are liking", "likes", "like"],
    ans:'likes',
    hint:'"Like" es un stative verb → solo Present Simple. "She" → verbo + s.',
    explanation:'<strong>Like</strong> es un verbo de estado → Present Simple. She <strong>likes</strong> this song.' },

  { id:'u8_19', type:'fill', block:'stativeVerbs',
    q:"🔑 He ______ where his keys are. (not remember)",
    ans:"doesn't remember | does not remember",
    hint:'"Remember" es un stative verb → Present Simple. "He" → doesn\'t.',
    explanation:'<strong>Remember</strong> es un verbo de estado → Present Simple. He <strong>doesn\'t remember</strong>.' },

  { id:'u8_34', type:'choice', block:'stativeVerbs',
    q:'📚 I ______ this book — I read it every summer!',
    options:["'m loving", 'am loving', 'love', 'loves'],
    ans:'love',
    hint:'"Love" es un stative verb → solo Present Simple.',
    explanation:'<strong>Love</strong> es un verbo de estado → nunca usamos -ing. I <strong>love</strong> this book.' },

  { id:'u8_35', type:'error', block:'stativeVerbs',
    q:'✨ He is believing in magic.',
    ans:'He believes in magic.',
    hint:'"Believe" es un stative verb → nunca en -ing.',
    explanation:'<strong>Believe</strong> es un verbo de estado → siempre Present Simple. He <strong>believes</strong> in magic.' },

  { id:'u8_36', type:'fill', block:'stativeVerbs',
    q:"❓ She ______ the answer to question 3. (not know)",
    ans:"doesn't know | does not know",
    hint:'"Know" es un stative verb → Present Simple. "She" → doesn\'t + know.',
    explanation:'<strong>Know</strong> es un verbo de estado → Present Simple. She <strong>doesn\'t know</strong> the answer.' },

  { id:'u8_37', type:'choice', block:'stativeVerbs',
    q:'🏠 They ______ a bigger flat — their family is growing!',
    options:['are needing', 'is needing', 'needs', 'need'],
    ans:'need',
    hint:'"Need" es un stative verb → solo Present Simple. "They" → verbo base.',
    explanation:'<strong>Need</strong> es un verbo de estado → Present Simple. They <strong>need</strong> — con they no se añade -s.' },

  { id:'u8_38', type:'error', block:'stativeVerbs',
    q:'🍦 I am preferring chocolate ice cream to vanilla.',
    ans:'I prefer chocolate ice cream to vanilla.',
    hint:'"Prefer" es un stative verb → nunca en -ing.',
    explanation:'<strong>Prefer</strong> es un verbo de estado → siempre Present Simple. I <strong>prefer</strong> chocolate ice cream to vanilla.' },

  { id:'u8_39', type:'choice', block:'stativeVerbs',
    q:'🤝 I ______ you — you always tell the truth.',
    options:["'m believing", 'am believing', 'believes', 'believe'],
    ans:'believe',
    hint:'"Believe" es un stative verb → Present Simple. "I" → verbo base.',
    explanation:'<strong>Believe</strong> es un verbo de estado → nunca en -ing. I <strong>believe</strong> you.' },

  { id:'u8_42', type:'error', block:'stativeVerbs',
    q:"🍕 Does she is eating pizza right now?",
    ans:"Is she eating pizza right now?",
    hint:'Preguntas en Present Continuous: Is/Are + sujeto + verb-ing. No se usa "does".',
    explanation:'Las preguntas en <strong>Present Continuous</strong> se forman con <strong>Is/Are + sujeto + verb-ing</strong>. → <strong>Is</strong> she <strong>eating</strong> pizza right now?' },

];

export const presentContinuousVsSimpleUnit = {
  id: 'present-continuous-vs-simple',
  grammarTitle: 'Present Simple vs Present Continuous',
  title: "I do vs I'm doing · Stative verbs",
  description: '¿Rutina o acción de ahora mismo? Aprende a usar los dos tiempos 🔀',

  theoryBlock: {

    // ── SECCIÓN 1: CONTRASTE SIMPLE / CONTINUOUS ──────────────────

    contrastSimpleContinuous: {
      title: '🔀 Present Simple vs Present Continuous — ¿cuándo usar cada uno?',
      content: [
        { type:'teacher',
          text:'Ya conoces el <strong>Present Simple</strong> (rutinas) y el <strong>Present Continuous</strong> (acciones de ahora mismo). En esta unidad vamos a usarlos juntos y aprender a elegir el correcto.' },

        { type:'table',
          headers:['', 'Present Simple', 'Present Continuous'],
          rows:[
            ['¿Cuándo?',       'Hábitos, rutinas, verdades generales',          'Acciones que pasan <strong>ahora mismo</strong>'],
            ['Fórmula',        'sujeto + verbo (+s)',                            'sujeto + am/is/are + verbo-ing'],
            ['Señales típicas','always, usually, every day, on Sundays, never',  'now, right now, at the moment, Look!, Listen!'],
            ['Ejemplo ✅',     'She <strong>drives</strong> to work every day.',  "She <strong>isn't driving</strong> right now — she's on the phone."],
          ] },

        { type:'tip',
          emoji:'🔀',
          text:'Misma persona, dos situaciones distintas:<br>👉 Jack <strong>plays</strong> the guitar. (= en general, es su hobby)<br>👉 Jack <strong>isn\'t playing</strong> it now. (= en este momento no lo está tocando)' },

        { type:'subtitle', text:'📌 Señales de tiempo — ¿cuál va con cuál?' },
        { type:'table',
          headers:['Present Simple', 'Present Continuous'],
          rows:[
            ['every day / every morning / every week', 'now / right now'],
            ['always / usually / often / never',       'at the moment / at present'],
            ['on Mondays / on Sundays',                'Look! / Listen! / Shh!'],
            ['in the morning / at night',              'today (acción temporal)'],
          ] },

        { type:'rule', warn:true,
          text:"❌ She is driving to work every day.<br>✅ She <strong>drives</strong> to work every day. (rutina → Simple)<br><br>❌ Look! It rains!<br>✅ Look! It<strong>'s raining</strong>! (ahora mismo → Continuous)" },
      ],
    },

    // ── SECCIÓN 2: STATIVE VERBS ──────────────────────────────────

    stativeVerbs: {
      title: '🚫 Stative verbs — verbos que NUNCA usan -ing',
      content: [
        { type:'teacher',
          text:'Algunos verbos especiales describen <strong>estados</strong> (sentimientos, opiniones, pensamientos) y <strong>nunca</strong> van en Present Continuous. Siempre usamos el <strong>Present Simple</strong> con ellos.' },

        { type:'table',
          headers:['Verbo', 'Significado', 'Ejemplo correcto'],
          rows:[
            ['<strong>like</strong>',       'gustar',            'I <strong>like</strong> this song. 🎵'],
            ['<strong>love</strong>',       'encantar / querer', 'She <strong>loves</strong> pizza. 🍕'],
            ['<strong>hate</strong>',       'odiar',             'He <strong>hates</strong> broccoli. 🥦'],
            ['<strong>want</strong>',       'querer',            'I <strong>want</strong> a sandwich. 🥪'],
            ['<strong>need</strong>',       'necesitar',         'We <strong>need</strong> more time. ⏱️'],
            ['<strong>know</strong>',       'saber / conocer',   'Do you <strong>know</strong> the answer? 🧠'],
            ['<strong>understand</strong>', 'entender',          "I <strong>don't understand</strong>. 😕"],
            ['<strong>remember</strong>',  'recordar',          'She <strong>remembers</strong> his name. 💭'],
            ['<strong>believe</strong>',   'creer',             'I <strong>believe</strong> you. 🤝'],
            ['<strong>prefer</strong>',    'preferir',          'He <strong>prefers</strong> tea. ☕'],
          ] },

        { type:'rule', warn:true,
          text:"❌ I am wanting a sandwich.<br>✅ I <strong>want</strong> a sandwich.<br><br>❌ She is knowing the answer.<br>✅ She <strong>knows</strong> the answer.<br><br>❌ Are you understanding me?<br>✅ Do you <strong>understand</strong> me?" },

        { type:'tip',
          emoji:'💡',
          text:'Truco rápido: si el verbo describe un <strong>sentimiento</strong> (love, hate, like), una <strong>opinión</strong> (think, believe) o un <strong>proceso mental</strong> (know, understand, remember) → siempre Present Simple.' },
      ],
    },

    // ── SECCIÓN 3: SEÑALES DE TIEMPO ─────────────────────────────

    signalWords: {
      title: '⏱️ Señales de tiempo — ¿Simple o Continuous?',
      content: [
        { type:'teacher',
          text:'Las señales de tiempo te dicen automáticamente qué tiempo usar. ¡Apréndetelas y la elección será mucho más fácil!' },

        { type:'table',
          headers:['Señal', 'Tiempo', 'Ejemplo'],
          rows:[
            ['<strong>every day / week / morning</strong>', 'Present Simple',     'I <strong>walk</strong> to school every day.'],
            ['<strong>always / usually / often / never</strong>', 'Present Simple', 'She <strong>never eats</strong> fast food.'],
            ['<strong>on Mondays / at weekends</strong>',   'Present Simple',     'We <strong>play</strong> tennis on Saturdays.'],
            ['<strong>right now / at the moment</strong>',  'Present Continuous', "I<strong>'m studying</strong> right now."],
            ['<strong>now / at present</strong>',           'Present Continuous', "She<strong>'s sleeping</strong> now."],
            ['<strong>Look! / Listen! / Shh!</strong>',     'Present Continuous', "Look! It<strong>'s snowing</strong>!"],
            ['<strong>today</strong> (situación temporal)', 'Present Continuous', "I<strong>'m taking</strong> the bus today — my bike is broken."],
          ] },

        { type:'tip',
          emoji:'💡',
          text:'<strong>Today</strong> puede ir con ambos tiempos — depende del contexto:<br>✅ I <strong>start</strong> school today. (hecho general)<br>✅ I<strong>\'m taking</strong> the bus today. (situación temporal de hoy)' },
      ],
    },

  },

  theoryQuiz: quiz,
  activeQuiz:  quiz,

  discoveryQuiz: [
    { id:'dq_u8_01', type:'choice',
      q:'Which sentence uses the Present Continuous correctly?',
      options:[
        'She is cook dinner every day.',
        "She's cooking dinner right now.",
        'She cooking dinner at the moment.',
        'She is cooks dinner now.',
      ],
      ans:"She's cooking dinner right now.",
      explanation:"Present Continuous = am/is/are + verb-ing. \"She's cooking\" = she is cooking — action happening right now." },

    { id:'dq_u8_02', type:'choice',
      q:'Which sentence uses the Present Simple correctly?',
      options:[
        'He is usually drives to work.',
        "He's driving to work every day.",
        'He drives to work every day.',
        'He drive to work every day.',
      ],
      ans:'He drives to work every day.',
      explanation:'"Every day" = routine → Present Simple. With he/she/it we add -s: drive → drives.' },

    { id:'dq_u8_03', type:'choice',
      q:'Look at the signal word: "at the moment". Which tense do you use?',
      options:['Present Simple', 'Past Simple', 'Present Continuous', 'Future Simple'],
      ans:'Present Continuous',
      explanation:'"At the moment" means right now — use the Present Continuous: am/is/are + verb-ing.' },

    { id:'dq_u8_04', type:'choice',
      q:'Which of these is a stative verb that CANNOT be used with -ing?',
      options:['run', 'eat', 'know', 'play'],
      ans:'know',
      explanation:'"Know" is a stative verb — it describes a mental state, not an action. We always use Present Simple: "I know the answer." ❌ "I am knowing the answer."' },

    { id:'dq_u8_05', type:'choice',
      q:'Which sentence is CORRECT?',
      options:[
        'I am wanting a pizza.',
        'I wanting a pizza.',
        'I want a pizza.',
        'I am want a pizza.',
      ],
      ans:'I want a pizza.',
      explanation:'"Want" is a stative verb — never use -ing. Always Present Simple: I want a pizza.' },

    { id:'dq_u8_06', type:'choice',
      q:'Jack usually ______ the guitar, but right now he ______ TV.',
      options:[
        'is playing / watches',
        'plays / is watching',
        'plays / watches',
        'is playing / is watching',
      ],
      ans:'plays / is watching',
      explanation:'"Usually" → Present Simple: plays. "Right now" → Present Continuous: is watching.' },
  ],

  vocabulary: [
    // Señales de tiempo
    { id:'v8_01', word:'right now',          span:'ahora mismo' },
    { id:'v8_02', word:'at the moment',      span:'en este momento' },
    { id:'v8_03', word:'at present',         span:'actualmente / ahora mismo' },
    { id:'v8_04', word:'every day',          span:'todos los días' },
    { id:'v8_05', word:'usually',            span:'normalmente' },
    { id:'v8_06', word:'in general',         span:'en general' },
    // Stative verbs
    { id:'v8_07', word:'like',               span:'gustar' },
    { id:'v8_08', word:'love',               span:'encantar / querer' },
    { id:'v8_09', word:'hate',               span:'odiar' },
    { id:'v8_10', word:'want',               span:'querer' },
    { id:'v8_11', word:'need',               span:'necesitar' },
    { id:'v8_12', word:'know',               span:'saber / conocer' },
    { id:'v8_13', word:'understand',         span:'entender' },
    { id:'v8_14', word:'remember',           span:'recordar' },
    { id:'v8_15', word:'believe',            span:'creer' },
    { id:'v8_16', word:'prefer',             span:'preferir' },
    // Frases de contraste
    { id:'v8_17', word:'She drives every day.',         span:'Ella conduce todos los días.' },
    { id:'v8_18', word:"She isn't driving right now.",  span:'Ella no está conduciendo ahora mismo.' },
    { id:'v8_19', word:"I'm studying at the moment.",   span:'Estoy estudiando en este momento.' },
    { id:'v8_20', word:'I study every evening.',        span:'Estudio todas las tardes.' },
  ],

};