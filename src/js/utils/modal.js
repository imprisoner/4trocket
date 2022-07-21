import { clickOutside } from 'utils'

export default class Modal {
  constructor(selector = '') {
    if (selector) {
      this.modal = document.querySelector(selector)
    } else {
      this.modal = document.querySelector('.modal')
    }
    // init modal
    const dialog = this.modal.querySelector('.modal__dialog')
    const closeBtn = this.modal.querySelector('.modal__close')

    clickOutside(dialog, this.close)
    closeBtn.addEventListener('click', this.close)
  }

  open() {
    this.modal.classList.add('open')
  }

  close() {
    this.modal.classList.remove('open')
  }
}