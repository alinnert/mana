document.getElementById('add-counter').addEventListener('click', () => {
  const counter = document.createElement('div')
  counter.classList.add('@counter')
  document
    .getElementById('counter-list')
    .insertAdjacentElement('beforeend', counter)
})
