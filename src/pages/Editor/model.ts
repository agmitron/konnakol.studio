import { createEvent, createStore, sample } from 'effector';

export enum Widgets {
  Units = 'Units',
  CompositionParts = 'Composition Parts',
  Ideas = 'Ideas'
}

export const $widget = createStore<Widgets | null>(Widgets.Units);
export const $isCompositionNameEditing = createStore(false);
export const $compositionName = createStore('');

export const editCompositionNameButtonClicked = createEvent()
export const saveCompositionNameButtonClicked = createEvent()
export const compositionNameChanged = createEvent<string>()
export const saveCompositionButtonClicked = createEvent()
export const widgetSelected = createEvent<Widgets>()

sample({
  clock: widgetSelected,
  source: $widget,
  fn: (prevWidget, newWidget) => prevWidget === newWidget ? null : newWidget,
  target: $widget
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