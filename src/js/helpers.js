function $ (selector) {
  return document.querySelector(selector)
}

function $$ (selector) {
  return document.querySelectorAll(selector)
}

function log(message){ console.log(message)
}
export { $,$$,log }

