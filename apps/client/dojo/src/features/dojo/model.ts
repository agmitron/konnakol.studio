import { combine, createEffect, createEvent, createStore, sample, UnitValue } from 'effector'
import { Composition, CompositionId, ICompositionState, loadCompositionFx } from 'entities'
import * as validation from './validation'
import { and, not, reset } from 'patronum'
import { NonNullableStructure } from 'utils/types'
import { $frequency, $pitcher, pitchers, startListeningMicro, stopListeningMicro } from 'pitch'
import { DEFAULT_BPM } from 'utils/constants'
import { $score, ScoreSource, ScoreString, Correctness, updateScore } from './score'

interface RepeatCompositionSource {
  composition: Composition | null
  isLooping: boolean
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

export const $isLooping = createStore(false)
export const $loopIndex = createStore(0);

export const $scoreSource = combine({
  frequency: $frequency,
  loop: $loopIndex,
  state: $compositionState
})

export const $isPlaying = and($composition, playCompositionFx.pending)

export const playButtonClicked = createEvent()
export const compositionRequested = createEvent<CompositionId>()
export const loopIncremented = createEvent()
export const compositionUpdated = createEvent<ICompositionState>()
export const compositionStarted = createEvent()
export const compositionStopped = createEvent()
export const listenButtonClicked = createEvent()
export const enterBPMButtonClicked = createEvent()
export const pitcherUpdated = createEvent<string>()
export const loopButtonClicked = createEvent()

$loopIndex.on(loopIncremented, prev => prev + 1)

sample({
  clock: compositionStarted,
  target: startListeningMicro
})

sample({
  clock: compositionStopped,
  target: stopListeningMicro
})

sample({
  clock: playButtonClicked,
  filter: $isPlaying,
  target: compositionStopped
})

sample({
  clock: playCompositionFx.done,
  filter: not($isLooping), 
  target: compositionStopped
})

sample({
  clock: playButtonClicked,
  filter: not($isPlaying),
  target: compositionStarted
})

sample({
  clock: compositionRequested,
  target: loadCompositionFx
})

sample({
  clock: loadCompositionFx.doneData,
  target: $composition
})

sample({
  clock: compositionUpdated,
  target: $compositionState
})

reset({
  clock: compositionStopped,
  target: [$compositionState, $frequency, $score]
})

sample({
  clock: loopButtonClicked,
  source: not($isLooping),
  target: $isLooping
})

sample({
  clock: compositionStarted,
  source: $composition,
  filter: Boolean,
  target: subscribeCompositionUpdatesFx
})

sample({
  clock: compositionStopped,
  source: $composition,
  filter: Boolean,
  target: [unsubscribeCompositionUpdatesFx, stopCompositionFx]
})

sample({
  clock: compositionStarted,
  source: { composition: $composition, bpm: $bpm },
  filter: (sourceData: CheckCompositionSource): sourceData is CheckCompositionParams => Boolean(sourceData.composition),
  target: playCompositionFx
})

sample({
  clock: compositionStopped,
  source: { isLooping: $isLooping, composition: $composition, bpm: $bpm },
  filter: (sourceData: RepeatCompositionSource): sourceData is RepeatCompositionParams => Boolean(
    sourceData.isLooping && sourceData.composition
  ),
  fn: ({ composition, bpm }: RepeatCompositionParams) => ({ composition, bpm }),
  target: [compositionStarted, loopIncremented]
})

sample({
  clock: pitcherUpdated,
  fn: value => pitchers[validation.pitcher(value)],
  target: $pitcher
})

// TODO: probably needs refactor
sample({
  clock: $scoreSource,
  filter: (source: UnitValue<typeof $scoreSource>): source is ScoreSource => !!source.state?.beat,
  fn: ({ state, frequency, loop }): [ScoreString, Correctness] => {
    const status = state.beat.value.check(frequency) ? 'success' : 'failed'

    return [`${loop}:${state.tact.index}:${state.beat.index}`, status];
  },
  target: updateScore
})
