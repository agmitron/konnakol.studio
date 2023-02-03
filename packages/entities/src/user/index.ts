import { createEvent, createStore, sample } from 'effector'
import { Sound } from '../unit/sound';
import { SingleUnit } from '../unit/shared'
// import { createSoundFx } from '../unit/sound/index';

export interface ShorcutsToUnits {
  [shortcut: string]: SingleUnit
}

export const $sounds = createStore<Sound[]>([])

export const $soundsAsMapping = $sounds.map(
  units => units.reduce<ShorcutsToUnits>((acc, u) => ({ ...acc, [u.shortcut]: u }), {})
)

export const soundDeleted = createEvent<number>()
export const soundCreated = createEvent<Sound>()

// sample({
//   clock: soundCreated,
//   target: createSoundFx
// })

// sample({
//   clock: createSoundFx.doneData,
//   source: $sounds,
//   fn: (units, newUnit) => [...units, newUnit],
//   target: $sounds
// })

sample({
  clock: soundDeleted,
  source: $sounds,
  fn: (units, index) => units.filter((_, i) => i !== index),
  target: $sounds
})

export * from './api'

