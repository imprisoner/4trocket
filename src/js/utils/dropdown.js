import clickOutside from "./clickOutside"

export default class Dropdown {
  constructor(selector = '', config = {}) {
    this.dropdown = selector ? document.querySelector(selector) : document.querySelector('.dd')
    this.disabled = false
    this.init(config)
  }

  open() {
    this.dropdown.classList.add('active')
  }

  close() {
    this.dropdown.classList.remove('active')
  }

  init(config) {
    this.trigger = this.dropdown.querySelector(':scope button')
    this.options = this.dropdown.querySelectorAll('.panel > *')

    this.trigger.addEventListener('click', (e) => {
      // remove condition if hard disable runs
      if (!this.disabled) this.dropdown.classList.toggle('active')
    })

    if(config.closeOnOptionClick) {
      this.options.forEach(item => {
        if (!item.classList.contains('disabled')) {
          item.addEventListener('click', () => this.close())
        }
      })
    }

    if (config.onClickOutside) {
      clickOutside(this.dropdown, () => this.close())
    }
  }
  // light disable with simpke flag checking



  disable() {
    // hard disable with deep cloning and patching DOM
    // const clone = this.dropdown.cloneNode(true)
    // this.dropdown.replaceWith(clone)
    // this.dropdown = clone
    this.disabled = true
    this.dropdown.classList.add('disabled')
  }

  enable() {
    this.disabled = false
    this.dropdown.classList.remove('disabled')
    // add init if hard disable runs
    // this.init()
  }
}