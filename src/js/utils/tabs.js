export default selector => {
  const tabs = selector ? document.querySelector(selector) : document.querySelector('.tabs')

  const tabsItems = tabs.querySelectorAll('.tabs__item')

  tabsItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault()
      }

      tabsItems.forEach(item => item.classList.remove('active'))
      item.classList.add('active')
    })
  })

  return tabs
}