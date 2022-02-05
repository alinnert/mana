import { TargetPropConverter, registerTarget } from './src/main'

const numberProp: TargetPropConverter<number> = {
  parse: (value) => parseInt(value),
  stringify: (value) => value.toString(),
}

const stringProp: TargetPropConverter<string> = {
  parse: (value) => value,
  stringify: (value) => value,
}

registerTarget({
  name: 'counter',
  props: {
    value: { attribute: 'data-value', type: numberProp },
    label: { type: stringProp },
  },
  events: {
    click({ element }) {
      element.textContent = (parseInt(element.textContent) + 1).toString()
    },
  },
  mount({ element }) {
    console.log('mount', element)

    element.style.background = '#ddd'
    element.textContent = '0'
  },
  unmount({ element }) {
    console.log('unmount', element)
  },
  update({ element, props }) {
    console.log('update', element)

    // `props` demo
    console.log(props.value)
    console.log(props.label)

    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remove'
    removeButton.addEventListener('click', () => {
      element.remove()
    })

    element.insertAdjacentElement('beforeend', removeButton)
  },
})
