import z from 'zod'
import { UnitKind } from '~/entities/unit/shared'

export const UnitSchema = z.object({
  kind: z.nativeEnum(UnitKind),
  index: z.number().gte(0)
})

export const SingleUnitSchema = UnitSchema.extend({
  symbol: z.string(),
  color: z.string(),
  frequencies: z.array(z.number())
})

export const CompositeUnitSchema = UnitSchema.extend({
  children: z.array(SingleUnitSchema)
})

export const TactSchema = z.object({
  index: z.number(),
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
