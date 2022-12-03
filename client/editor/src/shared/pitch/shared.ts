import { ACF2PLUS, AMDF, Macleod, YIN } from 'pitchfinder'
import { PitchDetector, ProbabalisticPitchDetector, ProbabilityPitch } from 'pitchfinder/lib/detectors/types'
import { SAMPLE_RATE } from '~/shared/constants'
import { Frequency } from '~/shared/types/fraction.types'

export enum PitcherName {
  ACF2PLUS = 'ACF2PLUS',
  AMDF = 'AMDF',
  YIN = 'YIN',
  Macleod = 'Macleod'
}

export const pitchers: Record<PitcherName, Pitcher> = {
  [PitcherName.ACF2PLUS]: mapPitcher(ACF2PLUS({ sampleRate: SAMPLE_RATE }), PitcherName.ACF2PLUS),
  [PitcherName.AMDF]: mapPitcher(AMDF({ sampleRate: SAMPLE_RATE }), PitcherName.AMDF),
  [PitcherName.YIN]: mapPitcher(YIN({ sampleRate: SAMPLE_RATE }), PitcherName.YIN),
  [PitcherName.Macleod]: mapPitcher(Macleod({ sampleRate: SAMPLE_RATE }), PitcherName.Macleod)
}

type PitchResult = Frequency | null

export interface Pitcher {
  name: PitcherName
  detect: (float32Array: Float32Array) => PitchResult
}

function isProbabalityPitch(pitch: number | null | ProbabilityPitch): pitch is ProbabilityPitch {
  return Boolean(pitch) && typeof pitch !== 'number' && Boolean((pitch as ProbabilityPitch).probability)
}

export function mapPitcher(pitcher: PitchDetector | ProbabalisticPitchDetector, name: PitcherName): Pitcher {
  return {
    detect: buffer => {
      const result = pitcher(buffer)

      if (isProbabalityPitch(result)) {
        return result.freq
      }

      if (typeof result === 'number' && result <= 0) {
        return null
      }

      return result
    },
    name
  }
}
