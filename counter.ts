import { registerTarget } from './src/main'

// const numberProp = {
//   parse: (value: string) => parseInt(value),
//   stringify: (value: number) => value.toString(),
// }

registerTarget({
  name: 'counter',
  // props: {
  //   value: { attribute: 'data-value', type: numberProp },
  // },
  events: {
    click({ element }, event) {
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
  update({ element }) {
    console.log('update', element)
  },
})