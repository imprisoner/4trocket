import customSelect from 'custom-select'

const config = {
  containerClass: 'select',
  openerClass: 'select__opener plug',
  panelClass: 'select__panel',
  optionClass: 'select__option',
  // optgroupClass: 'select__optgroup',
  isSelectedClass: 'selected',
  hasFocusClass: 'focused',
  isDisabledClass: 'disabled',
  isOpenClass: 'open'
}

export default node => customSelect(node, config)