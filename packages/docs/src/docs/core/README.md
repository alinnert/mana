---
title: About Core
---

# Mana Core

The core of Mana. It provides some functions that help you work with the DOM.

## Watch for changes on the DOM

This function tells you whenever an element you watch gets added to or removed from the DOM. It also tells you about changes in attributes.

~~~ js
import { watchSelector } from '@mana/core'

watchSelector({
  selector: '.slide-in',
  context: document,
  
  onAdded (mutationRecord, data) {
    // An element matching the provided selector got added to the DOM.
  },
  
  onRemoved (mutationRecord, data) {
    // An element matching the provided selector got removed from the DOM.
  },
  
  onAttributeChanged (mutationRecord, data) {
    // An element matching the provided selector changed one of its attributes.
  }
})
~~~

## Find elements

This function finds all elements that match a given selector. You can specify a second selector to filter the results. All elements that live inside an element that matches this filter selector are excluded from the results.

~~~ js
import { findElements } from '@mana/core'

const someElement = ...

const toggleElements = findElements({
  context: someElement,
  selector: '.slide-in__toggle',
  exclude: '.slide-in'
})
~~~

In this example the function returns all elements that follow all of these rules:

- It matches the selector `'.slide-in__toggle'`
- It lives inside `someElement`
- It does not live inside an element that matches the selector `.slide-in`
