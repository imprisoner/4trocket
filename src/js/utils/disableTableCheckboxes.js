export default selector => {
  const table = selector ? document.querySelector(selector) : document.querySelector('.table')

  const cbCollection = table.querySelectorAll('.cb')
  const mainCb = cbCollection[0]

  
  if (cbCollection.length) {
      
    cbCollection.forEach(cb => {
      const input = cb.querySelector('input[type=checkbox]')
      const parentCell = cb.parentElement
      // if table cell has class .disabled
      if (parentCell.classList.contains('disabled')) input.disabled = true
      // if checkbox disabled
      if(input.disabled) parentCell.classList.add('disabled')
    })
    
    if(mainCb.querySelector('input[type=checkbox]').disabled || mainCb.parentElement.classList.contains('disabled')) {
      cbCollection.forEach(cb => {
        const input = cb.querySelector('input[type=checkbox]')
        const parentCell = cb.parentElement
        parentCell.classList.add('disabled')
        input.disabled = true
      })
    }
  }
} 