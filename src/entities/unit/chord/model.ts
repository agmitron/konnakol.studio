import { Frequency } from '~/types/fraction.types';
import { sleep } from '~/utils/common.utils';
import { areFrequenciesCorrect } from '~/utils/frequency.utils';
import { bpmToMilliseconds } from '~/utils/tempo.utils';
import Unit, { CompositeUnit, SingleUnit, UnitKind, UnitType, WithFrequencies } from '~/entities/unit/shared';

export const isChord = (
  unit: Unit
): unit is Chord => unit instanceof Chord

export default class Chord implements CompositeUnit<SingleUnit[]>, WithFrequencies {
  public readonly frequencies: Frequency[]
  public readonly kind: UnitKind.Composite = UnitKind.Composite;
  public readonly type: UnitType.Chord = UnitType.Chord

  constructor(public readonly children: SingleUnit[]) {
    this.frequencies = this.children.flatMap(({ frequencies }) => frequencies)
  }

  async *play(bpm: number) {
    const interval = bpmToMilliseconds(bpm)
    yield this
    await sleep(interval)
  }

  check(receivedFrequency: Frequency) {
    return areFrequenciesCorrect(this.frequencies, receivedFrequency)
  }
}
