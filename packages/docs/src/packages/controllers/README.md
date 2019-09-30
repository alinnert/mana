---
title: About Controllers
---

# About Controllers

This package turns Mana into a small, more opinionated framework that allows you to achieve more with less code. You can define attributes, targets, events and so on.

## Example

Let's create a simple counter component. It displays a number and two buttons to increment or decrement that number by the value of `1`. It also lets you define an initial value.

~~~ js
import { defineController } from '@mana/controllers'
import { numberAttribute } from '@mana/attributes'

defineController({
  // This is the name of the controller.
  // It will be used for a variety of things.
  // Including generated class names and attributes.
  name: 'counter',

  // These are the attributes.
  // You can use them to pass initial data and to store your current state.
  attributes: {
    currentValue: {
      // This controller attribute gets connected with
      // the HTML attribute `data-counter-value`.
      bind: 'data-counter-value',

      // This attribute automatically converts the HTML attribute
      // to a number type and vice versa.
      // Additionaly, it only allows values between `0` and `100`.
      type: numberAttribute({ min: 0, max: 100 })

      // This defines the default value of the HTML attribute.
      // It's always of type `string`.
      // Here the HTML attribute will default to `data-counter-value="0"`
      // if no value is defined.
      // And the default controller value will be `0` accordingly.
      defaultValue: '0',
    }
  },

  // Targets give you access to nested elements.
  // You can use them to access or change their values, or add event listener.
  targets: {
    incrementButton: { },
    decrementButton: { },
    output: { }
  },

  // This callback function gets called when some element receives the `@counter`
  // or if an element gets created with a `@counter` class.
  init ({ targets, attributes }) {
    // Add a click event listener to all `incrementButton` targets.
    // This attaches the listener to all occurrences of the target,
    // no matter if it was present from the start or has been added later on.
    targets.incrementButton.on({
      click () { attributes.currentValue.value += 1 }
    })

    targets.decrementButton.on({
      click () { attributes.currentValue.value -= 1 }
    })

    // Listen for all changes to the attribute `currentValue`.
    // This is where the HTML is being updated.
    attributes.currentValue.onChange(value => {
      targets.output.textValue = value
    })
  }
})
~~~

## Apply classes and attributes to your HTML

~~~ html
<!-- The `@counter` class tells Mana that this is a counter component. -->
<!-- The attribute `data-counter-value` sets the initial value of that counter. -->
<div class="@counter" data-counter-value="5">
  <!-- This is the `output` target. It displays the current Value -->
  <div class="@counter.output"></div>

  <!-- This is the `decrement-button` target. It decrements the value above by 1. -->
  <div class="@counter.decrement-button">- 1</div>

  <!-- This is the `increment-button` target. It increments the value above by 1. -->
  <div class="@counter.increment-button">+ 1</div>
</div>
~~~
