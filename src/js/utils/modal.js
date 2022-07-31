import { events } from 'utils'
const { modalClose, modalOpen } = events

export default class Modal {
  constructor(selector = '') {
    if (selector) {
      this.modal = document.querySelector(selector)
    } else {
      this.modal = document.querySelector('.modal')
    }
    // init modal
    this.dialog = this.modal.querySelector('.modal__dialog')
    this.closeBtn = this.modal.querySelector('.modal__close')

    // overlay click
    if (this.dialog) {
      this.modal.addEventListener('click', e => {
        if (e.target === this.modal) this.close()
      })
    }

    this.closeBtn.addEventListener('click', () => this.close())
  }

  open() {
    // this.modal.parentElement.style = 'overflow: hidden'
    this.modal.classList.add('open')
    this.modal.dispatchEvent(modalOpen)
  }

  close() {
    // this.modal.parentElement.style = ''
    this.modal.classList.remove('open')
    this.modal.dispatchEvent(modalClose)
  }
}