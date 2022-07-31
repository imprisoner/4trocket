import {
  selectize,
  menu,
  dateMask,
  Modal,
  accordion,
  tabs,
  disableTableCheckboxes,
  checkboxTree,
  Dropdown
} from 'utils'


window.addEventListener('DOMContentLoaded', () => {

  disableTableCheckboxes()

  // menu and sections interaction
  const anchors = document.querySelectorAll('a.menu-item')
  const sections = document.querySelectorAll('.content > section')

  anchors.forEach(anchor => {
    // disable default behaviour
    anchor.addEventListener('click', (e) => {
      e.preventDefault()

      sections.forEach(section => {
        section.style.display = ''

        if (section.dataset.section === anchor.dataset.section) section.style.display = 'flex'
      })
    })

  })

  // checkboxTree in the table

  const table = document.querySelector('#my_table')
  const mainInput = table.querySelector('thead .cb > input[type=checkbox]')
  const childInputsContainer = table.querySelector('tbody')

  checkboxTree(mainInput, childInputsContainer)

  // init common interactive components

  menu()

  const selects = selectize(document.querySelectorAll('select'))

  selects[1].disabled = true

  const dateFilters = document.querySelectorAll('.date-filter input')
  dateFilters.forEach(dateMask)

  accordion()
  const myTabs = tabs()

  // dropdown testing
  const dropdownMenu = new Dropdown(null , {
    closeOnOptionClick: true,
    onClickOutside: true
  })

  const dropdownDisableBtn = document.querySelector('#disable_dropdown')
  const dropdownInitBtn = document.querySelector('#init_dropdown')

  dropdownDisableBtn.addEventListener('click', () => dropdownMenu.disable())
  dropdownInitBtn.addEventListener('click', () => dropdownMenu.enable())
  // modals
  const triggerPrimary = document.querySelector('#mt_primary')
  const triggerDanger = document.querySelector('#mt_danger')

  const modalPrimary = new Modal('.modal-primary')
  const modalDanger = new Modal('.modal-danger')

  triggerPrimary.addEventListener('click', () => modalPrimary.open())
  triggerDanger.addEventListener('click', () => modalDanger.open())
})