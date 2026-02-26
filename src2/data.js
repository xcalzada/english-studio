/**
 * src/data.js — Registro central de unidades
 *
 * UNITS_DATA es un objeto keyed por unit.id para O(1) lookup desde App.jsx.
 * Para añadir una unidad nueva:
 *   1. Crea src/units/myUnit.js siguiendo la forma de comparativesUnit
 *   2. Impórtala aquí y añádela a ALL_UNITS
 *   3. Listo — App.jsx y UnitMenu la recogen automáticamente
 *
 * Forma requerida de cada unidad:
 * {
 *   id:           string          — único, snake_case
 *   grammarTitle: string          — título corto para la home card
 *   title:        string          — subtítulo descriptivo
 *   description?: string          — texto opcional para UnitMenu
 *   theoryBlock:  object          — bloques de teoría { key: { title, content[] } }
 *   theoryQuiz:   QuizItem[]      — ejercicios para GrammarLab y ActiveGrammarLab
 *   activeQuiz?:  QuizItem[]      — si existe, ActiveGrammarLab lo usa en vez de theoryQuiz
 *   vocabulary:   VocabItem[]     — { id, word, span }
 *   listening:    ListeningData   — { text, options[], correctItems[] }
 *   reading?:     ReadingData     — { title?, source?, passage, questions[] }
 * }
 */

import { ALL_UNITS } from './units/index';

/** Lookup por id — usado por App.jsx: UNITS_DATA[activeUnitId] */
export const UNITS_DATA = Object.fromEntries(
  ALL_UNITS.map(unit => [unit.id, unit])
);
