// src/units/comparatives.js — Units 87 · 88 · 90 (English Grammar in Use)

const quiz = [

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE A · NIVEL FÁCIL — Formación básica (Units 87 + 90 mezcladas)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87] Forming comparative — 1 syllable
  { id:'q01', type:'fill',
    q:'Rome is old, but Athens is ______.',
    ans:'older',
    explanation:'Unit 87 · 1-syllable adjective: old → older. Never "more old".' },

  // [U90] Superlative — 1 syllable
  { id:'q02', type:'fill',
    q:"The church is very old. It's the ______ building in the town.",
    ans:'oldest',
    explanation:'Unit 90 · Superlative of short adjectives: old → the oldest. Always use THE.' },

  // [U88] Using than — basic
  { id:'q03', type:'fill',
    q:'Athens is older ______ Rome.',
    ans:'than',
    explanation:'Unit 88 · Always use "than" after a comparative adjective.' },

  // [U87] Comparative — CVC doubling
  { id:'q04', type:'fill',
    q:"Helen's car isn't very big. She wants a ______ one.",
    ans:'bigger',
    explanation:'Unit 87 · CVC rule: big → bigger (double the g). Never "more big".' },

  // [U90] Superlative — -y ending
  { id:'q05', type:'fill',
    q:'It was the ______ day of my life.',
    ans:'happiest',
    explanation:'Unit 90 · happy → the happiest. Change -y to -iest.' },

  // [U87] Comparative — irregular
  { id:'q06', type:'fill',
    q:"The weather wasn't very good yesterday, but it's ______ today.",
    ans:'better',
    explanation:'Unit 87 · Irregular: good → better. Never "more good".' },

  // [U90] Superlative — irregular
  { id:'q07', type:'fill',
    q:"Luke is a good player, but he isn't ______ in the team.",
    ans:'the best',
    explanation:'Unit 90 · Irregular superlative: good → the best.' },

  // [U88] Using than — irregular
  { id:'q08', type:'fill',
    q:"'Do you feel better today?' 'No, I feel ______ than yesterday.'",
    ans:'worse',
    explanation:'Unit 88 · Irregular: bad → worse. "worse than" to compare.' },

  // [U87] Comparative — -y ending
  { id:'q09', type:'fill',
    q:"Don't take the bus. It's ______ to take a taxi.",
    ans:'easier',
    explanation:'Unit 87 · easy → easier. Change -y to -ier. Never "more easy".' },

  // [U90] Superlative — long adjective
  { id:'q10', type:'fill',
    q:"Money is important, but it isn't the most ______ thing in life.",
    ans:'important',
    explanation:'Unit 90 · Long adjective (4 syllables) → the most + adjective.' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE B · NIVEL FÁCIL-MEDIO — Choice (Units 87 + 88 + 90 mezcladas)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87] Choice — long adjective
  { id:'q11', type:'choice',
    q:'What is the comparative of <strong>expensive</strong>?',
    options:['expensiver','more expensive','most expensive','expensiveer'],
    ans:'more expensive',
    explanation:'Unit 87 · Long words (3+ syllables) → more + adjective. Never add -er.' },

  // [U90] Choice — superlative of bad
  { id:'q12', type:'choice',
    q:'What is the superlative of <strong>bad</strong>?',
    options:['the baddest','the most bad','the worst','the worser'],
    ans:'the worst',
    explanation:'Unit 90 · Irregular: bad → worse → the worst.' },

  // [U88] Choice — than vs other words
  { id:'q13', type:'choice',
    q:'I can run faster ______ him.',
    options:['that','then','than','as'],
    ans:'than',
    explanation:'Unit 88 · Use "than" (not "that" or "then") after comparatives.' },

  // [U87] Choice — -y adjective
  { id:'q14', type:'choice',
    q:'What is the comparative of <strong>happy</strong>?',
    options:['more happy','happyer','happier','hapier'],
    ans:'happier',
    explanation:'Unit 87 · Words ending in -y → change y to i, then add -er.' },

  // [U90] Choice — superlative of good
  { id:'q15', type:'choice',
    q:'What is the superlative of <strong>good</strong>?',
    options:['the goodest','the most good','the better','the best'],
    ans:'the best',
    explanation:'Unit 90 · Irregular: good → better → the best.' },

  // [U88] Choice — degree: a bit vs much
  { id:'q16', type:'choice',
    q:'Small difference: Box A is ______ bigger than Box B.',
    options:['much','very','a bit','most'],
    ans:'a bit',
    explanation:'Unit 88 · "a bit" = small difference. "much" = big difference. Never "very" before a comparative.' },

  // [U87] Choice — CVC spelling
  { id:'q17', type:'choice',
    q:'What is the comparative of <strong>big</strong>?',
    options:['biger','more big','bigger','bigest'],
    ans:'bigger',
    explanation:'Unit 87 · CVC spelling: double the final consonant → bigger.' },

  // [U90] Choice — superlative of easy
  { id:'q18', type:'choice',
    q:'What is the superlative of <strong>easy</strong>?',
    options:['the most easy','the easiest','the easyest','the easier'],
    ans:'the easiest',
    explanation:'Unit 90 · Words ending in -y → change y to i, then add -est.' },

  // [U88] Choice — degree: much vs a bit
  { id:'q19', type:'choice',
    q:'Big difference: Canada is ______ bigger than France.',
    options:['a bit','a little','much','very'],
    ans:'much',
    explanation:'Unit 88 · "much bigger" = big difference. "a bit bigger" = small difference.' },

  // [U87] Choice — irregular far
  { id:'q20', type:'choice',
    q:'What is the comparative of <strong>far</strong>?',
    options:['farer','more far','most far','further'],
    ans:'further',
    explanation:'Unit 87 · Irregular: far → further (or farther).' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE C · NIVEL MEDIO — Fill mezclado (Units 87 + 88 + 90)
  // ══════════════════════════════════════════════════════════════════════════

  // [U88] Fill — than with numbers
  { id:'q21', type:'fill',
    q:'The film was very short — less ______ an hour.',
    ans:'than',
    explanation:'Unit 88 · "less than" = below an amount. Opposite of "more than".' },

  // [U87] Fill — long adjective
  { id:'q22', type:'fill',
    q:'You must be ______ careful.',
    ans:'more',
    explanation:'Unit 87 · "careful" has 2+ syllables → use more: more careful.' },

  // [U90] Fill — superlative + THE
  { id:'q23', type:'fill',
    q:'What is the ______ river in the world?',
    ans:'longest',
    explanation:'Unit 90 · Superlative: long → the longest. THE is obligatory.' },

  // [U88] Fill — than with real people
  { id:'q24', type:'fill',
    q:'Kate is 26, Ben is 24. Kate is ______ than Ben.',
    ans:'older',
    explanation:'Unit 88 · old → older than. The comparative compares two specific people.' },

  // [U90] Fill — the + superlative before noun
  { id:'q25', type:'fill',
    q:'The Europa Hotel is ______ most expensive hotel in the city.',
    ans:'the',
    explanation:'Unit 90 · Always use THE before superlatives: the most expensive.' },

  // [U88] Fill — good swimmer comparison
  { id:'q26', type:'fill',
    q:"Ben is a very good swimmer. Kate isn't. Ben is a ______ swimmer than Kate.",
    ans:'better',
    explanation:'Unit 88 · Irregular: good → better. Better + than.' },

  // [U90] Fill — superlative + ever
  { id:'q27', type:'fill',
    q:"It's the ______ film I've ever seen.",
    ans:'worst',
    explanation:"Unit 90 · Irregular superlative: bad → the worst. Pattern: the worst + ever." },

  // [U87] Fill — nice → nicer
  { id:'q28', type:'fill',
    q:'This coat is OK, but the other one is ______.',
    ans:'nicer',
    explanation:'Unit 87 · nice → nicer (drop -e, add -er). 1-syllable adjective.' },

  // [U90] Fill — Brazil largest
  { id:'q29', type:'fill',
    q:'Brazil is ______ largest country in South America.',
    ans:'the',
    explanation:'Unit 90 · Always use "the" with superlatives: the largest.' },

  // [U88] Fill — taller comparison
  { id:'q30', type:'fill',
    q:'Kate is 1m68. Ben is 1m63. Kate is ______ than Ben.',
    ans:'taller',
    explanation:'Unit 88 · tall → taller than. Basic comparative structure.' },

  // [U88] Fill — more expensive comparison
  { id:'q31', type:'fill',
    q:'The Europa Hotel costs £150. The Grand costs £130. The Europa is ______ expensive than the Grand.',
    ans:'more',
    explanation:'Unit 88 · "expensive" (long word) → more expensive than.' },

  // [U87] Fill — heavy → heavier
  { id:'q32', type:'fill',
    q:"My bag isn't very heavy. Your bag is ______.",
    ans:'heavier',
    explanation:'Unit 87 · Words ending in -y: heavy → heavier. Change y → i, add -er.' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE D · MATCHPAIRS (Units 87 + 90)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87+88] Match — comparative forms
  { id:'q33', type:'matchpairs',
    q:'Match each adjective with its <strong>comparative</strong> form.',
    leftLabel:'Adjective', rightLabel:'Comparative',
    pairs:[
      { left:'old',         right:'older' },
      { left:'good',        right:'better' },
      { left:'bad',         right:'worse' },
      { left:'happy',       right:'happier' },
      { left:'expensive',   right:'more expensive' },
    ] },

  // [U90] Match — superlative forms
  { id:'q34', type:'matchpairs',
    q:'Match each adjective with its <strong>superlative</strong> form.',
    leftLabel:'Adjective', rightLabel:'Superlative',
    pairs:[
      { left:'old',         right:'the oldest' },
      { left:'good',        right:'the best' },
      { left:'bad',         right:'the worst' },
      { left:'happy',       right:'the happiest' },
      { left:'interesting', right:'the most interesting' },
    ] },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE E · NIVEL MEDIO-ALTO — Error correction (Units 87 + 88 + 90)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87] Error — more old
  { id:'q35', type:'error',
    q:'Rome is more old than Athens.',
    ans:'Rome is older than Athens.',
    explanation:'Unit 87 · Short adjectives use -er: old → older. "More old" is always wrong.' },

  // [U90] Error — most tall
  { id:'q36', type:'error',
    q:'She is the most tall student in the class.',
    ans:'She is the tallest student in the class.',
    explanation:'Unit 90 · Short adjectives use -est for superlative: tall → the tallest.' },

  // [U90] Error — the more expensive (superlative)
  { id:'q37', type:'error',
    q:"It's the more expensive restaurant in the city.",
    ans:"It's the most expensive restaurant in the city.",
    explanation:'Unit 90 · Superlative of long adjectives → the most + adjective. Never "the more".' },

  // [U88] Error — that instead of than
  { id:'q38', type:'error',
    q:'London is more beautiful that Paris.',
    ans:'London is more beautiful than Paris.',
    explanation:'Unit 88 · After comparatives, use "than" (not "that"). Very common mistake.' },

  // [U87+88] Error — more + -er double comparative
  { id:'q39', type:'error',
    q:'She is a bit more taller than me.',
    ans:'She is a bit taller than me.',
    explanation:'Unit 87 · Never add "more" before -er forms. "Taller" is already comparative.' },

  // [U87] Error — more strong
  { id:'q40', type:'error',
    q:'Jack is more strong than his brother.',
    ans:'Jack is stronger than his brother.',
    explanation:'Unit 87 · Short adjective: strong → stronger. NOT "more strong".' },

  // [U90] Error — most + -est double superlative
  { id:'q41', type:'error',
    q:'What is the most longest river in the world?',
    ans:'What is the longest river in the world?',
    explanation:'Unit 90 · Never add "most" before -est forms. "Longest" is already superlative.' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE F · NIVEL ALTO — Word order (Units 87 + 88 + 90)
  // ══════════════════════════════════════════════════════════════════════════

  // [U90] Order — superlative in sentence
  { id:'q42', type:'order',
    words:['The','church','is','the','oldest','building','in','the','town','.'],
    ans:'The church is the oldest building in the town.',
    explanation:'Unit 90 · Structure: the + superlative + noun + in + place.' },

  // [U88] Order — much + comparative + than
  { id:'q43', type:'order',
    words:['His','father','is','much','older','than','his','mother','.'],
    ans:'His father is much older than his mother.',
    explanation:'Unit 88 · "much older than" — much goes before the comparative, not after.' },

  // [U88] Order — faster + than + object pronoun
  { id:'q44', type:'order',
    words:['I','can','run','faster','than','him','.'],
    ans:'I can run faster than him.',
    explanation:'Unit 88 · After "than" use object pronouns: him, her, them, me.' },

  // [U90] Order — the most expensive (no noun)
  { id:'q45', type:'order',
    words:['The','Europa','Hotel','is','the','most','expensive','in','the','city','.'],
    ans:'The Europa Hotel is the most expensive in the city.',
    explanation:'Unit 90 · Superlative without noun: "the most expensive" = the most expensive hotel.' },

  // [U88] Order — a bit + comparative + than
  { id:'q46', type:'order',
    words:['Emma','is','a','bit','older','than','Joe','.'],
    ans:'Emma is a bit older than Joe.',
    explanation:'Unit 88 · "a bit older than" = slightly older than. Order: a bit + comparative + than.' },

  // [U87] Order — more interesting
  { id:'q47', type:'order',
    words:["I","don't","like","my","job",".","I","want","something","more","interesting","."],
    ans:"I don't like my job. I want something more interesting.",
    explanation:'Unit 87 · Long adjective (4 syllables) → more interesting. The adjective does not change.' },

  // [U90] Order — the best + ever
  { id:'q48', type:'order',
    words:['It','was','the','best','meal','I','have','ever','had','.'],
    ans:'It was the best meal I have ever had.',
    explanation:'Unit 90 · Pattern: the best + noun + I have ever + past participle.' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE G · NIVEL ALTO — Translation (Units 87 + 88 + 90)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87+88] Translate — comparative + than
  { id:'q49', type:'translate',
    q:'Atenas es más antigua que Roma.',
    ans:'Athens is older than Rome.|Athens is older than Rome',
    hint:'antiguo → old → older · que → than',
    explanation:'Unit 87+88 · Short adjective: old → older. Always "than" after the comparative.' },

  // [U90] Translate — superlative + ever
  { id:'q50', type:'translate',
    q:'Es la peor película que he visto nunca.',
    ans:"It's the worst film I've ever seen.|It is the worst film I have ever seen.",
    hint:"la peor → the worst · nunca → ever",
    explanation:"Unit 90 · Irregular: bad → the worst. Pattern: the worst + noun + I've ever seen." },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE D — NIVEL FÁCIL-MEDIO: Fill (q51–q67)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87] CVC doubling
  { id:'q51', type:'fill',
    q:'The summer was hot, but August was even ______.',
    ans:'hotter',
    explanation:'Unit 87 · CVC rule: hot → hotter (double final consonant). Never "more hot".' },

  // [U90] Superlative -y ending
  { id:'q52', type:'fill',
    q:"That was ______ funniest joke I've heard all year.",
    ans:'the',
    explanation:'Unit 90 · Superlatives always need THE: the funniest.' },

  // [U88] Much / a bit before comparative
  { id:'q53', type:'fill',
    q:'This backpack is only slightly heavier. It is just ______ a bit heavier than yours.',
    ans:'a bit',
    explanation:'Unit 88 · "just a bit heavier" = small difference.' },

  // [U87] Irregular: good → better
  { id:'q54', type:'fill',
    q:'I practised a lot and now I play the guitar ______ than before.',
    ans:'better',
    explanation:'Unit 87 · Irregular: good → better. "More good" is always wrong.' },

  // [U90] Superlative long adjective
  { id:'q55', type:'fill',
    q:"It was ______ most boring film I've ever watched.",
    ans:'the',
    explanation:'Unit 90 · Long adjectives → the most + adjective. THE is compulsory.' },

  // [U88] Than with number
  { id:'q56', type:'fill',
    q:'The queue was very long — more ______ 200 people.',
    ans:'than',
    explanation:'Unit 88 · "more than" + number. Opposite: "less than".' },

  // [U87] -y → -ier
  { id:'q57', type:'fill',
    q:"It's getting foggier every day. I think winter is coming. (foggy → ______)",
    ans:'foggier',
    explanation:'Unit 87 · foggy → foggier. Change -y to -ier.' },

  // [U90] Superlative irregular: far → furthest
  { id:'q58', type:'fill',
    q:'Which planet is ______ furthest from the Sun?',
    ans:'the',
    explanation:'Unit 90 · Irregular superlative: far → the furthest. THE required.' },

  // [U88] Than after comparative adjective
  { id:'q59', type:'fill',
    q:'My suitcase is much heavier ______ the weight limit.',
    ans:'than',
    explanation:'Unit 88 · Always use "than" (not "that" or "of") after a comparative.' },

  // [U87] Long adjective: more + adjective
  { id:'q60', type:'fill',
    q:'Please be ______ careful with that glass — it might break.',
    ans:'more',
    explanation:'Unit 87 · "careful" has 2 syllables → more careful. Never "carefullier".' },

  // [U90] Superlative in context
  { id:'q61', type:'fill',
    q:'Russia is ______ largest country in the world.',
    ans:'the',
    explanation:'Unit 90 · Superlative always needs THE: the largest.' },

  // [U88] Much — degree
  { id:'q62', type:'fill',
    q:'Tokyo is ______ more expensive than any other city I have visited.',
    ans:'much',
    explanation:'Unit 88 · "much more expensive" = big difference. "a bit more expensive" = small difference.' },

  // [U90] Superlative irregular: good → best
  { id:'q63', type:'fill',
    q:"She's a good teacher. She's probably the ______ in the school.",
    ans:'best',
    explanation:'Unit 90 · Irregular superlative: good → the best. Used without repeating the noun.' },

  // [U87] Comparative adverb
  { id:'q64', type:'fill',
    q:'Can you speak ______ slowly, please? I can barely understand you.',
    ans:'more',
    explanation:'Unit 87 · Adverbs of 2+ syllables → more + adverb: more slowly.' },

  // [U88] Even before comparative
  { id:'q65', type:'fill',
    q:"Yesterday was cold, but today is ______ colder.",
    ans:'even',
    explanation:'Unit 88 · "even" before a comparative emphasises a bigger difference: even colder.' },

  // [U90] Superlative + ever
  { id:'q66', type:'fill',
    q:"That's ______ most delicious pizza I've ever eaten.",
    ans:'the',
    explanation:"Unit 90 · Superlative + ever pattern: the most delicious ... I've ever eaten." },

  // [U88] Less than
  { id:'q67', type:'fill',
    q:'The journey took ______ than expected — only 40 minutes.',
    ans:'less',
    explanation:'Unit 88 · "less than" = below an amount or expectation.' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE E — NIVEL MEDIO: Choice (q68–q83)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87] Choice — 2 syllable adjective
  { id:'q68', type:'choice',
    q:'What is the comparative of <strong>tired</strong>?',
    options:['tireder','more tired','most tired','tiredder'],
    ans:'more tired',
    explanation:'Unit 87 · "tired" has 2 syllables → more tired. Never "tireder".' },

  // [U88] Choice — degree adverb
  { id:'q69', type:'choice',
    q:'The difference in price is very large. Which sentence is correct?',
    options:['This car is a bit more expensive.','This car is very more expensive.','This car is much more expensive.','This car is more very expensive.'],
    ans:'This car is much more expensive.',
    explanation:'Unit 88 · Big difference → "much" before a comparative. Never "very more".' },

  // [U90] Choice — superlative vs comparative
  { id:'q70', type:'choice',
    q:'There are five students in the group. Maria is ______.',
    options:['the most tall','the tallest','taller','more tall'],
    ans:'the tallest',
    explanation:'Unit 90 · Comparing one against a group → superlative: the tallest. THE is required.' },

  // [U87] Choice — irregular bad → worse
  { id:'q71', type:'choice',
    q:'My headache is getting ______. I need to lie down.',
    options:['more bad','badder','worst','worse'],
    ans:'worse',
    explanation:'Unit 87 · Irregular: bad → worse. Never "more bad" or "badder".' },

  // [U88] Choice — than vs then
  { id:'q72', type:'choice',
    q:'A blue whale is much larger ______ any land animal.',
    options:['then','that','as','than'],
    ans:'than',
    explanation:'Unit 88 · "than" (not "then") connects a comparative to what is being compared.' },

  // [U90] Choice — THE with superlative
  { id:'q73', type:'choice',
    q:'Which sentence is correct?',
    options:["It's most beautiful city I've visited.","It's a most beautiful city I've visited.","It's the most beautiful city I've visited.","It's more beautiful city I've visited."],
    ans:"It's the most beautiful city I've visited.",
    explanation:'Unit 90 · Superlatives always use THE: the most beautiful.' },

  // [U87] Choice — CVC adjective spelling
  { id:'q74', type:'choice',
    q:'What is the comparative of <strong>slim</strong>?',
    options:['slimer','more slim','slimmer','slimest'],
    ans:'slimmer',
    explanation:'Unit 87 · CVC: consonant–vowel–consonant → double the last consonant: slim → slimmer.' },

  // [U88] Choice — much vs a bit
  { id:'q75', type:'choice',
    q:'Which phrase correctly shows a <em>big</em> difference?',
    options:['a bit faster','just a little faster','a touch faster','much faster'],
    ans:'much faster',
    explanation:'Unit 88 · "much" before a comparative shows a big difference. The others show small differences.' },

  // [U90] Choice — superlative + in/of
  { id:'q76', type:'choice',
    q:'She is the best student ______ the class.',
    options:['of','from','than','at'],
    ans:'of',
    explanation:'Unit 90 · After superlatives use "in" for places or "of" for groups. Both work here; most natural is "in the class".' },

  // [U87] Choice — -y adverb comparative
  { id:'q77', type:'choice',
    q:'She arrived ______ than expected.',
    options:['more early','most early','earlier','the earliest'],
    ans:'earlier',
    explanation:'Unit 87 · "early" ends in -y → comparative: earlier.' },

  // [U90] Choice — superlative of dangerous
  { id:'q78', type:'choice',
    q:'What is the superlative of <strong>dangerous</strong>?',
    options:['the dangerousest','the most dangerous','the most danger','dangerouser'],
    ans:'the most dangerous',
    explanation:'Unit 90 · Long adjectives (3+ syllables) → the most + adjective.' },

  // [U88] Choice — even
  { id:'q79', type:'choice',
    q:'I thought the exam was hard, but the second paper was ______ harder.',
    options:['very','more','even','so'],
    ans:'even',
    explanation:'Unit 88 · "even" before a comparative = more than expected: even harder.' },

  // [U87] Choice — two-syllable adjective ending -le
  { id:'q80', type:'choice',
    q:'What is the comparative of <strong>simple</strong>?',
    options:['more simpler','simpleer','simpler','more simple'],
    ans:'simpler',
    explanation:'Unit 87 · "simple" ends in -le → simpler.' },

  // [U90] Choice — superlative without noun
  { id:'q81', type:'choice',
    q:'Of all the runners in the race, Tom was ______.',
    options:['the fastest one','the most fast','the fastest','faster'],
    ans:'the fastest',
    explanation:'Unit 90 · Superlative without repeating the noun: the fastest (= the fastest runner).' },

  // [U88] Choice — comparative adverb
  { id:'q82', type:'choice',
    q:'He works ______ than anyone else in the office.',
    options:['more hard','harder','hardest','the hardest'],
    ans:'harder',
    explanation:'Unit 88 · "hard" as adverb → comparative: harder than.' },

  // [U90] Choice — superlative of interesting
  { id:'q83', type:'choice',
    q:'Which is correct?',
    options:['History is the more interesting subject.','History is the most interestingest subject.','History is the most interesting subject.','History is the interestingest subject.'],
    ans:'History is the most interesting subject.',
    explanation:'Unit 90 · "interesting" (4 syllables) → the most interesting. Never add -est.' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE F — NIVEL MEDIO: Error (q84–q93)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87] Error — "more" with short adjective
  { id:'q84', type:'error',
    q:'My apartment is more small than yours.',
    ans:'My apartment is smaller than yours.',
    explanation:'Unit 87 · 1-syllable adjective → add -er: smaller. Never "more small".' },

  // [U90] Error — missing THE
  { id:'q85', type:'error',
    q:'The Pacific Ocean is largest ocean in the world.',
    ans:'The Pacific Ocean is the largest ocean in the world.',
    explanation:'Unit 90 · Superlatives always need THE: the largest.' },

  // [U88] Error — "then" instead of "than"
  { id:'q86', type:'error',
    q:'My brother is taller then me.',
    ans:'My brother is taller than me.',
    explanation:'Unit 88 · Use "than" (comparison), not "then" (time sequence).' },

  // [U87] Error — "more better"
  { id:'q87', type:'error',
    q:'The new phone is more better than the old one.',
    ans:'The new phone is better than the old one.',
    explanation:'Unit 87 · Irregular: good → better. Never "more better" — double comparison is wrong.' },

  // [U90] Error — "most" without "the"
  { id:'q88', type:'error',
    q:'That is most interesting book I have read.',
    ans:'That is the most interesting book I have read.',
    explanation:'Unit 90 · Superlatives always need THE: the most interesting.' },

  // [U88] Error — "very" before comparative
  { id:'q89', type:'error',
    q:'This sofa is very more comfortable than that one.',
    ans:'This sofa is much more comfortable than that one.',
    explanation:'Unit 88 · Never use "very" before a comparative. Use "much": much more comfortable.' },

  // [U87] Error — -er on long adjective
  { id:'q90', type:'error',
    q:'The new hospital is modernler than the old one.',
    ans:'The new hospital is more modern than the old one.',
    explanation:'Unit 87 · 2-syllable adjectives → more + adjective: more modern. Never "modernler".' },

  // [U90] Error — CVC superlative spelling
  { id:'q91', type:'error',
    q:'That was the bigest pizza I have ever eaten.',
    ans:'That was the biggest pizza I have ever eaten.',
    explanation:'Unit 90 · CVC rule: big → biggest (double the g). Same rule applies to superlatives.' },

  // [U88] Error — missing "than"
  { id:'q92', type:'error',
    q:'She is more experienced all the other candidates.',
    ans:'She is more experienced than all the other candidates.',
    explanation:'Unit 88 · Always use "than" after a comparative to introduce the second item.' },

  // [U87] Error — wrong irregular comparative
  { id:'q93', type:'error',
    q:'The traffic today is more bad than yesterday.',
    ans:'The traffic today is worse than yesterday.',
    explanation:'Unit 87 · Irregular: bad → worse. Never "more bad".' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE G — NIVEL MEDIO-ALTO: Order (q94–q100)
  // ══════════════════════════════════════════════════════════════════════════

  // [U88] Order — comparative + than + pronoun
  { id:'q94', type:'order',
    words:['My','sister','is','three','years','older','than','me','.'],
    ans:'My sister is three years older than me.',
    explanation:'Unit 88 · A number before the comparative shows the exact difference: three years older.' },

  // [U90] Order — superlative structure
  { id:'q95', type:'order',
    words:['The','Sahara','is','the','hottest','desert','in','the','world','.'],
    ans:'The Sahara is the hottest desert in the world.',
    explanation:'Unit 90 · Superlative: the + -est + noun + in + place. THE is obligatory.' },

  // [U87] Order — comparative + more
  { id:'q96', type:'order',
    words:['English','is','more','useful','than','Latin','in','everyday','life','.'],
    ans:'English is more useful than Latin in everyday life.',
    explanation:'Unit 87 · Long adjective: more + adjective + than.' },

  // [U88] Order — much + comparative
  { id:'q97', type:'order',
    words:['The','second','exam','was','much','harder','than','the','first','.'],
    ans:'The second exam was much harder than the first.',
    explanation:'Unit 88 · "much" before a comparative shows a big difference.' },

  // [U90] Order — superlative + ever
  { id:'q98', type:'order',
    words:["It's","the","most","exciting","match","I've","ever","watched",'.'],
    ans:"It's the most exciting match I've ever watched.",
    explanation:"Unit 90 · Superlative + ever pattern: the most exciting ... I've ever watched." },

  // [U88] Order — even + comparative
  { id:'q99', type:'order',
    words:['The','second','chapter','was','even','more','confusing','than','the','first','.'],
    ans:'The second chapter was even more confusing than the first.',
    explanation:'Unit 88 · "even" before a comparative emphasises a bigger gap.' },

  // [U90] Order — best + in
  { id:'q100', type:'order',
    words:['She','plays','the','best','football','in','her','school','.'],
    ans:'She plays the best football in her school.',
    explanation:'Unit 90 · Superlative without repeating noun: the best + in + place.' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE H — NIVEL ALTO: Translate (q101–q105)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87] Translate — irregular
  { id:'q101', type:'translate',
    q:'El tráfico hoy es mucho peor que ayer.',
    ans:'The traffic today is much worse than yesterday.|Today the traffic is much worse than yesterday.',
    explanation:'Unit 87 · Irregular: malo → worse. Unit 88 · "much" before comparative = big difference.' },

  // [U90] Translate — superlative + ever
  { id:'q102', type:'translate',
    q:'Este es el edificio más alto que he visto nunca.',
    ans:"This is the tallest building I've ever seen.|This is the tallest building I have ever seen.",
    explanation:"Unit 90 · Superlative + ever: the tallest ... I've ever seen." },

  // [U88] Translate — a bit comparative
  { id:'q103', type:'translate',
    q:'Tu bolsa es un poco más pesada que la mía.',
    ans:'Your bag is a bit heavier than mine.|Your bag is slightly heavier than mine.',
    explanation:'Unit 88 · Small difference → "a bit" or "slightly" before a comparative.' },

  // [U87+88] Translate — combined
  { id:'q104', type:'translate',
    q:'El examen de mates fue más difícil que el de inglés.',
    ans:'The maths exam was more difficult than the English one.|The maths test was more difficult than the English one.',
    explanation:'Unit 87 · Long adjective: more difficult. Unit 88 · "than" after comparative.' },

  // [U90] Translate — superlative in group
  { id:'q105', type:'translate',
    q:'De los tres candidatos, ella es la más cualificada.',
    ans:'Of the three candidates, she is the most qualified.|She is the most qualified of the three candidates.',
    explanation:'Unit 90 · "of" + group for superlatives: the most qualified of the three.' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOQUE I — NIVEL ALTO: Fill + Choice + Error complejos (q106–q110)
  // ══════════════════════════════════════════════════════════════════════════

  // [U87+90] Fill — double gap: comparative + superlative
  { id:'q106', type:'fill',
    q:'Python is ______ than Java to learn, but Haskell is ______ most difficult language.',
    ans:'easier, the',
    explanation:'Unit 87 · easy → easier (comparative). Unit 90 · THE before superlative: the most difficult.' },

  // [U88+90] Choice — superlative after comparing a group
  { id:'q107', type:'choice',
    q:'By 9 pm, all three concerts had finished. The last one was ______.',
    options:['the most loud','the loudest','louder','more loud'],
    ans:'the loudest',
    explanation:'Unit 90 · Comparing one item against a group (three concerts) → superlative: the loudest.' },

  // [U87+88] Error — double comparative
  { id:'q108', type:'error',
    q:'The more older you get, you become the wiser.',
    ans:'The older you get, the wiser you become.',
    explanation:'Unit 88 · Double comparative structure: the + comparative, the + comparative. No "more" with short adjectives.' },

  // [U88+90] Fill — double gap: much + the
  { id:'q109', type:'fill',
    q:'Canada is ______ bigger than the UK, and it also has ______ lowest population density in the G7.',
    ans:'much, the',
    explanation:'Unit 88 · "much" bigger = big difference. Unit 90 · THE before superlative: the lowest.' },

  // [U87+88+90] Choice — mixed rules
  { id:'q110', type:'choice',
    q:'Which sentence is completely correct?',
    options:[
      'She is the more experienced candidate, and she works more harder than the others.',
      'She is the most experienced candidate, and she works much harder than the others.',
      'She is most experienced candidate, and she works much more hard than the others.',
      'She is the most experienced candidate, and she works very harder than the others.',
    ],
    ans:'She is the most experienced candidate, and she works much harder than the others.',
    explanation:'Unit 90 · THE + most experienced. Unit 88 · "much" (not "very") before comparative. Unit 87 · hard → harder (not "more hard").' },

];

export const comparativesUnit = {
  id: 'comparatives',
  grammarTitle: 'Comparative & Superlative',
  title: 'old/older · older than · the oldest',
  description: 'Units 87 · 88 · 90 — How to compare people, places and things in English',

  theoryBlock: {

    // ── UNIT 87 ───────────────────────────────────────────────────────────────
    unit87: {
      title: 'Unit 87 · old/older · expensive/more expensive',
      content: [

        // ── A · What is a comparative? ──────────────────────────────────────
        { type:'text',
          text:'A <strong>comparative adjective</strong> is used to show that one person or thing has <em>more</em> of a quality than another. Look at these three examples:' },

        { type:'compare', label:'',
          left:  { emoji:'👴', label:'old',   sub:"I'm 92", size:'sm' },
          right: { emoji:'👴', label:'older',  sub:"I'm 93 → he is older", size:'lg' } },
        { type:'compare', label:'',
          left:  { emoji:'🏋️', label:'heavy',  sub:'40 kg', size:'sm' },
          right: { emoji:'🏋️', label:'heavier', sub:'50 kg → it is heavier', size:'lg' } },
        { type:'compare', label:'',
          left:  { emoji:'👟', label:'expensive',      sub:'£105', size:'sm' },
          right: { emoji:'👠', label:'more expensive', sub:'£120 → it is more expensive', size:'lg' } },

        { type:'text',
          text:'<strong>Older, heavier, more expensive</strong> are comparative forms. There are two ways to form the comparative: <strong>-er</strong> (for short words) or <strong>more …</strong> (for long words). The rule you must follow depends on the number of syllables in the adjective.' },

        // ── B · Short words → -er ────────────────────────────────────────────
        { type:'subtitle', text:'B · Short adjectives (1 syllable) → add -er' },
        { type:'text',
          text:'For most adjectives with <strong>one syllable</strong>, simply add <strong>-er</strong> to the end. Do <em>not</em> use "more" with these words — it is a very common mistake.' },
        { type:'table',
          headers:['Adjective', '→', 'Comparative', 'Adjective', '→', 'Comparative'],
          rows:[
            ['old',   '→', '<strong>old<u>er</u></strong>',   'slow',  '→', '<strong>slow<u>er</u></strong>'],
            ['nice',  '→', '<strong>nic<u>er</u></strong>',   'cheap', '→', '<strong>cheap<u>er</u></strong>'],
            ['late',  '→', '<strong>lat<u>er</u></strong>',   'big',   '→', '<strong>bigg<u>er</u></strong>'],
            ['thin',  '→', '<strong>thinn<u>er</u></strong>', 'hot',   '→', '<strong>hott<u>er</u></strong>'],
          ] },

        { type:'rule',
          text:'⚠️ <strong>Spelling rule — CVC (consonant–vowel–consonant):</strong> If a one-syllable adjective ends in a single consonant after a single vowel, <strong>double the final consonant</strong> before -er.<br><br>bi<strong>g</strong> (c–v–c) → bi<strong>gg</strong>er &nbsp;·&nbsp; ho<strong>t</strong> (c–v–c) → ho<strong>tt</strong>er &nbsp;·&nbsp; thi<strong>n</strong> (c–v–c) → thi<strong>nn</strong>er<br><br>But: slow (ends in two consonants) → slow<strong>er</strong> — NO doubling.' },

        { type:'text',
          text:'Adjectives ending in <strong>-y</strong> change the y to <strong>i</strong> before adding -er:' },
        { type:'table',
          headers:['Adjective', '→', 'Comparative'],
          rows:[
            ['eas<strong>y</strong>',   '→', '<strong>eas<u>ier</u></strong>'],
            ['heav<strong>y</strong>',  '→', '<strong>heav<u>ier</u></strong>'],
            ['earl<strong>y</strong>',  '→', '<strong>earl<u>ier</u></strong>'],
          ] },

        { type:'text', text:'Now look at how these comparatives are used in real sentences:' },
        { type:'example', en:'Rome is old, but Athens is <strong>older</strong>.', es:'<em>(not: more old)</em>' },
        { type:'example', en:'Is it <strong>cheaper</strong> to go by car or by train?', es:'<em>(not: more cheap)</em>' },
        { type:'example', en:"Helen wants a <strong>bigger</strong> car.", es:'' },
        { type:'example', en:"Don't take the bus. It's <strong>easier</strong> to take a taxi.", es:'<em>(not: more easy)</em>' },

        { type:'text',
          text:'One adjective with an irregular comparative is <strong>far</strong>:' },
        { type:'example', en:"A: How far is it to the station? A mile?  B: No, it's <strong>further</strong>. About two miles.", es:'far → <strong>further</strong> (irregular)' },

        // ── C · Long words → more ────────────────────────────────────────────
        { type:'subtitle', text:'C · Long adjectives (2, 3 or 4 syllables) → more …' },
        { type:'text',
          text:'For longer adjectives, do <em>not</em> add -er. Instead, put the word <strong>more</strong> in front of the adjective. The adjective itself does not change.' },
        { type:'table',
          headers:['Adjective', '(syllables)', '→', 'Comparative'],
          rows:[
            ['care·ful',         '(2)', '→', '<strong>more careful</strong>'],
            ['ex·pen·sive',      '(3)', '→', '<strong>more expensive</strong>'],
            ['po·lite',          '(2)', '→', '<strong>more polite</strong>'],
            ['in·ter·est·ing',   '(4)', '→', '<strong>more interesting</strong>'],
          ] },
        { type:'example', en:'You must be <strong>more careful</strong>.', es:'' },
        { type:'example', en:"I don't like my job. I want to do something <strong>more interesting</strong>.", es:'' },
        { type:'example', en:'Is it <strong>more expensive</strong> to go by car or by train?', es:'' },

        // ── D · Irregulars ───────────────────────────────────────────────────
        { type:'subtitle', text:'D · Irregular comparatives — must be memorised' },
        { type:'text',
          text:'These two adjectives have completely irregular comparative forms. They do not follow any rule and must be learnt by heart:' },
        { type:'table',
          headers:['Adjective / Adverb', '→', 'Comparative'],
          rows:[
            ['good / well', '→', '<strong>better</strong>'],
            ['bad',         '→', '<strong>worse</strong>'],
          ] },
        { type:'example', en:"The weather wasn't very good yesterday, but it's <strong>better</strong> today.", es:'' },
        { type:'example', en:"'Do you feel better today?' 'No, I feel <strong>worse</strong>.'", es:'' },
        { type:'example', en:"Which is <strong>worse</strong> — a headache or a toothache?", es:'' },

        { type:'rule', warn:true,
          text:'❌ Never say: <em>more old · more cheap · more easy · more good · more bad · gooder · badder</em><br>✅ Always say: <em>older · cheaper · easier · better · worse</em>' },

        { type:'teacher',
          text:'📌 <strong>Summary — Unit 87:</strong> 1 syllable → add <strong>-er</strong> (watch CVC spelling!) · -y → <strong>-ier</strong> · 2+ syllables → <strong>more</strong> · good/bad → <strong>better / worse</strong>. Next step: learn how to use these comparatives in a sentence with <strong>than</strong> (Unit 88).' },
      ],
    },

    // ── UNIT 88 ───────────────────────────────────────────────────────────────
    unit88: {
      title: 'Unit 88 · older than … · more expensive than …',
      content: [

        // ── A · Using than ───────────────────────────────────────────────────
        { type:'text',
          text:'Now that you know how to form comparatives, you need to know how to use them in a sentence. When we compare two specific things, we use the comparative followed by <strong>than</strong>.' },

        { type:'compare', label:'',
          left:  { emoji:'🧑', label:'him',             sub:"I'm 1m 63 (Ben)", size:'sm' },
          right: { emoji:'👩', label:'taller than him',  sub:"I'm 1m 68 (Kate) — she's taller than him", size:'lg' } },

        { type:'rule',
          text:'comparative + <strong>than</strong> + second thing being compared' },

        { type:'example', en:'Athens is <strong>older than</strong> Rome.', es:'Atenas es más antigua que Roma.' },
        { type:'example', en:'Are oranges <strong>more expensive than</strong> bananas?', es:'¿Son las naranjas más caras que los plátanos?' },
        { type:'example', en:"It's <strong>easier</strong> to take a taxi <strong>than</strong> to take the bus.", es:'Es más fácil coger un taxi que el autobús.' },
        { type:'example', en:"'How are you today?' 'Not bad. <strong>Better than</strong> yesterday.'", es:'"¿Cómo estás?" "Mejor que ayer."' },
        { type:'example', en:'The restaurant is <strong>more crowded than</strong> usual.', es:'' },

        // ── B · than me / than him ───────────────────────────────────────────
        { type:'subtitle', text:'B · than me / than him / than her …' },
        { type:'text',
          text:'After <strong>than</strong>, we normally use <strong>object pronouns</strong>: me, him, her, us, them. Both forms below are correct, but the first is more natural in spoken English:' },
        { type:'table',
          headers:['More natural (spoken)', 'Also correct (formal)'],
          rows:[
            ["I can run faster <strong>than him</strong>.",        "I can run faster than <em>he can</em>."],
            ["You are a better singer <strong>than me</strong>.",   "You are a better singer than <em>I am</em>."],
            ["I got up earlier <strong>than her</strong>.",         "I got up earlier than <em>she did</em>."],
          ] },

        // ── C · more / less than ─────────────────────────────────────────────
        { type:'subtitle', text:'C · more / less than …' },
        { type:'text',
          text:'We also use <strong>more than</strong> and <strong>less than</strong> with numbers and quantities to show that something exceeds or falls short of an amount:' },
        { type:'example', en:"A: How much did your shoes cost? £60?  B: No, <strong>more than</strong> that. (= more than £60)", es:'' },
        { type:'example', en:'The film was very short — <strong>less than</strong> an hour.', es:'(less = the opposite of more)' },
        { type:'example', en:'They have <strong>more money than</strong> they need.', es:'' },
        { type:'example', en:'You go out <strong>more than</strong> me.', es:'' },

        // ── D · a bit / much ─────────────────────────────────────────────────
        { type:'subtitle', text:'D · a bit older / much older — showing the degree of difference' },
        { type:'text',
          text:'We can say <em>how much</em> bigger/older/more expensive something is by adding <strong>a bit</strong> (small difference) or <strong>much</strong> (big difference) before the comparative:' },

        { type:'comparebar', adjective:'Box sizes',
          items:[
            { emoji:'📦', label:'Box A', value:88,  unit:'' },
            { emoji:'📦', label:'Box B', value:80,  unit:'' },
            { emoji:'📦', label:'Box C', value:200, unit:'' },
            { emoji:'📦', label:'Box D', value:40,  unit:'' },
          ] },

        { type:'text', text:'Box A is <strong>a bit bigger</strong> than Box B. &nbsp;·&nbsp; Box C is <strong>much bigger</strong> than Box D.' },
        { type:'table',
          headers:['Word', 'Meaning', 'Example'],
          rows:[
            ['<strong>a bit</strong>', 'small difference', "Sue is <strong>a bit older</strong> than Joe — she's 25 and he's 24."],
            ['<strong>much</strong>',  'big difference',   'Canada is <strong>much bigger</strong> than France.'],
          ] },
        { type:'example', en:'The hotel was <strong>much more expensive</strong> than I expected.', es:'' },
        { type:'example', en:'You go out <strong>much more</strong> than me.', es:'' },

        { type:'teacher',
          text:'📌 <strong>Summary — Unit 88:</strong> comparative + <strong>than</strong> to compare two things. After than, use object pronouns (him, her, me). Add <strong>a bit</strong> or <strong>much</strong> before the comparative to show how big the difference is.' },
      ],
    },

    // ── UNIT 90 ───────────────────────────────────────────────────────────────
    unit90: {
      title: 'Unit 90 · the oldest · the most expensive',
      content: [

        // ── A · Comparative vs Superlative ───────────────────────────────────
        { type:'text',
          text:'In Unit 87–88 we compared <em>two</em> things (Athens is older <strong>than</strong> Rome). Now we compare one thing against a <em>whole group</em>. We use the <strong>superlative</strong> to say that one thing is at the top (or bottom) of its group — it has the most (or least) of a quality.' },

        { type:'comparebar', adjective:'Hotel prices in Kinton — which is the most expensive?',
          items:[
            { emoji:'🏨', label:'Europa  £150', value:150, unit:'£' },
            { emoji:'🏨', label:'Grand   £130', value:130, unit:'£' },
            { emoji:'🏨', label:'Royal   £120', value:120, unit:'£' },
            { emoji:'🏨', label:'Astoria £115', value:115, unit:'£' },
            { emoji:'🏨', label:'Station £75',  value:75,  unit:'£' },
          ] },

        { type:'text',
          text:'<strong>Bigger</strong> and <strong>more expensive</strong> are <em>comparative</em> forms (comparing two things). <strong>Biggest</strong> and <strong>most expensive</strong> are <em>superlative</em> forms (the extreme of a group). See the difference:' },
        { type:'table',
          headers:['Comparative (two things)', 'Superlative (whole group)'],
          rows:[
            ["Box A is <strong>bigger than</strong> Box B.",
             "Box A is <strong>the biggest</strong> box. (= bigger than all the others)"],
            ["The Europa is <strong>more expensive than</strong> the Grand.",
             "The Europa is <strong>the most expensive</strong> hotel. (= more expensive than all the others)"],
          ] },

        // ── B · Forming superlatives ─────────────────────────────────────────
        { type:'subtitle', text:'B · How to form superlatives' },
        { type:'text',
          text:'The superlative form is <strong>-est</strong> (for short words) or <strong>the most …</strong> (for long words). The same spelling rules from Unit 87 apply here too.' },

        { type:'subtitle', text:'Short adjectives (1 syllable) → the -est' },
        { type:'text',
          text:'Add <strong>-est</strong> to short adjectives. Always put <strong>the</strong> in front:' },
        { type:'table',
          headers:['Adjective', 'Comparative', 'Superlative'],
          rows:[
            ['old',   'older',    '<strong>the oldest</strong>'],
            ['cheap', 'cheaper',  '<strong>the cheapest</strong>'],
            ['nice',  'nicer',    '<strong>the nicest</strong>'],
            ['big',   'bigger',   '<strong>the bigg<u>est</u></strong>'],
            ['hot',   'hotter',   '<strong>the hott<u>est</u></strong>'],
          ] },
        { type:'rule',
          text:'⚠️ <strong>Spelling rule — same as for comparatives:</strong> CVC adjectives double the last consonant before -est too.<br>bi<strong>g</strong> → the bi<strong>gg</strong>est &nbsp;·&nbsp; ho<strong>t</strong> → the ho<strong>tt</strong>est' },

        { type:'subtitle', text:'Adjectives ending in -y → the -iest' },
        { type:'text',
          text:'Change <strong>-y</strong> to <strong>-i</strong> and add -est. Same pattern as the comparative:' },
        { type:'table',
          headers:['Adjective', 'Comparative', 'Superlative'],
          rows:[
            ['easy',   'easier',   '<strong>the easiest</strong>'],
            ['heavy',  'heavier',  '<strong>the heaviest</strong>'],
            ['pretty', 'prettier', '<strong>the prettiest</strong>'],
          ] },

        { type:'subtitle', text:'Long adjectives (2+ syllables) → the most …' },
        { type:'text',
          text:'For longer adjectives, put <strong>the most</strong> in front. The adjective itself does not change:' },
        { type:'table',
          headers:['Adjective', 'Comparative', 'Superlative'],
          rows:[
            ['careful',     'more careful',     '<strong>the most careful</strong>'],
            ['interesting', 'more interesting', '<strong>the most interesting</strong>'],
            ['expensive',   'more expensive',   '<strong>the most expensive</strong>'],
          ] },

        { type:'subtitle', text:'Irregular superlatives' },
        { type:'text',
          text:'The same irregular adjectives from Unit 87 are also irregular in the superlative:' },
        { type:'table',
          headers:['Adjective', 'Comparative', 'Superlative'],
          rows:[
            ['good / well', 'better', '<strong>the best</strong>'],
            ['bad',         'worse',  '<strong>the worst</strong>'],
            ['far',         'further','<strong>the furthest</strong>'],
          ] },

        // ── C · Using superlatives — always with THE ─────────────────────────
        { type:'subtitle', text:'C · We say the oldest … / the most expensive … (always with the)' },
        { type:'rule',
          text:'<strong>Rule:</strong> Superlatives always use <strong>the</strong>. This is not optional — without "the", the sentence is incorrect.' },
        { type:'example',
          en:"The church is very old. It's <strong>the oldest</strong> building in the town.",
          es:'(= it is older than <em>all</em> the other buildings in the town)' },
        { type:'example',
          en:'What is <strong>the longest</strong> river in the world?',
          es:'' },
        { type:'example',
          en:"Money is important, but it isn't <strong>the most important</strong> thing in life.",
          es:'' },
        { type:'example',
          en:'Excuse me, where is <strong>the nearest</strong> bank?',
          es:'' },

        // ── D · Without a noun ───────────────────────────────────────────────
        { type:'subtitle', text:'D · You can use superlatives without repeating the noun' },
        { type:'text',
          text:'When the noun is already clear from context, you can drop it and use only the superlative:' },
        { type:'example',
          en:"Luke is a good player, but he isn't <strong>the best</strong> in the team.",
          es:'(the best = the best <em>player</em> — noun not repeated)' },

        // ── E · Superlative + ever ────────────────────────────────────────────
        { type:'subtitle', text:"E · Superlative + I've ever / you've ever …" },
        { type:'text',
          text:"You can combine the superlative with <strong>I've ever / you've ever / he's ever</strong> etc. to talk about the most extreme experience in your life up to now:'" },
        { type:'example',
          en:"The film was very bad. I think it's <strong>the worst</strong> film I've <strong>ever</strong> seen.",
          es:"(= of all the films I've seen in my life, this one is the worst)" },
        { type:'example',
          en:"What is <strong>the most unusual</strong> thing you've <strong>ever</strong> done?",
          es:'' },

        { type:'teacher',
          text:'📌 <strong>Summary — Units 87 · 88 · 90:</strong><br><strong>Comparative</strong> (-er / more) = comparing <em>two</em> things → always followed by <strong>than</strong>.<br><strong>Superlative</strong> (-est / the most) = the extreme of a <em>group</em> → always with <strong>the</strong>, followed by <strong>in</strong> or <strong>of</strong>.<br><br>Forming rules are the same for both: 1 syllable → -er/-est (CVC: double!) · -y → -ier/-iest · long → more/the most · good/bad/far → irregular.' },
      ],
    },
  },

  theoryQuiz: quiz,
  activeQuiz:  quiz,

  vocabulary: [
    { id:'v01', word:'older',                span:'más viejo/a' },
    { id:'v02', word:'bigger',               span:'más grande' },
    { id:'v03', word:'heavier',              span:'más pesado/a' },
    { id:'v04', word:'more expensive',       span:'más caro/a' },
    { id:'v05', word:'easier',               span:'más fácil' },
    { id:'v06', word:'better',               span:'mejor' },
    { id:'v07', word:'worse',                span:'peor' },
    { id:'v08', word:'further',              span:'más lejos' },
    { id:'v09', word:'taller than',          span:'más alto/a que' },
    { id:'v10', word:'much bigger',          span:'mucho más grande' },
    { id:'v11', word:'a bit older',          span:'un poco mayor' },
    { id:'v12', word:'more than',            span:'más de / más que' },
    { id:'v13', word:'less than',            span:'menos de / menos que' },
    { id:'v14', word:'the oldest',           span:'el/la más viejo/a' },
    { id:'v15', word:'the most expensive',   span:'el/la más caro/a' },
    { id:'v16', word:'the best',             span:'el/la mejor' },
    { id:'v17', word:'the worst',            span:'el/la peor' },
    { id:'v18', word:'the longest',          span:'el/la más largo/a' },
    { id:'v19', word:'the tallest',          span:'el/la más alto/a' },
    { id:'v20', word:"the most … I've ever", span:"el/la más … que he … nunca" },
  ],

  listening: {
    text: "Last summer I visited two amazing cities: Rome and Athens. Rome is beautiful and very old, but Athens is actually older. The Colosseum in Rome is one of the most impressive buildings in the world, but the Parthenon in Athens is more ancient. Greek food is generally cheaper than Italian food, but some people think Italian food is better. The streets in Rome are busier and more crowded than in Athens. However, Athens has the most interesting history of any city I have visited. My sister says it is the most beautiful city she has ever seen. I think both cities are much more exciting than staying at home.",
    options:[
      'older','more impressive','cheaper','better',
      'the most interesting','the most beautiful','more expensive','the newest',
    ],
    correctItems:['older','cheaper','better','the most interesting','the most beautiful'],
  },

  reading: {
    title: 'Faster, Higher, Stronger',
    source: 'English Studio · Level A2–B1',
    passage: `The Olympic motto is "Citius, Altius, Fortius" — in English, "Faster, Higher, Stronger." These three words are all comparative adjectives, and they perfectly describe what the Olympic Games are about: athletes trying to perform better than they did before, and better than their competitors.

In the 100-metre sprint, the winner is simply the runner who is faster than all the others. But in sports like gymnastics or diving, judges decide who is more graceful, more controlled, and more precise. The best athlete is not always the strongest — sometimes, the most flexible or the most creative wins.

Modern athletes are generally bigger, faster, and stronger than athletes from 100 years ago. A sprinter today is significantly faster than the world record holder from 1924. Training methods are more scientific, nutrition is more carefully planned, and equipment is more advanced than ever before.

However, some experts argue that natural talent is still more important than technology. The greatest athletes are not just faster or stronger — they are also more mentally resilient, more disciplined, and more passionate about their sport.`,
    questions: [
      { id:'r01', type:'mc',
        q:'What does the Olympic motto describe?',
        options:['Athletes trying to perform better than before','The history of the Olympic Games','Different types of sport','The rules of competitions'],
        ans:'Athletes trying to perform better than before',
        explanation:'The text says athletes try to "perform better than they did before, and better than their competitors".' },
      { id:'r02', type:'mc',
        q:'In which sports do judges decide the winner based on grace and control?',
        options:['100-metre sprint and swimming','Gymnastics and diving','All Olympic sports','Swimming and cycling'],
        ans:'Gymnastics and diving',
        explanation:'"in sports like gymnastics or diving, judges decide who is more graceful, more controlled…"' },
      { id:'r03', type:'mc',
        q:'According to the text, why are modern athletes better than those from 100 years ago?',
        options:['They are naturally more talented','The Olympics are more popular','Training, nutrition and equipment are more advanced','They train more hours per day'],
        ans:'Training, nutrition and equipment are more advanced',
        explanation:'"Training methods are more scientific, nutrition is more carefully planned, and equipment is more advanced."' },
      { id:'r04', type:'sa',
        q:'Find TWO comparative adjectives from the final paragraph that describe what makes the greatest athletes special beyond physical ability.',
        ans:'more mentally resilient|more disciplined|more passionate' },
      { id:'r05', type:'mc',
        q:'Which sentence correctly uses a comparative adverb?',
        options:['Swimmers today swim more quick than in 1924.','Swimmers today swim more quickly than in 1924.','Swimmers today swim quicklier than in 1924.','Swimmers today swim most quickly than in 1924.'],
        ans:'Swimmers today swim more quickly than in 1924.',
        explanation:'Adverbs ending in -ly use "more" for the comparative: more quickly (never "quicklier").' },
    ],
  },
};

export const comparativesReadingPatch = {};