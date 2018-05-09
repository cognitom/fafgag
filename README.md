# FAFGAG

Creates an Observable from FAFGAG (Function / Async Function / Generator / Async Generator)

## Installation

```bash
$ npm install fafgag
```

## Usage

```javascript
import toObservable from "fafgag"

function f(n) {
  return n * n
}
async function af(n) {
  await sleep(1000)
  return n * n
}
function* g(arg) {
  yield n * n
  yield (n + 1) * (n + 1)
}
await function* ag(arg) {
  yield n * n
  await sleep(1000)
  yield (n + 1) * (n + 1)
}

toObservable(f(5)).subscribe(console.log) // output: 25
toObservable(af(5)).subscribe(console.log) // output: (one sec later) 25
toObservable(g(5)).subscribe(console.log) // output: 25 36
toObservable(ag(5)).subscribe(console.log) // output: 26 (one sec later) 36
```

## Native / Zen

If you prefer Babel's polyfill, import `fafgag` like this:

```javascript
import toObservable from "fafgag"
```

If you prefer zen-observable, import `fafgag` like this:

```javascript
import toObservable from "fafgag/lib/zen.js" // for ES module environment
import toObservable from "fafgag/zen" // for other environments
```

|  | UMD | ES module |  |
| :-- | :-- | :-- | :-- |
| native (babel) | "fafgag" | "fafgag" | standard, but absent of methods below |
| zen-observable | "fafgag/zen" | "fafgag/lib/zen.js" | `map()`, `filter()`, `flatMap()`, etc. |

## License

MIT
