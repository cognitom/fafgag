/**
 * Convert a returned result from F/AF/G/AG into an Observable
 * - Function        --> Value          --> Observable
 * - Async Function  --> Promise        --> Observable
 * - Generator       --> Iterator       --> Observable
 * - Async Generator --> Async Iterator --> Observable
 */
export default function toObservable(fafgag, ...args) {
  return new Observable(async observer => {
    try {
      if (typeof fafgag !== "function") {
        return observer.error(new Error("Not a FAFGAG"))
      }
      const result = fafgag(...args)
      const type = getType(result)
      if (type === "n") {
        observer.next(result)
      } else if (type === "v" || type === "p") {
        const value = type === "p" ? await result : result
        observer.next(value)
      } else {
        for (;;) {
          const { value, done } =
            type === "a" ? await result.next() : result.next()
          observer.next(value)
          if (done) break
        }
      }
      observer.complete()
    } catch (e) {
      observer.error(e)
    }
  })
}

function getType(result) {
  return result === undefined || result === null
    ? "n" // Undefined or Null
    : typeof result[Symbol.asyncIterator] === "function"
      ? "a" // Async Iterator
      : typeof result[Symbol.iterator] === "function"
        ? "i" // Iterator
        : typeof result.then === "function"
          ? "p" // Promise
          : "v" // Value
}
