import { Frequency } from '~/shared/types/fraction.types';
import { sleep } from '~/shared/utils/common.utils';
import { isFrequencyCorrect } from '~/shared/utils/frequency.utils';
import { bpmToMilliseconds } from '~/shared/utils/tempo.utils';
import Unit, { Renderable, SingleUnit, UnitKind, UnitType, WithFrequencies } from '~/entities/unit/shared';

interface SoundConfig {
  frequencies: Frequency[]
  symbol: string
  color?: string
  shortcut?: string
}

export const isSound = (unit: Unit): unit is Sound => unit instanceof Sound

export default class Sound implements SingleUnit, Renderable, WithFrequencies {
  public readonly kind: UnitKind.Single = UnitKind.Single
  public readonly type: UnitType.Sound = UnitType.Sound

  public readonly frequencies: Frequency[]
  public readonly symbol: string
  public readonly color: string
  public readonly shortcut: string

  constructor(config: SoundConfig) {
    this.frequencies = config.frequencies
    this.color = config.color ?? 'black'
    this.symbol = config.symbol
    this.shortcut = config.shortcut || config.symbol
  }

  async *play(bpm: number) {
    const interval = bpmToMilliseconds(bpm)
    yield this
    await sleep(interval)
  }

  check(receivedFrequency: Frequency) {
    const [expectedFrequency = null] = this.frequencies

    if (!expectedFrequency) {
      return true;
    }

    return isFrequencyCorrect(expectedFrequency, receivedFrequency)
  }
}
