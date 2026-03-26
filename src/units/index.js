/**
 * src/units/index.js — Registro de unidades
 *
 * Importado por src/data.js. Para añadir una unidad:
 *   1. Crea src/units/myUnit.js
 *   2. Importa el export principal aquí y añádelo a ALL_UNITS
 *
 * Contrato requerido por cada unidad:
 *   id           string        único, snake_case
 *   grammarTitle string        título para la home card
 *   title        string        subtítulo descriptivo
 *   description? string        texto para UnitMenu (opcional)
 *   theoryBlock  object        { key: { title, content[] } }
 *   theoryQuiz   QuizItem[]    ejercicios para GrammarLab
 *   activeQuiz?  QuizItem[]    si existe, ActiveGrammarLab lo usa en vez de theoryQuiz
 *   vocabulary   VocabItem[]   { id, word, span }
 *   listening    object        { text, options[], correctItems[] }
 *   reading?     object        { title?, source?, passage, questions[] }
 */

import { comparativesUnit, comparativesReadingPatch } from './comparatives';
import { presentSimpleUnit } from './presentSimple.js';
import { presentContinuousUnit } from './presentContinuous.js';
import { presentContinuousVsSimpleUnit } from './presentContinuousVSsimple.js';

export const ALL_UNITS = [
  // FIX: explicit merge — only reading field from patch, avoids silent overwrites
  { ...comparativesUnit, reading: comparativesReadingPatch.reading },
  { ...presentSimpleUnit },
  { ...presentContinuousUnit },
  { ...presentContinuousVsSimpleUnit },
  // Añade nuevas unidades aquí:
  // { ...pastSimpleUnit },
];