# FAFGAG

[![Travis CI](https://travis-ci.com/cognitom/fafgag.svg?branch=master)](https://travis-ci.com/cognitom/fafgag)
[![npm](https://img.shields.io/npm/v/fafgag.svg)](https://www.npmjs.org/package/fafgag)

Creates an Observable from FAFGAG (Function / Async Function / Generator / Async Generator)

## Installation

```bash
$ npm install fafgag
```

## Usage

`fafgag` converts the results which returned from FAFGAG into Observables:

- **F**unction --> *Value* --> Observable
- **A**sync **F**unction --> *Promise* --> Observable
- **G**enerator --> *Iterator* --> Observable
- **A**sync **G**enerator --> *Async Iterator* --> Observable

```javascript
import toObservable from "fafgag"

function f(n) {
  return n * n
}
async function af(n) {
  await sleep(1000)
  return n * n
}
function* g(n) {
  yield n * n
  yield (n + 1) * (n + 1)
}
await function* ag(n) {
  yield n * n
  await sleep(1000)
  yield (n + 1) * (n + 1)
}

toObservable(f, 5).subscribe(console.log) // output: 25
toObservable(af, 5).subscribe(console.log) // output: (one sec later) 25
toObservable(g, 5).subscribe(console.log) // output: 25 36
toObservable(ag, 5).subscribe(console.log) // output: 26 (one sec later) 36
```

**Note**: only when it get subscribed, it will run. This laziness is the basic behavior of Observables.

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

|  | UMD | ES module | Note |
| :-- | :-- | :-- | :-- |
| native (babel) | "fafgag" | "fafgag" | standard, but w/o these methods below |
| zen-observable | "fafgag/zen" | "fafgag/lib/zen.js" | `map()`, `filter()`, `flatMap()`, etc. |

## License

MIT
