import { menu, modal } from 'utils'

window.addEventListener('DOMContentLoaded', () => {
  menu()
  modal()

  const copyBtn = document.querySelector('#copy')
  const dialogBtn = document.querySelector('#dialog')
  const copyArea = document.querySelector('.copy')

  copyBtn.addEventListener('click', (e) => {
    const keyString = document.querySelector('#key').textContent
    copyKey(keyString)

  })

  // mocking key creation
  const keyInput = document.querySelector('#keyInput')
  const textfield = keyInput.closest('.textfield')
  const textfieldHelper = textfield.querySelector('.helper-text')
  const createBtn = document.querySelector('#createKey')
  

  createBtn.addEventListener('click', (e) => {
    if (!keyInput.value) {
      textfield.classList.add('error')
      textfieldHelper.textContent = 'Нужно ввести название ключа'
      return
    }
    if (keyInput.value.length < 3) {
      textfield.classList.add('error')
      textfieldHelper.textContent = 'Вы ввели менее 3-х символов'
      return
    }
    if (textfield.classList.contains('error')) {
      textfield.classList.remove('error')
    }
    createKey(keyInput.value)
    keyInput.value = ''
  })

  // mocking key deletion
  dialogBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    const dialog = document.querySelector('.modal')
    dialog.classList.add('open')
    const deleteBtn = dialog.querySelector('#delete')


    deleteBtn.addEventListener('click', () => {
      dialog.classList.remove('open')
      copyArea.style.display = 'none'
    })
  })

  // local actions

  function createKey(string) {
    document.querySelector('#key').textContent = string
    copyArea.style.display = 'flex'
    createBtn.setAttribute('disabled', true)
  }

  function copyKey(string) {
    navigator.clipboard.writeText(string).then(notifyUser, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  //mocking  notification of succesful copying
  function notifyUser() {
    const notification = document.querySelector('.copy__done')
    notification.textContent = 'Ключ скопирован'
    notification.classList.add('show')

    setTimeout(() => {
      notification.classList.remove('show')
    }, 3000)
  }

})