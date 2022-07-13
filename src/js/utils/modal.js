import { clickOutside } from "utils"

const overlay = document.querySelector('.modal')
const dialog = overlay.querySelector('.modal__dialog')
const closeBtn = overlay.querySelector('.modal__close')

export default () => {

  closeBtn.addEventListener('click', closeModal)
  clickOutside(dialog, closeModal)

  function closeModal() {
    overlay.classList.remove('open')
  }
}