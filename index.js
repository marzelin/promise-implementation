const MyPromise = require("./MyPromise")

// MyPromise.resolve()
//   .then(x => console.log("promise1 first then"))
//   .then(x => console.log("promise1 second then"))

// MyPromise.resolve()
//   .then(x => console.log("promise2 first then"))
//   .then(x => console.log("promise2 second then"))

// /* should return:
// promise1 first then
// promise2 first then
// promise1 second then
// promise2 second then
// */

MyPromise.resolve()
  .then(x => {
    console.log("promise1 first then")
    return MyPromise.resolve()
  })
  .then(x => console.log("promise1 second then"))

MyPromise.resolve()
  .then(x => console.log("promise2 first then"))
  .then(x => console.log("promise2 second then"))

// /* should return:
// promise1 first then
// promise2 first then
// promise2 second then
// promise1 second then
// */
