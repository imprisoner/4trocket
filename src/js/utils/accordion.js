export default selector => {
  const accordion = selector ? document.querySelector(selector) : document.querySelector('.accordion')

  const accordionItems = accordion.querySelectorAll('.accordion__item')

  accordionItems.forEach(item => {
    item.addEventListener('click', (e) => {

      if (item.classList.contains('active')) {
        item.classList.remove('active')
        return
      }

      accordionItems.forEach(item => item.classList.remove('active'))
      item.classList.add('active')
    })
  })

}