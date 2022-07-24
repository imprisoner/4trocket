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

    // overlay click
    if (dialog) {
      this.modal.addEventListener('click', e => {
        if(e.target === this.modal) this.close()
      })
    }

    closeBtn.addEventListener('click', () => this.close())
  }

  open() {
    console.log(this.modal)
    this.modal.classList.add('open')
  }

  close() {
    this.modal.classList.remove('open')
  }
}