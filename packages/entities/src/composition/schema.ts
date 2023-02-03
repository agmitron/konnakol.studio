import z from 'zod'
import { UnitType } from '../unit/shared'

export const UnitSchema = z.object({
  type: z.nativeEnum(UnitType)
})

export const SingleUnitSchema = UnitSchema.extend({
  type: z.enum([UnitType.Sound]),
  symbol: z.string(),
  color: z.string(),
  shortcut: z.string(),
  frequencies: z.array(z.number())
})

export const CompositeUnitSchema = UnitSchema.extend({
  type: z.enum([UnitType.Chord, UnitType.Roll]),
  children: z.array(SingleUnitSchema)
})

export const TactSchema = z.object({
  units: z.array(z.union([CompositeUnitSchema, SingleUnitSchema]))
})

export const PatternSchema = z.array(TactSchema)

export const CompositionSchema = z.object({
  id: z.number(),
  name: z.string(),
  bpm: z.number(),
  size: z.number(),
  pattern: PatternSchema
})
