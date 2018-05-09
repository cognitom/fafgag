/**
 * Convert a returned result from F/AF/G/AG into an Observable
 * - Function        --> Value          --> Observable
 * - Async Function  --> Promise        --> Observable
 * - Generator       --> Iterator       --> Observable
 * - Async Generator --> Async Iterator --> Observable
 */
export default function toObservable(result) {
  const observable = new Observable(async observer => {
    try {
      if (result === undefined) return observer.complete()
      const type = getType(result)
      if (type === "a" || type === "i") {
        for (;;) {
          const { value, done } =
            type === "a" ? await result.next() : result.next()
          if (value !== undefined) observer.next(value)
          if (done) break
        }
      } else {
        const value = type === "p" ? await result : result
        if (value !== undefined) observer.next(value)
      }
    } catch (e) {
      observer.error(e)
    }
    observer.complete()
  })
  return observable
}

function getType(result) {
  return typeof result[Symbol.asyncIterator] === "function"
    ? "a" // Async Iterator
    : typeof result[Symbol.iterator] === "function"
      ? "i" // Iterator
      : typeof result.then === "function"
        ? "p" // Promise
        : "v" // Value
}
