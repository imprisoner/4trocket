import { selectize, menu, dateMask, Modal } from 'utils'


window.addEventListener('DOMContentLoaded', () => {
  menu()

  const selects = selectize(document.querySelectorAll('select'))

  const dateFilters = document.querySelectorAll('.date-filter input')
  dateFilters.forEach(dateMask)

  // accordion()

  // orders modal
  const orderDetailsModal = new Modal('#order_details')

  document.querySelectorAll('table#orders .table__action a').forEach(trigger => {
    trigger.addEventListener('click', showOrderDetails)
  })

  // init cancel dialog
  const cancelBtn = orderDetailsModal.modal.querySelector('#cancel_trigger')
  const cancelOrderModal = new Modal('#cancel_modal')

  cancelBtn.addEventListener('click', () => cancelOrderModal.open())

  //  init adding note dialog
  const noteBtn = orderDetailsModal.modal.querySelector('#note_trigger')
  const addNoteModal = new Modal('#note_modal')

  noteBtn.addEventListener('click', () => {
    addNoteModal.open()
  })

  // document.addEventListener('modalOpen', (e) => {
  //   console.log(e.target)
  //   if (e.target === addNoteModal.modal || e.target === cancelOrderModal.modal) {
  //     orderDetailsModal.modal.style = 'overflow: hidden'
  //   }
  // })
  // document.addEventListener('modalClose', (e) => {
  //   if (e.target === addNoteModal.modal || e.target === cancelOrderModal.modal) {
  //     orderDetailsModal.modal.style = ''
  //   }
  // })
  // const actionsBtn = orderDetailsModal.modal.querySelector('#actions_trigger')


  async function showOrderDetails(e) {

    // fake request
    const url = '/assets/mock/orderData.json'
    const data = await fetch(url).then(async r => await r.json())

    // parse data to modal markup

    const orderIdPlace
      = orderDetailsModal.modal
        .querySelector('#order_id')

    orderIdPlace.textContent = data.order_id

    const orderSectionPatchNodeList
      = orderDetailsModal.modal
        .querySelector('#order_section')
        .querySelectorAll(':scope .row > div:last-child > *')
    const orderSectionData = Object.values(data.order)

    orderSectionPatchNodeList.forEach((span, i) => {
      if (!orderSectionData[i]) return false
      span.textContent = orderSectionData[i]
    })

    // 

    const buyerSectionPatchNodeList
      = document.body
        .querySelector('#buyer_section')
        .querySelectorAll(':scope .row > div:last-child > *')
    const buyerSectionData = Object.values(data.buyer)

    buyerSectionPatchNodeList.forEach((node, i) => {
      node.textContent = buyerSectionData[i]
    })

    // tables 
    const checkoutTable = orderDetailsModal.modal.querySelector('#checkout_table')
    const changesTable = orderDetailsModal.modal.querySelector('#changes_table')

    // use temlating

    renderTable(data.checkout.positions, checkoutTable)
    renderTable(data.changes.positions, changesTable)


    orderDetailsModal.open()
  }


})

// function patchTable(table, dataObject) {
//   console.log(table)
//   const nodeList = table.querySelectorAll(':scope tbody > tr')

//   // get array of row arrays
//   const rows = Array.from(nodeList)
//     .map(row => Array.from(row.children))

//   rows.forEach((cellsRow, i) => {
//     // get values
//     const rowData = Object.values(dataObject[i])

//     // iterate through table cells
//     cellsRow.forEach((cell, j) => {
//       // cells with null values should be empty
//       if (rowData[j] !== null) {
//         cell.childNodes.forEach(node => {
//           if (node.nodeType === 3) {
//             node.textContent = rowData[j]
//           }
//         })
//       } else {
//         cell.textContent = ''
//       }
//     })
//   })
// }


function templateCheckoutRow(data) {
  return `
    <tr>
      <td>${data.name ?? ''}</td>
      <td>${data.amount ?? ''}</td>
      <td>${data.price ? data.price + ' ₽' : ''}</td>
      <td>${data.summary ? data.summary + ' ₽' : ''} </td>
      <td>${data.volume ?? ''}</td>
      <td>${data.weight ?? ''}</td>
    </tr>
  `
}
function templateChangesRow(data) {
  return `
    <tr>
      <td>${data.created_at ?? ''}</td>
      <td>${data.event ?? ''}</td>
      <td>${data.created_by ?? ''}</td>
    </tr>
  `
}

function renderTable(data = {}, table) {

  const templateFn
    = table.id === 'checkout_table' ?
      templateCheckoutRow :
      templateChangesRow

  const tbody = document.createElement('tbody')

  data.forEach(pos => {
    const row = templateFn(pos)
    tbody.insertAdjacentHTML('beforeend', row)
  })
  // 
  console.dir(table)
  table.tBodies[0].replaceChildren(...tbody.children)
}