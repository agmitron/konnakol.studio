import { Frequency } from '~/types/fraction.types';
import { sleep } from '~/utils/common.utils';
import { areFrequenciesCorrect } from '~/utils/frequency.utils';
import { bpmToMilliseconds } from '~/utils/tempo.utils';
import Chord from './Chord';
import Note from './Note';
import Unit, { CompositeUnit, UnitKind, UnitType, Beat } from './Unit';

export const isRoll = (unit: Unit): unit is Roll => unit instanceof Roll

export type RollChildren = (Note | Chord)[]

export default class Roll implements CompositeUnit<RollChildren> {
  public readonly kind = UnitKind.Composite
  public readonly type = UnitType.Roll
  public currentFraction: Beat | null = null

  constructor(public readonly children: RollChildren) { }

  async *play(bpm: number) {
    const interval = bpmToMilliseconds(bpm) / this.children.length
    for (const currentFraction of this.children) {
      this.currentFraction = currentFraction
      yield this.currentFraction
      await sleep(interval)
    }
  }

  check(receivedFrequency: Frequency) {
    if (!this.currentFraction) {
      throw new Error('Roll is not being played now.')
    }

    return areFrequenciesCorrect(this.currentFraction.frequencies, receivedFrequency)
  }
}