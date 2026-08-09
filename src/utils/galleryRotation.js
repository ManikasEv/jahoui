/** Fisher–Yates shuffle (returns new array). */
export function shuffleItems(items) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function framesHaveOverlap(previousFrame, nextFrame) {
  const prevIds = new Set(previousFrame.map((item) => item.id))
  return nextFrame.some((item) => prevIds.has(item.id))
}

/**
 * First homepage frame — random unique subset.
 */
export function pickInitialGalleryFrame(items, limit) {
  return shuffleItems(items).slice(0, limit)
}

/**
 * Items eligible for the next frame: never reuse anything from the previous sequence.
 */
export function getEligibleForNextFrame(items, previousFrame) {
  const prevIds = new Set(previousFrame.map((item) => item.id))
  return items.filter((item) => !prevIds.has(item.id))
}

/**
 * Next frame: exactly `limit` items, zero overlap with `previousFrame`.
 * Walks a shuffled deck so every image is shown before the deck reshuffles.
 */
export function pickNextGalleryFrame(items, previousFrame, limit, cycleState) {
  const eligible = getEligibleForNextFrame(items, previousFrame)
  if (eligible.length === 0) {
    return pickInitialGalleryFrame(items, limit)
  }

  const eligibleById = new Map(eligible.map((item) => [item.id, item]))
  const picked = []
  const pickedIds = new Set()

  let guard = 0
  const maxGuard = items.length * 3

  while (picked.length < limit && guard < maxGuard) {
    guard += 1

    if (cycleState.deckIndex >= cycleState.deck.length) {
      cycleState.deck = shuffleItems(items)
      cycleState.deckIndex = 0
    }

    const candidate = cycleState.deck[cycleState.deckIndex]
    cycleState.deckIndex += 1

    if (!eligibleById.has(candidate.id) || pickedIds.has(candidate.id)) continue

    picked.push(eligibleById.get(candidate.id))
    pickedIds.add(candidate.id)
  }

  if (picked.length < limit) {
    const fallback = shuffleItems(eligible.filter((item) => !pickedIds.has(item.id)))
    picked.push(...fallback.slice(0, limit - picked.length))
  }

  const nextFrame = shuffleItems(picked.slice(0, limit))

  if (framesHaveOverlap(previousFrame, nextFrame)) {
    return shuffleItems(eligible).slice(0, limit)
  }

  return nextFrame
}
