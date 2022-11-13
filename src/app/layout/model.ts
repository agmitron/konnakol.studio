import { createEvent, createStore } from 'effector';
import { sample } from 'lodash';

const routesTitlesMapping: Record<string, string> = {
  dojo: 'Dojo',
  editor: 'Editor'
}

export const $title = createStore(
  routesTitlesMapping[window.location.pathname] ?? ''
)

export const titleChanged = createEvent<string>()

sample({
  clock: titleChanged,
  target: $title
})

