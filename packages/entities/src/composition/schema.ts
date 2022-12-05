import z from 'zod'
import { UnitKind, UnitType } from '../unit/shared'

export const UnitSchema = z.object({
  kind: z.nativeEnum(UnitKind),
  type: z.nativeEnum(UnitType)
})

export const SoundSchema = UnitSchema.extend({
  symbol: z.string(),
  color: z.string(),
  frequencies: z.array(z.number())
})

export const CompositeUnitSchema = UnitSchema.extend({
  children: z.array(SoundSchema)
})

export const TactSchema = z.object({
  units: z.array(UnitSchema)
})

export const PatternSchema = z.array(TactSchema)

export const CompositionSchema = z.object({
  id: z.number(),
  name: z.string(),
  bpm: z.number(),
  size: z.number(),
  pattern: PatternSchema
})
