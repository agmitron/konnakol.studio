import { createEvent, createStore, sample } from 'effector';
import { soundDeleted } from '~/entities/user/model';
import { unitChosen } from './dialog/unit/edit/model';

export const $contextMenuAnchorElement = createStore<HTMLElement | null>(null)
export const $selectedSoundIndex = createStore<number | null>(null)

export const contextMenuOpened = createEvent<[HTMLElement, number]>()
export const contextMenuClosed = createEvent()
export const editButtonClicked = createEvent()
export const deleteButtonClicked = createEvent()

$contextMenuAnchorElement
  .on(contextMenuOpened, (_, [el]) => el)
  .on(contextMenuClosed, () => null)

$selectedSoundIndex
  .on(contextMenuOpened, (_, [, index]) => index)
  .on(contextMenuClosed, () => null)

sample({
  clock: editButtonClicked,
  source: $selectedSoundIndex,
  filter: (index: number | null): index is number => index !== null,
  target: [unitChosen, contextMenuClosed]
})

sample({
  clock: deleteButtonClicked,
  source: $selectedSoundIndex,
  filter: (index: number | null): index is number => index !== null,
  target: [soundDeleted, contextMenuClosed]
})

