---
title: Getting started
---

# Getting started

Let's create a simple counter component. It displays a number and two buttons to increment or decrement that number by the value of `1`. It also lets you define an initial value.

## Create the controller

This example uses the upcomming Vue reactivity RFC to track the current value. You can use whichever method you prefer.

~~~ js
import { defineController, numberProperty } from '@mana/framework'
import { value, watch } from 'vue'

defineController({
  // This is the name of the controller.
  // The class name you have to add to your HTML is an `@` + this name.
  // In this case: @counter
  name: 'counter',

  // This are the properties.
  // You can use them to pass initial data and to store your current state.
  properties: {
    initialValue: { default: 0, type: numberProperty() }
  },

  // Targets give you access to nested elements.
  // You can use them to access or change their values, or add event listener.
  targets: {
    incrementButton: { },
    decrementButton: { },
    displayValue: { }
  },

  // This callback function gets called when some element receives the `@counter`
  // or if an element gets created with a `@counter` class.
  connect (context) {
    context.target.incrementButton.on('click', () => {
      context.properties.counterValue.value += 1
    })

    context.target.decrementButton.on('click', () => {
      context.properties.counterValue.value -= 1
    })

    watch(context.properties.counterValue, counterValue => {
      context.target.displayValue.textValue = counterValue
    })
  }
})
~~~

## Apply classes and attributes to your HTML

~~~ html
<!-- The `@counter` class tells Mana that this is a counter component. -->
<!-- The attribute `data-counter.initial-value` sets the initial value of that counter. -->
<div class="@counter" data-counter.initial-value="5">

  <!-- This is the `display-value` target. It displays the current Value -->
  <div class="@counter.display-value"></div>

  <!-- This is the `decrement-button` target. It decrements the value above by 1. -->
  <div class="@counter.decrement-button">- 1</div>

  <!-- This is the `increment-button` target. It increments the value above by 1. -->
  <div class="@counter.increment-button">+ 1</div>
  
</div>
~~~
