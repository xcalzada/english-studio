// src/data/presentSimple.js
// Present Simple — niños hispanohablantes 9-10 años (A1-A2)
// SEGUNDA TANDA DE EJERCICIOS — contextos nuevos, misma estructura pedagógica

const quiz = [

  // ── BLOQUE 1: TO BE (am / is / are) — 6 ejercicios ───────────────

  { id:'ps34', type:'choice', block:'verbToBe',
    q:'🐶 My dog ______ very friendly.',
    options:['am', 'is', 'are', 'be'],
    ans:'is',
    hint:'"My dog" = él (un animal) → IS.',
    explanation:'"My dog" = él → <strong>is</strong>. Con él, ella o una cosa usamos IS.' },

  { id:'ps35', type:'fill',
    q:'🎒 I ______ ready for school!',
    ans:'am',
    hint:'Con "I" (yo) → siempre AM.',
    explanation:'Con <strong>I</strong> (yo) usamos <strong>am</strong>. Solo "I" usa "am".' },

  { id:'ps36', type:'error',
    q:'🌟 My friends is very nice.',
    ans:'My friends are very nice.',
    hint:'"My friends" = ellos (más de uno) → ARE.',
    explanation:'"My friends" son varios → <strong>are</strong>. ARE es para nosotros, vosotros o ellos.' },

  { id:'ps37', type:'fill',
    q:'🍎 Apples and bananas ______ healthy snacks.',
    ans:'are',
    hint:'Dos cosas → ARE.',
    explanation:'"Apples and bananas" son dos cosas → <strong>are</strong>.' },

  { id:'ps38', type:'choice', block:'verbToBe',
    q:'🏫 ______ your teacher in the classroom?',
    options:['Am', 'Is', 'Are', 'Do'],
    ans:'Is',
    hint:'"Your teacher" = él/ella → IS.',
    explanation:'En preguntas con él o ella → <strong>Is</strong> your teacher in the classroom?' },

  { id:'ps39', type:'error',
    q:'🎮 We is very good at this game!',
    ans:'We are very good at this game!',
    hint:'"We" (nosotros) → ARE.',
    explanation:'"We" = nosotros → <strong>are</strong>.' },


  // ── BLOQUE 2: VERBOS NORMALES — AFIRMATIVA — 7 ejercicios ────────

  { id:'ps40', type:'fill',
    q:'🐦 The bird ______ every morning. (sing)',
    ans:'sings',
    hint:'"The bird" = él → verbo + s.',
    explanation:'"The bird" = él → sing + s = <strong>sings</strong>.' },

  { id:'ps41', type:'fill',
    q:'📺 My brother ______ TV after dinner. (watch)',
    ans:'watches',
    hint:'watch termina en -ch → añade -es.',
    explanation:'watch → <strong>watches</strong>. Verbos en -ch añaden -es.' },

  { id:'ps42', type:'choice', block:'lexicalVerbs',
    q:'🎹 My sister ______ the piano very well.',
    options:['play', 'plays', 'playes', 'playing'],
    ans:'plays',
    hint:'"My sister" = ella → verbo + s.',
    explanation:'"My sister" = ella → play + s = <strong>plays</strong>.' },

  { id:'ps43', type:'fill',
    q:'🍳 My mum ______ breakfast at 7. (make)',
    ans:'makes',
    hint:'"My mum" = ella → verbo + s.',
    explanation:'make + s = <strong>makes</strong>.' },

  { id:'ps44', type:'error',
    q:'🚗 He drive to work every day.',
    ans:'He drives to work every day.',
    hint:'"He" → verbo + s.',
    explanation:'Con "he" el verbo lleva -s → <strong>drives</strong>.' },

  { id:'ps45', type:'fill',
    q:'🏀 My friends ______ basketball after school. (play)',
    ans:'play',
    hint:'"My friends" = ellos → verbo base.',
    explanation:'Con ellos el verbo no cambia → <strong>play</strong>.' },

  { id:'ps46', type:'choice', block:'lexicalVerbs',
    q:'🐠 The fish ______ in the water.',
    options:['swim', 'swims', 'swimes', 'swimming'],
    ans:'swims',
    hint:'"The fish" = él → verbo + s.',
    explanation:'swim + s = <strong>swims</strong>.' },


  // ── BLOQUE 3: NEGATIVAS — 6 ejercicios ───────────────────────────

  { id:'ps47', type:'fill',
    q:"🌧 We ______ go outside when it rains. (not go)",
    ans:"don't",
    hint:'We + not → don\'t.',
    explanation:'We <strong>don\'t go</strong> outside when it rains.' },

  { id:'ps48', type:'error',
    q:"My brother don't like milk.",
    ans:"My brother doesn't like milk.",
    hint:'"My brother" = él → doesn\'t.',
    explanation:'Con él o ella usamos <strong>doesn\'t</strong>.' },

  { id:'ps49', type:'fill',
    q:"🐶 My dog ______ eat chocolate. (not eat)",
    ans:"doesn't",
    hint:'"My dog" = él → doesn\'t.',
    explanation:'My dog <strong>doesn\'t eat</strong> chocolate.' },

  { id:'ps50', type:'choice', block:'lexicalVerbs',
    q:"🥦 She ______ like broccoli.",
    options:["don't", "doesn't", "isn't", "not"],
    ans:"doesn't",
    hint:'She → doesn\'t.',
    explanation:'She <strong>doesn\'t</strong> like broccoli.' },

  { id:'ps51', type:'error',
    q:"They doesn't study on Sunday.",
    ans:"They don't study on Sunday.",
    hint:'They → don\'t.',
    explanation:'They = ellos → <strong>don\'t</strong>.' },

  { id:'ps52', type:'fill',
    q:"😴 I ______ wake up early on Saturdays. (not wake)",
    ans:"don't",
    hint:'I + not → don\'t.',
    explanation:'I <strong>don\'t wake</strong> up early on Saturdays.' },


  // ── BLOQUE 4: PREGUNTAS — 5 ejercicios ───────────────────────────

  { id:'ps53', type:'choice', block:'lexicalVerbs',
    q:"🐱 ______ your cat sleep on your bed?",
    options:['Do', 'Does', 'Is', 'Are'],
    ans:'Does',
    hint:'Your cat = él → Does.',
    explanation:'<strong>Does</strong> your cat sleep on your bed?' },

  { id:'ps54', type:'choice', block:'lexicalVerbs',
    q:"🎮 ______ you play video games after school?",
    options:['Do', 'Does', 'Is', 'Are'],
    ans:'Do',
    hint:'You → Do.',
    explanation:'<strong>Do</strong> you play video games?' },

  { id:'ps55', type:'error',
    q:"Do your brother like pizza?",
    ans:"Does your brother like pizza?",
    hint:'Brother = él → Does.',
    explanation:'<strong>Does</strong> your brother like pizza?' },

  { id:'ps56', type:'choice', block:'lexicalVerbs',
    q:"📚 What ______ your sister read at school?",
    options:['do', 'does', 'is', 'are'],
    ans:'does',
    hint:'Your sister = ella → does.',
    explanation:'What <strong>does</strong> your sister read?' },

  { id:'ps57', type:'fill',
    q:"⚽ ______ your friend play football?",
    ans:'Does',
    hint:'Friend = él/ella → Does.',
    explanation:'<strong>Does</strong> your friend play football?' },


  // ── BLOQUE 5: ADVERBIOS DE FRECUENCIA — 4 ejercicios ─────────────

  { id:'ps58', type:'error',
    q:"🍎 She eats always fruit after lunch.",
    ans:"She always eats fruit after lunch.",
    hint:'Always va antes del verbo.',
    explanation:'Adverbio antes del verbo → She <strong>always eats</strong>.' },

  { id:'ps59', type:'choice', block:'frequencyAdverbs',
    q:"📚 I ______ read before bed. Almost every night.",
    options:['never', 'always', 'sometimes', 'rarely'],
    ans:'always',
    hint:'Almost every night = always.',
    explanation:'Casi todas las noches → <strong>always</strong>.' },

  { id:'ps60', type:'fill',
    q:"🎲 We ______ play board games on Sunday. (usually)",
    ans:'usually',
    hint:'Usually va antes del verbo.',
    explanation:'We <strong>usually play</strong> board games.' },

  { id:'ps61', type:'choice', block:'frequencyAdverbs',
    q:"🍔 He ______ eats fast food. Maybe once a month.",
    options:['always', 'never', 'rarely', 'usually'],
    ans:'rarely',
    hint:'Once a month = rarely.',
    explanation:'Muy pocas veces → <strong>rarely</strong>.' },


  // ── BLOQUE 6: HAVE / HAS — 2 ejercicios ──────────────────────────

  { id:'ps62', type:'error',
    q:"🐢 My cousin have a turtle.",
    ans:"My cousin has a turtle.",
    hint:'Cousin = él/ella → has.',
    explanation:'Con él/ella usamos <strong>has</strong>.' },

  { id:'ps63', type:'choice', block:'lexicalVerbs',
    q:"👟 My parents ______ a big garden.",
    options:['has', 'have', 'haves', 'is have'],
    ans:'have',
    hint:'Parents = ellos → have.',
    explanation:'Con ellos usamos <strong>have</strong>.' }

];

export const presentSimpleUnit = {
  id: 'present-simple',
  grammarTitle: 'Present Simple',
  title: 'I play · She plays · Do you play?',
  description: 'Aprende a hablar de cosas que haces siempre o casi siempre 🗓️',

  theoryBlock: {

    // ── SECCIÓN 1: TO BE ─────────────────────────────────────────────
    verbToBe: {
      title: '⭐ El verbo TO BE — am / is / are',
      content: [
        { type:'teacher',
          text:'<strong>To be</strong> significa "ser" o "estar". Lo usamos para hablar de edad, estado, profesión y lugar. Tiene tres formas distintas — ¡hay que aprenderlas de memoria!' },

        { type:'table',
          headers:['Pronombre', '', 'Verbo', 'Ejemplo'],
          rows:[
            ['<strong>I</strong>',               '(yo)',                          '<strong>am</strong>',  'I <strong>am</strong> 10 years old. 🎂'],
            ['<strong>He / She / It</strong>',   '(él / ella / una cosa)',        '<strong>is</strong>',  'She <strong>is</strong> a teacher. 👩‍🏫'],
            ['<strong>We / You / They</strong>', '(nosotros / vosotros / ellos)', '<strong>are</strong>', 'They <strong>are</strong> at school. 🏫'],
          ] },

        { type:'subtitle', text:'📌 ¿Para qué usamos TO BE?' },
        { type:'table',
          headers:['Uso', 'Ejemplo en inglés', 'En español'],
          rows:[
            ['Edad',       'I <strong>am</strong> 10 years old.',         'Tengo 10 años.'],
            ['Profesión',  'My mum <strong>is</strong> a doctor.',        'Mi madre es médica.'],
            ['Estado',     'We <strong>are</strong> hungry!',             '¡Tenemos hambre!'],
            ['Lugar',      'The cat <strong>is</strong> in the garden.',  'El gato está en el jardín.'],
            ['Descripción','My dog <strong>is</strong> very funny.',      'Mi perro es muy gracioso.'],
          ] },

        { type:'tip',
          emoji:'💡',
          text:'"<strong>You</strong>" en inglés significa tanto <strong>"tú"</strong> como <strong>"vosotros"</strong>. ¡Una sola palabra para los dos! &nbsp; You <strong>are</strong> my friend. / You <strong>are</strong> my friends.' },

        { type:'subtitle', text:'✅ Fórmula afirmativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">am / is / are</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">¿cómo? / ¿dónde? / ¿quién?</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 I <strong>am</strong> happy. &nbsp;·&nbsp; She <strong>is</strong> 25. &nbsp;·&nbsp; They <strong>are</strong> my friends.</p>' },

        { type:'subtitle', text:'🙅 Fórmula negativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">am / is / are</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#dc2626;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">not</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">¿cómo? / ¿dónde? / ¿quién?</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 I <strong>\'m not</strong> tired. &nbsp;·&nbsp; She <strong>isn\'t</strong> here. &nbsp;·&nbsp; They <strong>aren\'t</strong> ready.</p>' },
        { type:'table',
          headers:['Forma completa', 'Forma corta', ''],
          rows:[
            ['I am not',     "I<strong>'m not</strong>",     '😢'],
            ['She is not',   "She <strong>isn't</strong>",   '🐱'],
            ['They are not', "They <strong>aren't</strong>", '👨‍👩‍👧‍👦'],
          ] },

        { type:'subtitle', text:'❓ Fórmula interrogativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Am / Is / Are</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">¿cómo? / ¿dónde? / ¿quién?</span>'
            + '<span style="background:#475569;color:#fff;padding:4px 10px;border-radius:8px;font-weight:900;font-size:15px">?</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 <strong>Are</strong> you ready? &nbsp;·&nbsp; <strong>Is</strong> she at home? &nbsp;·&nbsp; <strong>How old are</strong> you?<br>💡 El verbo salta al principio — como en español: "¿Estás listo?"</p>' },

        { type:'rule', warn:true,
          text:'❌ Do you <strong>be</strong> happy? &nbsp; ❌ Does she <strong>be</strong> tired?<br>✅ <strong>Are</strong> you happy? &nbsp;&nbsp; ✅ <strong>Is</strong> she tired?<br>⚠️ Nunca uses "do/does" con to be.' },
      ],
    },

    // ── SECCIÓN 2: VERBOS NORMALES ───────────────────────────────────
    lexicalVerbs: {
      title: '🎯 Verbos normales — play / plays / don\'t / doesn\'t',
      content: [
        { type:'teacher',
          text:'El <strong>Present Simple</strong> lo usamos para rutinas y hábitos: cosas que hacemos todos los días o casi siempre. La regla de oro: con <strong>él, ella o una cosa</strong>, el verbo lleva <strong>-s</strong> al final.' },

        { type:'subtitle', text:'✅ Fórmula afirmativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo (+s⭐)</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">objeto / complemento</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">⭐ La <strong>-s</strong> solo aparece con él/ella/una cosa.<br>👉 I <strong>play</strong> football. &nbsp;·&nbsp; She <strong>plays</strong> football. &nbsp;·&nbsp; We <strong>watch</strong> TV.</p>' },
        { type:'table',
          headers:['Sujeto', 'Regla', 'Ejemplo'],
          rows:[
            ['I / You / We / They',                   'Verbo sin cambios',           'I <strong>play</strong>. &nbsp; We <strong>watch</strong>.'],
            ['He / She / It &nbsp;(él / ella / cosa)', 'Verbo + <strong>-s</strong>', 'She <strong>plays</strong>. &nbsp; He <strong>watches</strong>.'],
          ] },

        { type:'subtitle', text:'⚠️ Formas especiales de la -s' },
        { type:'table',
          headers:['El verbo termina en…', 'Regla', 'Ejemplo'],
          rows:[
            ['-o',                        'añade -es',     'go → <strong>goes</strong> &nbsp;·&nbsp; do → <strong>does</strong>'],
            ['-ch / -sh / -ss / -x',      'añade -es',     'watch → <strong>watches</strong> &nbsp;·&nbsp; wash → <strong>washes</strong>'],
            ['consonante + y',            'cambia a -ies', 'study → <strong>studies</strong> &nbsp;·&nbsp; try → <strong>tries</strong>'],
            ['vocal + y',                 'añade -s',      'play → <strong>plays</strong> &nbsp;·&nbsp; say → <strong>says</strong>'],
            ['cualquier otra terminación','añade -s',      'eat → <strong>eats</strong> &nbsp;·&nbsp; read → <strong>reads</strong>'],
          ] },

        { type:'tip',
          emoji:'⭐',
          text:'"<strong>have</strong>" (tener) es irregular: con él/ella/una cosa NO decimos "haves" → decimos <strong>has</strong>.<br>👉 I <strong>have</strong> a dog. &nbsp;→&nbsp; She <strong>has</strong> a dog. 🐶' },

        { type:'subtitle', text:'🙅 Fórmula negativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#dc2626;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">don\'t / doesn\'t</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo (forma base)</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">objeto / complemento</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 I <strong>don\'t</strong> like broccoli. &nbsp;·&nbsp; She <strong>doesn\'t</strong> like broccoli. 🥦</p>' },
        { type:'table',
          headers:['Sujeto', 'Forma negativa', 'Ejemplo'],
          rows:[
            ['I / You / We / They',                   "<strong>don't</strong>",   "I <strong>don't</strong> like broccoli. 🥦"],
            ['He / She / It &nbsp;(él / ella / cosa)', "<strong>doesn't</strong>", "She <strong>doesn't</strong> like broccoli. 🥦"],
          ] },
        { type:'rule', warn:true,
          text:"❌ She doesn't <strong>likes</strong> pizza.<br>✅ She doesn't <strong>like</strong> pizza.<br>💡 La -s ya está en 'doesn't'. El verbo vuelve a la forma base." },

        { type:'subtitle', text:'❓ Fórmula interrogativa' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#d97706;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Do / Does</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo (forma base)</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">objeto / complemento</span>'
            + '<span style="background:#475569;color:#fff;padding:4px 10px;border-radius:8px;font-weight:900;font-size:15px">?</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 <strong>Do</strong> you like pizza? &nbsp;·&nbsp; <strong>Does</strong> she like pizza? 🍕</p>' },
        { type:'text',
          text:'<p style="font-size:13px;font-weight:700;color:#94a3b8;margin-bottom:6px">📝 Con What, Where, When, Who…</p>'
            + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#7c3aed;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Wh-</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#d97706;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">do / does</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo (forma base)</span>'
            + '<span style="background:#475569;color:#fff;padding:4px 10px;border-radius:8px;font-weight:900;font-size:15px">?</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">👉 <strong>Where do</strong> you live? &nbsp;·&nbsp; <strong>What does</strong> she eat? 🍽️</p>' },
        { type:'table',
          headers:['Sujeto', 'Auxiliar', 'Ejemplo'],
          rows:[
            ['I / You / We / They',                   '<strong>Do</strong>',   '<strong>Do</strong> you like pizza? 🍕'],
            ['He / She / It &nbsp;(él / ella / cosa)', '<strong>Does</strong>', '<strong>Does</strong> she like pizza? 🍕'],
          ] },
        { type:'rule', warn:true,
          text:"❌ Does she <strong>likes</strong> chocolate?<br>✅ Does she <strong>like</strong> chocolate?<br>💡 Después de Do/Does el verbo es siempre la forma base, sin -s." },
      ],
    },

    // ── SECCIÓN 3: ADVERBIOS DE FRECUENCIA ───────────────────────────
    frequencyAdverbs: {
      title: '📅 ¿Con qué frecuencia? — always / never / sometimes',
      content: [
        { type:'teacher',
          text:'Estas palabras nos dicen <strong>con qué frecuencia</strong> hacemos algo. Tienen una posición fija: van siempre <strong>antes del verbo principal</strong>.' },

        { type:'comparebar',
          adjective:'¿Con qué frecuencia?',
          items:[
            { emoji:'😄', label:'always — siempre',      value:100, unit:'' },
            { emoji:'🙂', label:'usually — normalmente', value:80,  unit:'' },
            { emoji:'😐', label:'often — a menudo',      value:60,  unit:'' },
            { emoji:'🤷', label:'sometimes — a veces',   value:40,  unit:'' },
            { emoji:'❌', label:'never — nunca',          value:5,   unit:'' },
          ] },

        { type:'table',
          headers:['Adverbio', 'Significado', 'Ejemplo'],
          rows:[
            ['<strong>always</strong>',    'siempre',     'I <strong>always</strong> brush my teeth. 🦷'],
            ['<strong>usually</strong>',   'normalmente', 'She <strong>usually</strong> has cereal. 🥣'],
            ['<strong>often</strong>',     'a menudo',    'We <strong>often</strong> play outside. 🌳'],
            ['<strong>sometimes</strong>', 'a veces',     'He <strong>sometimes</strong> watches TV. 📺'],
            ['<strong>never</strong>',     'nunca',       'I <strong>never</strong> eat spinach. 🥬'],
          ] },

        { type:'subtitle', text:'📐 Fórmula — verbos normales' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#7c3aed;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">adverbio de frecuencia</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">verbo</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">objeto / complemento</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">✅ I <strong>always</strong> walk to school. &nbsp;·&nbsp; She <strong>never</strong> forgets her homework.</p>' },

        { type:'rule', warn:true,
          text:'❌ I walk <strong>always</strong> to school.<br>✅ I <strong>always</strong> walk to school.<br>⚠️ El adverbio va ANTES del verbo, nunca después.' },

        { type:'subtitle', text:'⚠️ Excepción — con am / is / are va DESPUÉS' },
        { type:'text',
          text:'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0">'
            + '<span style="background:#6366f1;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">Sujeto</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#059669;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">am / is / are</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#7c3aed;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">adverbio de frecuencia</span>'
            + '<span style="color:#94a3b8;font-weight:900">+</span>'
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">complemento</span>'
            + '</div>'
            + '<p style="margin-top:8px;font-size:13px">✅ She <strong>is always</strong> happy. 😊 &nbsp;·&nbsp; They <strong>are often</strong> late. ⏰</p>' },

        { type:'tip',
          emoji:'💡',
          text:'Regla rápida: <strong>antes del verbo</strong>, pero <strong>después de am / is / are</strong>.' },
      ],
    },

  },

  theoryQuiz: quiz,
  activeQuiz:  quiz,

  discoveryQuiz: [
    { id:'dq01', type:'choice',
      q:'Which sentence uses the Present Simple correctly?',
      options:['She work every day.','She works every day.','She is work every day.','She working every day.'],
      ans:'She works every day.',
      explanation:'With he/she/it we add -s to the verb: work → works.' },
    { id:'dq02', type:'choice',
      q:'How do we make the negative with "I / you / we / they"?',
      options:['doesn\'t + verb','don\'t + verb','isn\'t + verb','not + verb'],
      ans:'don\'t + verb',
      explanation:'"I don\'t like rain." — we use don\'t (do not) with I, you, we, they.' },
    { id:'dq03', type:'choice',
      q:'Which is the correct negative form for "He plays football"?',
      options:['He don\'t play football.','He plays not football.','He doesn\'t play football.','He isn\'t play football.'],
      ans:'He doesn\'t play football.',
      explanation:'With he/she/it the negative is doesn\'t + verb base (no -s on the verb).' },
    { id:'dq04', type:'choice',
      q:'When do we use the Present Simple?',
      options:['For actions happening right now','For routines and habits','For past completed actions','For future plans only'],
      ans:'For routines and habits',
      explanation:'The Present Simple describes things that happen regularly: "I go to school every day."' },
    { id:'dq05', type:'choice',
      q:'Which word is a typical Present Simple signal word?',
      options:['Now','Yesterday','Every day','At the moment'],
      ans:'Every day',
      explanation:'"Every day", "always", "usually", "never" are typical Present Simple time expressions.' },
    { id:'dq06', type:'choice',
      q:'What is the correct question form for "She speaks French"?',
      options:['Do she speak French?','Does she speaks French?','Does she speak French?','Is she speak French?'],
      ans:'Does she speak French?',
      explanation:'Questions with he/she/it: Does + subject + verb base (no -s). "Does she speak?"' },
  ],

  writing: [
    {
      task: 'Write about your daily routine. Describe what you do every day from morning to evening. Use Present Simple verbs.',
      minWords: 40,
      tips: [
        'I get up at… / I have breakfast at…',
        'I usually / always / never…',
        'I go to… / I work / I study…',
        'In the evening, I…',
      ],
      keyPhrases: [
        'get up|wake up|gets up',
        'every day|every morning|every evening',
        'usually|always|never|sometimes|often',
        'go to school|go to work|have breakfast|have lunch',
      ],
      example: 'I usually get up at seven o\'clock. I have a shower and then I eat breakfast. I always have toast and orange juice. I go to school by bus. I study English and Maths every day. In the evening, I usually do my homework and watch TV. I never go to bed late — I always sleep at ten o\'clock.',
    },
    {
      task: 'Write 5 sentences about someone you know (a friend or family member). Describe their habits and routine using Present Simple.',
      minWords: 30,
      tips: [
        'My (mum/friend/brother)… works / lives / studies…',
        'He/She always / usually / never…',
        'He/She doesn\'t like… / He/She loves…',
        'Every day he/she…',
      ],
      keyPhrases: [
        'he|she',
        'works|lives|studies|goes|likes|loves|plays|watches|eats|drinks',
        'every day|always|usually|never|sometimes',
        'doesn\'t|does not',
      ],
      example: 'My mum works in a hospital. She gets up very early — at six o\'clock every day. She usually has coffee for breakfast. She doesn\'t eat a big lunch because she is very busy. In the evening, she always cooks dinner for the family. She loves cooking. She never watches TV late at night.',
    },
  ],

  vocabulary: [
    { id:'v01', word:'always',           span:'siempre' },
    { id:'v02', word:'usually',          span:'normalmente' },
    { id:'v03', word:'often',            span:'a menudo' },
    { id:'v04', word:'sometimes',        span:'a veces' },
    { id:'v05', word:'never',            span:'nunca' },
    { id:'v06', word:'every day',        span:'todos los días' },
    { id:'v07', word:'at the weekend',   span:'el fin de semana' },
    { id:'v08', word:"I don't like",     span:'(a mí) no me gusta' },
    { id:'v09', word:"She doesn't like", span:'(a ella) no le gusta' },
    { id:'v10', word:'Do you like...?',  span:'¿Te gusta...?' },
    { id:'v11', word:'Does he like...?', span:'¿Le gusta (a él)...?' },
    { id:'v12', word:"I am / I'm",       span:'yo soy / estoy' },
    { id:'v13', word:"He is / He's",     span:'él es / está' },
    { id:'v14', word:"They are / They're", span:'ellos son / están' },
    { id:'v15', word:'I have',           span:'yo tengo' },
    { id:'v16', word:'She has',          span:'ella tiene' },
  ],

  listening: {
    text: "Every morning, Tom gets up at seven o'clock. He washes his face, brushes his teeth, and gets dressed. Then he goes downstairs and makes breakfast. He usually eats toast and drinks a cup of tea. Tom works in an office. He starts work at nine o'clock and finishes at five. At lunchtime, he sometimes goes for a walk in the park. In the evenings, Tom relaxes at home. He watches television or reads a book. He never goes to bed late. He always sleeps eight hours because he thinks sleep is very important.",
    options: [
      'gets up', 'washes', 'brushes', 'makes', 'eats', 'drinks',
      'works', 'starts', 'finishes', 'watches', 'reads', 'sleeps',
      'drives', 'cooks', 'swims', 'runs',
    ],
    correctItems: [
      'gets up', 'washes', 'brushes', 'makes', 'eats', 'drinks',
      'works', 'starts', 'finishes', 'watches', 'reads', 'sleeps',
    ],
  },
  reading: {
    title: 'A Day in the Life of Sara',
    source: 'English Studio · Level A1–A2',
    passage: `Sara is a student. She studies English at a school in the city. Every day, she gets up at half past seven and has a shower. Then she eats breakfast with her family. She usually has cereal and orange juice.

Sara goes to school by bus. The journey takes about twenty minutes. She arrives at school at nine o'clock. Her lessons start at quarter past nine. Sara loves English class because her teacher explains everything very clearly.

At lunchtime, Sara and her friends eat together in the cafeteria. They talk about their favourite TV shows and music. Sara doesn't eat meat, so she always chooses a vegetarian meal.

In the afternoon, Sara has two more lessons. After school, she goes home and does her homework. She usually finishes her homework at six o'clock. Then she watches TV or chats with her friends online.

Sara goes to bed at ten o'clock every night. She thinks a good routine is very important for students.`,
    questions: [
      { id: 'r01', type: 'mc',
        q: 'What time does Sara get up every day?',
        options: ['At seven o\'clock', 'At half past seven', 'At quarter past eight', 'At eight o\'clock'],
        ans: 'At half past seven',
        explanation: 'The text says "she gets up at half past seven".' },
      { id: 'r02', type: 'mc',
        q: 'How does Sara travel to school?',
        options: ['By car', 'By bike', 'By bus', 'On foot'],
        ans: 'By bus',
        explanation: '"Sara goes to school by bus."' },
      { id: 'r03', type: 'mc',
        q: 'Why does Sara love English class?',
        options: [
          'Because it is easy',
          'Because her teacher explains everything very clearly',
          'Because she has many friends there',
          'Because the classroom is big',
        ],
        ans: 'Because her teacher explains everything very clearly',
        explanation: '"She loves English class because her teacher explains everything very clearly."' },
      { id: 'r04', type: 'mc',
        q: 'What does Sara NOT eat at lunchtime?',
        options: ['Cereal', 'Meat', 'Vegetables', 'Orange juice'],
        ans: 'Meat',
        explanation: '"Sara doesn\'t eat meat, so she always chooses a vegetarian meal."' },
      { id: 'r05', type: 'sa',
        q: 'Find TWO things Sara does after school. Write them in English.',
        ans: 'homework|watches TV|chats with friends|does her homework',
        explanation: '"She goes home and does her homework... Then she watches TV or chats with her friends online."' },
      { id: 'r06', type: 'mc',
        q: 'Which sentence is in the Present Simple?',
        options: [
          'Sara is going to school now.',
          'Sara went to school yesterday.',
          'Sara goes to school every day.',
          'Sara has been going to school.',
        ],
        ans: 'Sara goes to school every day.',
        explanation: '"Goes" is the Present Simple form for he/she/it. "Every day" is a typical Present Simple time expression.' },
    ],
  },
};