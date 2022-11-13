import { createEvent, createStore, sample } from 'effector'
import { SingleUnit } from '~/entities/unit/shared'
import { createUnitFx } from '~/entities/unit/shared/api';

export interface ShorcutsToUnits {
  [shortcut: string]: SingleUnit
}

export const $units = createStore<SingleUnit[]>([])

export const $unitsAsMapping = $units.map(
  units => units.reduce<ShorcutsToUnits>((acc, u) => ({ ...acc, [u.shortcut]: u }), {})
);

export const soundDeleted = createEvent<number>()

sample({
  clock: createUnitFx.doneData,
  source: $units,
  fn: (units, newUnit) => [...units, newUnit],
  target: $units
})

sample({
  clock: soundDeleted,
  source: $units,
  fn: (units, index) => units.filter((_, i) => i !== index),
  target: $units
})

