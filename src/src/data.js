import { ALL_UNITS } from './units/index';

export const UNITS_DATA = Object.fromEntries(
  ALL_UNITS.map(unit => [unit.id, unit])
);
