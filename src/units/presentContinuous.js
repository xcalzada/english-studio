// src/units/presentContinuous.js
// Present Continuous — niños hispanohablantes 9-10 años (A1-A2)
// Unidades 3-4: I am doing (afirmativa/negativa) · are you doing? (preguntas)

const quiz = [

  // ── BLOQUE 1: AFIRMATIVA — 6 ejercicios ───────────────────────────

  { id:'pc01', type:'fill', block:'continuousForm',
    q:'🏃 Look! Tom ______ in the park. (run)',
    ans:'is running',
    hint:'"Tom" = él → is + run (dobla la n) + ing.',
    explanation:'"Tom" = él → <strong>is running</strong>. "run" termina en consonante-vocal-consonante → dobla la n antes de añadir -ing.' },

  { id:'pc02', type:'choice', block:'continuousForm',
    q:'🎵 She ______ to music right now.',
    options:['listen', 'listening', 'is listening', 'are listening'],
    ans:'is listening',
    hint:'"She" = ella → is + verb-ing.',
    explanation:'She = ella → <strong>is listening</strong>. Present Continuous = am/is/are + verbo-ing. ¡Nunca el verbo solo!' },

  { id:'pc03', type:'error',
    q:'🌧️ It are raining outside.',
    ans:'It is raining outside.',
    hint:'"It" → is, nunca are.',
    explanation:'"It" es singular (una cosa) → <strong>is</strong>. "are" solo se usa con we, you, they.' },

  { id:'pc04', type:'fill', block:'continuousForm',
    q:'📱 We ______ a video call right now. (have)',
    ans:'are having',
    hint:'"We" → are + have (quita -e) + ing.',
    explanation:'We = nosotros → <strong>are having</strong>. "have" termina en -e silenciosa → quitamos la -e y añadimos -ing.' },

  { id:'pc05', type:'choice', block:'continuousForm',
    q:'🐱 The cat ______ on the sofa.',
    options:['sleep', 'is sleep', 'is sleeping', 'are sleeping'],
    ans:'is sleeping',
    hint:'"The cat" = él → is + sleeping.',
    explanation:'"The cat" = él → <strong>is sleeping</strong>. sleep → sleeping (sin cambios especiales, solo añade -ing).' },

  { id:'pc06', type:'fill', block:'continuousForm',
    q:'🏊 My brothers ______ in the pool. (swim)',
    ans:'are swimming',
    hint:'"My brothers" = ellos → are + swim (dobla la m) + ing.',
    explanation:'"My brothers" = ellos → <strong>are swimming</strong>. "swim" termina en consonante-vocal-consonante → dobla la m.' },


  // ── BLOQUE 2: NEGATIVA — 5 ejercicios ────────────────────────────

  { id:'pc07', type:'fill', block:'continuousForm',
    q:"📺 She ______ TV — she's reading a book. (not watch)",
    ans:"isn't watching",
    hint:'"She" → isn\'t + watching.',
    explanation:'She <strong>isn\'t watching</strong> TV. Con ella la negativa es isn\'t (is not) + verbo-ing.' },

  { id:'pc08', type:'error',
    q:"🎮 They isn't playing football today.",
    ans:"They aren't playing football today.",
    hint:'"They" → aren\'t, nunca isn\'t.',
    explanation:'"They" = ellos → <strong>aren\'t</strong>. "isn\'t" solo se usa con he/she/it.' },

  { id:'pc09', type:'fill', block:'continuousForm',
    q:"☀️ It ______ today. We can go out! (not rain)",
    ans:"isn't raining",
    hint:'"It" → isn\'t + raining.',
    explanation:'It <strong>isn\'t raining</strong> today. Con "it" la negativa es isn\'t (is not) + verbo-ing.' },

  { id:'pc10', type:'choice', block:'continuousForm',
    q:"🚗 He ______ to work — it's Sunday!",
    options:["isn't driving", "is driving", "aren't driving", "not driving"],
    ans:"isn't driving",
    hint:'"He" → isn\'t + driving.',
    explanation:'He <strong>isn\'t driving</strong> to work. Negativa con él: isn\'t + verbo-ing.' },

  { id:'pc11', type:'error',
    q:"🎵 I not listening to music right now.",
    ans:"I'm not listening to music right now.",
    hint:'"I" → I\'m not + verbo-ing.',
    explanation:'Con "I" la negativa es <strong>I\'m not</strong> + verbo-ing. Nunca se puede decir "I not".' },


  // ── BLOQUE 3: PREGUNTAS — 6 ejercicios ───────────────────────────

  { id:'pc12', type:'choice', block:'continuousQuestions',
    q:"📚 ______ you studying for the test?",
    options:['Do', 'Are', 'Is', 'Am'],
    ans:'Are',
    hint:'"You" → Are.',
    explanation:'<strong>Are</strong> you studying? Con "you" usamos Are en las preguntas.' },

  { id:'pc13', type:'fill', block:'continuousQuestions',
    q:"🍳 ______ your mum cooking dinner?",
    ans:'Is',
    hint:'"Your mum" = ella → Is.',
    explanation:'<strong>Is</strong> your mum cooking dinner? Con ella el auxiliar es Is.' },

  { id:'pc14', type:'error',
    q:"What are doing you in the kitchen?",
    ans:"What are you doing in the kitchen?",
    hint:'El sujeto va entre "are" y "doing".',
    explanation:'Orden correcto: What <strong>are you doing</strong>? El sujeto siempre va después del auxiliar y antes del verbo-ing.' },

  { id:'pc15', type:'choice', block:'continuousQuestions',
    q:"🏊 ______ the children swimming?",
    options:['Do', 'Does', 'Is', 'Are'],
    ans:'Are',
    hint:'"The children" = ellos → Are.',
    explanation:'<strong>Are</strong> the children swimming? "The children" = ellos → Are.' },

  { id:'pc16', type:'fill', block:'continuousQuestions',
    q:"💬 ______ he talking on the phone?",
    ans:'Is',
    hint:'"He" = él → Is.',
    explanation:'<strong>Is</strong> he talking on the phone? Con él usamos Is.' },

  { id:'pc17', type:'choice', block:'continuousQuestions',
    q:"🐶 What ______ the dog doing in the garden?",
    options:['do', 'does', 'is', 'are'],
    ans:'is',
    hint:'"The dog" = él → is.',
    explanation:'What <strong>is</strong> the dog doing? Con "the dog" (él) el auxiliar es is.' },


  // ── BLOQUE 4: SPELLING -ING — 4 ejercicios ───────────────────────

  { id:'pc18', type:'choice', block:'spellingRules',
    q:"✏️ run + -ing =",
    options:['runing', 'running', 'runeing', 'runs'],
    ans:'running',
    hint:'run termina en consonante-vocal-consonante → dobla la n.',
    explanation:'run → <strong>running</strong>. r(C) + u(V) + n(C) → dobla la última consonante antes de añadir -ing.' },

  { id:'pc19', type:'fill', block:'spellingRules',
    q:"✏️ come → come + -ing = ______",
    ans:'coming',
    hint:'come termina en -e silenciosa → quita la -e y añade -ing.',
    explanation:'come → <strong>coming</strong>. Verbos que terminan en -e silenciosa: quita la -e y añade -ing.' },

  { id:'pc20', type:'choice', block:'spellingRules',
    q:"✏️ write + -ing =",
    options:['writeing', 'writting', 'writing', 'writes'],
    ans:'writing',
    hint:'write termina en -e silenciosa → quita la -e y añade -ing.',
    explanation:'write → <strong>writing</strong>. Quita la -e final y añade -ing. (No dobla porque termina en dos consonantes: t-e).' },

  { id:'pc21', type:'fill', block:'spellingRules',
    q:"✏️ sit → sit + -ing = ______",
    ans:'sitting',
    hint:'sit termina en consonante-vocal-consonante → dobla la t.',
    explanation:'sit → <strong>sitting</strong>. s(C) + i(V) + t(C) → dobla la t antes de añadir -ing.' },

];

export const presentContinuousUnit = {
  id: 'present-continuous',
  grammarTitle: 'Present Continuous',
  title: "I'm playing · She's watching · Are you doing?",
  description: 'Aprende a hablar de lo que está pasando AHORA MISMO 🎬',

  theoryBlock: {

    // ── SECCIÓN 1: LA FORMA — AFIRMATIVA, NEGATIVA E INTERROGATIVA ────

    continuousForm: {
      title: '🎬 Present Continuous — am / is / are + -ing',
      content: [
        { type:'teacher',
          text:'El <strong>Present Continuous</strong> (o presente progresivo) lo usamos para acciones que están pasando <strong>ahora mismo</strong>, en este momento. La fórmula siempre tiene dos partes: el auxiliar <strong>am / is / are</strong> + el verbo con <strong>-ing</strong>.' },

        { type:'table',
          headers:['Pronombre', '', 'Auxiliar', 'Ejemplo'],
          rows:[
            ['<strong>I</strong>',               '(yo)',                          '<strong>am</strong>',  "I <strong>am</strong> reading. → I<strong>'m</strong> reading. 📖"],
            ['<strong>He / She / It</strong>',   '(él / ella / una cosa)',        '<strong>is</strong>',  "She <strong>is</strong> sleeping. → She<strong>'s</strong> sleeping. 😴"],
            ['<strong>We / You / They</strong>', '(nosotros / vosotros / ellos)', '<strong>are</strong>', "They <strong>are</strong> playing. → They<strong>'re</strong> playing. 🎮"],
          ] },

        { type:'tip',
          emoji:'⏱️',
          text:'Señales típicas del Present Continuous: <strong>now / right now / at the moment / Look! / Listen!</strong><br>👉 Look! It\'s raining! &nbsp;·&nbsp; Please be quiet — I\'m studying right now.' },

        { type:'subtitle', text:'✅ Fórmula afirmativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">am / is / are</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo + -ing</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 I <strong>am watching</strong> TV. &nbsp;·&nbsp; She <strong>is eating</strong>. &nbsp;·&nbsp; They <strong>are playing</strong>.</p>' },

        { type:'subtitle', text:'🙅 Fórmula negativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">am / is / are</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#dc2626;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">not</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo + -ing</span>'
            + '</div>'
            + "<p style=\"margin-top:8px;font-size:13px\">👉 I<strong>'m not</strong> sleeping. &nbsp;·&nbsp; She <strong>isn't</strong> eating. &nbsp;·&nbsp; They <strong>aren't</strong> playing.</p>" },
        { type:'table',
          headers:['Forma completa', 'Forma corta', ''],
          rows:[
            ['I am not',     "I<strong>'m not</strong>",     '😴'],
            ['She is not',   "She <strong>isn't</strong> / She<strong>'s not</strong>",   '🙅‍♀️'],
            ['They are not', "They <strong>aren't</strong> / They<strong>'re not</strong>", '🚫'],
          ] },

        { type:'subtitle', text:'❓ Fórmula interrogativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Am / Is / Are</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo + -ing</span>'
            + '<span style="background:#475569;color:#fff;padding:4px 10px;border-radius:8px;font-weight:900;font-size:15px">?</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 <strong>Is</strong> she sleeping? &nbsp;·&nbsp; <strong>Are</strong> you working? &nbsp;·&nbsp; <strong>What is</strong> he doing?<br>💡 El auxiliar salta al principio — igual que con To Be.</p>' },

        { type:'rule', warn:true,
          text:'❌ She is watch TV. &nbsp; ❌ They playing football.<br>✅ She <strong>is watching</strong> TV. &nbsp; ✅ They <strong>are playing</strong> football.<br>⚠️ Siempre necesitas am / is / are + verbo-ing. ¡Nunca uno solo!' },
      ],
    },

    // ── SECCIÓN 2: REGLAS DE SPELLING -ING ────────────────────────────

    spellingRules: {
      title: '✏️ ¿Cómo añadir -ing? — Reglas de escritura',
      content: [
        { type:'teacher',
          text:'Añadir <strong>-ing</strong> a un verbo parece fácil, ¡pero hay reglas importantes! Mira cómo termina el verbo y sigue la regla correcta.' },

        { type:'table',
          headers:['El verbo termina en…', 'Regla', 'Ejemplos'],
          rows:[
            ['cualquier <strong>consonante normal</strong>',                           '<strong>añade -ing</strong> directamente',                        'eat → <strong>eating</strong> &nbsp;·&nbsp; sleep → <strong>sleeping</strong> &nbsp;·&nbsp; work → <strong>working</strong>'],
            ['<strong>-e silenciosa</strong> (come, write, dance)',                    '<strong>quita la -e</strong> y añade <strong>-ing</strong>',         'come → <strong>coming</strong> &nbsp;·&nbsp; write → <strong>writing</strong> &nbsp;·&nbsp; dance → <strong>dancing</strong>'],
            ['<strong>consonante + vocal + consonante</strong> (<strong>CVC</strong>)','<strong>dobla</strong> la consonante final y añade <strong>-ing</strong>', 'run → <strong>running</strong> &nbsp;·&nbsp; sit → <strong>sitting</strong> &nbsp;·&nbsp; swim → <strong>swimming</strong>'],
            ['<strong>-ie</strong> (lie, die, tie)',                                    'cambia <strong>-ie</strong> a <strong>-y</strong> y añade <strong>-ing</strong>', 'lie → <strong>lying</strong> &nbsp;·&nbsp; die → <strong>dying</strong> &nbsp;·&nbsp; tie → <strong>tying</strong>'],
          ] },

        { type:'tip',
          emoji:'💡',
          text:'La regla CVC: <strong>run</strong> = r(C) + u(V) + n(C) → dobla la n → <strong>running</strong>.<br>Pero <strong>talk</strong> = t-a-l-<strong>lk</strong> → ¡termina en dos consonantes! → <strong>talking</strong> (sin doblar).' },

        { type:'rule', warn:true,
          text:'❌ come → <strong>comeing</strong> &nbsp; ❌ run → <strong>runing</strong> &nbsp; ❌ write → <strong>writting</strong><br>✅ come → <strong>coming</strong> &nbsp; ✅ run → <strong>running</strong> &nbsp; ✅ write → <strong>writing</strong>' },
      ],
    },

    // ── SECCIÓN 3: PREGUNTAS ──────────────────────────────────────────

    continuousQuestions: {
      title: '❓ Preguntas en Present Continuous',
      content: [
        { type:'teacher',
          text:'Para hacer una pregunta en Present Continuous movemos el auxiliar (<strong>is / are</strong>) al principio de la frase. ¡El sujeto va siempre entre el auxiliar y el verbo-ing!' },

        { type:'subtitle', text:'✅ Fórmula interrogativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Am / Is / Are</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo + -ing</span>'
            + '<span style="background:#475569;color:#fff;padding:4px 10px;border-radius:8px;font-weight:900;font-size:15px">?</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 <strong>Is</strong> she sleeping? &nbsp;·&nbsp; <strong>Are</strong> they playing football?</p>' },

        { type:'table',
          headers:['Sujeto', 'Auxiliar', 'Ejemplo'],
          rows:[
            ['I',               '<strong>Am</strong>',  '<strong>Am</strong> I talking too fast?'],
            ['He / She / It',   '<strong>Is</strong>',  '<strong>Is</strong> she cooking dinner? 🍳'],
            ['We / You / They', '<strong>Are</strong>', '<strong>Are</strong> you listening? 👂'],
          ] },

        { type:'subtitle', text:'📝 Con What, Where, Why, Who…' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#7c3aed;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Wh-</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">is / are</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo + -ing</span>'
            + '<span style="background:#475569;color:#fff;padding:4px 10px;border-radius:8px;font-weight:900;font-size:15px">?</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 <strong>What are</strong> you doing? &nbsp;·&nbsp; <strong>Where is</strong> she going? &nbsp;·&nbsp; <strong>Why are</strong> you whispering?</p>' },

        { type:'subtitle', text:'✔️ Respuestas cortas' },
        { type:'table',
          headers:['Pregunta', 'Sí', 'No'],
          rows:[
            ['Are you playing?',  'Yes, I <strong>am</strong>.',    "No, I<strong>'m not</strong>."],
            ['Is she eating?',    'Yes, she <strong>is</strong>.',  "No, she <strong>isn't</strong>."],
            ['Are they working?', 'Yes, they <strong>are</strong>.','No, they <strong>aren\'t</strong>.'],
          ] },

        { type:'rule', warn:true,
          text:'❌ Is working she today? &nbsp; ❌ Are going they to school?<br>✅ Is <strong>she</strong> working today? &nbsp; ✅ Are <strong>they</strong> going to school?<br>⚠️ El sujeto va siempre DESPUÉS del auxiliar y ANTES del verbo-ing.' },
      ],
    },

  },

  theoryQuiz: quiz,
  activeQuiz:  quiz,

  discoveryQuiz: [
    { id:'dq_pc01', type:'choice',
      q:'Which sentence uses the Present Continuous correctly?',
      options:['She working now.', 'She is work now.', 'She is working now.', 'She works now.'],
      ans:'She is working now.',
      explanation:'Present Continuous = am/is/are + verb-ing. "She is working now." is the correct form.' },
    { id:'dq_pc02', type:'choice',
      q:'How do we make the negative in the Present Continuous?',
      options:["don't + verb-ing", "am/is/are + not + verb-ing", "not + verb-ing", "doesn't + verb-ing"],
      ans:'am/is/are + not + verb-ing',
      explanation:'"I\'m not sleeping." / "She isn\'t working." — we use am/is/are + not + verb-ing.' },
    { id:'dq_pc03', type:'choice',
      q:'Which sentence is in the Present Continuous?',
      options:['I eat lunch every day.', 'I ate lunch yesterday.', "I'm eating lunch right now.", 'I will eat lunch.'],
      ans:"I'm eating lunch right now.",
      explanation:'"I\'m eating" = I am + eating (-ing). This is the Present Continuous — an action happening right now.' },
    { id:'dq_pc04', type:'choice',
      q:'How do we spell "run" in the Present Continuous?',
      options:['runing', 'running', 'runeing', 'runs'],
      ans:'running',
      explanation:'"run" ends in consonant-vowel-consonant (CVC). Double the final consonant: run → running.' },
    { id:'dq_pc05', type:'choice',
      q:'Which word is a typical Present Continuous signal?',
      options:['every day', 'yesterday', 'right now', 'last week'],
      ans:'right now',
      explanation:'"Right now", "at the moment", "Look!", "Listen!" are typical Present Continuous signal words.' },
    { id:'dq_pc06', type:'choice',
      q:'What is the correct question form for "She is sleeping"?',
      options:['Does she sleep?', 'Is she sleeping?', 'Is she sleep?', 'She is sleeping?'],
      ans:'Is she sleeping?',
      explanation:'Present Continuous question: Is/Are + subject + verb-ing. "Is she sleeping?" — the auxiliary comes first.' },
  ],

  writing: [
    {
      task: 'Look out of the window (or imagine a busy street). Write 5 sentences about what people are doing right now. Use the Present Continuous.',
      minWords: 30,
      tips: [
        'A woman is… / A man is… / Some children are…',
        'He / She / They is/are + verb-ing',
        'Use: walking, running, talking, eating, driving, playing, reading…',
        'Add details: A boy is playing football in the park.',
      ],
      keyPhrases: [
        'is|are|\'m',
        'ing',
        'right now|at the moment|now',
        'walking|running|talking|eating|driving|playing|reading|sitting|standing|watching',
      ],
      example: "I'm looking out of the window right now. A woman is walking her dog. Two children are playing in the park. A man is talking on the phone. Some people are waiting for the bus. A cyclist is riding very fast. It isn't raining — the sun is shining and everyone is enjoying the afternoon.",
    },
    {
      task: 'Write about what your family is doing at this moment. Use the Present Continuous to describe each person.',
      minWords: 30,
      tips: [
        'My mum / dad / brother / sister is…',
        'They are…',
        "I'm…",
        'Use: watching, cooking, sleeping, working, studying, reading, playing…',
      ],
      keyPhrases: [
        'is|are|\'m',
        'ing',
        'mum|dad|brother|sister|family|friend',
        'watching|cooking|sleeping|working|studying|reading|playing|sitting|eating',
      ],
      example: "Right now it's Saturday afternoon. My mum is cooking in the kitchen — she's making paella. My dad is watching the football match on TV. My little brother is playing video games in his room. My sister is studying for her exams. I'm writing in English! Our dog is sleeping on the sofa as usual.",
    },
  ],

  vocabulary: [
    { id:'vpc01', word:"I'm working",        span:'estoy trabajando' },
    { id:'vpc02', word:"She's eating",       span:'ella está comiendo' },
    { id:'vpc03', word:"They're playing",    span:'ellos están jugando' },
    { id:'vpc04', word:"I'm not sleeping",   span:'no estoy durmiendo' },
    { id:'vpc05', word:"He isn't driving",   span:'él no está conduciendo' },
    { id:'vpc06', word:"Are you studying?",  span:'¿estás estudiando?' },
    { id:'vpc07', word:"Is she coming?",     span:'¿está viniendo ella?' },
    { id:'vpc08', word:'right now',          span:'ahora mismo' },
    { id:'vpc09', word:'at the moment',      span:'en este momento' },
    { id:'vpc10', word:'reading',            span:'leyendo' },
    { id:'vpc11', word:'writing',            span:'escribiendo' },
    { id:'vpc12', word:'running',            span:'corriendo' },
    { id:'vpc13', word:'sitting',            span:'sentado/a' },
    { id:'vpc14', word:'coming',             span:'viniendo' },
    { id:'vpc15', word:'watching',           span:'mirando / viendo' },
    { id:'vpc16', word:'cooking',            span:'cocinando' },
  ],

  listening: {
    text: "It is Saturday morning and the whole family is at home. Dad is reading the newspaper in the kitchen and drinking his coffee. Mum is not sleeping — she is doing the housework. She is cleaning the living room right now. The two brothers are playing video games in their bedroom. They are laughing and shouting because the game is very exciting. The dog is sleeping next to the sofa. The youngest sister is doing her homework at the dining table. She is writing a story for school. Outside, the neighbours are washing their car. The sun is shining and the birds are singing. It is a beautiful day.",
    options: [
      'reading', 'drinking', 'sleeping', 'cleaning', 'playing',
      'laughing', 'shouting', 'doing', 'writing', 'washing',
      'shining', 'singing',
      'cooking', 'running', 'swimming', 'watching',
    ],
    correctItems: [
      'reading', 'drinking', 'cleaning', 'playing',
      'laughing', 'shouting', 'doing', 'writing', 'washing',
      'shining', 'singing',
    ],
  },

  reading: {
    title: 'A Busy Saturday Morning',
    source: 'English Studio · Level A1–A2',
    passage: `It is ten o'clock on Saturday morning. Emma is sitting at the kitchen table and eating breakfast. She is having cereal and orange juice. Her brother Leo is not eating — he is still sleeping!

Their mum, Sarah, is in the garden. She is watering the plants and listening to music on her headphones. She is wearing old clothes because the garden is muddy.

Their dad is at the supermarket. He is doing the weekly shopping. He is walking up and down the aisles and looking for their favourite foods. He is not driving home yet — he is still in the shop.

Emma's friend Lily is coming to visit at eleven o'clock. Emma is very excited. She is tidying her room and choosing what to wear. She is also writing a message to Lily: "Are you coming soon? I'm ready!"

Outside, some children are playing in the street. They are riding their bikes and laughing. A dog is running after them. The sun is shining and it is a perfect morning.`,
    questions: [
      { id:'r_pc01', type:'mc',
        q:"What is Emma doing at ten o'clock?",
        options:['She is sleeping.', 'She is eating breakfast.', 'She is watering the plants.', 'She is tidying her room.'],
        ans:'She is eating breakfast.',
        explanation:'"Emma is sitting at the kitchen table and eating breakfast."' },
      { id:'r_pc02', type:'mc',
        q:'Where is Sarah (the mum)?',
        options:['In the kitchen', 'At the supermarket', 'In the garden', 'In the bedroom'],
        ans:'In the garden',
        explanation:'"Their mum, Sarah, is in the garden."' },
      { id:'r_pc03', type:'mc',
        q:'Why is Sarah wearing old clothes?',
        options:[
          'Because she is cooking.',
          'Because the garden is muddy.',
          'Because she is shopping.',
          'Because she is sleeping.',
        ],
        ans:'Because the garden is muddy.',
        explanation:'"She is wearing old clothes because the garden is muddy."' },
      { id:'r_pc04', type:'mc',
        q:"What is Emma's dad doing?",
        options:['He is watching TV.', 'He is sleeping.', 'He is doing the shopping.', 'He is watering the garden.'],
        ans:'He is doing the shopping.',
        explanation:'"He is doing the weekly shopping."' },
      { id:'r_pc05', type:'sa',
        q:"Find TWO things Emma is doing to get ready for Lily's visit.",
        ans:'tidying|writing|choosing|tidy|write|choose',
        explanation:'"She is tidying her room and choosing what to wear. She is also writing a message to Lily."' },
      { id:'r_pc06', type:'mc',
        q:'Which sentence is in the Present Continuous?',
        options:[
          'Emma eats breakfast every day.',
          'Emma ate breakfast yesterday.',
          'Emma is eating breakfast right now.',
          'Emma will eat breakfast tomorrow.',
        ],
        ans:'Emma is eating breakfast right now.',
        explanation:'"Is eating" = is + eating (-ing). This is the Present Continuous. "Right now" is a typical signal word.' },
    ],
  },
};
