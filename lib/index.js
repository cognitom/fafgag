/**
 * Convert a returned result from F/AF/G/AG into an Observable
 * - Function        --> Value          --> Observable
 * - Async Function  --> Promise        --> Observable
 * - Generator       --> Iterator       --> Observable
 * - Async Generator --> Async Iterator --> Observable
 */
export default function toObservable(fafgag, ...args) {
  return new Observable(observer => {
    try {
      if (typeof fafgag !== "function") {
        return observer.error(new Error("Not a FAFGAG"))
      }
      const result = fafgag(...args)
      const type = getType(result)
      if (type === "n" || type === "v") {
        observer.next(result)
        observer.complete()
      } else if (type === "i") {
        processIterator(observer, result)
      } else if (type === "p") {
        processPromise(observer, result)
      } else if (type === "a") {
        processAsyncIterator(observer, result)
      }
    } catch (e) {
      observer.error(e)
    }
    return () => {}
  })
}

function processIterator(observer, iterator) {
  try {
    for (;;) {
      const { value, done } = iterator.next()
      observer.next(value)
      if (done) break
    }
    observer.complete()
  } catch (e) {
    observer.error(e)
  }
}

async function processPromise(observer, promise) {
  try {
    observer.next(await promise)
    observer.complete()
  } catch (e) {
    observer.error(e)
  }
}

async function processAsyncIterator(observer, iterator) {
  try {
    for (;;) {
      const { value, done } = await iterator.next()
      observer.next(value)
      if (done) break
    }
    observer.complete()
  } catch (e) {
    observer.error(e)
  }
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
