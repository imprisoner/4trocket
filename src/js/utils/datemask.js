export default input => {
  input.addEventListener('keypress', function(e) {
    if(e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
    
    const len = input.value.length;
    
    
    if(len !== 1 || len !== 3) {
      if(e.keyCode == 47) {
        e.preventDefault();
      }
    }
    
    if(len === 2) {
      input.value += '.';
    }

    if(len === 5) {
      input.value += '.';
    }

    if(len > 9) e.preventDefault()
  });
};