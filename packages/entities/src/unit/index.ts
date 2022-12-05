import { Chord } from './chord'
import { Roll } from './roll'
import { UnitType } from './shared'
import { Sound } from './sound'

export * from './chord'
export * from './roll'
export * from './shared'
export * from './sound'
export * from './tact'

export const mapTypeToUnit: Record<UnitType, Function> = {
  chord: Chord,
  sound: Sound,
  roll: Roll
}