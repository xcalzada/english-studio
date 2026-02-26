// 1. Importamos las unidades individuales
//import { houseUnit } from './units/house';
//import { recordsUnit } from './units/records';
//import { habitsPSUnit } from './units/habitsPS';
import { comparativesUnit } from './units/comparatives';   // ← importa la nueva unidad
// 2. EXPORTAMOS el objeto con el nombre exacto que busca App.jsx
export const UNITS_DATA = {
  //[houseUnit.id]: houseUnit,
  //[recordsUnit.id]: recordsUnit,
  //[habitsPSUnit.id]: habitsPSUnit,
  [comparativesUnit.id]: comparativesUnit,   // ← añade esta línea
};

