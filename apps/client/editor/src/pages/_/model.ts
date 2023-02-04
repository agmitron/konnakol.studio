import { createEvent, createStore, sample } from 'effector';

export enum Tools {
  Sounds = 'Sounds',
  CompositionParts = 'Composition Parts',
  Ideas = 'Ideas'
}

export const $tool = createStore<Tools | null>(Tools.Sounds);
export const $isCompositionNameEditing = createStore(false);
export const $compositionName = createStore('New composition');

export const editCompositionNameButtonClicked = createEvent()
export const compositionNameSaved = createEvent()
export const compositionNameChanged = createEvent<string>()
export const saveCompositionButtonClicked = createEvent()
export const widgetSelected = createEvent<Tools>()

sample({
  clock: widgetSelected,
  source: $tool,
  fn: (prevWidget, newWidget) => prevWidget === newWidget ? null : newWidget,
  target: $tool
})

sample({
  clock: compositionNameChanged,
  target: $compositionName
})

sample({
  clock: editCompositionNameButtonClicked,
  fn: () => true,
  target: $isCompositionNameEditing
})

sample({
  clock: compositionNameSaved,
  fn: () => false,
  target: $isCompositionNameEditing
})
