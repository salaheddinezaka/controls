export function waitFor(element, callback) {
  const checkExist = setInterval(function () {
    if (document.querySelector(element)) {
      callback()
      clearInterval(checkExist)
    }
  }, 100)
}