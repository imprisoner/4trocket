import { selectize, menu, dateMask, Modal, accordion } from 'utils'


window.addEventListener('DOMContentLoaded', () => {
  menu()

  const selects = selectize(document.querySelectorAll('select'))

  const dateFilters = document.querySelectorAll('.date-filter input')
  dateFilters.forEach(dateMask)

  // accordion()

  // orders modal
  const orderDetailsModal = new Modal('#order_details')

  document.querySelectorAll('.t-orders__order a').forEach(trigger => {
    trigger.addEventListener('click', showOrderDetails)
  })
  
  // init cancel dialog
  const cancelBtn = orderDetailsModal.modal.querySelector('#cancel_trigger')
  const cancelOrderModal = new Modal('#cancel_modal')

  cancelBtn.addEventListener('click', () => cancelOrderModal.open())

  //  init adding note dialog
  const noteBtn = orderDetailsModal.modal.querySelector('#note_trigger')
  const addNoteModal = new Modal('#note_modal')

  noteBtn.addEventListener('click', () => addNoteModal.open())
  // const actionsBtn = orderDetailsModal.modal.querySelector('#actions_trigger')
  function showOrderDetails(e) {
    // TODO details request
    // TODO embed received data in modal markup
  
    orderDetailsModal.open()
  }
})
