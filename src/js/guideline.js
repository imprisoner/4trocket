import { selectize, menu, dateMask, Modal, accordion, tabs } from 'utils'


window.addEventListener('DOMContentLoaded', () => {
  // menu and sections interaction
  const anchors = document.querySelectorAll('a.menu-item')
  const sections = document.querySelectorAll('.content > section')

  anchors.forEach(anchor => {
    // disable default behaviour
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      
      sections.forEach(section => {
        section.style.display = ''

        if(section.dataset.section === anchor.dataset.section) section.style.display = 'flex'
      })
    })

  })

  

  // init interactive components

  menu()

  const selects = selectize(document.querySelectorAll('select'))

  const dateFilters = document.querySelectorAll('.date-filter input')
  dateFilters.forEach(dateMask)

  accordion()
  const myTabs = tabs()
})