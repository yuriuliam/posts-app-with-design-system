import type * as React from 'react'

type PossibleRef<T> = React.Ref<T> | undefined

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    return ref(value)
  } else if (ref !== null && ref !== undefined) {
    ref.current = value
  }
}

function createCleanup<T>(
  refs: PossibleRef<T>[],
  cleanups: Array<ReturnType<React.RefCallback<T>> | undefined>,
) {
  return () => {
    for (let i = 0; i < cleanups.length; i++) {
      const cleanup = cleanups[i]
      if (typeof cleanup == 'function') {
        cleanup()
      } else {
        setRef(refs[i], null)
      }
    }
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return node => {
    let hasCleanup = false
    const cleanups = refs.map(ref => {
      const cleanup = setRef(ref, node)
      if (!hasCleanup && typeof cleanup == 'function') hasCleanup = true
      return cleanup
    })

    if (!hasCleanup) return

    return createCleanup(refs, cleanups)
  }
}

export { composeRefs }
