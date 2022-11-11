import { createEvent, createStore, sample, Store } from 'effector';
import { ICompositionState } from '~/entities/composition/model';
import { Frequency } from '~/types/fraction.types';

export type TactIndex = number
export type FractionIndex = number
export type LoopIndex = number
export type Correctness = 'success' | 'failed'
export type ScoreString = `${LoopIndex}:${TactIndex}:${FractionIndex}`
export type CheckedFractions = Record<ScoreString, Correctness>

export interface ScoreSource {
  loop: number
  frequency: Frequency
  state: ICompositionState
}

export const $score = createStore<CheckedFractions>({})
export const $success: Store<number> = $score.map(
  score => Object.values(score).reduce<number>((acc, v) => v === 'success' ? acc + 1 : acc, 0)
)
export const $failed: Store<number> = $score.map(
  score => Object.values(score).reduce<number>((acc, v) => v === 'failed' ? acc + 1 : acc, 0)
)

export const updateScore = createEvent<[ScoreString, Correctness]>()

sample({
  clock: updateScore,
  source: $score,
  filter: (sourceData, [scoreString]) => sourceData[scoreString] !== 'success', // if there is already 'success' score -> ignore
  fn: (sourceData, [scoreString, correctness]) => ({ ...sourceData, [scoreString]: correctness }),
  target: $score
})
