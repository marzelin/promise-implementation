class MyPromise {
  constructor(fn) {
    // should be called immediately after
    // the current stack is empty
    const executeImmediately = fn => {
      process.nextTick(fn)
    }
    this.callbacks = []
    // only happy path (resolve, rejection not implemented)
    this.state = "pending"
    this.then = callback => {
      return new MyPromise(resolve => {
        if (this.state === "settled***") {
          executeImmediately(() => {
            const result = callback(this.value)
            if (result && result.then) {
              result.then(v => resolve(v))
            } else {
              executeImmediately(() => resolve(result))
            }
          })
        } else {
          this.callbacks.push(callback)
        }
      })
    }
    this.resolve = v => {
      this.state = "settled***"
      this.value = v
      this.callbacks.forEach(callback => callback(v))
    }
    fn(this.resolve)
  }
  static resolve(v) {
    return new MyPromise(resolve => resolve(v))
  }
}

module.exports = MyPromise
