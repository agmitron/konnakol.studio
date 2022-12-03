import { Beat } from '../unit/shared'
import { Indexed } from 'utils/types'
import Tact from '../unit/tact'

type CompositionTransition = AsyncGenerator<ICompositionState>
type UpdateHandler = (state: ICompositionState) => void

export type Pattern = Tact[]
export type CompositionId = number

export interface ICompositionConfig {
  readonly id: CompositionId
  readonly name: string
  readonly pattern: Pattern
  readonly bpm: number
  readonly size: number
}

export interface ICompositionState {
  tact: Indexed & Tact
  beat: Indexed & Beat
}

export interface IComposition extends ICompositionConfig {
  play: (bpm?: number) => Promise<Composition>;
}

export default class Composition implements IComposition {
  public readonly id: CompositionId
  public readonly name: string
  public readonly pattern: Pattern
  public readonly bpm: number
  public readonly size: number

  private iterator: CompositionTransition | null = null
  private listeners: UpdateHandler[] = []

  constructor(config: ICompositionConfig) {
    this.id = config.id
    this.name = config.name
    this.pattern = config.pattern
    this.bpm = config.bpm
    this.size = config.size
  }

  public async play(bpm: number = this.bpm) {
    this.iterator = this.transition(bpm)

    for await (const state of this.iterator) {
      this.listeners.forEach(onUpdate => onUpdate?.(state))
    }

    this.iterator = null
    return this
  }

  public async stop() {
    await this.iterator?.return(null)
    this.iterator = null
    return this
  }

  public subscribe(listener: UpdateHandler) {
    this.listeners = [...this.listeners, listener]
    return this
  }

  public unsubscribe() {
    this.listeners = []
    return this
  }

  public stringify() {
    return JSON.stringify({
      id: this.id,
      bpm: this.bpm,
      name: this.name,
      pattern: this.pattern,
      size: this.size
    })
  }

  private async *transition(bpm: number): CompositionTransition {
    for (const [tactIndex, tact] of this.pattern.entries()) {
      for (const [unitIndex, unit] of tact.units.entries()) {
        const beats = unit.play(bpm)
        for await (const beat of beats) {
          yield {
            beat: { ...beat, index: unitIndex },
            tact: { ...tact, index: tactIndex }
          }
        }
      }
    }
  }
}
