// one-level checkbox tree

export default (mainInput, childInputsContainer) => {

  const childInputsNodeList = childInputsContainer.querySelectorAll('input[type=checkbox]')

  // setup

  // check/uncheck all tree
  // accordTree(mainInput, childInputsNodeList)
  changeState(mainInput, childInputsNodeList)
  // 

  childInputsContainer.addEventListener('change', () => changeState(mainInput, childInputsNodeList))

  // check/uncheck all tree
  mainInput.addEventListener('change', () => accordTree(mainInput, childInputsNodeList))
}

function accordTree(parent, children) {
  children.forEach(input => input.checked = parent.checked)
}

function changeState(parent, children) {
  const checkList = Array.from(children).map(input => input.checked)
  const some = checkList.some(Boolean)
  const every = checkList.every(Boolean)
  parent.checked = every
  parent.indeterminate = some && some !== every
}
