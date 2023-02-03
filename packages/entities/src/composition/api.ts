import { createEffect } from 'effector';
import * as compositions from "./data";
import { Composition, CompositionId } from './model';

export async function loadComposition(id: number) {
  const foundComposition = Object.values(compositions).find((composition) => composition.id === id)

  if (!foundComposition) {
    throw new Error(`Failed to load composition with id ${id}`)
  }

  // TODO: deserializing logic

  return new Composition({
    ...foundComposition,
    pattern: []
  })
}

export const loadCompositionFx = createEffect(
  (id: CompositionId) => loadComposition(id)
)
