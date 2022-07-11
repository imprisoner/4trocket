function onClickOutside(item, selector) {
  window.addEventListener('click', e => {
    if (!(item.contains(e.target) || e.target === item)) {
      item.classList.remove(selector)
    }
  })
}

function menu() {
  const collection = document.querySelectorAll('.menu-item')

  collection.forEach(item => {

    const isDropdownTrigger = item.classList.contains('dropdown-item__trigger')

    item.addEventListener('click', e => {
      collection.forEach(item => item.classList.remove('active'))

      if (isDropdownTrigger) {
        e.stopPropagation()
        const innerMenu = item.closest('.dropdown-item').querySelector('.dropdown-item__inner-menu')
        innerMenu.classList.add('expanded')
        item.classList.add('active')

        onClickOutside(item, 'active')
        onClickOutside(innerMenu, 'expanded')
      } else {
        item.classList.add('active')
        onClickOutside(item, 'active')
      }
    })

  })

}

window.addEventListener('DOMContentLoaded', menu)
