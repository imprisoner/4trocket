const initInnerDropdown = item => {
  const trigger = item.querySelector('.submenu__trigger')

  trigger.addEventListener('click', (e) => {
    e.stopPropagation()
    item.classList.toggle('active')
  })

  item.addEventListener('click', e => {
    e.stopPropagation()
  })
}

const isDropdown = item => item.classList.contains('submenu')

export default () => {
  const collection = document.querySelectorAll('.menu-item')
 
  collection.forEach(item => {

    if (!isDropdown(item)) {
      item.addEventListener('click', () => {
        collection.forEach(item => {
          if(!isDropdown(item))
            item.classList.remove('active')
          })
        item.classList.add('active')
      })
    } else {
      initInnerDropdown(item)
    }
  })
}