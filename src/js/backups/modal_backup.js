import { clickOutside } from "utils"

const overlay = document.querySelectorAll('.modal')
const dialog = overlay.querySelector('.modal__dialog')
const closeBtn = overlay.querySelector('.modal__close')

function closeModal() {
  overlay.classList.remove('open')
}

export default () => {
  closeBtn.addEventListener('click', closeModal)
  clickOutside(dialog, closeModal)
}