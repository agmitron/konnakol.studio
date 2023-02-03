import { Frequency } from 'utils/frequency';

export enum UnitType {
  Sound = 'sound',
  Chord = 'chord',
  Roll = 'roll'
}

export interface Unit {
  readonly type: UnitType
  play: (bpm: number) => AsyncGenerator<Unit & WithFrequencies>
  check: (receivedFrequency: Frequency) => boolean
}

export interface WithFrequencies {
  readonly frequencies: Frequency[]
}

export interface Renderable {
  readonly symbol: string
  readonly color: string
  readonly shortcut: string
}

export interface SingleUnit extends Unit, Renderable, WithFrequencies {}

export interface CompositeUnit<Children extends Unit[]> extends Unit {
  readonly children: Children
}

export type Beat = Unit & WithFrequencies

export const hasFrequencies = (
  unit: Unit
): unit is Unit & WithFrequencies => Boolean((unit as Unit & WithFrequencies).frequencies)

export const isRenderable = (unit: Unit): unit is Unit & Renderable => {
  const probablyRenderableUnit = unit as Unit & Renderable
  return Boolean(probablyRenderableUnit.symbol && probablyRenderableUnit.color)
}
