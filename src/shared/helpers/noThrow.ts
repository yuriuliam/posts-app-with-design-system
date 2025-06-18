/**
 * Wraps the callback on a try-catch, but does nothing when an error is thrown.
 */
function noThrow(callback: () => void) {
  try {
    callback()
  } catch {} // eslint-disable-line no-empty
}

export { noThrow as unsafe__noThrow }
