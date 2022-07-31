import customSelect from 'custom-select'

const config = {
  containerClass: 'js-select',
  openerClass: 'js-select__opener plug',
  panelClass: 'js-select__panel',
  optionClass: 'js-select__option',
  // optgroupClass: 'select__optgroup',
  isSelectedClass: 'selected',
  hasFocusClass: 'focus',
  isDisabledClass: 'disabled',
  isOpenClass: 'open'
}

function addListeners(select, i, selectized) {

  select.opener.addEventListener('focus', (e) => {
    if (selectized) {
      selectized.forEach((select) => {
        select.open = false
      })
    } else {
      select.open = false
    }
  })

  select.select.addEventListener('change', (e) => {
    if (e.target.value) {
      select.opener.classList.remove('plug')
    }
  })
}

export default node => {
  const selectized = customSelect(node, config)

  if (selectized instanceof Array)
    selectized.forEach(addListeners)
  else
    addListeners(selectized)

  return selectized
}