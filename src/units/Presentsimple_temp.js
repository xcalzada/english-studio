// src/data/presentSimple.js
// Present Simple — niños hispanohablantes 9-10 años (A1-A2)
// Revisado: terminología profesional, visual, sin ambigüedades

const quiz = [

  // ── BLOQUE 1: VERB TO BE ──────────────────────────────────────────

  { id:'ps01', type:'choice',
    q:'🧒 I ______ 9 years old.',
    options:['am', 'is', 'are', 'be'],
    ans:'am',
    hint:'Con "I" (yo) → siempre AM.',
    explanation:'Con <strong>I</strong> (yo) usamos <strong>am</strong>. Solo "I" usa "am". 👉 I <strong>am</strong> 9 years old.' },

  { id:'ps02', type:'fill',
    q:'🐶 My dog ______ very funny.',
    ans:'is',
    hint:'My dog = él (un animal) → IS.',
    explanation:'"My dog" = él → <strong>is</strong>. Con él, ella o una cosa → siempre IS.' },

  { id:'ps03', type:'fill',
    q:'👨‍👩‍👧‍👦 My parents ______ very kind.',
    ans:'are',
    hint:'My parents = ellos (más de uno) → ARE.',
    explanation:'"My parents" son dos personas → <strong>are</strong>. Con nosotros, vosotros o ellos → siempre ARE.' },

  { id:'ps04', type:'error',
    q:'🐱 My cat are very lazy.',
    ans:'My cat is very lazy.',
    hint:'My cat = él (un animal) → IS, no ARE.',
    explanation:'"My cat" es uno solo → <strong>is</strong>. ARE es para más de una persona o cosa.' },

  { id:'ps05', type:'choice',
    q:'🏫 ______ your school big?',
    options:['Am', 'Is', 'Are', 'Do'],
    ans:'Is',
    hint:'"Your school" = una sola cosa → IS va al principio en las preguntas.',
    explanation:'"your school" es una cosa → IS. En las preguntas IS salta al principio: <strong>Is</strong> your school big? ✅' },

  { id:'ps06', type:'fill',
    q:'😢 I ______ not happy today.',
    ans:'am',
    hint:'I + negativo → I AM not.',
    explanation:'Para decir que NO con "I" → I <strong>am</strong> not happy. Forma corta: I\'m not happy. 🙁' },

  // ── BLOQUE 2: VERBOS NORMALES — AFIRMATIVA ────────────────────────

  { id:'ps07', type:'fill',
    q:'🎮 I ______ video games every day. (play)',
    ans:'play',
    hint:'Con "I" (yo) el verbo no cambia.',
    explanation:'Con <strong>I</strong> el verbo no cambia: <strong>play</strong>. "Yo juego" → "I play".' },

  { id:'ps08', type:'fill',
    q:'🐹 My hamster ______ a lot. (eat)',
    ans:'eats',
    hint:'My hamster = él (un animal) → añade -s al verbo.',
    explanation:'"My hamster" = él → eat + s = <strong>eats</strong>. Con él, ella o una cosa → el verbo lleva -s.' },

  { id:'ps09', type:'fill',
    q:'📚 She ______ every night before bed. (read)',
    ans:'reads',
    hint:'"She" (ella) → añade -s al verbo.',
    explanation:'"She" = ella → read + s = <strong>reads</strong>. Con él/ella/una cosa → siempre -s.' },

  { id:'ps10', type:'error',
    q:'🚌 He go to school by bus.',
    ans:'He goes to school by bus.',
    hint:'"He" (él) → "go" termina en -o, añade -es: GOES.',
    explanation:'"go" + él → <strong>goes</strong>. Verbos que terminan en -o añaden -es: go→goes, do→does. 🚌' },

  { id:'ps11', type:'fill',
    q:'📖 My sister ______ English at school. (study)',
    ans:'studies',
    hint:'"study" termina en consonante + y → cambia -y por -ies.',
    explanation:'"study" termina en consonante + y → <strong>studies</strong>. Igual: try→tries, carry→carries.' },

  { id:'ps12', type:'choice',
    q:'🎵 My brother ______ the guitar really well.',
    options:['play', 'plays', 'playing', 'playes'],
    ans:'plays',
    hint:'"My brother" = él → el verbo lleva -s.',
    explanation:'"My brother" = él → play + s = <strong>plays</strong>. "play" termina en vocal + y → solo -s, no -ies. ("playes" no existe.)' },

  { id:'ps13', type:'fill',
    q:'🏃 We ______ in the park after school. (run)',
    ans:'run',
    hint:'"We" (nosotros) → el verbo no cambia.',
    explanation:'Con <strong>we</strong> (nosotros) el verbo no cambia: <strong>run</strong>. Solo añadimos -s con él/ella/una cosa.' },

  // ── BLOQUE 3: NEGATIVAS ───────────────────────────────────────────

  { id:'ps14', type:'fill',
    q:"🥦 I ______ like broccoli! (not like)",
    ans:"don't like",
    hint:"I (yo) + no → don't + verbo.",
    explanation:"Con yo/tú/nosotros/ellos + no → <strong>don't</strong> + verbo: I <strong>don't</strong> like broccoli. 🤢" },

  { id:'ps15', type:'fill',
    q:"🐕 My dog ______ like cats. (not like)",
    ans:"doesn't like",
    hint:"My dog = él → doesn't + verbo (sin -s).",
    explanation:"Con él/ella/una cosa + no → <strong>doesn't</strong> + verbo: doesn't <strong>like</strong> (no \"likes\"). La -s está en \"doesn't\"." },

  { id:'ps16', type:'error',
    q:"She doesn't likes pizza.",
    ans:"She doesn't like pizza.",
    hint:"Después de doesn't → el verbo va sin -s.",
    explanation:"Después de <strong>doesn't</strong> el verbo es siempre la forma base, sin -s: doesn't <strong>like</strong>. La -s ya está en \"does\"." },

  { id:'ps17', type:'choice',
    q:"🎨 My friends ______ like drawing. They prefer football!",
    options:["don't", "doesn't", "not", "isn't"],
    ans:"don't",
    hint:'"My friends" = ellos (más de uno) → don\'t.',
    explanation:'"My friends" = ellos → <strong>don\'t</strong>. "Doesn\'t" solo se usa con él/ella/una cosa.' },

  { id:'ps18', type:'fill',
    q:"🌙 He ______ sleep early on weekends. (not sleep)",
    ans:"doesn't sleep",
    hint:'"He" (él) → doesn\'t + verbo.',
    explanation:'"He" = él → <strong>doesn\'t sleep</strong>. Con él/ella/una cosa → "doesn\'t", y el verbo queda sin -s.' },

  { id:'ps19', type:'error',
    q:"They don't plays football on Mondays.",
    ans:"They don't play football on Mondays.",
    hint:"Después de don't → el verbo va sin -s.",
    explanation:"Después de <strong>don't</strong> el verbo es la forma base, sin -s: don't <strong>play</strong>. ⚽" },

  // ── BLOQUE 4: PREGUNTAS ───────────────────────────────────────────

  { id:'ps20', type:'choice',
    q:"🍕 ______ you like pizza?",
    options:['Do', 'Does', 'Is', 'Are'],
    ans:'Do',
    hint:'"You" (tú) → Do al principio.',
    explanation:"Con tú/yo/nosotros/ellos → <strong>Do</strong> al principio: <strong>Do</strong> you like pizza? 🍕" },

  { id:'ps21', type:'choice',
    q:"🐈 ______ your cat sleep a lot?",
    options:['Do', 'Does', 'Is', 'Are'],
    ans:'Does',
    hint:'"Your cat" = él (un animal) → Does al principio.',
    explanation:"Con él/ella/una cosa → <strong>Does</strong> al principio: <strong>Does</strong> your cat sleep a lot? 😴" },

  { id:'ps22', type:'error',
    q:"Does she likes chocolate?",
    ans:"Does she like chocolate?",
    hint:"Después de Does → el verbo va sin -s.",
    explanation:"Después de <strong>Does</strong> el verbo es la forma base, sin -s: Does she <strong>like</strong>? (no \"likes\"). 🍫" },

  { id:'ps23', type:'choice',
    q:"🎒 Where ______ you go to school?",
    options:['do', 'does', 'is', 'are'],
    ans:'do',
    hint:'"You" (tú) → do en las preguntas con Where/What/When.',
    explanation:"Where/What/When + tú → <strong>do</strong>: Where <strong>do</strong> you go to school?" },

  { id:'ps24', type:'choice',
    q:"🏊 ______ your brother swim well?",
    options:['Do', 'Does', 'Is', 'Are'],
    ans:'Does',
    hint:'"Your brother" = él → Does.',
    explanation:'"Your brother" = él → <strong>Does</strong> your brother swim well? ✅' },

  { id:'ps25', type:'choice',
    q:"🎂 ______ your parents work at the weekend?",
    options:['Do', 'Does', 'Is', 'Are'],
    ans:'Do',
    hint:'"Your parents" = ellos (más de uno) → Do.',
    explanation:'"Your parents" = ellos → <strong>Do</strong> your parents work at the weekend? 🎉' },

  // ── BLOQUE 5: FRECUENCIA ──────────────────────────────────────────

  { id:'ps26', type:'choice',
    q:"⏰ She ______ gets up at 7 o'clock. She does it every single day, no exceptions!",
    options:['always', 'never', 'sometimes', 'usually'],
    ans:'always',
    hint:'"Every single day, no exceptions" = 100% → always (siempre).',
    explanation:'"Every single day" = todos los días sin excepción → <strong>always</strong> (siempre, 100%). Va antes del verbo: She <strong>always</strong> gets up at 7. ⏰' },

  { id:'ps27', type:'error',
    q:"🐶 I walk always my dog after school.",
    ans:"I always walk my dog after school.",
    hint:'"Always" va ANTES del verbo, no después.',
    explanation:'Los adverbios de frecuencia van <strong>antes</strong> del verbo: I <strong>always</strong> walk my dog. 🐕' },

  { id:'ps28', type:'choice',
    q:"🍦 I ______ eat ice cream. It's my favourite! (100% of the time)",
    options:['never', 'sometimes', 'always', 'usually'],
    ans:'always',
    hint:'"100% of the time" = siempre → always.',
    explanation:'"<strong>Always</strong>" = siempre (100%). "Never" = nunca (0%). "Sometimes" = a veces. "Usually" = normalmente. 🍦' },

  { id:'ps29', type:'choice',
    q:"🌙 My little brother ______ cries at night. He always sleeps really well! (0% of the time)",
    options:['always', 'usually', 'sometimes', 'never'],
    ans:'never',
    hint:'"0% of the time" = nunca → never.',
    explanation:'"<strong>Never</strong>" = nunca (0%). Va antes del verbo: My brother <strong>never</strong> cries at night. 😴' },

  { id:'ps30', type:'error',
    q:"🌧️ It rain a lot in England.",
    ans:"It rains a lot in England.",
    hint:'"It" = una cosa (el tiempo, el clima) → el verbo lleva -s.',
    explanation:'Usamos "it" para hablar del tiempo. "It" = una cosa → el verbo lleva -s: It <strong>rains</strong>. 🌧️' },

  // ── BLOQUE 6: HAVE / HAS ─────────────────────────────────────────

  { id:'ps31', type:'choice',
    q:"🐾 My cat ______ three kittens!",
    options:['have', 'has', 'haves', 'is have'],
    ans:'has',
    hint:'"My cat" = él/ella → "have" es irregular: con él/ella/una cosa → HAS.',
    explanation:'"have" (tener) es irregular con él/ella/una cosa: NO decimos "haves" → decimos <strong>has</strong>: My cat <strong>has</strong> three kittens. 🐾' },

  { id:'ps32', type:'fill',
    q:"🎒 I ______ a new schoolbag. (have)",
    ans:'have',
    hint:'Con "I" (yo) → have. Solo con él/ella/una cosa cambia a "has".',
    explanation:'Con <strong>I</strong> → <strong>have</strong>: I <strong>have</strong> a new schoolbag. Solo con él/ella/una cosa usamos "has".' },

  // ── BLOQUE 7: PÁRRAFO FINAL ───────────────────────────────────────

  { id:'ps33', type:'fill',
    q:"📝 Complete the paragraph about Tom.\n\nTom ______ (1·be) 10 years old. He ______ (2·live) in Madrid with his family. He ______ (3·have) a dog called Rex. Every morning Tom ______ (4·always·walk) Rex before school. Tom ______ (5·not·like) getting up early, but Rex ______ (6·love) it!",
    ans:"is, lives, has, always walks, doesn't like, loves",
    hint:"(1) él + to be · (2) él + live+s · (3) él + have → has · (4) always + verbo con -s · (5) él + not → doesn't + verbo base · (6) él + love+s",
    explanation:'(1) <strong>is</strong> — él + to be. (2) <strong>lives</strong> — él, live+s. (3) <strong>has</strong> — have es irregular con él. (4) <strong>always walks</strong> — always antes del verbo. (5) <strong>doesn\'t like</strong> — negativo con él. (6) <strong>loves</strong> — él, love+s. 🐕' },

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
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">atributo / lugar</span>'
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
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">atributo / lugar</span>'
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
            + '<span style="background:#0284c7;color:#fff;padding:4px 12px;border-radius:8px;font-weight:900;font-size:13px">atributo / lugar</span>'
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
            ['-o',                        'añade -es',  'go → <strong>goes</strong> &nbsp;·&nbsp; do → <strong>does</strong>'],
            ['-ch / -sh / -ss / -x',      'añade -es',  'watch → <strong>watches</strong> &nbsp;·&nbsp; wash → <strong>washes</strong>'],
            ['consonante + y',            'cambia a -ies', 'study → <strong>studies</strong> &nbsp;·&nbsp; try → <strong>tries</strong>'],
            ['vocal + y',                 'añade -s',   'play → <strong>plays</strong> &nbsp;·&nbsp; say → <strong>says</strong>'],
            ['cualquier otra terminación','añade -s',   'eat → <strong>eats</strong> &nbsp;·&nbsp; read → <strong>reads</strong>'],
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

        { type:'subtitle', text:'📐 Fórmula — posición del adverbio (verbos normales)' },
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

        { type:'subtitle', text:'⚠️ Verbos Auxiliares "to be", "can", "could", "will", "would"' },

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

  listening: null,
  reading:   null,
};