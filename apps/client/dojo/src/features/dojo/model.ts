import { combine, createEffect, createEvent, createStore, sample, UnitValue } from 'effector'
import { Composition, CompositionId, ICompositionState } from 'entities'

import { and, delay, reset } from 'patronum'
import { NonNullableStructure } from 'utils/types'
import { bpmToMilliseconds } from 'utils/tempo'
import { $frequency, $pitcher } from 'pitch'
import { DEFAULT_BPM } from 'utils/constants'
import { $score, ScoreSource, ScoreString, Correctness, updateScore } from './score'
import { pitchers } from 'pitch'
import * as validation from './validation'
import { loadCompositionFx } from 'entities'


interface RepeatCompositionSource {
  composition: Composition | null
  isRepeating: boolean
  bpm: number
}

interface CheckCompositionSource {
  composition: Composition | null
  bpm: number
}

type CheckCompositionParams = NonNullableStructure<CheckCompositionSource>
type RepeatCompositionParams = NonNullableStructure<RepeatCompositionSource>

type CheckCompositionFx = (params: CheckCompositionParams) => void

export const subscribeCompositionUpdatesFx = createEffect(
  (composition: Composition) => composition.subscribe(compositionUpdated)
)

export const unsubscribeCompositionUpdatesFx = createEffect(
  (composition: Composition) => composition.unsubscribe()
)

export const playCompositionFx = createEffect<CheckCompositionFx>(
  ({ composition, bpm }) => composition.play(bpm)
)

export const stopCompositionFx = createEffect(
  (composition: Composition) => composition.stop()
)

export const $bpm = createStore(DEFAULT_BPM)
export const $composition = createStore<Composition | null>(null)
export const $compositionState = createStore<ICompositionState | null>(null)

export const $isRepeating = createStore(false)
export const $loopIndex = createStore(0);

export const $scoreSource = combine({
  frequency: $frequency,
  loop: $loopIndex,
  state: $compositionState
})

export const $isPlaying = and($composition, playCompositionFx.pending)

export const compositionFinished = delay({
  source: playCompositionFx.done,
  timeout: $bpm.map(bpmToMilliseconds)
})

export const compositionRequested = createEvent<CompositionId>()
export const loopIncremented = createEvent()
export const compositionSubscribed = createEvent()
export const compositionUnsubscribed = createEvent()
export const compositionUpdated = createEvent<ICompositionState>()
export const compositionStarted = createEvent()
export const compositionStopped = createEvent()
export const listenButtonClicked = createEvent()
export const enterBPMButtonClicked = createEvent()
export const pitcherUpdated = createEvent<string>()
export const isRepeatingToggled = createEvent<boolean>()

sample({
  clock: compositionRequested,
  target: loadCompositionFx
})

sample({
  clock: loadCompositionFx.doneData,
  target: $composition
})

reset({
  clock: compositionFinished,
  target: [$compositionState, $frequency, $score]
})

sample({
  clock: isRepeatingToggled,
  target: $isRepeating
})

sample({
  clock: $isPlaying,
  filter: Boolean,
  target: compositionSubscribed
})

sample({
  clock: $isPlaying,
  filter: (v) => !Boolean(v),
  target: compositionUnsubscribed
})

sample({
  clock: compositionSubscribed,
  source: $composition,
  filter: Boolean,
  target: subscribeCompositionUpdatesFx
})

sample({
  clock: compositionUnsubscribed,
  source: $composition,
  filter: Boolean,
  target: unsubscribeCompositionUpdatesFx
})

sample({
  clock: loopIncremented,
  source: $loopIndex,
  fn: (i) => i + 1,
  target: $loopIndex
})

sample({
  clock: compositionStarted,
  source: { composition: $composition, bpm: $bpm },
  filter: (sourceData: CheckCompositionSource): sourceData is CheckCompositionParams => Boolean(sourceData.composition),
  target: playCompositionFx
})

sample({
  clock: playCompositionFx.done,
  source: { isRepeating: $isRepeating, composition: $composition, bpm: $bpm },
  filter: (sourceData: RepeatCompositionSource): sourceData is RepeatCompositionParams => Boolean(
    sourceData.isRepeating && sourceData.composition
  ),
  fn: ({ composition, bpm }: RepeatCompositionParams) => ({ composition, bpm }),
  target: [playCompositionFx, loopIncremented]
})

sample({
  clock: pitcherUpdated,
  fn: value => pitchers[validation.pitcher(value)],
  target: $pitcher
})

sample({
  clock: $composition,
  filter: Boolean,
  fn: ({ bpm }) => bpm,
  target: $bpm
})

sample({
  clock: compositionFinished,
  source: $composition,
  filter: Boolean,
  target: stopCompositionFx
})

sample({
  clock: $scoreSource,
  filter: (source: UnitValue<typeof $scoreSource>): source is ScoreSource => !!source.state?.beat,
  fn: ({ state, frequency, loop }): [ScoreString, Correctness] => {
    const status = state.beat.check(frequency) ? 'success' : 'failed'

    return [`${loop}:${state.tact.index}:${state.beat.index}`, status];
  },
  target: updateScore
})
