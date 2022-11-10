import * as compositions from "~/data/compositions";

export async function loadComposition(id: number) {
  const composition = Object.values(compositions).find((composition) => composition.id === id)

  if (!composition) {
    throw new Error(`Failed to load composition with id ${id}`)
  }

  return composition
}
