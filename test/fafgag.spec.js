import { ok, equal } from "assert"
import toObservabele from "../lib/zen.js"

describe("fafgag", () => {
  it("accepts a result of a normal function", done => {
    function f(n) {
      return n * n
    }
    const values = []
    toObservabele(f(5)).subscribe({
      next(value) {
        values.push(value)
      },
      complete() {
        equal(values.length, 1)
        equal(values[0], 25)
        done()
      }
    })
  })
  it("accepts a result of an async function (= promise)", done => {
    async function af(n) {
      await sleep(10)
      return n * n
    }
    const values = []
    toObservabele(af(5)).subscribe({
      next(value) {
        values.push(value)
      },
      complete() {
        equal(values.length, 1)
        equal(values[0], 25)
        done()
      }
    })
  })
  it("accepts a result of a generator (= iterator)", done => {
    function* g(n) {
      yield n * n
      return (n + 1) * (n + 1)
    }
    const values = []
    toObservabele(g(5)).subscribe({
      next(value) {
        values.push(value)
      },
      complete() {
        equal(values.length, 2)
        equal(values[0], 25)
        equal(values[1], 36)
        done()
      }
    })
  })
  it("accepts a result of an async generator (= async iterator)", done => {
    async function* ag(n) {
      yield n * n
      await sleep(10)
      return (n + 1) * (n + 1)
    }
    const values = []
    toObservabele(ag(5)).subscribe({
      next(value) {
        values.push(value)
      },
      complete() {
        equal(values.length, 2)
        equal(values[0], 25)
        equal(values[1], 36)
        done()
      }
    })
  })
  it("dispatches undefined when the function returns nothing", done => {
    function f() {
      // return nothing
    }
    const values = []
    toObservabele(f()).subscribe({
      next(value) {
        values.push(value)
      },
      complete() {
        equal(values.length, 1)
        equal(values[0], undefined)
        done()
      }
    })
  })
  it("doesn't skip falsy values", done => {
    async function* ag(n) {
      yield n * n
      await sleep(10)
      yield undefined
      await sleep(10)
      yield (n + 1) * (n + 1)
      await sleep(10)
      yield null
      await sleep(10)
      return ""
    }
    const values = []
    toObservabele(ag(5)).subscribe({
      next(value) {
        values.push(value)
      },
      complete() {
        equal(values.length, 5)
        equal(values[0], 25)
        equal(values[1], undefined)
        equal(values[2], 36)
        equal(values[3], null)
        equal(values[4], "")
        done()
      }
    })
  })
})

async function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec))
}
