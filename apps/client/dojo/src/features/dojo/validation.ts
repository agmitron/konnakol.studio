import { PitcherName, pitchers } from 'pitch'

export const bpm = (value: ReturnType<typeof prompt>) => {
  if (!value) {
    throw new Error('No BPM provided.')
  }

  const numberValue = Number(value)

  if (isNaN(numberValue)) {
    throw new Error('BPM must be a number')
  }

  return numberValue
}

export const pitcher = (value: string): PitcherName => {  
  if (value in pitchers) {
    return value as PitcherName
  }

  throw new Error(`Incorrect pitcher given: ${value}`)
}
