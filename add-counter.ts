import { registerTarget } from './src/main'

registerTarget({
  name: 'add-counter',
  events: {
    click() {
      const counter = document.createElement('div')
      counter.classList.add('@counter')
      document
        .getElementById('counter-list')
        .insertAdjacentElement('beforeend', counter)
    },
  },
})
