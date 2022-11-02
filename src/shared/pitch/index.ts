import { createEffect, createEvent, createStore, sample } from 'effector';
import { interval } from 'patronum';
import { Frequency } from '~/types/fraction.types';
import { Pitcher, pitchers } from './shared';
import { initializeWebAudioApi, IWebAudioAPI } from './web-audio';

export interface DetectPitchInBackgroundFxParams {
  webAudio: IWebAudioAPI;
  pitcher: Pitcher;
}

export const $pitcher = createStore<Pitcher>(pitchers.ACF2PLUS)
export const $frequency = createStore<Frequency>(0)
export const $webAudio = createStore<IWebAudioAPI | null>(null)
export const initializeWebAudioApiFx = createEffect(initializeWebAudioApi)

export const requestWebAudioAPI = createEvent()
export const startListeningMicro = createEvent()
export const stopListeningMicro = createEvent()

export const detectPitchInBackgroundFx = createEffect(({
  webAudio: { analyserAudioNode, buffer },
  pitcher
}: DetectPitchInBackgroundFxParams) => {
  analyserAudioNode.getFloatTimeDomainData(buffer)
  console.log({ freq: pitcher.detect(buffer) })
  return pitcher.detect(buffer)
})

sample({
  clock: initializeWebAudioApiFx.doneData,
  source: $webAudio,
  fn: (_, webAudio) => webAudio,
  target: $webAudio
})

sample({
  clock: requestWebAudioAPI,
  target: initializeWebAudioApiFx
})

const { tick } = interval({
  start: startListeningMicro,
  stop: stopListeningMicro,
  timeout: 1000 / 60,
  leading: true
})

sample({
  clock: tick,
  source: { webAudio: $webAudio, pitcher: $pitcher },
  filter: (params): params is DetectPitchInBackgroundFxParams => Boolean(params.webAudio),
  fn: (params: DetectPitchInBackgroundFxParams) => params,
  target: detectPitchInBackgroundFx
})

sample({
  clock: detectPitchInBackgroundFx.doneData,
  filter: (frequency): frequency is Frequency => !!frequency,
  fn: (frequency: Frequency) => frequency,
  target: $frequency
})
