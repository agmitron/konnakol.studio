import { createEvent, createStore } from 'effector';

export function instantiatePopup() {
  const $isOpen = createStore(false)
  const open = createEvent()
  const close = createEvent()

  $isOpen
    .on(open, () => true)
    .on(close, () => false)

  return {
    $isOpen,
    open,
    close
  }
} 
