import { Frequency } from '~/shared/types/fraction.types';
import { sleep } from '~/shared/utils/common.utils';
import { areFrequenciesCorrect } from '~/shared/utils/frequency.utils';
import { bpmToMilliseconds } from '~/shared/utils/tempo.utils';
import Chord from '~/entities/unit/chord/model';
import Sound from '~/entities/unit/sound/model';
import Unit, { CompositeUnit, UnitKind, UnitType, Beat } from '~/entities/unit/shared';

export const isRoll = (unit: Unit): unit is Roll => unit instanceof Roll

export type RollChildren = (Sound | Chord)[]

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