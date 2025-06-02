type Success<T> = { data: T; error: null }
type Failure<E> = { data: null; error: E }
type Result<T, E = Error> = Success<T> | Failure<E>

const tryCatch = async <T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> => {
  try {
    const data = await promise
    return { data, error: null } satisfies Success<T>
  } catch (error) {
    return { data: null, error: error as E } satisfies Failure<E>
  }
}

export { tryCatch }
