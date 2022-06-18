export const debounce = (func, wait) => {
  let timeout
  return (...params) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...params)
    }, wait)
  }
}
