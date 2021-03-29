export function waitFor(element, callback) {
  const checkExist = setInterval(function () {
    if (document.querySelector(element)) {
      clearInterval(checkExist)
      callback()
    }
  }, 100)
}