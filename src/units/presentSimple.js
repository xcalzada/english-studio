// src/data/presentSimple.js
// Present Simple — niños hispanohablantes 9-10 años (A1-A2)
// SEGUNDA TANDA DE EJERCICIOS — contextos nuevos, misma estructura pedagógica

const quiz = [

  // ── BLOQUE 1: TO BE (am / is / are) — 6 ejercicios ───────────────

  { id:'ps01', type:'choice',
    q:'🌟 My best friend ______ really funny.',
    options:['am', 'is', 'are', 'be'],
    ans:'is',
    hint:'"My best friend" = él o ella (una persona) → IS.',
    explanation:'"My best friend" = él o ella → <strong>is</strong>. Con él, ella o una cosa → siempre IS.' },

  { id:'ps02', type:'fill',
    q:'🎨 I ______ a good artist!',
    ans:'am',
    hint:'Con "I" (yo) → siempre AM.',
    explanation:'Con <strong>I</strong> (yo) → <strong>am</strong>. ¡Solo "I" usa "am"!' },

  { id:'ps03', type:'error',
    q:'🏀 My teammates is very fast.',
    ans:'My teammates are very fast.',
    hint:'"My teammates" = ellos (más de uno) → ARE.',
    explanation:'"My teammates" son varios → <strong>are</strong>. ARE es para nosotros, vosotros o ellos.' },

  { id:'ps04', type:'fill',
    q:'🌍 London and Paris ______ great cities.',
    ans:'are',
    hint:'London and Paris = ellas (más de una cosa) → ARE.',
    explanation:'"London and Paris" son dos cosas → <strong>are</strong>. Con más de uno siempre ARE.' },

  { id:'ps05', type:'choice',
    q:'🤒 ______ your mum at home today? She is ill.',
    options:['Am', 'Is', 'Are', 'Do'],
    ans:'Is',
    hint:'"Your mum" = ella (una persona) → IS al principio en preguntas.',
    explanation:'En preguntas con ella → IS salta al principio: <strong>Is</strong> your mum at home? ✅' },

  { id:'ps06', type:'error',
    q:'😎 We is the best team in the school!',
    ans:'We are the best team in the school!',
    hint:'"We" (nosotros) → ARE, no IS.',
    explanation:'"We" = nosotros → <strong>are</strong>. IS solo se usa con él, ella o una sola cosa.' },

  // ── BLOQUE 2: VERBOS NORMALES — AFIRMATIVA — 7 ejercicios ─────────

  { id:'ps07', type:'fill',
    q:'🐈 Our cat ______ all day on the sofa. (sleep)',
    ans:'sleeps',
    hint:'"Our cat" = él/ella (un animal) → añade -s.',
    explanation:'"Our cat" = él → sleep + s = <strong>sleeps</strong>. Con él/ella/una cosa → el verbo lleva -s.' },

  { id:'ps08', type:'fill',
    q:'⚽ My dad ______ football every Saturday. (watch)',
    ans:'watches',
    hint:'"watch" termina en -ch → añade -es.',
    explanation:'"watch" termina en -ch → <strong>watches</strong>. Verbos que terminan en -ch, -sh, -ss añaden -es.' },

  { id:'ps09', type:'choice',
    q:'🎤 My cousin ______ in a band. She is amazing!',
    options:['sing', 'sings', 'singes', 'singing'],
    ans:'sings',
    hint:'"My cousin" = ella → el verbo lleva -s.',
    explanation:'"My cousin" = ella → sing + s = <strong>sings</strong>. ("singes" no existe — "sing" no termina en -ge.)' },

  { id:'ps10', type:'fill',
    q:'🧁 My grandma ______ delicious cakes. (make)',
    ans:'makes',
    hint:'"My grandma" = ella → añade -s.',
    explanation:'"My grandma" = ella → make + s = <strong>makes</strong>. Con él/ella/una cosa siempre -s.' },

  { id:'ps11', type:'error',
    q:'🚴 He ride his bike to school every day.',
    ans:'He rides his bike to school every day.',
    hint:'"He" (él) → el verbo necesita -s: ride → rides.',
    explanation:'Con "he" el verbo lleva -s: ride → <strong>rides</strong>. Sin la -s es un error en Present Simple.' },

  { id:'ps12', type:'fill',
    q:'📱 My parents ______ their phones too much! (use)',
    ans:'use',
    hint:'"My parents" = ellos → el verbo no cambia.',
    explanation:'"My parents" = ellos → el verbo no cambia: <strong>use</strong>. Solo cambia con él/ella/una cosa.' },

  { id:'ps13', type:'choice',
    q:'🦜 That parrot ______ three languages!',
    options:['speak', 'speaks', 'speakes', 'speaking'],
    ans:'speaks',
    hint:'"That parrot" = él (un animal) → el verbo lleva -s.',
    explanation:'"That parrot" = él → speak + s = <strong>speaks</strong>. ("speakes" no existe — "speak" no termina en vocal.) 🦜' },

  // ── BLOQUE 3: NEGATIVAS — 6 ejercicios ───────────────────────────

  { id:'ps14', type:'fill',
    q:"☔ We ______ like rainy days. (not like)",
    ans:"don't like",
    hint:'"We" (nosotros) + no → don\'t + verbo.',
    explanation:'Con nosotros + no → <strong>don\'t</strong> + verbo: We <strong>don\'t</strong> like rainy days. ☔' },

  { id:'ps15', type:'error',
    q:"My teacher don't speak Spanish.",
    ans:"My teacher doesn't speak Spanish.",
    hint:'"My teacher" = él/ella (una persona) → doesn\'t.',
    explanation:'"My teacher" = él o ella → <strong>doesn\'t</strong>. "Don\'t" solo se usa con yo/tú/nosotros/ellos.' },

  { id:'ps16', type:'fill',
    q:"🐠 My fish ______ make any noise. (not make)",
    ans:"doesn't make",
    hint:'"My fish" = él (un animal) → doesn\'t + verbo.',
    explanation:'"My fish" = él → <strong>doesn\'t make</strong>. Con él/ella/una cosa → doesn\'t + verbo base.' },

  { id:'ps17', type:'choice',
    q:"🥕 My little sister ______ eat vegetables. She only wants chips!",
    options:["don't", "doesn't", "isn't", "not"],
    ans:"doesn't",
    hint:'"My little sister" = ella (una persona) → doesn\'t.',
    explanation:'"My little sister" = ella → <strong>doesn\'t</strong> eat. Con él/ella/una cosa → doesn\'t.' },

  { id:'ps18', type:'error',
    q:"They doesn't play video games on school days.",
    ans:"They don't play video games on school days.",
    hint:'"They" (ellos) → don\'t, no doesn\'t.',
    explanation:'"They" = ellos → <strong>don\'t</strong>. "Doesn\'t" solo es para él/ella/una sola cosa.' },

  { id:'ps19', type:'fill',
    q:"😴 I ______ go to bed late. I\'m always tired! (not go)",
    ans:"don't go",
    hint:'"I" (yo) + no → don\'t + verbo.',
    explanation:'Con "I" → <strong>don\'t go</strong>. Yo no me acuesto tarde. 😴' },

  // ── BLOQUE 4: PREGUNTAS — 6 ejercicios ───────────────────────────

  { id:'ps20', type:'choice',
    q:"🐕 ______ your dog bark a lot?",
    options:['Do', 'Does', 'Is', 'Are'],
    ans:'Does',
    hint:'"Your dog" = él (un animal) → Does al principio.',
    explanation:'"Your dog" = él → <strong>Does</strong> your dog bark a lot? Con él/ella/una cosa → Does.' },

  { id:'ps21', type:'choice',
    q:"🎬 ______ you and your friends watch films at the weekend?",
    options:['Do', 'Does', 'Is', 'Are'],
    ans:'Do',
    hint:'"You and your friends" = vosotros (más de uno) → Do.',
    explanation:'"You and your friends" = vosotros → <strong>Do</strong>. Con yo/tú/nosotros/ellos → Do.' },

  { id:'ps22', type:'error',
    q:"Do your sister study a lot?",
    ans:"Does your sister study a lot?",
    hint:'"Your sister" = ella (una persona) → Does, no Do.',
    explanation:'"Your sister" = ella → <strong>Does</strong>. "Do" solo se usa con yo/tú/nosotros/ellos.' },

  { id:'ps23', type:'choice',
    q:"🍳 What ______ your dad cook for breakfast?",
    options:['do', 'does', 'is', 'are'],
    ans:'does',
    hint:'"Your dad" = él → does en preguntas con What/Where/When.',
    explanation:'"Your dad" = él → <strong>does</strong>: What <strong>does</strong> your dad cook? Con él/ella → does.' },

  { id:'ps24', type:'fill',
    q:"🎹 ______ your teacher play the piano?",
    ans:'Does',
    hint:'"Your teacher" = él/ella (una persona) → Does.',
    explanation:'"Your teacher" = él o ella → <strong>Does</strong>. Does salta al principio en las preguntas.' },

  { id:'ps25', type:'error',
    q:"Where do she live?",
    ans:"Where does she live?",
    hint:'"She" (ella) → does, no do. Además el verbo queda en forma base.',
    explanation:'"She" = ella → <strong>does</strong>: Where <strong>does</strong> she live? Con ella siempre Does.' },

  // ── BLOQUE 5: ADVERBIOS DE FRECUENCIA — 5 ejercicios ─────────────

  { id:'ps26', type:'error',
    q:"🦷 My brother brushes never his teeth in the morning.",
    ans:"My brother never brushes his teeth in the morning.",
    hint:'"Never" va ANTES del verbo, no después.',
    explanation:'Los adverbios de frecuencia van <strong>antes</strong> del verbo: My brother <strong>never</strong> brushes. 🦷' },

  { id:'ps27', type:'choice',
    q:"🎮 He ______ plays video games. Only at the weekend — not during the week.",
    options:['always', 'never', 'sometimes', 'usually'],
    ans:'sometimes',
    hint:'"Only at the weekend, not during the week" = a veces → sometimes.',
    explanation:'"Only at the weekend" = no todos los días → <strong>sometimes</strong> (a veces). Va antes del verbo.' },

  { id:'ps28', type:'fill',
    q:"🥣 We ______ have toast for breakfast. Every single morning!",
    ans:'always',
    hint:'"Every single morning" = todos los días sin excepción → always.',
    explanation:'"Every single morning" = 100% → <strong>always</strong>. Va antes del verbo: We <strong>always</strong> have toast.' },

  { id:'ps29', type:'error',
    q:"🐶 She takes usually her dog for a walk after school.",
    ans:"She usually takes her dog for a walk after school.",
    hint:'"Usually" va ANTES del verbo principal, no después.',
    explanation:'<strong>Usually</strong> va antes del verbo: She <strong>usually</strong> takes her dog. No después. 🐕' },

  { id:'ps30', type:'choice',
    q:"😅 I ______ forget my homework. It happens every single week!",
    options:['never', 'sometimes', 'always', 'usually'],
    ans:'always',
    hint:'"Every single week" = todas las semanas sin excepción → always.',
    explanation:'"Every single week" = 100% → <strong>always</strong>: I <strong>always</strong> forget my homework. 😅' },

  // ── BLOQUE 6: HAVE / HAS — 2 ejercicios ──────────────────────────

  { id:'ps31', type:'error',
    q:"🐇 My neighbour have a pet rabbit.",
    ans:"My neighbour has a pet rabbit.",
    hint:'"My neighbour" = él/ella → have es irregular: HAS.',
    explanation:'"My neighbour" = él o ella → <strong>has</strong>. "have" es irregular: con él/ella/una cosa → has, no "haves". 🐇' },

  { id:'ps32', type:'choice',
    q:"🎒 My two brothers ______ the same schoolbag!",
    options:['has', 'have', 'haves', 'is have'],
    ans:'have',
    hint:'"My two brothers" = ellos (más de uno) → have.',
    explanation:'"My two brothers" = ellos → <strong>have</strong>. Solo con él/ella/una cosa usamos "has".' },

  // ── BLOQUE 7: PÁRRAFO FINAL — 1 ejercicio ────────────────────────

  { id:'ps33', type:'fill',
    q:"📝 Complete the paragraph about Sofia.\n\nSofia ______ (1·be) 9 years old. She ______ (2·have) a younger brother called Leo. Every morning she ______ (3·always·walk) to school with her mum. Sofia ______ (4·love) science — she ______ (5·read) science books every night. On Saturdays she ______ (6·not·watch) TV. She plays outside instead!",
    ans:"is, has, always walks, loves, reads, doesn't watch",
    hint:"(1) ella + to be · (2) ella + have → has · (3) always + verbo con -s · (4) ella + love+s · (5) ella + read+s · (6) ella + not → doesn't + verbo base",
    explanation:'(1) <strong>is</strong> — ella + to be. (2) <strong>has</strong> — have irregular con ella. (3) <strong>always walks</strong> — always antes del verbo. (4) <strong>loves</strong> — ella, love+s. (5) <strong>reads</strong> — ella, read+s. (6) <strong>doesn\'t watch</strong> — negativo con ella. 📚' },

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