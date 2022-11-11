import { createEvent, createStore, sample } from 'effector';

export enum Tools {
  Symbols = 'Symbols',
  CompositionParts = 'Composition Parts',
  Ideas = 'Ideas'
}

export const $tool = createStore<Tools | null>(Tools.Symbols);
export const $isCompositionNameEditing = createStore(false);
export const $compositionName = createStore('');

export const editCompositionNameButtonClicked = createEvent()
export const saveCompositionNameButtonClicked = createEvent()
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
  clock: saveCompositionNameButtonClicked,
  fn: () => false,
  target: $isCompositionNameEditing
})