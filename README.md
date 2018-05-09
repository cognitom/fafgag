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

toObservable(f, 5).subscribe(console.log) // output: 25
toObservable(af, 5).subscribe(console.log) // output: (one sec later) 25
toObservable(g, 1).subscribe(console.log) // output: 25 36
toObservable(ag, 1).subscribe(console.log) // output: 26 (one sec later) 36
```

### Passing Arguments

```javascript
function f(...args) {
  return args.reduce((acc, cur) => acc + cur, 0)
}
// without any arguments
toObservable(f).subscribe(console.log) // output: 0
// with a single argument
toObservable(f, 1).subscribe(console.log) // output: 1
// with multiple arguments
toObservable(f, 1, 2, 3).subscribe(console.log) // output: 6
```

### Native / Zen

If you prefer Babel's polyfill, import `fafgag` like this:

```javascript
import toObservable from "fafgag"
```

If you prefer zen-observable, import `fafgag` like this:

```javascript
import toObservable from "fafgag/lib/zen.js" // for ES module environment
import toObservable from "fafgag/zen" // for other environments
```

| file | type | module |
| :-- | :-- | :-- |
| index.js | native (babel) | UMD |
| zen.js | zen-observable | UMD |
| lib/index.js | native (babel) | ES module |
| lib/zen.js | zen-observable | ES module |

## License

MIT
