import { Frequency } from '~/shared/types/fraction.types';

export enum UnitKind {
  Composite = 'composite',
  Single = 'single'
}

export enum UnitType {
  Note = 'note',
  Chord = 'chord',
  Roll = 'roll'
}

export default interface Unit {
  readonly kind: UnitKind
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

export interface SingleUnit extends Unit, Renderable, WithFrequencies {
  readonly kind: UnitKind.Single
  readonly type: UnitType.Note
}

export interface CompositeUnit<Children extends Unit[]> extends Unit {
  readonly kind: UnitKind.Composite
  readonly type: UnitType.Chord | UnitType.Roll
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
