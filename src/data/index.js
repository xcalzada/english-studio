// 1. Importamos las unidades individuales
import { houseUnit } from './units/house';
import { recordsUnit } from './units/records';

// 2. EXPORTAMOS el objeto con el nombre exacto que busca App.jsx
export const UNITS_DATA = {
  [houseUnit.id]: houseUnit,
  [recordsUnit.id]: recordsUnit,
};