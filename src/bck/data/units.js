/**
 * Este archivo actúa como el punto central de datos.
 * Aquí importamos cada lección individual desde su propio archivo
 * dentro de la subcarpeta /units/ para mantener el proyecto organizado.
 */

// 1. Importamos las lecciones existentes
import { houseVerbHave } from './units/house-verb-have';
import { superlativesworldrecords } from './units/superlatives-world-records';

/**
 * 2. Exportamos el objeto UNITS_DATA que consume App.jsx.
 * Para añadir una lección nueva en el futuro:
 * a) Crea el archivo en /src/data/units/nombre-leccion.js
 * b) impórtalo arriba.
 * c) Añade la clave y el valor en el objeto de abajo.
 */
export const UNITS_DATA = {
  'house-verb-have': houseVerbHave,
  'superlatives-world-records': superlativesworldrecords,
  // Ejemplo de cómo añadir la siguiente:
  // 'family-to-be': familyToBe,
};