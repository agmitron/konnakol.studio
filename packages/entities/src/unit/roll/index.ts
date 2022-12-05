import { Frequency, areFrequenciesCorrect } from 'utils/frequency';
import { sleep } from 'utils/common';
import { bpmToMilliseconds } from 'utils/tempo';
import { Chord } from '../chord';
import { Sound } from '../sound';
import { Unit, CompositeUnit, UnitKind, UnitType, Beat } from '../shared';

export const isRoll = (unit: Unit): unit is Roll => unit instanceof Roll

export type RollChildren = (Sound | Chord)[]

export class Roll implements CompositeUnit<RollChildren> {
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