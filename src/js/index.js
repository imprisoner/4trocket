import { selectize } from 'utils'

window.addEventListener('DOMContentLoaded', () => {
  const selects = selectize(document.querySelectorAll('select'))

  selects.forEach(item => {
    item.select.addEventListener('change', (e) => {
      if (e.target.value) {
        item.opener.classList.remove('plug')
      }
    })
  })
})