const form = document.forms[0]
const input = form.elements[0]
const submitBtn = form.elements[1]
const inputGroup = form.querySelector('.input-group')
const helperText = inputGroup.querySelector('.input-group__helper-text')
const title = form.querySelector('h1')
const message = form.querySelector('p')

const successMessage = `
<p class="text-l-rg text-success-400 w-[460px] text-center">
  Мы отправили новый пароль на вашу электронную почту. 
  Проверьте почту (и не забудьте заглянуть в папку «Спам»). 
  Вы сможете сменить его в Личном кабинете.
</p>
`


form.addEventListener('submit', e => {
  e.preventDefault()
  
  if(input.value === 'test123@test.com') {
    inputGroup.remove()
    submitBtn.remove()
    message.remove()
    title.insertAdjacentHTML('afterend', successMessage)
  } else {
    helperText.textContent = 'Аккаунт с таким адресом почты не найден'
    inputGroup.classList.add('error')
  }
})