export default (item, cb) => {
  window.addEventListener('click', e => {
    if (!(item.contains(e.target) || e.target === item)) {
      cb()
    }
  })
}