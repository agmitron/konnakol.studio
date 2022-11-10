import { createEvent } from 'effector'

export const playButtonClicked = createEvent()
export const stopButtonClicked = createEvent()
export const listenButtonClicked = createEvent()
export const enterBPMButtonClicked = createEvent()
export const pitcherUpdated = createEvent<string>()
export const isRepeatingCheckboxChanged = createEvent<boolean>()
