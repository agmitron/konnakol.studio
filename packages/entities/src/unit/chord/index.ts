import { common, tempo, frequency } from 'utils';
import { Unit, CompositeUnit, SingleUnit, UnitKind, UnitType, WithFrequencies } from '../shared';

export const isChord = (
  unit: Unit
): unit is Chord => unit instanceof Chord

export default class Chord implements CompositeUnit<SingleUnit[]>, WithFrequencies {
  public readonly frequencies: frequency.Frequency[]
  public readonly kind: UnitKind.Composite = UnitKind.Composite;
  public readonly type: UnitType.Chord = UnitType.Chord

  constructor(public readonly children: SingleUnit[]) {
    this.frequencies = this.children.flatMap(({ frequencies }) => frequencies)
  }

  async *play(bpm: number) {
    const interval = tempo.bpmToMilliseconds(bpm)
    yield this
    await common.sleep(interval)
  }

  check(receivedFrequency: frequency.Frequency) {
    return frequency.areFrequenciesCorrect(this.frequencies, receivedFrequency)
  }
}
