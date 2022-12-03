import { Frequency, areFrequenciesCorrect } from 'utils/frequency';
import { sleep } from 'utils/common';
import { bpmToMilliseconds } from 'utils/tempo';
import { Unit, CompositeUnit, SingleUnit, UnitKind, UnitType, WithFrequencies } from '../shared';

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
