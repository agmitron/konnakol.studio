import { IUnit } from './unit.types';

export type Frequency = number

export interface IFraction {
  unit: IUnit | null;
  color?: string;
}